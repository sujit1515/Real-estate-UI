"use client";

import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    category: "Design Culture",
    categoryColor: "text-amber-700",
    title: "The Art of Interior Design: Spatial Harmony",
    excerpt:
      "How the world's leading curators balance form and function to create sanctuaries in high-density urban environments.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 2,
    category: "Market Intelligence",
    categoryColor: "text-amber-700",
    title: "Investing in Architecture as an Asset Class",
    excerpt:
      "Why signature architectural homes are outperforming traditional luxury real estate in the global market.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 3,
    category: "Global Living",
    categoryColor: "text-amber-700",
    title: "The Rise of Remote Architectural Sanctuary",
    excerpt:
      "Discover how ultra-high-net-worth individuals are commissioning off-grid masterpieces in untouched wilderness.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
];

export default function JournalSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-gray-900"
          >
            The Journal
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 5 }}
            href="#"
            className="text-sm font-medium text-gray-600 underline underline-offset-4 decoration-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            Browse All Stories
          </motion.a>
        </motion.div>

        {/* Article Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {articles.map((article) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-5">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${article.categoryColor}`}
              >
                {article.category}
              </motion.p>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-serif text-xl font-semibold text-gray-900 mb-2 leading-snug group-hover:text-gray-600 transition-colors"
              >
                {article.title}
              </motion.h3>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 leading-relaxed"
              >
                {article.excerpt}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}