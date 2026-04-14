"use client";

import { motion } from "framer-motion";

export default function PropertySpotlight() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — image */}
            <motion.div
              variants={itemVariants}
              className="relative min-h-[320px] lg:min-h-[500px] overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"
                alt="The Obsidian Pavilion"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-5 left-5"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-white text-gray-800 px-3 py-1.5 rounded-sm shadow-sm">
                  Property of the Month
                </span>
              </motion.div>
            </motion.div>

            {/* Right — details */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center px-8 md:px-12 py-10 lg:py-14"
            >
              <motion.h2
                variants={itemVariants}
                className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-5 leading-tight"
              >
                The Obsidian Pavilion
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-sm md:text-base text-gray-500 leading-relaxed mb-8 max-w-sm"
              >
                A masterclass in desert brutalism, this 12,000 sq ft masterpiece by Foster &amp; Partners integrates
                seamlessly with the surrounding red rock canyons of Arizona.
              </motion.p>

              {/* Stats grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10"
              >
                {[
                  { label: "Price", value: "$14,500,000" },
                  { label: "Architecture", value: "Foster + Partners" },
                  { label: "Bedrooms", value: "6 Suites" },
                  { label: "Plot", value: "4.2 Acres" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="font-serif text-xl font-semibold text-gray-900">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0f1c2e] hover:bg-[#1a2f4f] text-white text-sm font-medium px-8 py-3.5 rounded-xl transition-colors duration-200 w-full sm:w-auto"
                >
                  View Full Dossier
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}