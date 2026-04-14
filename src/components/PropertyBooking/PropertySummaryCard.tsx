// components/PropertyBooking/PropertySummaryCard.tsx
"use client";

import React from "react";
import { MapPin, Bed, Bath, Maximize, Home } from "lucide-react";

interface PropertySummaryCardProps {
  propertyId: string | null;
  propertyName: string;
  propertyPrice: string;
  propertyLocation: string;
  propertyImage: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
}

export default function PropertySummaryCard({
  propertyId,
  propertyName,
  propertyPrice,
  propertyLocation,
  propertyImage,
  bedrooms = 4,
  bathrooms = 3,
  squareFeet = 2500
}: PropertySummaryCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={propertyImage}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            Property ID: {propertyId}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{propertyName}</h3>
        <div className="flex items-center gap-1 text-gray-300 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          {propertyLocation}
        </div>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
          <span className="text-gray-300 text-sm">Price</span>
          <span className="text-2xl font-bold text-purple-400">
            ₹{parseInt(propertyPrice).toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <Bed className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{bedrooms} Beds</p>
          </div>
          <div>
            <Bath className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{bathrooms} Baths</p>
          </div>
          <div>
            <Maximize className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{squareFeet.toLocaleString()} sqft</p>
          </div>
        </div>
      </div>
    </div>
  );
}