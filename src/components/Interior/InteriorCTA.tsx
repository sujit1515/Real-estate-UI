// components/Interior/InteriorCTA.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InteriorCTA() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      router.push("/contact?service=interior-design");
    }
  };

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800 p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-purple-100 text-sm xs:text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Let's create a space you'll love. Schedule a free design consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                onClick={handleSubmit}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Quote
              </button>
            </div>
            <p className="text-purple-200 text-xs mt-4">
              Free consultation • 3D visualization • No obligation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}