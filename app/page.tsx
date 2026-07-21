"use client";

import LoadingScreen from "@/components/ui/LoadingScreen";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Sandbox from "@/components/sections/Sandbox";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* 1. Loading Overlay */}
      <LoadingScreen />

      {/* 2. Page Sections */}
      <div className="w-full flex flex-col items-center">
        <Hero />
        <Work />
        <About />
        <Sandbox />
        <Contact />
      </div>
    </div>
  );
}
