"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fhp-blue-dark text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-bold text-3xl tracking-tighter text-white">
                FHP <span className="font-light text-fhp-yellow">Studios</span>
              </span>
            </Link>
            <p className="text-fhp-blue-light text-sm leading-relaxed max-w-sm font-light mb-8">
              A premier creative space and event venue built for connection, storytelling, and entrepreneurial growth. We don't just rent rooms; we curate experiences.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-fhp-yellow hover:text-fhp-blue-dark transition-all shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-fhp-yellow hover:text-fhp-blue-dark transition-all shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About the Space', 'Upcoming Events', 'Bookings', 'Contact Us'].map((link, idx) => (
                <li key={idx}>
                  <Link href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-fhp-blue-light hover:text-fhp-yellow transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-fhp-blue-light text-sm">
                <MapPin className="w-5 h-5 text-fhp-yellow shrink-0" />
                <span>Plot 32 Oba Ogunji Road, <br />Ogba, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-fhp-blue-light text-sm hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-fhp-yellow shrink-0" />
                <a href="mailto:hello@fhpstudios.com">hello@fhpstudios.com</a>
              </li>
              <li className="flex items-center gap-3 text-fhp-blue-light text-sm hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-fhp-yellow shrink-0" />
                <a href="tel:+2340000000000">+234 (0) 800 000 0000</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-fhp-blue-light text-xs font-medium">
            &copy; {currentYear} FHP Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-fhp-blue-light hover:text-white text-xs font-medium transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-fhp-blue-light hover:text-white text-xs font-medium transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
