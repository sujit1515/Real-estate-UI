"use client";

import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Modern Coastal Estates",
    description: "Minimalist architecture meets the untamed beauty of the Pacific shoreline.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    size: "large",
  },
  {
    id: 2,
    title: "Urban Penthouses",
    description: "Sky-high living in the heart of the world's most vibrant metropolises.",
    image: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=600&q=80",
    size: "small",
  },
];

export default function CollectionSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#f5f4f0] py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 md:mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block"
            >
              Curated Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mt-3 text-gray-900"
            >
              The Heritage Collection
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="#"
            className="text-sm font-medium text-gray-700 underline underline-offset-4 decoration-amber-600 hover:text-amber-700 transition-colors whitespace-nowrap"
          >
            View All Collections
          </motion.a>
        </motion.div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Large card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 group relative rounded-2xl overflow-hidden cursor-pointer"
          >
            <div className="aspect-[4/3] md:aspect-auto md:h-[480px] w-full overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
                src={collections[0].image}
                alt={collections[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-0 left-0 p-6 md:p-8"
            >
              <h3 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                {collections[0].title}
              </h3>
              <p className="text-white/75 text-sm md:text-base max-w-xs">
                {collections[0].description}
              </p>
            </motion.div>
          </motion.div>

          {/* Small card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer"
          >
            <div className="aspect-[4/3] md:aspect-auto md:h-[480px] w-full overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
                src={collections[1].image}
                alt={collections[1].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 left-0 p-6 md:p-8"
            >
              <h3 className="font-serif text-white text-xl md:text-2xl font-semibold mb-2">
                {collections[1].title}
              </h3>
              <p className="text-white/75 text-sm max-w-xs">
                {collections[1].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}