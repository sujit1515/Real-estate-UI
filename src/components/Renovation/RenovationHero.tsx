// components/Renovation/RenovationHero.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RenovationHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&q=80')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8">
        <motion.h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Your <span className="text-purple-400">Space</span>
        </motion.h1>
        <motion.p
          className="text-gray-200 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Professional renovation services to bring your dream home to life
        </motion.p>
      </div>
    </section>
  );
}