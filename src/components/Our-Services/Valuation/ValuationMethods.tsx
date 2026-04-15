// components/Valuation/ValuationMethods.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Building, DollarSign, BarChart } from "lucide-react";

const valuationMethods = [
  {
    icon: TrendingUp,
    title: "Comparative Method",
    description: "Based on recent sales of similar properties in the same area",
    features: ["Market comparables", "Recent transactions", "Location analysis", "Price trends"]
  },
  {
    icon: Building,
    title: "Cost Method",
    description: "Calculates land value plus construction cost minus depreciation",
    features: ["Land valuation", "Construction cost", "Depreciation", "Replacement value"]
  },
  {
    icon: DollarSign,
    title: "Income Method",
    description: "For rental properties based on potential rental income",
    features: ["Rental yield", "Occupancy rates", "Operating expenses", "ROI calculation"]
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "AI-powered valuation using multiple data points",
    features: ["Market trends", "Demographic data", "Infrastructure impact", "Future projections"]
  }
];

export default function ValuationMethods() {
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
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Valuation <span className="text-purple-600">Methods</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            We use industry-standard methods to ensure accurate property valuation
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {valuationMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#eeede9] rounded-2xl p-6 xs:p-7 text-center hover:bg-purple-50 transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-purple-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <ul className="text-left space-y-1">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
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