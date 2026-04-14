// components/Profile/SavedTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Heart, MapPin, Bed, Bath, Maximize, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getWishlist } from "@/api/wishlist";
import toast from "react-hot-toast";

interface WishlistItem {
  _id: string;
  property: {
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
  };
  savedDate: string;
}

export default function SavedTab() {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await getWishlist();
        const wishlistData = response.wishlist || response.data || [];
        setSavedProperties(wishlistData);
      } catch (error: any) {
        console.error("Error fetching wishlist", error);
        const errorMessage = error?.response?.data?.message || "Failed to load saved properties";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleViewProperty = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Safe access helper functions
  const getPropertyImage = (property: any) => {
    if (property?.images && property.images.length > 0) {
      return property.images[0];
    }
    return "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80";
  };

  const getPropertyTitle = (property: any) => {
    return property?.title || "Property";
  };

  const getPropertyPrice = (property: any) => {
    return property?.price || 0;
  };

  const getPropertyLocation = (property: any) => {
    return property?.location || `${property?.city || ""}, ${property?.state || ""}` || "Location not specified";
  };

  const getPropertyBedrooms = (property: any) => {
    return property?.bedrooms || 0;
  };

  const getPropertyBathrooms = (property: any) => {
    return property?.bathrooms || 0;
  };

  const getPropertySquareFeet = (property: any) => {
    return property?.squareFeet || 0;
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Saved Properties</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        Saved Properties ({savedProperties.length})
      </h2>
      
      {savedProperties.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300">No saved properties yet</p>
          <p className="text-sm text-gray-400 mt-2">Browse properties and click the heart icon to save them</p>
          <button
            onClick={() => router.push("/buy")}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {savedProperties.map((savedItem) => {
            const property = savedItem.property;
            return (
              <div
                key={savedItem._id}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => handleViewProperty(property?._id)}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getPropertyImage(property)}
                      alt={getPropertyTitle(property)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {getPropertyTitle(property)}
                      </h3>
                      <p className="text-sm font-bold text-purple-400">
                        {formatPrice(getPropertyPrice(property))}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {getPropertyLocation(property)}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {getPropertyBedrooms(property)} Beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        {getPropertyBathrooms(property)} Baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3 h-3" />
                        {getPropertySquareFeet(property)} sqft
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      Saved on {new Date(savedItem.savedDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProperty(property?._id);
                    }}
                    className="flex-shrink-0 px-3 py-1.5 bg-purple-600/50 hover:bg-purple-600 text-white text-xs rounded-lg transition-all"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}