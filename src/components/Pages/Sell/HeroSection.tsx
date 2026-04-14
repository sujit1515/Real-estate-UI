// components/Sell/HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function SellHeroSection() {
  // Animation variants with proper typing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with animation */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80')`,
        }}
      />
      
      {/* Overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
      />
      
      {/* Content container with staggered animations */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 text-center px-4"
      >
        <motion.span
          variants={itemVariants}
          className="inline-block text-purple-400 text-sm font-semibold tracking-wider mb-4"
        >
          SELL WITH CONFIDENCE
        </motion.span>
        
        <motion.h1
          variants={itemVariants}
          className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4"
        >
          Maximize Your<br />Property's Value
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="text-white/80 text-base md:text-lg max-w-2xl mx-auto"
        >
          Get expert guidance and premium marketing to sell your property at the best possible price
        </motion.p>
      </motion.div>
    </motion.section>
  );
}