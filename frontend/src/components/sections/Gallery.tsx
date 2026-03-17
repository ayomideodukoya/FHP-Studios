"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800",
      alt: "Photography setup in studio",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1516280440502-18fec935a643?q=80&w=800",
      alt: "Content creation space",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800",
      alt: "Lighting equipment setup",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      src: "https://images.unsplash.com/photo-1520694478166-daaaaaec9596?q=80&w=800",
      alt: "Podcasting recording session",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800",
      alt: "Event space gathering",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
            Past Experiences
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display">
            A Glimpse Into <br />
            <span className="text-fhp-blue">The Studio</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden group ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
