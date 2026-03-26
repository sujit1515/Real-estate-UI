"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import BookmarkButton from "./BookmarkButton";
import { getRooms } from "@/api/sell"; // ✅ adjust path

export default function ArchitecturalIcons() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getRooms();

        // 👇 backend returns { success, properties }
        setProperties(res.properties || res.data || []);
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-14 border-t border-purple-900/30 bg-[#1a1a2e]" id="architectural-icons">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Architectural Icons"
          description="Modernist masterpieces defined by clean lines, cantilevered volumes, and seamless integration with nature."
          viewAllHref="#"
        />

        {/* 🔄 Loading */}
        {loading ? (
          <p className="text-gray-300">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-gray-300">No properties found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop: any) => (
              <ArchCard key={prop._id} {...prop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ArchCard({
  title,
  location,
  city,
  price,
  isAvailable,
}: any) {
  return (
    <div className="bg-[#252544] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative border border-purple-900/30 hover:border-purple-500/50">
      
      {/* ✅ Availability Badge */}
      {isAvailable && (
        <span className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          Available
        </span>
      )}

      {/* 🔥 Default Image (since backend doesn't send image yet) */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80"
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase text-gray-400 mb-1.5">
          {location}, {city}
        </p>

        <h3 className="font-serif text-[19px] font-bold text-white mb-3">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase text-gray-400">
              Price
            </p>
            <p className="text-[18px] font-bold text-purple-400">
              ₹{price}
            </p>
          </div>

          <BookmarkButton />
        </div>
      </div>
    </div>
  );
}