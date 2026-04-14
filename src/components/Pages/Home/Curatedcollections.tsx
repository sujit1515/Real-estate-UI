"use client";

import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Waterfront Living",
    description: "The ultimate expression of coastal elegance.",
    cta: "View 14 Properties",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
    size: "large",
  },
  {
    id: 2,
    title: "Mountain Retreats",
    description: "Elevated escapes among ancient peaks.",
    cta: "Explore",
    image: null,
    darkBg: true,
    size: "small",
  },
  {
    id: 3,
    title: "Historic Manors",
    description: "Centuries of craftsmanship, yours to inherit.",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    size: "small",
  },
];

export default function CuratedCollections() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#f0efe9] py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10 md:mb-14"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-gray-900 max-w-sm leading-tight"
          >
            Curated Collections for the Discerning Eye
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-400 max-w-xs md:text-right leading-relaxed mt-2"
          >
            From the rugged heights of Alpine retreats to the serene rhythms of the Atlantic coast.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5"
        >
          {/* Large card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3 group relative rounded-2xl overflow-hidden cursor-pointer min-h-[400px] md:min-h-[520px]"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              src={collections[0].image!}
              alt={collections[0].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-0 left-0 p-7 md:p-8"
            >
              <h3 className="font-serif text-white text-2xl md:text-3xl font-bold mb-1.5">
                {collections[0].title}
              </h3>
              <p className="text-white/70 text-sm mb-4">{collections[0].description}</p>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-sm font-semibold text-white border-b border-amber-400 pb-0.5 hover:text-amber-300 transition-colors"
              >
                {collections[0].cta}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right column: two stacked small cards */}
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
            {/* Mountain Retreats — dark illustrated card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 min-h-[220px]"
              style={{ backgroundColor: "#1a3540" }}
            >
              {/* Animated Mountain illustration */}
              <motion.svg
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 220"
                preserveAspectRatio="xMidYMid slice"
              >
                <motion.polygon
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  points="200,30 280,130 120,130"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <motion.polygon
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  points="160,60 230,140 90,140"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
              </motion.svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 p-6"
              >
                <h3 className="font-serif text-white text-xl font-bold mb-1">Mountain Retreats</h3>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-xs font-semibold text-amber-300 border-b border-amber-400 pb-0.5 hover:text-amber-200 transition-colors"
                >
                  Explore
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Historic Manors — photo card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 min-h-[220px]"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
                src={collections[2].image!}
                alt={collections[2].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-0 left-0 p-6"
              >
                <h3 className="font-serif text-white text-xl font-bold mb-1">Historic Manors</h3>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-xs font-semibold text-amber-300 border-b border-amber-400 pb-0.5 hover:text-amber-200 transition-colors"
                >
                  Explore
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}