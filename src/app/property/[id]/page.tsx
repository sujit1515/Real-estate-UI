"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRoomById } from "@/api/sell";

// ─── Icons (same as yours) ────────────────────────────────────────────────────
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════

export default function LuxeEstatePage() {
  const { id } = useParams();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Fetch Property by ID
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const res = await getRoomById(id as string);

        console.log("API RESPONSE:", res);

        const data =
          res?.property ||
          res?.data ||
          res;

        setProperty(data);
      } catch (err) {
        console.error("Error fetching property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-semibold">Loading property...</p>
        </div>
      </div>
    );
  }

  // ❌ No Data
  if (!property) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">Property not found</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // 📊 Dynamic Stats
  const stats = [
    { label: "Price", value: `₹${property.price}`, icon: null },
    { label: "Area", value: `${property.squareFeet} Sq Ft`, icon: <SquareIcon /> },
    { label: "Bedrooms", value: `${property.bedrooms || 3} Beds`, icon: <BedIcon /> },
    { label: "Bathrooms", value: `${property.bathrooms || 2} Baths`, icon: <BathIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 🏠 Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {property.title}
        </h1>

        {/* 📍 Location */}
        <div className="flex items-center gap-2 text-gray-400 mb-6">
          <MapPinIcon />
          <span className="text-sm">
            {property.streetAddress}, {property.city}, {property.state} - {property.zipCode}
          </span>
        </div>

        {/* 🖼 Image */}
        <div className="w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden">
          <img
            src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80"}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                {s.icon && <span className="text-purple-400">{s.icon}</span>}
                <p className="text-gray-400 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
              <p className="text-white font-semibold text-lg">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 📝 Description */}
        <div className="mb-8 bg-[#252544] border border-purple-900/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
          <p className="text-gray-400 leading-relaxed">
            {property.description || "No description available"}
          </p>
        </div>

        {/* 💰 Price + CTA */}
        <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6 md:p-8 max-w-md">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Price</p>
          <p className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
            ₹{property.price}
            <span className="text-sm text-gray-400 font-normal ml-1">/month</span>
          </p>

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02]">
            Buy Now
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            * Contact us for more details and availability
          </p>
        </div>
      </div>
    </div>
  );
}