import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveToMongo } from "@/lib/mongodb";

// Simple IP-based rate limiting map to prevent DoS/spamming
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

// HTML escaping helper to prevent HTML Injection and Cross-Site Scripting (XSS)
function escapeHtml(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting check
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      const limitData = rateLimitMap.get(ip)!;
      if (now - limitData.lastReset > RATE_LIMIT_WINDOW) {
        limitData.count = 1;
        limitData.lastReset = now;
      } else {
        limitData.count++;
        if (limitData.count > MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: "Too many inquiries. Please wait a minute before submitting again." },
            { status: 429 }
          );
        }
      }
    }

    const body = await req.json();
    const { name, email, projectType, message, budget } = body;

    // 2. Presence validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 3. Payload size constraints (defends against heap/buffer memory abuse)
    if (
      name.length > 100 ||
      email.length > 100 ||
      (projectType && projectType.length > 50) ||
      (budget && budget.length > 50) ||
      message.length > 4000
    ) {
      return NextResponse.json(
        { error: "Payload fields exceed maximum character limits." },
        { status: 400 }
      );
    }

    // 4. Strict Email format regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address structure." },
        { status: 400 }
      );
    }

    // Escape inputs for safe rendering inside the email client
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Both");
    const safeBudget = escapeHtml(budget || "Not specified");
    const safeMessage = escapeHtml(message);

    // Persist raw values to MongoDB (insert operation is safe against NoSQL injection)
    try {
      await saveToMongo({ name, email, projectType, message, budget });
    } catch (dbError) {
      console.warn("MongoDB Atlas save skipped/failed (continuing to email step):", dbError);
    }

    const emailSubject = `Portfolio Inquiry: ${safeProjectType} from ${safeName}`;
    const emailHtml = `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Project Type:</strong> ${safeProjectType}</p>
      <p><strong>Budget Range:</strong> ${safeBudget}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 3px solid #4F46E5; padding-left: 10px; margin: 10px 0;">
        ${safeMessage.replace(/\n/g, "<br/>")}
      </blockquote>
    `;

    // Local sandbox simulation if API key is missing
    if (!resendApiKey || resendApiKey === "temp_key") {
      console.warn("RESEND_API_KEY is not defined in .env.local. Simulating mock email delivery.");
      
      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      return NextResponse.json({
        success: true,
        message: "Demo mode: inquiry processed successfully (mocked delivery). Add RESEND_API_KEY to your environment to receive live emails.",
      });
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "jeswinadonis@gmail.com", // ← Your inbox email (aligned with Resend account)
      replyTo: safeEmail, // Set replyTo so you can reply directly to the sender
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API failed to dispatch email:", error);
      return NextResponse.json(
        { error: error.message || "Resend API error occurred." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Resend API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
