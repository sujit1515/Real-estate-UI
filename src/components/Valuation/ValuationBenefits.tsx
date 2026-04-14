// components/Valuation/ValuationBenefits.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Clock, Users, Award, FileCheck } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Accurate Assessment",
    description: "Get precise market value based on comprehensive data analysis"
  },
  {
    icon: TrendingUp,
    title: "Better Pricing",
    description: "Price your property correctly to attract serious buyers"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Receive your valuation report within 24-48 hours"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified valuers with years of market experience"
  },
  {
    icon: Award,
    title: "Bank Approved",
    description: "Our valuation reports are accepted by major banks"
  },
  {
    icon: FileCheck,
    title: "Detailed Report",
    description: "Comprehensive report with market comparables and analysis"
  }
];

export default function ValuationBenefits() {
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
            Why Choose <span className="text-purple-600">Our Valuation</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 xs:p-7 text-center border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-purple-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}