"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/projects";
import { siteConfig } from "@/lib/metadata";

gsap.registerPlugin(ScrollTrigger);

interface ProjectClientPageProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectClientPage({ project, nextProject }: ProjectClientPageProps) {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Generate local gallery paths
  const galleryImages = [
    `/projects/${project.slug}/gallery-1.svg`,
    `/projects/${project.slug}/gallery-2.svg`,
    `/projects/${project.slug}/gallery-3.svg`,
  ];

  // GSAP Scroll Parallax on the Hero Image
  useEffect(() => {
    const el = heroImageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: "25%", // translates downwards for parallax
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert(); // clean up ScrollTrigger bindings on unmount
    };
  }, [project.slug]);

  // Intersection Observer to highlight the active section in sticky nav
  useEffect(() => {
    const sections = ["overview", "problem", "architecture", "outcomes", "gallery", "repository"];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(secId);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" } // trigger when section occupies middle screen
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((o) => {
        if (o) o.observer.unobserve(o.el);
      });
    };
  }, [project.slug]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Structured data for search engines
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.summary,
    "genre": project.category,
    "dateCreated": `${project.year}-01-01`,
    "author": {
      "@type": "Person",
      "name": "Adonis Jeswin",
    },
    "keywords": project.tags.join(", "),
  };

  return (
    <div className="w-full bg-background pt-24 pb-16" ref={triggerRef}>
      {/* 1. Header Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <Link
          href="/#work"
          className="group inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          data-cursor="pointer"
        >
          <span className="transform group-hover:-translate-x-1.5 transition-transform mr-2">
            ←
          </span>
          All Work
        </Link>
      </div>

      {/* 2. Hero Header Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-3xl">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-12 gap-y-6 mt-8 border-y border-borderLine/30 py-6">
          <div>
            <p className="font-mono text-[10px] font-bold text-muted uppercase tracking-widest">
              Category
            </p>
            <p className="font-sans text-sm font-semibold text-foreground mt-1">
              {project.category}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold text-muted uppercase tracking-widest">
              Year
            </p>
            <p className="font-sans text-sm font-semibold text-foreground mt-1">
              {project.year}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold text-muted uppercase tracking-widest">
              Core Stack
            </p>
            <p className="font-sans text-sm font-semibold text-foreground mt-1">
              {project.tech.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Parallax Hero Image banner */}
      <div className="w-full h-[50vh] md:h-[65vh] overflow-hidden relative bg-borderLine/20 border-y border-borderLine/30 mb-20">
        <div className="absolute inset-0 w-full h-[120%] top-[-10%]" ref={heroImageRef}>
          {/* Using a solid high-end design pattern placeholder if image hasn't loaded */}
          <Image
            src={project.hero}
            alt={`${project.title} Hero View`}
            fill
            className="object-contain p-4 md:p-8 bg-white"
            priority={true}
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      {/* 4. Split Case Study Panels */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative mb-24">
        {/* Sticky Desktop Side Nav */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32">
          <nav className="flex flex-col space-y-4 border-l border-borderLine/30 pl-4 py-2">
            {[
              { label: "Overview", id: "overview" },
              { label: "The Problem", id: "problem" },
              { label: "Architecture", id: "architecture" },
              { label: "Outcomes", id: "outcomes" },
              { label: "Media Gallery", id: "gallery" },
              { label: "Repository Details", id: "repository" },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className={`font-sans text-sm font-semibold transition-all duration-200 ${
                  activeSection === section.id
                    ? "text-accent translate-x-1"
                    : "text-muted hover:text-foreground"
                }`}
                data-cursor="pointer"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content Column */}
        <div className="lg:col-span-9 space-y-24">
          {/* Overview */}
          <section id="overview" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              Overview
            </h2>
            <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed font-normal">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tech.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs text-foreground bg-borderLine/20 border border-borderLine/30 px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* The Problem */}
          <section id="problem" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              The Challenge
            </h2>
            <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed font-normal">
              {project.problem}
            </p>
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              Architecture & Strategy
            </h2>
            <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed font-normal">
              {project.architecture}
            </p>
          </section>

          {/* Outcomes */}
          <section id="outcomes" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              Outcomes & Metrics
            </h2>
            <ul className="space-y-4 pl-4 border-l-2 border-accent">
              {project.outcomes.map((bullet, idx) => (
                <li
                  key={idx}
                  className="font-sans text-base text-foreground/80 leading-relaxed font-normal flex items-start"
                >
                  <span className="text-accent font-bold mr-3 mt-0.5 select-none">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Media Gallery */}
          <section id="gallery" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              Project Gallery
            </h2>
            
            {/* Masonry-Style Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[250px] relative rounded-xl overflow-hidden bg-borderLine/20 border border-borderLine/30 cursor-zoom-in"
                   onClick={() => setLightboxImg(galleryImages[0])}
                   data-cursor="pointer">
                <Image
                  src={galleryImages[0]}
                  alt="Gallery View 1"
                  fill
                  className="object-contain p-4 bg-white hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="h-[250px] relative rounded-xl overflow-hidden bg-borderLine/20 border border-borderLine/30 cursor-zoom-in"
                   onClick={() => setLightboxImg(galleryImages[1])}
                   data-cursor="pointer">
                <Image
                  src={galleryImages[1]}
                  alt="Gallery View 2"
                  fill
                  className="object-contain p-4 bg-white hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="col-span-1 md:col-span-2 h-[350px] relative rounded-xl overflow-hidden bg-borderLine/20 border border-borderLine/30 cursor-zoom-in"
                   onClick={() => setLightboxImg(galleryImages[2])}
                   data-cursor="pointer">
                <Image
                  src={galleryImages[2]}
                  alt="Gallery View 3"
                  fill
                  className="object-contain p-4 md:p-6 bg-white hover:scale-102 transition-transform duration-300"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* GitHub Repository Details */}
          <section id="repository" className="scroll-mt-32">
            <h2 className="font-display text-3xl font-bold border-b border-borderLine/25 pb-4 mb-6">
              Repository Details
            </h2>
            
            {/* GitHub Card Wrapper */}
            <div className="w-full bg-white/20 dark:bg-white/5 border border-borderLine/30 rounded-xl overflow-hidden shadow-sm">
              {/* Header bar */}
              <div className="bg-[#0F0F0E] dark:bg-black text-[#F7F5F0] px-4 py-3 flex items-center justify-between font-sans text-xs">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono hover:underline font-bold"
                    data-cursor="pointer"
                  >
                    {project.githubUrl.replace("https://github.com/", "")}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-[#F7F5F0]/65 font-mono text-[10px]">
                  <span>⭐️ 14</span>
                  <span>🍴 3</span>
                </div>
              </div>
              
              {/* File Info Bar */}
              <div className="px-4 py-2 border-b border-borderLine/30 bg-white/30 dark:bg-white/5 flex justify-between text-[10px] font-mono text-muted">
                <span>Branch: <strong className="text-foreground">main</strong></span>
                <span>Latest update: June 2026</span>
              </div>
              
              {/* README File Header */}
              <div className="px-5 py-4 border-b border-borderLine/30 bg-white/50 dark:bg-white/5 flex items-center space-x-2 text-xs font-bold text-foreground">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <span>README.md</span>
              </div>
              
              {/* Rendered README content container */}
              <div className="p-6 bg-white/80 dark:bg-[#121211] text-foreground font-sans prose prose-neutral max-w-none text-sm leading-relaxed overflow-x-auto">
                {project.readmeContent.split("\n").map((line, lidx) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h3 key={lidx} className="font-display text-2xl font-bold text-foreground mt-4 mb-3 border-b border-borderLine/20 pb-2">
                        {line.replace("# ", "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h4 key={lidx} className="font-display text-lg font-bold text-foreground mt-5 mb-2">
                        {line.replace("## ", "")}
                      </h4>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <li key={lidx} className="ml-4 list-disc text-foreground/80 my-1">
                        {line.replace("- ", "")}
                      </li>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h5 key={lidx} className="font-mono text-[10px] font-bold text-accent mt-4 mb-1 uppercase tracking-wider">
                        {line.replace("### ", "")}
                      </h5>
                    );
                  }
                  if (line.startsWith("```")) {
                    return null;
                  }
                  if (
                    line.trim().startsWith("git clone") ||
                    line.trim().startsWith("cd") ||
                    line.trim().startsWith("pnpm") ||
                    line.trim().startsWith("npm") ||
                    line.trim().startsWith("pip") ||
                    line.trim().startsWith("uvicorn") ||
                    line.trim().startsWith("npx") ||
                    line.trim().startsWith("GEMINI_API_KEY")
                  ) {
                    return (
                      <pre key={lidx} className="bg-[#0F0F0E] text-[#10B981] font-mono text-xs p-3 rounded-lg my-2 overflow-x-auto leading-normal">
                        <code>{line}</code>
                      </pre>
                    );
                  }
                  if (line.trim() === "") {
                    return <div key={lidx} className="h-2" />;
                  }
                  return (
                    <p key={lidx} className="text-foreground/85 my-2">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 5. Next Project Teaser Block */}
      <div className="w-full bg-[#0F0F0E] py-20 px-6 md:px-12 flex flex-col items-center justify-center relative text-center">
        {/* Subtle background noise texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 opacity=%220.025%22/%3E%3C/svg%3E')]" />
        
        <p className="font-mono text-xs font-bold text-[#F7F5F0]/40 tracking-widest uppercase mb-4 z-10">
          Up Next
        </p>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group relative z-10 block cursor-none"
          data-cursor="view"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F7F5F0] hover:text-[#4F46E5] transition-colors duration-300 pb-2">
            {nextProject.title}
          </h2>
          <p className="font-sans text-xs text-[#F7F5F0]/60 mt-4 group-hover:translate-x-1.5 transition-transform inline-flex items-center space-x-2">
            <span>View Case Study</span>
            <span>→</span>
          </p>
        </Link>
      </div>

      {/* Custom Lightbox Portal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 bg-[#0F0F0E]/95 z-[999999] flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-[#F7F5F0]/50 hover:text-[#F7F5F0] font-mono text-xs tracking-wider"
              onClick={() => setLightboxImg(null)}
              data-cursor="pointer"
            >
              [ CLOSE / ESC ]
            </button>
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              <Image
                src={lightboxImg}
                alt="Enlarged Case Study View"
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic structured markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
    </div>
  );
}
