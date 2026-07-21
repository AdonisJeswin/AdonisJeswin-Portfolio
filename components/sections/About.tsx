"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Skill {
  name: string;
  context: string;
}

const skillsList: Skill[] = [
  { name: "Python", context: "Authored microservices threat models and machine learning pipelines" },
  { name: "TypeScript", context: "Built strict frontend layout flows and dynamic components" },
  { name: "Solidity", context: "Designed gas-optimized smart contracts for Web3 patient consent" },
  { name: "React / Next.js", context: "Formulated client views, custom hooks, and dashboard layouts" },
  { name: "Node.js / Express", context: "Orchestrated backend pipelines and API authentication" },
  { name: "FastAPI / Flask", context: "Configured API gateways to aggregate AI consensus models" },
  { name: "Cybersecurity", context: "Trained in ethical hacking, vulnerability scanning, and threat reduction" },
  { name: "Machine Learning", context: "Applied PyTorch, XGBoost, and SHAP explainability variables" },
  { name: "Docker", context: "Containerized multi-model AI inference runtimes and servers" },
  { name: "AWS", context: "Deployed cloud data pipelines and server resources in internship" },
  { name: "MetaMask", context: "Integrated dApp wallet connection triggers for identity verification" },
  { name: "IPFS / Pinata", context: "Persisted encrypted electronic health database records" },
];

export default function About() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Close tooltips if clicked outside the constellation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveSkill(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-borderLine/30"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Premium styled Profile Picture and Status */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-6">
          {/* Profile Image Container */}
          <div className="group relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-borderLine/30 p-2 bg-white/10 dark:bg-white/5 shadow-md transition-all duration-300 hover:scale-[1.02]">
            {/* Background glowing gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* The Image inside styled frame */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-background">
              <Image
                src="/profile.png"
                alt="Adonis Jeswin profile picture"
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Status Indicator directly under photo */}
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-foreground">
            <span className="flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span>Available for internships</span>
            </span>
          </div>
        </div>

        {/* Right Column: Bio text & interactive constellation */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Section Index Indicator */}
          <p className="font-mono text-xs font-bold text-accent tracking-widest uppercase mb-4">
            02 / Profile
          </p>

          {/* H2 Title */}
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
            The Person Behind the Pixels
          </h2>

          {/* First Person Bio Paragraph */}
          <p className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed font-normal mb-8 max-w-xl">
            I am a Computer Science & Engineering student specializing in Cybersecurity, Artificial Intelligence, and cloud architectures. I build secure decentralized systems, design ML-powered threat models with SHAP explainability, and configure resilient API endpoints. I strive to make software that is performant, cryptographically sound, and highly intuitive.
          </p>

          {/* Status details for location and email */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 font-mono text-xs font-bold text-muted">
            <span className="flex items-center space-x-2 bg-white/20 border border-borderLine/20 px-3.5 py-1.5 rounded-full">
              <span>📍</span>
              <span className="text-foreground">Mumbai, India</span>
            </span>
            <a
              href="mailto:adonisjeswin01@gmail.com"
              className="flex items-center space-x-2 bg-white/20 border border-borderLine/20 px-3.5 py-1.5 rounded-full hover:text-accent hover:border-accent/40 transition-all"
              data-cursor="pointer"
            >
              <span>✉</span>
              <span className="text-foreground hover:text-accent">adonisjeswin01@gmail.com</span>
            </a>
          </div>

          {/* Skills Constellation Wrapper */}
          <div className="w-full">
            <p className="font-mono text-[10px] font-bold text-muted uppercase tracking-widest mb-6 text-center lg:text-left">
              Interactive Skills Constellation (Click to expand)
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 max-w-xl">
              {skillsList.map((skill) => {
                const isActive = activeSkill === skill.name;
                return (
                  <div key={skill.name} className="relative">
                    <motion.button
                      onClick={() => setActiveSkill(isActive ? null : skill.name)}
                      className={`px-4 py-2 rounded-full border text-xs md:text-sm font-sans font-semibold transition-all duration-200 ${
                        isActive
                          ? "border-accent bg-accent-light text-accent shadow-sm"
                          : "border-borderLine/30 bg-white/20 text-foreground hover:border-foreground/40"
                      }`}
                      whileTap={{ scale: 0.97 }}
                      data-cursor="pointer"
                    >
                      {skill.name}
                    </motion.button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, x: "-50%" }}
                          animate={{ opacity: 1, y: 0, x: "-50%" }}
                          exit={{ opacity: 0, y: 8, x: "-50%" }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute bottom-full left-1/2 mb-3 bg-[#0F0F0E] text-[#F7F5F0] text-xs font-mono py-2 px-4 rounded-lg shadow-lg whitespace-nowrap z-30"
                        >
                          {skill.context}
                          {/* Tooltip caret pointing downwards */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0F0F0E]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
