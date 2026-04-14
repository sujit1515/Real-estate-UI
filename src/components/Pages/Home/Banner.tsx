"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchProperties } from "@/api/search";
import toast from "react-hot-toast";

const stats = [
  { value: "9,000", suffix: "+", label: "Premium Properties" },
  { value: "2,000", suffix: "+", label: "Happy Customers" },
  { value: "28", suffix: "+", label: "Awards Winning" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.13 
      } 
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7
      } 
    },
  };

  // Debounced search function
  const debouncedSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const results = await searchProperties(query);
      const properties = results.properties || results.data || [];
      setSearchSuggestions(properties.slice(0, 5)); // Show top 5 suggestions
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchSuggestions([]);
    }
  };

  // Handle search input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      debouncedSearch(value);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a location or property type");
      return;
    }

    setIsSearching(true);
    
    try {
      // Perform search
      const results = await searchProperties(searchQuery);
      const properties = results.properties || results.data || [];
      
      // Store search results in localStorage or state management
      localStorage.setItem("lastSearchQuery", searchQuery);
      localStorage.setItem("searchResults", JSON.stringify(properties));
      
      // Navigate to search results page
      router.push(`/buy?search=${encodeURIComponent(searchQuery)}`);
      
    } catch (error: any) {
      console.error("Search error:", error);
      toast.error(error?.response?.data?.message || "Failed to search properties");
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    const propertyTitle = suggestion.title;
    setSearchQuery(propertyTitle);
    setShowSuggestions(false);
    
    // Navigate directly to property or search
    if (suggestion._id) {
      router.push(`/property/${suggestion._id}`);
    } else {
      handleSearch(new Event("submit") as any);
    }
  };

  // Handle chip click
  const handleChipClick = (chip: string) => {
    setSearchQuery(chip);
    // Auto-search when chip is clicked
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSearch(fakeEvent);
    }, 100);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/home-house.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        {/* Dark Overlay - to make text readable */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Animated gradient overlay */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/4" />
        </motion.div>

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
                <span className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 text-purple-200 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                      Property
                    </span>
                    {/* Decorative dot */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                      className="absolute -top-3 -right-4 w-5 h-5 rounded-full bg-purple-400"
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-gray-200 text-lg leading-relaxed max-w-md"
              >
                Find a variety of properties that suit you very easily. Forget all difficulties in
                finding the perfect residence for you.
              </motion.p>

              {/* Search Box with Suggestions */}
              <motion.div variants={fadeUp} className="relative max-w-lg w-full">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden pr-1.5 py-1.5 pl-5 gap-3 border border-white/20">
                      <svg
                        className="w-5 h-5 text-gray-300 flex-shrink-0"
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
                        onChange={handleSearchChange}
                        onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                        placeholder="Enter location, city or zip code..."
                        className="flex-1 text-white text-sm font-medium placeholder-gray-300 outline-none bg-transparent py-2"
                        autoComplete="off"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSearching}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSearching ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Search"
                        )}
                      </motion.button>
                    </div>

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                      >
                        {searchSuggestions.map((property, index) => (
                          <motion.button
                            key={property._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSuggestionClick(property)}
                            className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              {property.images && property.images[0] && (
                                <img 
                                  src={property.images[0]} 
                                  alt={property.title}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">
                                  {property.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{property.location || property.city || "Location"}</span>
                                  {property.price && (
                                    <>
                                      <span>•</span>
                                      <span className="text-purple-600 font-medium">
                                        ${property.price.toLocaleString()}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </form>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Apartment", "Villa", "Penthouse", "Commercial", "Land"].map((chip) => (
                    <motion.button
                      key={chip}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChipClick(chip)}
                      className="text-xs text-white/80 border border-white/30 hover:border-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-full transition-all bg-black/20 backdrop-blur-sm"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-8 pt-4 border-t border-white/20"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl font-black text-white">
                      {stat.value}
                      <span className="text-purple-400">{stat.suffix}</span>
                    </span>
                    <span className="text-xs text-gray-300 font-medium mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Arch Image */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Glow behind arch */}
              <div className="absolute inset-0 bg-purple-500/20 rounded-[50%_50%_0_0/60%_60%_0_0] blur-3xl scale-75 translate-y-10" />

              {/* Arch container */}
              <div className="relative w-[320px] sm:w-[380px] lg:w-[420px]">
                {/* Main arch */}
                <div className="relative rounded-t-[200px] rounded-b-3xl overflow-hidden aspect-[3/4] bg-black/30 backdrop-blur-sm border border-white/20 shadow-2xl">
                  {/* Property Image */}
                  <img 
                    src="/home-house.webp"
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
                  transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-4 -right-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-xs text-gray-300 font-medium">Top Rated</p>
                      <p className="text-sm font-bold text-white">Best Platform 2025</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card — bottom left */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 200 }}
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
                  style={{ border: "1px dashed rgba(168, 85, 247, 0.3)" }}
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
          <span className="text-xs text-gray-300 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-purple-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}