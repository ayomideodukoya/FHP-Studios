"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Lightbulb, Coffee, Mic } from "lucide-react";

export function AboutSpace() {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Live Storytelling",
      description: "Home to 'StoryTime With StoryTide'. Intimate settings perfect for connecting with an audience.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Gatherings",
      description: "From movie marathons to entrepreneurial panels, built for deep community connection.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Spoken Word Events",
      description: "Experience 'Thoroughly Equipped'. A stage designed to amplify every word.",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Creative Panels",
      description: "Flexible seating arrangements to accommodate networking, panels, and workshops.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column - Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2000&auto=format&fit=crop"
                alt="FHP Studios Event Space"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-fhp-blue/10 mix-blend-multiply rounded-2xl"></div>
            </motion.div>

            {/* Overlay element */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-10 bg-fhp-yellow p-8 rounded-xl shadow-xl max-w-xs"
            >
              <h3 className="text-fhp-blue-dark font-display font-bold text-3xl mb-2">Grow Here</h3>
              <p className="text-fhp-blue-dark/80 text-sm font-medium">
                A room built specifically for growth, creativity, and finding your tribe.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Text & Features */}
          <div className="lg:pl-8 pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue-light uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-fhp-blue-light inline-block"></span>
                The Space
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-fhp-blue-dark mb-6 font-display leading-tight">
                More Than Just A Room. It's An <span className="text-fhp-blue-light">Experience.</span>
              </h3>
              <p className="text-gray-600 text-lg mb-12 leading-relaxed font-light">
                FHP Studios is a premier creative space and event venue located in Ogba, Lagos.
                Whether you're hosting an immersive storytelling night, a spoken word event, or a relaxed movie marathon,
                our space adapts to bring your vision to life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-fhp-blue/5 flex items-center justify-center text-fhp-blue mb-4 group-hover:bg-fhp-blue group-hover:text-fhp-yellow transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
