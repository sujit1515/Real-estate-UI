// app/saved/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Heart,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Trash2,
  Share2,
  Eye,
  Loader2,
} from "lucide-react";
import { getWishlist, removeFromWishlist } from "@/api/wishlist";
import toast from "react-hot-toast";

interface Property {
  _id: string;
  title: string;
  price: number;
  location?: string;
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  images?: string[];
  status?: string;
}

interface WishlistItem {
  _id: string;
  property: Property;
  savedDate: string;
}

export default function SavedPropertiesPage() {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view saved properties");
          router.push("/login");
          return;
        }

        const response = await getWishlist();
        const wishlistData = response.wishlist || response.data || [];
        setSavedProperties(wishlistData);
      } catch (error: any) {
        console.error("Error fetching wishlist", error);
        toast.error(
          error?.response?.data?.message || "Failed to load saved properties"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [router]);

  // ✅ Fixed: Properly access propertyId
  const handleRemove = async (item: WishlistItem) => {
    // Check both possible structures
    const propertyId = item.property?._id || (item as any).propertyId;
    
    if (!propertyId) {
      toast.error("Invalid property data");
      return;
    }

    setRemovingId(propertyId);
    try {
      await removeFromWishlist(propertyId);
      // Remove from local state
      setSavedProperties((prev) =>
        prev.filter((p) => {
          const currentPropertyId = p.property?._id || (p as any).propertyId;
          return currentPropertyId !== propertyId;
        })
      );
      toast.success("Removed from saved properties");
    } catch (error: any) {
      console.error("Error removing from wishlist", error);
      toast.error(
        error?.response?.data?.message || "Failed to remove property"
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Rest of your component remains the same...
  const handleViewProperty = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleShare = async (item: WishlistItem) => {
    const property = item.property;
    const propertyTitle = property?.title || "Property";
    const propertyId = property?._id;

    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          text: `Check out ${propertyTitle}`,
          url: `${window.location.origin}/property/${propertyId}`,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/property/${propertyId}`
      );
      toast.success("Link copied to clipboard!");
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sold":
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300 backdrop-blur-sm">
            Sold
          </span>
        );
      case "pending":
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 backdrop-blur-sm">
            Pending
          </span>
        );
      default:
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 backdrop-blur-sm">
            Available
          </span>
        );
    }
  };

  const getPropertyImage = (property: Property) => {
    if (property?.images && property.images.length > 0) {
      return property.images[0];
    }
    return "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80";
  };

  const getPropertyLocation = (property: Property) => {
    if (property?.location) return property.location;
    if (property?.city || property?.state)
      return `${property?.city || ""}, ${property?.state || ""}`.trim();
    return "Location not specified";
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
          }}
        />
        <div className="fixed inset-0 bg-black/60" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-white">Loading your saved properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Saved <span className="text-purple-400">Properties</span>
                </h1>
                <p className="text-gray-300 mt-2">
                  You have {savedProperties.length} saved{" "}
                  {savedProperties.length === 1 ? "property" : "properties"}
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          {savedProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20"
            >
              <Heart className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No saved properties yet
              </h3>
              <p className="text-gray-300 mb-6">
                Start browsing and save properties you love!
              </p>
              <button
                onClick={() => router.push("/buy")}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all"
              >
                <Home className="w-4 h-4" />
                Browse Properties
              </button>
            </motion.div>
          )}

          {/* Properties Grid / List */}
          {savedProperties.length > 0 && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              <AnimatePresence>
                {savedProperties.map((savedItem, index) => {
                  const property = savedItem.property;
                  const propertyId = property?._id || (savedItem as any).propertyId;

                  return (
                    <motion.div
                      key={savedItem._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-white/20 hover:border-purple-400/50 ${
                        viewMode === "list"
                          ? "flex flex-col sm:flex-row"
                          : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "grid"
                            ? "h-64"
                            : "h-48 sm:h-auto sm:w-56 flex-shrink-0"
                        }`}
                      >
                        <img
                          src={getPropertyImage(property)}
                          alt={property?.title || "Property"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80";
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(property?.status || "available")}
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`p-5 flex-1 ${
                          viewMode === "list"
                            ? "flex flex-col justify-between"
                            : ""
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h3
                              className="font-serif text-lg font-semibold text-white hover:text-purple-400 transition-colors cursor-pointer leading-snug"
                              onClick={() =>
                                handleViewProperty(property?._id)
                              }
                            >
                              {property?.title || "Property"}
                            </h3>
                            <p className="text-lg font-bold text-purple-400 whitespace-nowrap">
                              {formatPrice(property?.price || 0)}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 text-gray-300 text-sm mb-3">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{getPropertyLocation(property)}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              <span>{property?.bedrooms || 0} Beds</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              <span>{property?.bathrooms || 0} Baths</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Maximize className="w-4 h-4" />
                              <span>{property?.squareFeet || 0} sqft</span>
                            </div>
                          </div>

                          {savedItem.savedDate && (
                            <div className="text-xs text-gray-400 mb-4">
                              Saved on{" "}
                              {new Date(
                                savedItem.savedDate
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewProperty(property?._id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>

                          <button
                            onClick={() => handleShare(savedItem)}
                            className="flex items-center justify-center border border-white/30 hover:border-purple-400 text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg transition-all text-sm"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>

                          {/* Remove Button - Now calling the API */}
                          <button
                            onClick={() => handleRemove(savedItem)}
                            disabled={removingId === propertyId}
                            className="flex items-center justify-center border border-white/30 hover:border-red-400 text-gray-300 hover:text-red-400 py-2 px-3 rounded-lg transition-all text-sm disabled:opacity-50"
                            title="Remove from saved"
                          >
                            {removingId === propertyId ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}