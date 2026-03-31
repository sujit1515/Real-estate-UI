"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const stats = [
  { value: "9,000", suffix: "+", label: "Premium Properties" },
  { value: "2,000", suffix: "+", label: "Happy Customers" },
  { value: "28", suffix: "+", label: "Awards Winning" },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll({ target: heroRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <div className="bg-[#1a1a2e] text-white min-h-screen font-sans overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1a1a2e]/85 z-0" />

        {/* Animated gradient bg */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e]/50 to-[#252544]/30" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/4" />
        </motion.div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-80px)]">
            {/* Left */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  #1 Trusted Real Estate Platform
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} className="relative">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                  <span className="block text-white">Discover</span>
                  <span className="block text-white">Most Suitable</span>
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                      Property
                    </span>
                    {/* Decorative dot */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                      className="absolute -top-3 -right-4 w-5 h-5 rounded-full bg-purple-500"
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-lg leading-relaxed max-w-md"
              >
                Find a variety of properties that suit you very easily. Forget all difficulties in
                finding the perfect residence for you.
              </motion.p>

              {/* Search Box */}
              <motion.div variants={fadeUp} className="relative max-w-lg w-full">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden pr-1.5 py-1.5 pl-5 gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter location, city or zip code..."
                      className="flex-1 text-gray-800 text-sm font-medium placeholder-gray-400 outline-none bg-transparent py-2"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0"
                    >
                      Search
                    </motion.button>
                  </div>
                </form>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Apartment", "Villa", "Penthouse", "Commercial", "Land"].map((chip) => (
                    <motion.button
                      key={chip}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSearchQuery(chip)}
                      className="text-xs text-white/60 border border-white/15 hover:border-purple-400/40 hover:text-purple-400 px-3 py-1.5 rounded-full transition-all"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-8 pt-4 border-t border-purple-900/30"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl font-black text-white">
                      {stat.value}
                      <span className="text-purple-400">{stat.suffix}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Arch Image */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Glow behind arch */}
              <div className="absolute inset-0 bg-purple-500/10 rounded-[50%_50%_0_0/60%_60%_0_0] blur-3xl scale-75 translate-y-10" />

              {/* Arch container */}
              <div className="relative w-[320px] sm:w-[380px] lg:w-[420px]">
                {/* Main arch */}
                <div className="relative rounded-t-[200px] rounded-b-3xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#252544] to-[#1f1f2a] border border-purple-900/30">
                  {/* Property Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                    alt="Luxury Property"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating card — top right */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-[#252544]/90 backdrop-blur-md border border-purple-900/30 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Top Rated</p>
                      <p className="text-sm font-bold text-white">Best Platform 2025</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card — bottom left */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
                  className="absolute -bottom-4 -left-4 bg-purple-600 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-white/80 font-semibold">Available Now</p>
                      <p className="text-sm font-black text-white">200+ Cities</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative orbit dots */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-t-[250px] rounded-b-[50px] pointer-events-none"
                  style={{ border: "1px dashed rgba(168, 85, 247, 0.2)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-purple-900/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-purple-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}