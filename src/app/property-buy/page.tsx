// app/buy/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProperties } from "@/api/sell";
import { Home, MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";

export default function BuyPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        setProperties(res.properties || res.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handlePropertyClick = (property: any) => {
    router.push(`/property/${property._id}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }} />
      <div className="fixed inset-0 bg-black/60" />
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Properties for Sale</h1>
          <p className="text-gray-300 mb-8">Find your dream home from our curated collection</p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <div
                  key={property._id}
                  onClick={() => handlePropertyClick(property)}
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-gray-300 text-sm mb-3">
                      <MapPin className="w-3 h-3" />
                      {property.city}, {property.state}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-purple-400">₹{property.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-1"><Bed className="w-4 h-4" />{property.bedrooms || 3} Beds</div>
                      <div className="flex items-center gap-1"><Bath className="w-4 h-4" />{property.bathrooms || 2} Baths</div>
                      <div className="flex items-center gap-1"><Maximize className="w-4 h-4" />{property.squareFeet || 2500} sqft</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}