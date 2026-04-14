// components/Sell/FreeValuationSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FreeValuationSection() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#eeede9] py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden px-8 md:px-16 py-12 md:py-16 bg-[#0f1c2e]"
        >
          {/* Animated SVG background */}
          <motion.svg
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              d="M0 150 Q300 50 600 150 T1200 150"
              stroke="#c9a84c"
              strokeWidth="1.5"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
              d="M0 190 Q300 90 600 190 T1200 190"
              stroke="#c9a84c"
              strokeWidth="1"
            />
          </motion.svg>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-lg"
            >
              <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold leading-tight mb-4">
                Get a Free Property Valuation
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Our experts will analyze your property and provide a comprehensive market analysis within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-auto lg:min-w-[420px]"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-6 py-4"
                >
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-5 h-5 text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  <span className="text-white text-sm font-medium">Thank you! We'll contact you shortly.</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-5 py-3 text-sm outline-none focus:border-amber-400/60 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="bg-[#e8c97a] hover:bg-[#f0d898] text-[#1a1000] font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
                  >
                    Get Valuation
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}