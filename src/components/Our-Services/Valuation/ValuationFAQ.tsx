// components/Valuation/ValuationFAQ.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const valuationFaqs = [
  {
    question: "How long does a property valuation take?",
    answer: "Typically, a standard property valuation takes 24-48 hours. For complex commercial properties, it may take 3-5 days."
  },
  {
    question: "What documents are needed for valuation?",
    answer: "Key documents include: property title deed, tax receipts, building plan approval, occupancy certificate, and recent sale deeds of nearby properties."
  },
  {
    question: "Is your valuation accepted by banks for home loans?",
    answer: "Yes, our valuation reports are accepted by all major banks and financial institutions for home loan processing."
  },
  {
    question: "How much does property valuation cost?",
    answer: "We offer free preliminary valuation estimates. For detailed certified valuation reports, fees start from ₹2,500 depending on property size and type."
  },
  {
    question: "Do you offer valuation for commercial properties?",
    answer: "Yes, we provide valuation services for all property types including residential, commercial, industrial, and agricultural land."
  },
  {
    question: "What factors affect property valuation?",
    answer: "Key factors include location, property size, age, condition, nearby amenities, infrastructure development, market trends, and recent comparable sales."
  }
];

export default function ValuationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="space-y-4">
          {valuationFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#eeede9] rounded-xl overflow-hidden hover:bg-purple-50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 xs:px-6 py-4 text-left flex items-center justify-between gap-4"
              >
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 pr-2">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-purple-600" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 xs:px-6 pb-4 pt-0">
                      <p className="text-gray-600 text-sm xs:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}