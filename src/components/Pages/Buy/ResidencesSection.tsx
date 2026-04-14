"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { getAllProperties } from "@/api/sell";
import { toggleWishlist, getWishlist } from "@/api/wishlist";
import { Heart } from "lucide-react";

const sortOptions = [
  "Price: High to Low",
  "Price: Low to High",
  "Newest First",
  "Most Popular",
];

export default function ResidencesSection() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Price: High to Low");
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(new Set());
  const router = useRouter();

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        setProperties(res.properties || res.data || []);
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Load saved properties from API
  useEffect(() => {
    const loadWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await getWishlist();
        const wishlistData = response.wishlist || response.data || [];
        const savedIds = new Set<string>(
          wishlistData.map((item: any) => {
            return item.property?._id || item.property || "";
          }).filter(Boolean)
        );
        setSavedProperties(savedIds);
      } catch (error) {
        console.error("Error loading wishlist", error);
      }
    };

    loadWishlist();
  }, []);

  const getSortedProperties = () => {
    const sorted = [...properties];
    switch (sortBy) {
      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);
      case "Newest First":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "Most Popular":
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return sorted;
    }
  };

  const handleViewDetails = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleSaveProperty = async (
    e: React.MouseEvent,
    propertyId: string
  ) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save properties");
      router.push("/login");
      return;
    }

    if (wishlistLoading.has(propertyId)) return;

    setWishlistLoading((prev) => new Set(prev).add(propertyId));

    try {
      const response = await toggleWishlist(propertyId);

      if (response.success) {
        setSavedProperties((prev) => {
          const newSet = new Set(prev);
          if (response.action === "added") {
            newSet.add(propertyId);
          } else {
            newSet.delete(propertyId);
          }
          return newSet;
        });
      }
    } catch (error: any) {
      console.error("Error toggling wishlist", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to update wishlist";
      alert(errorMessage);
    } finally {
      setWishlistLoading((prev) => {
        const newSet = new Set(prev);
        newSet.delete(propertyId);
        return newSet;
      });
    }
  };

  const sortedProperties = getSortedProperties();

  // Animation variants for staggered cards
  const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // ✅ fixed
    },
  },
};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#eeede9] py-16 md:py-24 px-4 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:mb-14"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900"
          >
            Available Residences
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-medium text-gray-800 bg-transparent outline-none cursor-pointer border-b border-gray-300 pb-0.5"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-b-2 border-purple-600"
            ></motion.div>
          </motion.div>
        ) : properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              No properties available at the moment.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Property Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {sortedProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer group"
                  onClick={() => handleViewDetails(property._id)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Save/Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleSaveProperty(e, property._id)}
                      disabled={wishlistLoading.has(property._id)}
                      className="absolute top-3 left-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md z-10 disabled:opacity-50"
                      aria-label={
                        savedProperties.has(property._id)
                          ? "Remove from saved"
                          : "Save property"
                      }
                    >
                      {wishlistLoading.has(property._id) ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"
                        ></motion.div>
                      ) : (
                        <Heart
                          className={`w-4 h-4 transition-all duration-200 ${
                            savedProperties.has(property._id)
                              ? "fill-purple-600 text-purple-600"
                              : "text-gray-500 hover:text-purple-600"
                          }`}
                        />
                      )}
                    </motion.button>

                    {property.isAvailable && (
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm bg-green-500 text-white"
                      >
                        AVAILABLE
                      </motion.span>
                    )}
                    {property.badge && (
                      <span
                        className={`absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm ${
                          property.badgeColor || "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {property.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 flex flex-col flex-1"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold text-gray-900 leading-snug">
                        {property.title || property.name}
                      </h3>
                      <motion.span
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-semibold text-purple-600 whitespace-nowrap"
                      >
                        ${property.price?.toLocaleString()}
                      </motion.span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      {property.location ||
                        `${property.city}, ${property.state}`}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 pb-4 border-b border-gray-100 mb-4">
                      <div className="flex items-center gap-1.5">
                        <BedIcon />
                        <span>{property.bedrooms || property.beds || 0} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BathIcon />
                        <span>
                          {property.bathrooms || property.baths || 0} Baths
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <SqftIcon />
                        <span>
                          {property.squareFeet || property.sqft || 0} sqft
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(property._id);
                        }}
                        className="w-full py-3 rounded-lg bg-gray-100 hover:bg-purple-600 hover:text-white text-sm font-medium text-gray-700 transition-all duration-200"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {}}
                className="px-8 py-3 border border-gray-400 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200"
              >
                Load More Residences
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
}

function BedIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12V7a1 1 0 011-1h16a1 1 0 011 1v5M3 12h18M3 12v5m18-5v5M3 17h18" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16v2a6 6 0 01-6 6H10a6 6 0 01-6-6v-2zM4 12V7a3 3 0 013-3h1a1 1 0 011 1v7" />
    </svg>
  );
}

function SqftIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}