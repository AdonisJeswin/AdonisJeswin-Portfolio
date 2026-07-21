"use client";

import { projects } from "@/lib/projects";
import TiltCard from "../ui/TiltCard";

export default function Work() {
  // Map index-based orb color presets to match each project's theme
  const orbColors = [
    "#4F46E5", // Axiom Dashboard: Deep Electric Indigo
    "#6366F1", // Nexus Agent: Soft Violet
    "#10B981", // Pulse Mobile: Emerald Green
    "#818CF8", // GuardianAG: Light Indigo
  ];

  return (
    <section
      id="work"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-borderLine/30"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-borderLine/30 pb-6 mb-16">
        <div>
          <p className="font-mono text-xs font-bold text-accent tracking-widest uppercase mb-3">
            01 / Case Studies
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Selected Work
          </h2>
        </div>
        <div className="mt-4 md:mt-0 md:text-right">
          <span className="font-mono text-base md:text-lg font-bold text-muted select-none">
            2025—2026
          </span>
        </div>
      </div>

      {/* Asymmetric 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-8 items-start">
        {/* Project 1: Axiom Dashboard (spans col 1-7, Aspect Ratio 3:4) */}
        <div className="lg:col-span-7 h-[500px] md:h-[600px] w-full">
          <TiltCard
            slug={projects[0].slug}
            title={projects[0].title}
            category={projects[0].category}
            year={projects[0].year}
            summary={projects[0].summary}
            tags={projects[0].tags}
            orbColor={orbColors[0]}
            className="aspect-[3/4]"
          />
        </div>

        {/* Project 2: Nexus Agent (spans col 8-12, Aspect Ratio 16:9, Offset top by 80px) */}
        <div className="lg:col-span-5 h-[350px] md:h-[420px] w-full lg:translate-y-20">
          <TiltCard
            slug={projects[1].slug}
            title={projects[1].title}
            category={projects[1].category}
            year={projects[1].year}
            summary={projects[1].summary}
            tags={projects[1].tags}
            orbColor={orbColors[1]}
            className="aspect-[16/9]"
          />
        </div>

        {/* Spacer to push Project 3 down, compensating for the Project 2 translation offset */}
        <div className="hidden lg:block lg:col-span-12 h-20" />

        {/* Project 3: Pulse Mobile (spans col 2-8, Centered normal layout, Aspect Ratio 16:10) */}
        <div className="lg:col-start-2 lg:col-span-7 h-[420px] md:h-[480px] w-full">
          <TiltCard
            slug={projects[2].slug}
            title={projects[2].title}
            category={projects[2].category}
            year={projects[2].year}
            summary={projects[2].summary}
            tags={projects[2].tags}
            orbColor={orbColors[2]}
            className="aspect-[16/10]"
          />
        </div>

        {/* Project 4: GuardianAG (spans col 9-12, Aspect Ratio 16:9, Offset top by -60px) */}
        <div className="lg:col-span-4 lg:col-start-9 h-[320px] md:h-[380px] w-full lg:translate-y-[-60px]">
          <TiltCard
            slug={projects[3].slug}
            title={projects[3].title}
            category={projects[3].category}
            year={projects[3].year}
            summary={projects[3].summary}
            tags={projects[3].tags}
            orbColor={orbColors[3]}
            className="aspect-[16/9]"
          />
        </div>
      </div>
    </section>
  );
}
