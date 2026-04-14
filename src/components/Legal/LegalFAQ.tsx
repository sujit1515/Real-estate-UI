// components/Legal/LegalFAQ.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const legalFaqs = [
  {
    question: "Why is title verification important?",
    answer: "Title verification ensures that the seller has clear ownership rights to the property. It helps identify any legal disputes, encumbrances, or claims on the property before purchase."
  },
  {
    question: "What documents are needed for property registration?",
    answer: "Key documents include: Sale deed, title deed, encumbrance certificate, tax receipts, approved building plan, occupancy certificate, and identity proofs of both parties."
  },
  {
    question: "What is the difference between sale deed and agreement to sell?",
    answer: "An agreement to sell is a promise to transfer ownership in the future, while a sale deed is the actual transfer of ownership. The sale deed is executed after all conditions in the agreement are met."
  },
  {
    question: "How long does property registration take?",
    answer: "Property registration typically takes 15-30 days, depending on document verification, stamp duty payment, and sub-registrar appointment availability."
  },
  {
    question: "What is RERA and why is it important?",
    answer: "RERA (Real Estate Regulatory Authority) protects home buyers' interests. It ensures timely project completion, standardizes agreements, and provides a dispute resolution mechanism."
  },
  {
    question: "What are the taxes involved in property purchase?",
    answer: "Main taxes include: Stamp duty (5-7%), registration charges (1-2%), GST (1% for under-construction properties), and TDS (1% on properties above ₹50 lakhs)."
  },
  {
    question: "Can NRI buy property in India?",
    answer: "Yes, NRIs can buy residential and commercial properties in India. They need to follow FEMA guidelines, arrange payment through banking channels, and obtain a PAN card."
  },
  {
    question: "What is power of attorney in property dealings?",
    answer: "A Power of Attorney (POA) authorizes someone to act on your behalf in property transactions. It's useful for NRIs or those unable to be physically present."
  }
];

export default function LegalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#eeede9]">
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
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Common legal queries about property transactions
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="space-y-4">
          {legalFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 xs:px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-purple-50 transition-colors"
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