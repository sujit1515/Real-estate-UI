// components/Interior/InteriorStyles.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const designStyles = [
  {
    name: "Modern Minimalist",
    description: "Clean lines, neutral colors, and functional spaces",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    features: ["Neutral palette", "Open spaces", "Functional furniture", "Natural light"]
  },
  {
    name: "Contemporary",
    description: "Current trends with sophisticated elegance",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    features: ["Bold accents", "Mixed textures", "Statement pieces", "Art integration"]
  },
  {
    name: "Traditional Classic",
    description: "Timeless elegance with rich details",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
    features: ["Wood details", "Rich fabrics", "Symmetrical layouts", "Ornate furniture"]
  },
  {
    name: "Scandinavian",
    description: "Simple, functional, and cozy Nordic design",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    features: ["Light woods", "White walls", "Cozy textiles", "Natural elements"]
  },
  {
    name: "Industrial",
    description: "Raw materials and urban edge",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    features: ["Exposed brick", "Metal accents", "Concrete floors", "Open ceilings"]
  },
  {
    name: "Bohemian",
    description: "Eclectic, colorful, and artistic",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    features: ["Mixed patterns", "Global textiles", "Indoor plants", "Vintage pieces"]
  }
];

export default function InteriorStyles() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            Design Styles
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-3 sm:mb-4">
            Find Your <span className="text-purple-600">Style</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Explore our diverse range of interior design styles
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {designStyles.map((style, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={style.image} 
                    alt={style.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{style.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{style.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {style.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}