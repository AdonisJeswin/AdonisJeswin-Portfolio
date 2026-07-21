"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view">("default");
  
  // Motion values for smooth cursor trailing
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring physics for the outer ring trailing
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Morph to "VIEW →" pill over project cards or elements with data-cursor="view"
      if (target.closest('[data-cursor="view"]')) {
        setCursorType("view");
      }
      // Expand on buttons, links, or inputs
      else if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Leading Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType === "view" ? 0 : cursorType === "pointer" ? 1.5 : 1,
          opacity: cursorType === "view" ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* 2. Trailing Outer Ring / VIEW Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[10px] font-bold tracking-wider"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: cursorType === "view" ? 80 : cursorType === "pointer" ? 40 : 24,
          height: cursorType === "view" ? 80 : cursorType === "pointer" ? 40 : 24,
          backgroundColor: cursorType === "view" ? "#4F46E5" : "transparent",
          borderColor: cursorType === "view" ? "#4F46E5" : "#0F0F0E",
          borderWidth: cursorType === "view" ? 0 : 1,
          color: cursorType === "view" ? "#F7F5F0" : "transparent",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <span className="select-none pointer-events-none whitespace-nowrap">
          {cursorType === "view" ? "VIEW →" : ""}
        </span>
      </motion.div>
    </>
  );
}
