"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = ["Design", "Development", "Both", "Other"];
const budgetRanges = ["< $5k", "$5k — $15k", "$15k — $30k", "$30k+"];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Both");
  const [budget, setBudget] = useState("$15k — $30k");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    // Form client-side validation
    if (!name.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your name." });
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatusMsg({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!message.trim()) {
      setStatusMsg({ type: "error", text: "Please enter a message describing your project." });
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType,
          budget,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setStatusMsg({ type: "success", text: result.message || "Message dispatched successfully!" });
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatusMsg({ type: "error", text: result.error || "Failed to deliver message. Please try again." });
      }
    } catch (e) {
      console.error(e);
      setStatusMsg({ type: "error", text: "A connection error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-borderLine/30"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Headline and Socials */}
        <div className="lg:col-span-5 flex flex-col h-full justify-between">
          <div>
            <p className="font-mono text-xs font-bold text-accent tracking-widest uppercase mb-3">
              04 / Contact
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Let&apos;s Build Something Unreasonable.
            </h2>
            <p className="font-sans text-sm md:text-base text-muted leading-relaxed max-w-md">
              Have an ambitious concept that defies default structures? Let&apos;s talk about designing interactions that users will actually remember.
            </p>
          </div>

          {/* Social Links List */}
          <div className="mt-12 lg:mt-24">
            <p className="font-mono text-[9px] font-bold text-muted uppercase tracking-widest mb-4">
              Social Handles
            </p>
            <div className="flex flex-wrap gap-6 text-foreground">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/AdonisJeswin",
                  handle: "@AdonisJeswin",
                  svg: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/adonis-jeswin",
                  handle: "/in/adonis-jeswin",
                  svg: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
              
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-xs font-semibold hover:text-accent transition-colors"
                  data-cursor="pointer"
                  title={soc.name}
                >
                  {soc.svg}
                  <span className="font-mono text-muted group-hover:text-accent transition-colors">{soc.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controlled State Form Viewport */}
        <div className="lg:col-span-7 bg-white/20 border border-borderLine/20 p-8 md:p-10 rounded-2xl shadow-sm relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* 1. Name Input */}
                <div className="flex flex-col">
                  <label htmlFor="user-name" className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
                    What is your name? *
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    aria-required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    disabled={isLoading}
                    className="w-full bg-white/40 border border-borderLine/30 rounded-xl px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent disabled:opacity-50 transition-colors"
                  />
                </div>

                {/* 2. Email Input */}
                <div className="flex flex-col">
                  <label htmlFor="user-email" className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
                    Your Email Address *
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    disabled={isLoading}
                    className="w-full bg-white/40 border border-borderLine/30 rounded-xl px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent disabled:opacity-50 transition-colors"
                  />
                </div>

                {/* 3. Project Type Selection pills */}
                <div>
                  <span className="block font-mono text-[10px] font-bold text-muted uppercase tracking-wider mb-3">
                    Project Requirements
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {projectTypes.map((type) => {
                      const isSelected = projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          disabled={isLoading}
                          className={`px-4 py-2 border text-xs font-sans font-semibold rounded-full transition-all ${
                            isSelected
                              ? "bg-accent-light border-accent text-accent"
                              : "bg-white/30 border-borderLine/30 text-foreground hover:border-foreground/40"
                          } disabled:opacity-50`}
                          data-cursor="pointer"
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Budget Range Selector */}
                <div>
                  <span className="block font-mono text-[10px] font-bold text-muted uppercase tracking-wider mb-3">
                    Project Budget Scope (Optional)
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {budgetRanges.map((range) => {
                      const isSelected = budget === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudget(range)}
                          disabled={isLoading}
                          className={`px-4 py-2 border text-xs font-sans font-semibold rounded-full transition-all ${
                            isSelected
                              ? "bg-accent-light border-accent text-accent"
                              : "bg-white/30 border-borderLine/30 text-foreground hover:border-foreground/40"
                          } disabled:opacity-50`}
                          data-cursor="pointer"
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Message Input */}
                <div className="flex flex-col">
                  <label htmlFor="user-message" className="font-mono text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
                    Inquire Details *
                  </label>
                  <textarea
                    id="user-message"
                    required
                    aria-required="true"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us a bit about what you have in mind..."
                    disabled={isLoading}
                    className="w-full bg-white/40 border border-borderLine/30 rounded-xl px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent disabled:opacity-50 transition-colors resize-none"
                  />
                </div>

                {/* Error Banner Message */}
                {statusMsg && statusMsg.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-mono p-3.5 rounded-xl"
                  >
                    ⚠️ {statusMsg.text}
                  </motion.div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-[#F7F5F0] font-sans text-xs font-bold tracking-widest py-4 px-6 rounded-xl uppercase transition-colors flex items-center justify-center space-x-2"
                    data-cursor="pointer"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-[#F7F5F0]/30 border-t-[#F7F5F0] rounded-full animate-spin" />
                    ) : (
                      <span>Submit Project Details</span>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Success Splash State Screen
              <motion.div
                key="success-splash"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Message Dispatched
                  </h3>
                  <p className="font-sans text-sm text-muted mt-2 max-w-sm mx-auto">
                    {statusMsg?.text}
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="font-mono text-xs font-bold text-accent border border-accent/20 px-4 py-2 rounded-full hover:bg-accent-light transition-colors"
                  data-cursor="pointer"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
