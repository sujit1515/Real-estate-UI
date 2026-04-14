"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Design Pedigree",
    description:
      "Every listing is vetted for its design integrity, focusing on works by Pritzker-winning architects and visionary studios.",
  },
  {
    id: 2,
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Narrative Curation",
    description:
      "We don't just list features; we tell the story of the space, the light, and the materials that define each residence.",
  },
];

export default function PhilosophySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#eeede8] py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left — quote text */}
          <motion.div variants={itemVariants}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6"
            >
              Architecture is not just building. It is the framing of life.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md"
            >
              At The Curator, we believe that a home is an extension of one's identity. We specialize exclusively in
              properties that demonstrate exceptional architectural intent, historical significance, or transformative design.
            </motion.p>
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-6"
          >
            {features.map((f, index) => (
              <motion.div
                key={f.id}
                variants={featureVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-5"
              >
                {/* Icon box */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="shrink-0 w-12 h-12 rounded-xl bg-[#e6e4de] flex items-center justify-center"
                >
                  {f.icon}
                </motion.div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}