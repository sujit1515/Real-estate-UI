"use client";

import { useState  } from "react";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("$1M – $3M");
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");

  const handleSearch = () => {
    console.log({ location, priceRange, propertyType, bedrooms });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

 const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

  const fadeInUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80')`,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
      />

      {/* Hero Text */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 text-center px-4 mb-10"
      >
        <motion.h1
          variants={itemVariants}
          className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4"
        >
          Find your sanctuary.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-white/75 text-base md:text-lg font-light tracking-wide"
        >
          Curated listings for the discerning collector.
        </motion.p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        variants={fadeInUp}
        className="relative z-10 w-full max-w-5xl mx-auto px-4"
      >
        <motion.div
          variants={scaleIn}
          className="bg-white rounded-2xl shadow-2xl px-6 py-6 md:py-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1"
            >
              <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
                Location
              </label>
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="City, Zip, or Area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1"
            >
              <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border-b border-gray-200 pb-2 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                <option>$500K – $1M</option>
                <option>$1M – $3M</option>
                <option>$3M – $5M</option>
                <option>$5M – $10M</option>
                <option>$10M+</option>
              </select>
            </motion.div>

            {/* Property Type */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1"
            >
              <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="border-b border-gray-200 pb-2 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                <option>All Types</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Estate</option>
                <option>Cottage</option>
                <option>Townhouse</option>
              </select>
            </motion.div>

            {/* Bedrooms */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1"
            >
              <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="border-b border-gray-200 pb-2 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </motion.div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#0f1c2e] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#1a2f4f] transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Properties
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}