"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. NEURAL NETWORK TRAINING SIMULATOR
// ==========================================
export function NeuralNetSimulator() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [epochs, setEpochs] = useState(100);
  const [neurons, setNeurons] = useState(5);
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentLoss, setCurrentLoss] = useState(0.85);
  const [accuracy, setAccuracy] = useState(50.0);
  const [signalKey, setSignalKey] = useState(0); // Triggers network signal travel anims

  // SHA-256 helper for the hash lab
  const runTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setCurrentEpoch(0);
    setCurrentLoss(0.85);
    setAccuracy(50.0);
    setSignalKey((prev) => prev + 1);

    const stepTime = 1200 / 20; // 20 steps over 1.2 seconds
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / 20;

      setCurrentEpoch(Math.round(progress * epochs));
      // Logarithmic loss reduction simulator
      setCurrentLoss(Number((0.85 * Math.exp(-progress * 2.5) + Math.random() * 0.02).toFixed(4)));
      // Sigmoid accuracy scale simulator
      setAccuracy(Number((100 / (1 + Math.exp(-progress * 4.5 + 0.5))).toFixed(1)));

      if (currentStep >= 20) {
        clearInterval(interval);
        setIsTraining(false);
        setCurrentEpoch(epochs);
        setCurrentLoss(0.042);
        setAccuracy(98.6);
      }
    }, stepTime);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-center">
        
        {/* Left Side: Neural Net SVG Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-white/20 border border-borderLine/20 rounded-2xl shadow-sm relative h-[360px] w-full overflow-hidden">
          <p className="absolute top-4 left-4 font-mono text-[9px] font-bold text-muted uppercase tracking-widest">
            Model Topology View
          </p>
          
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[280px]">
            {/* Connection Lines with animated dash offset when training */}
            <g stroke="var(--border)" strokeWidth="1" opacity="0.4">
              {/* Inputs to Hidden */}
              {[60, 120, 180].map((inputY) =>
                Array.from({ length: neurons }).map((_, nidx) => {
                  const destY = 120 + (nidx - (neurons - 1) / 2) * (200 / Math.max(neurons - 1, 1));
                  return (
                    <line
                      key={`in-h-${inputY}-${nidx}`}
                      x1="60"
                      y1={inputY}
                      x2="200"
                      y2={destY}
                      stroke={isTraining ? "var(--accent)" : "var(--border)"}
                      strokeDasharray="4 4"
                      className={isTraining ? "animate-dash" : ""}
                      style={{ animationDuration: "1s" }}
                    />
                  );
                })
              )}
              
              {/* Hidden to Output */}
              {Array.from({ length: neurons }).map((_, nidx) => {
                const srcY = 120 + (nidx - (neurons - 1) / 2) * (200 / Math.max(neurons - 1, 1));
                return (
                  <line
                    key={`h-out-${nidx}`}
                    x1="200"
                    y1={srcY}
                    x2="340"
                    y2="120"
                    stroke={isTraining ? "var(--accent)" : "var(--border)"}
                    strokeDasharray="4 4"
                    className={isTraining ? "animate-dash" : ""}
                    style={{ animationDuration: "1s" }}
                  />
                );
              })}
            </g>

            {/* Input Layer Nodes (3 Nodes) */}
            <g fill="var(--foreground)" stroke="var(--background)" strokeWidth="2">
              <circle cx="60" cy="60" r="10" />
              <circle cx="60" cy="120" r="10" />
              <circle cx="60" cy="180" r="10" />
            </g>
            <text x="60" y="40" font-family="monospace" font-size="9" font-weight="bold" fill="var(--muted)" text-anchor="middle">INPUT</text>

            {/* Hidden Layer Nodes (Variable Neurons count) */}
            <g fill="var(--accent)" stroke="var(--background)" strokeWidth="2">
              {Array.from({ length: neurons }).map((_, idx) => {
                const nodeY = 120 + (idx - (neurons - 1) / 2) * (200 / Math.max(neurons - 1, 1));
                return <circle key={idx} cx="200" cy={nodeY} r="8" />;
              })}
            </g>
            <text x="200" y="40" font-family="monospace" font-size="9" font-weight="bold" fill="var(--muted)" text-anchor="middle">HIDDEN</text>

            {/* Output Node (1 Node) */}
            <g fill="var(--foreground)" stroke="var(--background)" strokeWidth="2">
              <circle cx="340" cy="120" r="12" />
            </g>
            <text x="340" y="40" font-family="monospace" font-size="9" font-weight="bold" fill="var(--muted)" text-anchor="middle">OUTPUT</text>
          </svg>

          <style jsx>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -20;
              }
            }
            .animate-dash {
              stroke-dasharray: 4 2;
              animation: dash linear infinite;
            }
          `}</style>
        </div>

        {/* Right Side: Control Settings & Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-center w-full">
          <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
            Neural Net Simulator
          </h3>
          <p className="font-sans text-sm text-muted mb-6 leading-relaxed">
            Tune training settings and visualize real-time epoch calculations and loss reductions.
          </p>

          <div className="space-y-4 mb-8">
            {/* Sliders Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">
                  Learning Rate
                </label>
                <select
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full bg-white/40 border border-borderLine/30 rounded px-2 py-1 text-xs font-mono focus:outline-none"
                  disabled={isTraining}
                >
                  <option value={0.5}>0.5 (Fast)</option>
                  <option value={0.1}>0.1 (Normal)</option>
                  <option value={0.01}>0.01 (Slow)</option>
                </select>
              </div>
              
              <div>
                <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">
                  Hidden Nodes
                </label>
                <select
                  value={neurons}
                  onChange={(e) => setNeurons(Number(e.target.value))}
                  className="w-full bg-white/40 border border-borderLine/30 rounded px-2 py-1 text-xs font-mono focus:outline-none"
                  disabled={isTraining}
                >
                  <option value={3}>3 Nodes</option>
                  <option value={5}>5 Nodes</option>
                  <option value={7}>7 Nodes</option>
                </select>
              </div>
            </div>

            {/* Epoch Slider */}
            <div>
              <div className="flex justify-between font-mono text-[9px] font-bold text-muted mb-1">
                <span>EPOCHS</span>
                <span>{epochs}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="50"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                className="w-full accent-accent bg-borderLine/30 h-1.5 rounded-lg appearance-none cursor-pointer"
                disabled={isTraining}
              />
            </div>
          </div>

          {/* Metrics Console Box */}
          <div className="bg-white/20 dark:bg-black/30 p-4 rounded-xl border border-borderLine/30 mb-6 font-mono text-xs text-left">
            <p className="text-muted text-[10px] uppercase font-bold mb-2">Metrics Stream</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="block text-muted text-[9px]">Epoch:</span>
                <span className="text-foreground text-sm font-semibold">{currentEpoch}</span>
              </div>
              <div>
                <span className="block text-muted text-[9px]">Loss:</span>
                <span className="text-red-600 dark:text-red-400 text-sm font-semibold">{currentLoss}</span>
              </div>
              <div>
                <span className="block text-muted text-[9px]">Accuracy:</span>
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold">{accuracy}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={runTraining}
            disabled={isTraining}
            className={`w-full font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-lg border transition-all ${
              isTraining
                ? "bg-accent-light border-accent text-accent cursor-wait"
                : "bg-[#0F0F0E] hover:bg-black text-[#F7F5F0] border-transparent"
            }`}
            data-cursor="pointer"
          >
            {isTraining ? "Training Model..." : "Train Model"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CRYPTOGRAPHY HASH LAB
// ==========================================
export function HashLab() {
  const [text, setText] = useState("AdonisJeswin");
  const [alg, setAlg] = useState<"sha256" | "base64" | "rot13">("sha256");
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Real SHA-256 implementation in vanilla JS
  const sha256 = (str: string): string => {
    const mathPow = Math.pow;
    const maxWord = 0xffffffff;
    const rxs = [2, 13, 22, 6, 11, 25, 7, 18, 3, 17, 19, 10];
    
    const h: number[] = [];
    const primeArr: number[] = [];
    let isPrime: { [key: number]: boolean } = {};
    let n = 2;
    while (primeArr.length < 64) {
      if (!isPrime[n]) {
        primeArr.push(n);
        h.push((mathPow(n, 1 / 2) * maxWord) | 0);
      }
      for (let i = 0; i < primeArr.length; i++) {
        isPrime[n * primeArr[i]] = true;
      }
      n++;
    }

    const k = primeArr.map((p) => (mathPow(p, 1 / 3) * maxWord) | 0);
    
    const words: number[] = [];
    const ascii = str + String.fromCharCode(0x80);
    const length = ascii.length;
    
    // Message padding
    const blocksCount = ((length + 8) >> 6) + 1;
    const finalLength = blocksCount << 4;
    
    for (let i = 0; i < finalLength; i++) {
      words[i] = 0;
    }
    for (let i = 0; i < length; i++) {
      words[i >> 2] |= ascii.charCodeAt(i) << (24 - (i & 3) * 8);
    }
    
    const bitLen = str.length * 8;
    words[finalLength - 1] = bitLen;
    
    // Hash computation
    for (let j = 0; j < finalLength; j += 16) {
      const w = words.slice(j, j + 16);
      const oldH = [...h];
      
      for (let i = 0; i < 64; i++) {
        if (i >= 16) {
          const w15 = w[i - 15];
          const s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
          const w2 = w[i - 2];
          const s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
          w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }
        
        const a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], _h = h[7];
        
        const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        const ch = (e & f) ^ (~e & g);
        const temp1 = (_h + S1 + ch + k[i] + w[i]) | 0;
        
        const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) | 0;
        
        h[7] = h[6]; h[6] = h[5]; h[5] = h[4];
        h[4] = (d + temp1) | 0;
        h[3] = h[2]; h[2] = h[1]; h[1] = h[0];
        h[0] = (temp1 + temp2) | 0;
      }
      
      for (let i = 0; i < 8; i++) {
        h[i] = (h[i] + oldH[i]) | 0;
      }
    }
    
    return h
      .map((val) => {
        const hex = (val >>> 0).toString(16);
        return "00000000".slice(hex.length) + hex;
      })
      .join("");
  };

  const rot13 = (str: string): string => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  useEffect(() => {
    if (alg === "sha256") {
      setResult(sha256(text));
    } else if (alg === "base64") {
      try {
        setResult(btoa(text));
      } catch (e) {
        setResult("Encoding error (supports ASCII only)");
      }
    } else if (alg === "rot13") {
      setResult(rot13(text));
    }
  }, [text, alg]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white/20 border border-borderLine/20 rounded-xl p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold mb-3 text-foreground">Hashing &amp; Crypto Lab</h3>
      
      <div className="space-y-4 flex-grow">
        {/* String input */}
        <div>
          <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">Raw Input String</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-white/40 border border-borderLine/30 rounded px-2.5 py-1.5 text-xs font-sans focus:outline-none"
            placeholder="Type value..."
          />
        </div>

        {/* Algorithm dropdown */}
        <div className="flex items-center justify-between">
          <label className="font-mono text-[9px] font-bold text-muted uppercase">Algorithm</label>
          <select
            value={alg}
            onChange={(e) => setAlg(e.target.value as any)}
            className="bg-white/40 border border-borderLine/30 rounded px-2 py-1 text-[11px] font-mono focus:outline-none cursor-pointer"
            data-cursor="pointer"
          >
            <option value="sha256">SHA-256 Hash</option>
            <option value="base64">Base64 Encode</option>
            <option value="rot13">ROT-13 Cipher</option>
          </select>
        </div>

        {/* Console output display */}
        <div className="bg-[#0f0f0e] p-3 rounded-lg border border-borderLine/20 text-left font-mono text-[10px] leading-normal break-all">
          <span className="block text-muted text-[8px] uppercase font-bold mb-1">Output Console</span>
          <span className="text-[#10B981] font-semibold">{result}</span>
        </div>
      </div>

      <button
        onClick={copyToClipboard}
        className="mt-4 w-full bg-[#0F0F0E] hover:bg-black text-[#F7F5F0] font-mono text-xs py-2.5 rounded-lg font-bold transition-colors"
        data-cursor="pointer"
      >
        {isCopied ? "Hash Copied!" : "Copy Hash"}
      </button>
    </div>
  );
}

// ==========================================
// 3. SECURITY REGEX LOG AUDITOR
// ==========================================
export function RegexAuditor() {
  const [pattern, setPattern] = useState("403");
  const [matchCount, setMatchCount] = useState(0);

  const mockLogs = [
    "192.168.1.15 - [2026-07-21] \"GET /index.html HTTP/1.1\" 200",
    "192.168.1.99 - [2026-07-21] \"POST /api/v1/auth/login HTTP/1.1\" 200",
    "10.0.0.12 - [2026-07-21] \"GET /admin/config HTTP/1.1\" 403",
    "192.168.1.205 - [2026-07-21] \"GET /wp-login.php HTTP/1.1\" 404",
    "10.0.0.12 - [2026-07-21] \"POST /admin/update HTTP/1.1\" 403"
  ];

  useEffect(() => {
    try {
      const regex = new RegExp(pattern, "i");
      const count = mockLogs.reduce((acc, log) => acc + (regex.test(log) ? 1 : 0), 0);
      setMatchCount(count);
    } catch (e) {
      setMatchCount(0);
    }
  }, [pattern]);

  return (
    <div className="flex flex-col h-full bg-white/20 border border-borderLine/20 rounded-xl p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold mb-3 text-foreground">Regex Log Auditor</h3>
      
      <div className="space-y-4 flex-grow">
        {/* Regex query */}
        <div>
          <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">Search Regular Expression</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full bg-white/40 border border-borderLine/30 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none"
            placeholder="e.g. 403 or admin"
          />
        </div>

        {/* Console stream */}
        <div className="bg-[#0f0f0e] p-3 rounded-lg border border-borderLine/20 text-left font-mono text-[9px] leading-relaxed max-h-[140px] overflow-y-auto no-scrollbar">
          <span className="block text-muted text-[8px] uppercase font-bold mb-1.5">Active Access Log Stream</span>
          {mockLogs.map((log, idx) => {
            let isMatched = false;
            try {
              isMatched = new RegExp(pattern, "i").test(log);
            } catch (e) {}

            return (
              <p
                key={idx}
                className={`py-0.5 border-b border-white/5 truncate ${
                  isMatched ? "text-red-400 font-bold bg-red-400/5 px-1" : "text-muted"
                }`}
              >
                {log}
              </p>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-muted border-t border-borderLine/10 pt-3">
        <span>Audited Events Flags:</span>
        <span className={matchCount > 0 ? "text-red-500" : "text-green-500"}>
          {matchCount} Detected
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 4. IP SUBNET RANGE CALCULATOR
// ==========================================
export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(24);
  const [netIp, setNetIp] = useState("192.168.1.0");
  const [mask, setMask] = useState("255.255.255.0");
  const [hosts, setHosts] = useState("254");

  useEffect(() => {
    // Basic IPv4 Subnet Calculator Math
    const ipParts = ip.split(".").map(Number);
    if (ipParts.length !== 4 || ipParts.some(isNaN) || ipParts.some(x => x < 0 || x > 255)) {
      return;
    }

    // Binary Subnet mask calculation
    let bits = 0xffffffff << (32 - cidr);
    const mParts = [
      (bits >>> 24) & 255,
      (bits >>> 16) & 255,
      (bits >>> 8) & 255,
      bits & 255
    ];
    setMask(mParts.join("."));

    // Network IP Address calculation
    const netParts = ipParts.map((part, idx) => part & mParts[idx]);
    setNetIp(netParts.join("."));

    // Usable hosts: 2^(32-cidr) - 2
    const totalHosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);
    setHosts(totalHosts.toLocaleString());
  }, [ip, cidr]);

  return (
    <div className="flex flex-col h-full bg-white/20 border border-borderLine/20 rounded-xl p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold mb-3 text-foreground">Subnet IP Calculator</h3>
      
      <div className="space-y-3 flex-grow">
        {/* IP Field */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">IPv4 Host Address</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-white/40 border border-borderLine/30 rounded px-2 py-1.5 text-xs font-mono focus:outline-none"
              placeholder="e.g. 192.168.1.1"
            />
          </div>
          <div>
            <label className="font-mono text-[9px] font-bold text-muted uppercase block mb-1">CIDR Slash</label>
            <select
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full bg-white/40 border border-borderLine/30 rounded px-2 py-1.5 text-xs font-mono focus:outline-none cursor-pointer"
              data-cursor="pointer"
            >
              {[8, 16, 24, 25, 26, 27, 28, 29, 30].map(c => (
                <option key={c} value={c}>/{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Info Table */}
        <div className="bg-white/20 dark:bg-black/30 p-3 rounded-lg border border-borderLine/20 text-left font-mono text-[10px] leading-relaxed text-muted space-y-1 mt-2">
          <div className="flex justify-between">
            <span>Subnet Mask:</span>
            <span className="text-foreground font-semibold">{mask}</span>
          </div>
          <div className="flex justify-between">
            <span>Network Address:</span>
            <span className="text-foreground font-semibold">{netIp}</span>
          </div>
          <div className="flex justify-between">
            <span>Usable Hosts:</span>
            <span className="text-accent font-semibold">{hosts} nodes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
