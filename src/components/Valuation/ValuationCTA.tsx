// components/Valuation/ValuationCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function ValuationCTA() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#eeede9]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800 p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get Your Property Valued Today
            </h2>
            <p className="text-purple-100 text-sm xs:text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Our experts will provide you with an accurate market valuation within 24 hours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919348185822"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="mailto:luminohomes@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href="https://wa.me/919348185822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}