"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(scrollY > 80);

      // Determine scroll direction
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      // Ignore very small scrolls (e.g. scroll bounce)
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return { scrollDirection, isScrolled };
}

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Sandbox", href: "#sandbox" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const { scrollDirection, isScrolled } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on clicking a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    
    if (pathname !== "/") {
      e.preventDefault();
      router.push("/" + href);
    } else {
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offset = 80; // height of the navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass border-b border-borderLine/30" 
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === "down" && !isMobileMenuOpen ? -80 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, "#top")}
            className="font-display text-2xl font-bold tracking-tight text-foreground select-none"
            data-cursor="pointer"
          >
            AJ
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8 border-r border-borderLine/30 pr-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-sm font-medium tracking-wide text-foreground/80 hover:text-accent transition-colors duration-250"
                  data-cursor="pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 font-mono text-xs font-semibold tracking-wider text-muted hover:text-accent transition-colors select-none"
              title="Toggle theme"
              data-cursor="pointer"
            >
              <span>{mounted && theme === "dark" ? "CARBON 🌙" : "LINEN ☀️"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 focus:outline-none"
            aria-label="Toggle Menu"
            data-cursor="pointer"
          >
            <motion.span 
              className="w-6 h-0.5 bg-foreground"
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-foreground"
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-foreground"
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-40 flex flex-col justify-center px-12 md:hidden"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Linen texture background inside overlay */}
            <div className="absolute inset-0 opacity-25 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 opacity=%220.025%22/%3E%3C/svg%3E')]" />

            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-display text-4xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200"
                    data-cursor="pointer"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              {/* Mobile Drawer Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4, ease: "easeOut" }}
                className="pt-6 border-t border-borderLine/30"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 font-mono text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
                  data-cursor="pointer"
                >
                  <span>Theme:</span>
                  <span className="text-foreground">{mounted && theme === "dark" ? "Carbon 🌙" : "Linen ☀️"}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
