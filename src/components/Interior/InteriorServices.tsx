// components/Interior/InteriorServices.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layout, 
  Sofa, 
  Lightbulb, 
  Paintbrush, 
  Home, 
  Palette,
  Ruler,
  Trees
} from "lucide-react";

const interiorServices = [
  {
    icon: Layout,
    title: "Space Planning",
    description: "Optimize your space with intelligent layout design",
    features: ["Floor plan design", "Furniture arrangement", "Traffic flow analysis", "Zoning solutions"]
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture pieces that match your style",
    features: ["Custom furniture", "Brand partnerships", "Quality assurance", "Budget optimization"]
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Create ambiance with strategic lighting solutions",
    features: ["Ambient lighting", "Task lighting", "Accent lighting", "Smart controls"]
  },
  {
    icon: Paintbrush,
    title: "Color Consultation",
    description: "Expert color schemes that transform spaces",
    features: ["Color psychology", "Palette creation", "Finish selection", "Accent walls"]
  },
  {
    icon: Home,
    title: "Home Staging",
    description: "Make your property irresistible to buyers",
    features: ["Property staging", "Virtual staging", "Accessory rental", "Photo-ready setup"]
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Bespoke designs tailored to your preferences",
    features: ["3D visualization", "Material selection", "Custom millwork", "Unique details"]
  },
  {
    icon: Ruler,
    title: "Modular Solutions",
    description: "Smart modular designs for modern living",
    features: ["Modular kitchens", "Wardrobes", "Storage solutions", "Space optimization"]
  },
  {
    icon: Trees,
    title: "Biophilic Design",
    description: "Bring nature indoors for wellness",
    features: ["Living walls", "Indoor plants", "Natural materials", "Daylight optimization"]
  }
];

export default function InteriorServices() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#eeede9]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            Comprehensive interior design solutions for every space
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {interiorServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 xs:p-7 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="bg-purple-50 w-14 h-14 rounded-full flex items-center justify-center mb-5 group-hover:bg-purple-600 transition-colors">
                  <Icon className="text-purple-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}