"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-fhp-blue">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
           src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000&auto=format&fit=crop"
           alt="Creative Studio Space"
           fill
           className="object-cover opacity-30 mix-blend-overlay"
           priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fhp-blue-dark/80 via-transparent to-fhp-blue"></div>
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-fhp-blue-dark uppercase bg-fhp-yellow rounded-full shadow-lg">
            A Hub For Creatives
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8 font-display"
        >
          CREATE. <br />
          <span className="text-fhp-yellow">CONNECT.</span> <br />
          CULTIVATE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-fhp-blue-light max-w-2xl mx-auto mb-10 font-light"
        >
          Plot 32 Oba Ogunji Road, Ogba, Lagos. The premier space for live storytelling, spoken word, and community gatherings.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="#events"
            className="px-8 py-4 bg-fhp-yellow text-fhp-blue-dark rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-xl"
          >
            Upcoming Events
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 bg-transparent border border-fhp-blue-light text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all"
          >
            Explore The Space
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="w-px h-16 bg-gradient-to-b from-fhp-yellow to-transparent"
        />
      </motion.div>
    </section>
  );
}
