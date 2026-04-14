// components/Sell/ListingProcessSidebar.tsx
"use client";

import { motion } from "framer-motion";

interface Step {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Geospatial Data",
    desc: "Mapping your property against local market indices.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Structural Details",
    desc: "Defining the architectural footprint of your estate.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: "Visual Asset Suite",
    desc: "High-fidelity imagery for editorial presentation.",
  },
];

export default function ListingProcessSidebar() {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-24"
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold text-gray-900 mb-4"
        >
          The Listing Process
        </motion.h3>
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex items-start gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5"
              >
                {step.icon}
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-purple-50 rounded-xl p-4 mt-6"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mb-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </motion.div>
          <p className="text-sm font-bold text-gray-900 mb-1.5">Secure Valuation</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our valuation engine uses proprietary algorithms and verified neighborhood comps
            to ensure your asking price reflects true architectural value.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}