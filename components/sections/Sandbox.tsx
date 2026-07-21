"use client";

import {
  NeuralNetSimulator,
  HashLab,
  RegexAuditor,
  SubnetCalculator,
} from "../ui/SandboxWidget";

export default function Sandbox() {
  return (
    <section
      id="sandbox"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-borderLine/30"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-borderLine/30 pb-6 mb-16">
        <div>
          <p className="font-mono text-xs font-bold text-accent tracking-widest uppercase mb-3">
            03 / Sandbox
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Engineering Lab
          </h2>
        </div>
        <div className="mt-4 md:mt-0 md:text-right">
          <p className="font-mono text-xs text-muted max-w-xs leading-normal">
            Interactive utilities mapping network, cryptography, and artificial intelligence configurations.
          </p>
        </div>
      </div>

      {/* Main Feature: Neural Network simulator */}
      <div className="w-full mb-16">
        <NeuralNetSimulator />
      </div>

      {/* Micro-Widgets Grid: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Widget 1: Hashing & Crypto */}
        <HashLab />
        
        {/* Widget 2: Regex Log Scanner */}
        <RegexAuditor />
        
        {/* Widget 3: IP Subnet Calculator */}
        <SubnetCalculator />
      </div>
    </section>
  );
}
