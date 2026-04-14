// components/Interior/InteriorProcess.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PenTool, Package, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consultation",
    description: "We discuss your vision, preferences, budget, and timeline"
  },
  {
    icon: PenTool,
    step: "02",
    title: "Concept Design",
    description: "Creating mood boards, layouts, and 3D visualizations"
  },
  {
    icon: Package,
    step: "03",
    title: "Execution",
    description: "Procurement, project management, and installation"
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Handover",
    description: "Final walkthrough and styling"
  }
];

export default function InteriorProcess() {
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
            Our <span className="text-purple-600">Process</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            A seamless journey from concept to completion
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent" />
                )}
                <div className="bg-white rounded-2xl p-6 xs:p-7 text-center relative z-10">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-purple-600" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}