"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// Lazy-load the R3F Canvas to improve core web vitals
const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-sm text-muted/40">
      Initializing 3D viewport...
    </div>
  ),
});

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Scale down and fade out the 3D canvas on scroll (completed by 50vh)
  const canvasScale = useTransform(scrollY, [0, 400], [1, 0.75]);
  const canvasOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Subtle parallax scroll for the text column
  const textY = useTransform(scrollY, [0, 600], [0, 100]);

  const handleExploreClick = () => {
    const workSection = document.querySelector("#work");
    if (workSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = workSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Split lines for kinetic reveal
  const line1 = "Engineering";
  const line2 = "Secure";
  const line3 = "Intelligent Systems";

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center bg-background px-6 md:px-12 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
        {/* Left Column: Kinetic Typography */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center z-10"
          style={{ y: textY }}
        >
          {/* H1 Heading with staggered letter reveal */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[1.05]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Line 1 */}
            <span className="block overflow-hidden pb-2">
              {line1.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Line 2 (Immersive) with SVG path underline draw */}
            <span className="block overflow-hidden pb-3">
              <span className="relative inline-block text-accent">
                {line2.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
                
                {/* SVG path draw */}
                <svg
                  className="absolute left-0 bottom-[-6px] md:bottom-[-10px] w-full h-[8px] md:h-[12px]"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M5 8C60 3.5 160 2.5 295 9"
                    stroke="#4F46E5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 0.65,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  />
                </svg>
              </span>
            </span>

            {/* Line 3 */}
            <span className="block overflow-hidden pb-2">
              {line3.split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block mr-4 whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      className="inline-block"
                      variants={letterVariants}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="font-sans text-lg md:text-xl text-muted max-w-lg mt-8 md:mt-10 font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Computer Science & Engineering Student — specializing in AI, Cloud & Cybersecurity.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <button
              onClick={handleExploreClick}
              className="group relative px-8 py-4 border border-accent rounded-full font-sans text-sm font-semibold tracking-wider text-accent uppercase overflow-hidden transition-all duration-300"
              data-cursor="pointer"
            >
              {/* Sliding background fill */}
              <span className="absolute inset-0 w-full h-full bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 flex items-center space-x-2 group-hover:text-background transition-colors duration-300">
                <span>Explore Work</span>
                <span className="transform group-hover:translate-y-1 transition-transform duration-300">↓</span>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Scene Viewport */}
        <motion.div
          className="lg:col-span-5 h-[250px] md:h-[350px] lg:h-[70dvh] w-full flex items-center justify-center"
          style={{
            scale: canvasScale,
            opacity: canvasOpacity,
          }}
          aria-hidden="true"
        >
          {/* Reserve height with a clean min-height container to prevent CLS layout shift */}
          <div className="w-full h-full min-h-[250px] relative">
            <HeroScene />
          </div>
        </motion.div>
      </div>

      {/* Screen Reader A11y Description */}
      <p className="sr-only">
        An interactive portfolio for Adonis, containing a wireframe low-poly rotating 3D geometry responsive to mouse movement.
      </p>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={handleExploreClick}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        data-cursor="pointer"
      >
        <span className="font-mono text-[9px] font-bold tracking-widest uppercase mb-2">Scroll</span>
        <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </motion.div>
    </section>
  );
}
