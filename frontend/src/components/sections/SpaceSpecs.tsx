"use client";

import { motion } from "framer-motion";
import { Wifi, Video, Mic, Maximize, Shield, Coffee } from "lucide-react";

export function SpaceSpecs() {
  const specs = [
    { icon: <Maximize className="w-8 h-8" />, title: "Spacious", desc: "Adaptable 100sqm area" },
    { icon: <Wifi className="w-8 h-8" />, title: "High-Speed Internet", desc: "Reliable fiber connection" },
    { icon: <Video className="w-8 h-8" />, title: "Pro Equipment", desc: "Cameras & lighting available" },
    { icon: <Mic className="w-8 h-8" />, title: "Acoustic Treated", desc: "Perfect for podcasts & audio" },
    { icon: <Shield className="w-8 h-8" />, title: "Secure Access", desc: "24/7 security & smart locks" },
    { icon: <Coffee className="w-8 h-8" />, title: "Lounge Area", desc: "Comfortable seating & cafe" },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
            Space Specifications
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display">
            Everything You Need <br />
            <span className="text-fhp-blue">Under One Roof</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-fhp-blue/5 text-fhp-blue flex items-center justify-center mb-6 group-hover:bg-fhp-blue group-hover:text-white transition-colors duration-300">
                {spec.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{spec.title}</h4>
              <p className="text-sm text-gray-500">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
