"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

const ProjectOrb = dynamic(() => import("../three/ProjectOrb"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-muted/30">
      Initializing 3D...
    </div>
  ),
});

interface TiltCardProps {
  slug: string;
  title: string;
  category: string;
  year: number;
  summary: string;
  tags: string[];
  orbColor?: string;
  className?: string;
}

export default function TiltCard({
  slug,
  title,
  category,
  year,
  summary,
  tags,
  orbColor = "#4F46E5",
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt angles
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card top-left
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;
    
    // Calculate rotation: max ±8 degrees
    rotateY.set(normalizedX * 16); // maps to range [-8, 8]
    rotateX.set(-normalizedY * 16); // maps to range [-8, 8]
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Link href={`/projects/${slug}`} className="block w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: springRotateX,
          rotateY: springRotateY,
          perspective: 1000,
        }}
        className={`relative w-full h-full rounded-2xl bg-white/20 border border-borderLine/30 overflow-hidden cursor-none shadow-md transition-shadow duration-300 hover:shadow-xl flex flex-col p-8 md:p-10 select-none ${className}`}
        data-cursor="view"
      >
        {/* Sub-surface grid lining details */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#0F0F0E_1px,transparent_1px),linear-gradient(to_bottom,#0F0F0E_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top: Card Header info (Visible initially) */}
        <div className="flex justify-between items-start z-10">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
              {category}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 text-foreground">
              {title}
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-foreground bg-borderLine/20 px-3 py-1 rounded-full">
            {year}
          </span>
        </div>

        {/* Middle: 3D Orb Visualizer Container */}
        <div className="flex-grow flex items-center justify-center relative w-full h-full min-h-[160px] my-6 z-0" style={{ transform: "translateZ(30px)" }}>
          <ProjectOrb color={orbColor} />
        </div>

        {/* Bottom: Card static description (Visible initially) */}
        <p className="font-sans text-sm text-muted mt-auto leading-relaxed z-10 max-w-sm">
          {summary}
        </p>

        {/* Full-size hover glassmorphic overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-20 pointer-events-none transition-all duration-300 ${
            isHovered 
              ? "opacity-100 backdrop-blur-md bg-white/[0.06] border-white/12" 
              : "opacity-0 backdrop-blur-none bg-transparent border-transparent"
          }`}
          style={{
            borderWidth: isHovered ? "1px" : "0px",
            borderStyle: "solid",
          }}
        >
          {/* Project tags list */}
          <div className="transform translate-y-3 opacity-0 animate-fade-up-custom transition-all duration-300">
            <h4 className="font-display text-3xl font-bold text-foreground leading-none">
              {title}
            </h4>
            <p className="font-sans text-xs text-accent mt-2 font-semibold">
              Explore Case Study & Workflow
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[9px] font-bold text-foreground border border-foreground/20 bg-background/50 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Embedded CSS for custom entry animation */}
      <style jsx global>{`
        @keyframes fadeUpCustom {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up-custom {
          animation: ${isHovered ? "fadeUpCustom 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none"};
        }
      `}</style>
    </Link>
  );
}
