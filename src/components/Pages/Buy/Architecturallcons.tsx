"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "./SectionHeader";
import BookmarkButton from "./BookmarkButton";
import { getRooms } from "@/api/sell";

export default function ArchitecturalIcons() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getRooms();
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
    <section className="py-14 border-t border-[#2a2a3a]" id="architectural-icons">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Architectural Icons"
          description="Modernist masterpieces defined by clean lines, cantilevered volumes, and seamless integration with nature."
          viewAllHref="#"
        />
        {loading ? (
          <p className="text-white">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-white">No properties found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {properties.map((prop: any) => (
              <ArchCard
                key={prop._id}
                _id={prop._id}
                title={prop.title}
                location={prop.location}
                city={prop.city}
                price={prop.price}
                isAvailable={prop.isAvailable}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ArchCard({ _id, title, location, city, price, isAvailable }: any) {
  const router = useRouter();
  const handleCardClick = () => router.push(`/property/${_id}`);

  return (
    <div className="bg-[#1f1f2a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative border border-[#2a2a3a]">
      
      {/* ✅ Availability Badge */}
      {isAvailable && (
        <span className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          Available
        </span>
      )}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80"
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase text-[#a0a0b0] mb-1.5">
          {location}, {city}
        </p>

        <h3 className="font-serif text-[19px] font-bold text-white mb-3">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase text-[#a0a0b0]">
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