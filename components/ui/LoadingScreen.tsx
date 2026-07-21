"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Counter loop (1.2s duration)
  useEffect(() => {
    const duration = 1200;
    const steps = 100;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
          }, 200); // Small pause at 100 before wipe
          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Lock scrolling during loading
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showOverlay]);

  const formattedCount = String(count).padStart(3, "0");

  return (
    <AnimatePresence onExitComplete={() => setShowOverlay(false)}>
      {showOverlay && !isFinished && (
        <motion.div
          key="loader-panel"
          className="fixed inset-0 bg-[#0F0F0E] z-[99999] flex flex-col items-center justify-center select-none"
          exit={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          }}
        >
          {/* Centered counter */}
          <div className="flex flex-col items-center">
            <motion.h1 
              className="font-mono text-5xl md:text-7xl font-bold text-[#F7F5F0] tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formattedCount}
            </motion.h1>
            <motion.p
              className="font-mono text-xs md:text-sm text-[#F7F5F0]/40 tracking-widest mt-4 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              System Initializing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
