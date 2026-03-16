"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Space", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Bookings", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 relative">
            <div className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-fhp-blue">
               <Image src="/logo.jpg" alt="FHP Studio" fill className="object-cover" />
            </div>
            <span className={`font-bold text-2xl tracking-tighter ${isScrolled ? 'text-fhp-blue' : 'text-fhp-yellow-light'}`}>
              FHP <span className="font-light">Studios</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-fhp-yellow ${
                  isScrolled ? "text-fhp-blue" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg ${
                isScrolled
                  ? "bg-fhp-blue text-white hover:bg-fhp-blue-dark"
                  : "bg-fhp-yellow text-fhp-blue-dark hover:bg-white"
              }`}
            >
              Book Space
            </Link>
          </nav>

          <button
            className={`md:hidden p-2 rounded-md ${isScrolled ? 'text-fhp-blue' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-fhp-blue hover:text-fhp-blue-light hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-fhp-blue text-white rounded-md font-semibold"
                >
                  Book Space
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
