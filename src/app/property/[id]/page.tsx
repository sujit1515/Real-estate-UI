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
      <div className="text-center mt-20 text-lg font-semibold">
        Loading property...
      </div>
    );
  }

  // ❌ No Data
  if (!property) {
    return (
      <div className="text-center mt-20 text-lg text-red-500">
        Property not found
      </div>
    );
  }

  // 📊 Dynamic Stats
  const stats = [
    { label: "Price", value: `₹${property.price}` },
    { label: "Area", value: `${property.squareFeet} Sq Ft` },
    { label: "City", value: property.city },
    { label: "State", value: property.state },
  ];

  return (
    <div className="min-h-screen bg-white p-6">

      {/* 🏠 Title */}
      <h1 className="text-3xl font-bold mb-2">
        {property.title}
      </h1>

      {/* 📍 Location */}
      <div className="flex items-center gap-2 text-gray-600 mb-6">
        <MapPinIcon />
        <span>
          {property.streetAddress}, {property.city}, {property.state} - {property.zipCode}
        </span>
      </div>

      {/* 🖼 Image */}
      <div className="w-full h-[300px] mb-6">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80"
          alt={property.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border p-4 rounded-lg">
            <p className="text-gray-400 text-xs uppercase">{s.label}</p>
            <p className="font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* 📝 Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-600">
          {property.description || "No description available"}
        </p>
      </div>

      {/* 💰 Price + CTA */}
      <div className="border p-6 rounded-xl shadow-md max-w-sm">
        <p className="text-gray-400 text-sm">Price</p>
        <p className="text-2xl font-bold text-purple-600 mb-4">
          ₹{property.price}
        </p>

        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
}