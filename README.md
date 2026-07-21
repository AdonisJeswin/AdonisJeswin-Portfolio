# World-Class 3D Interactive Portfolio

A production-ready, visually exceptional personal portfolio site built from scratch using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Three Fiber (R3F)**.

The site is designed for a Creative Developer & UI/UX Designer who works at the intersection of styling craft and technical performance.

---

## 🛠️ Tech Stack & Key Elements

- **Framework**: Next.js 14 (App Router, strict TypeScript mode)
- **Styling**: Tailwind CSS v3 + custom CSS custom property tokens
- **Animations**: Framer Motion v11 (for staggers, overlays, and hover morphs)
- **3D Graphics**: Three.js, React Three Fiber (R3F), and `@react-three/drei` (with dynamic client-side lazy-loading for 0ms SSR overhead)
- **Email Ingestion**: Resend API integration via a Next.js API route handler
- **SEO/A11y**: Native robots.ts, sitemap.ts, JSON-LD Schema (Person & CreativeWork), explicit focus rings, and WCAG AA compliance checkers

---

## 📂 File Architecture

This repository matches the exact specification:
```
/app
  layout.tsx          ← Root layout (metadata, fonts loading, custom cursor, JSON-LD)
  page.tsx            ← Homepage assembling core landing sections
  sitemap.ts          ← Automated sitemap generator
  robots.ts           ← Search-engine index rules
  /api/contact
    route.ts          ← Resend route handler with local mock fallback
  /projects/[slug]
    page.tsx          ← SSG static server page (generateMetadata, static params)
    ProjectClientPage.tsx ← Case study layout (GSAP scroll parallax, custom lightbox)
/components
  /three
    HeroScene.tsx     ← R3F Canvas: wireframe + solid low-poly icosahedron
    ProjectOrb.tsx    ← Morphing 3D orb using Drei's MeshDistortMaterial
  /ui
    CustomCursor.tsx  ← Trailing cursor dot + ring morphing to "VIEW →" on project hover
    NavBar.tsx        ← Sticky header that hides on scroll down and shows on scroll up
    TiltCard.tsx      ← Custom spring-based ±8° 3D tilt card
    SandboxWidget.tsx ← Draggable Bézier Curve Playground & design calculators
  /sections
    Hero.tsx          ← Typography staggers, SVG underline draw, & HeroScene canvas
    Work.tsx          ← Asymmetric 12-column Selected Work grid
    About.tsx         ← Bio block and interactive clickable skills constellation
    Sandbox.tsx       ← Design utilities layout mount
    Contact.tsx       ← div + state controlled contact form & social links
/lib
  projects.ts         ← Core projects typing database and case studies copy
  metadata.ts         ← Metadata SEO helper factory
/public
  /projects           ← Programmatically created vector SVG mockups per case study
/vercel.json          ← Edge caching headers configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js v18.0+** and **pnpm** installed:
```bash
node -v
pnpm -v
```

### Installation

Clone the repository and install dependencies:
```bash
pnpm install
```

### Local Development

Launch the hot-reloading development server:
```bash
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory to store environment variables:

| Variable | Description | Required in Dev | Required in Prod |
|---|---|---|---|
| `RESEND_API_KEY` | Your Resend API Key (get one from [resend.com](https://resend.com)) | No (Falls back to Mock) | Yes |

*Note: If `RESEND_API_KEY` is not defined, the API route will log a console warning and return a mock successful delivery payload to allow seamless testing of the contact form interface.*

---

## 📦 Production Builds & Verification

Compile the application to confirm TypeScript validity, bundle size metrics, and static generation runs without errors:

```bash
pnpm build
```

The output compiles `/` statically and dynamic `/projects/[slug]` paths as static pre-rendered HTML (SSG) with optimized scripts:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    20.5 kB         156 kB
├ ○ /_not-found                          873 B          88.3 kB
├ ƒ /api/contact                         0 B                0 B
├ ● /projects/[slug]                     52.5 kB         188 kB
```

---

## ☁️ Deployment

Deploy this project on **Vercel** with one click:
1. Push your code changes to GitHub.
2. Link your repository in your Vercel Dashboard.
3. Configure `RESEND_API_KEY` under Project Settings -> Environment Variables.
4. Deploy! Vercel will automatically read `vercel.json` and apply edge CDN caching rules to models and dynamic images.
