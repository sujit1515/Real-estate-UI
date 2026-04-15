// components/Renovation/RenovationServices.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Bath, 
  UtensilsCrossed,  // Instead of Kitchen
  Paintbrush, 
  Wrench, 
  Layers, 
  TreePine,  // Instead of Trees
  Zap 
} from "lucide-react";

const renovationServices = [
  {
    icon: Home,
    title: "Full Home Renovation",
    description: "Complete transformation of your entire home from foundation to finishing touches.",
    features: ["Structural changes", "Electrical & plumbing", "Flooring & painting", "Smart home integration"]
  },
  {
    icon: UtensilsCrossed,  // Changed from Kitchen
    title: "Kitchen Remodeling",
    description: "Modern, functional kitchens designed for both style and practicality.",
    features: ["Modular kitchens", "Quartz/granite countertops", "Premium appliances", "Custom cabinetry"]
  },
  {
    icon: Bath,
    title: "Bathroom Renovation",
    description: "Luxurious spa-like bathrooms with premium fixtures and finishes.",
    features: ["Walk-in showers", "Jacuzzi tubs", "Vanity units", "Premium tiles"]
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Complete interior makeover with contemporary design concepts.",
    features: ["Space planning", "Furniture selection", "Color consultation", "Decor styling"]
  },
  {
    icon: Layers,
    title: "Flooring Solutions",
    description: "High-quality flooring options for every room and budget.",
    features: ["Hardwood flooring", "Marble & tiles", "Vinyl & laminate", "Carpet installation"]
  },
  {
    icon: Zap,
    title: "Electrical & Plumbing",
    description: "Professional electrical and plumbing services with modern solutions.",
    features: ["Wiring upgrade", "LED lighting", "Pipe replacement", "Water heater installation"]
  },
  {
    icon: Wrench,
    title: "Structural Repairs",
    description: "Expert structural repairs and reinforcement services.",
    features: ["Wall demolition", "Crack repair", "Foundation work", "Roof repairs"]
  },
  {
    icon: TreePine,  // Changed from Trees
    title: "Exterior Makeover",
    description: "Transform your home's curb appeal with expert exterior services.",
    features: ["Paint & siding", "Landscaping", "Deck & patio", "Driveway paving"]
  }
];

export default function RenovationServices() {
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
            Our Services
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-3 sm:mb-4">
            What We <span className="text-purple-600">Offer</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Comprehensive renovation solutions tailored to your needs and budget
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {renovationServices.map((service, index) => {
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