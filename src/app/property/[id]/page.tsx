"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById } from "@/api/sell";
import { motion } from "framer-motion";

// ─── Icons ────────────────────────────────────────────────────────────────────
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

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0); // ✅ track selected image

  // 🚀 Fetch Property by ID
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id as string);
        const data = res?.property || res?.data || res;
        setProperty(data);
        setActiveImage(0); // reset image index on load
      } catch (err) {
        console.error("Error fetching property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBookNow = () => {
    router.push(
      `/property-booking?propertyId=${id}&propertyName=${encodeURIComponent(
        property?.title || "Property"
      )}&price=${property?.price || 0}&location=${encodeURIComponent(
        `${property?.city || ""}, ${property?.state || ""}`
      )}&image=${encodeURIComponent(
        property?.images?.[0] || // ✅ fixed: was property?.image
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
      )}`
    );
  };

  const handleContactAgent = () => {
    router.push(
      `/contact-agent?propertyId=${id}&propertyName=${encodeURIComponent(
        property?.title
      )}`
    );
  };

  // 📊 Dynamic Stats
  const stats = [
    {
      label: "Price",
      value: `₹${property?.price?.toLocaleString() || "0"}`,
      icon: null,
    },
    {
      label: "Area",
      value: `${property?.squareFeet || 0} Sq Ft`,
      icon: <SquareIcon />,
    },
    {
      label: "Bedrooms",
      value: `${property?.bedrooms || 3} Beds`,
      icon: <BedIcon />,
    },
    {
      label: "Bathrooms",
      value: `${property?.bathrooms || 2} Baths`,
      icon: <BathIcon />,
    },
  ];

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
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading property...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
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
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-red-400 text-lg font-semibold mb-4">
              Property not found
            </p>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mx-auto"
            >
              <ArrowLeftIcon />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Safely get images array — fallback to empty array
  const images: string[] = property.images?.length
    ? property.images
    : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",
      ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon />
            Back to Properties
          </motion.button>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {property.title}
          </motion.h1>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-gray-300 mb-6"
          >
            <MapPinIcon />
            <span className="text-sm">
              {property.streetAddress}, {property.city}, {property.state} -{" "}
              {property.zipCode}
            </span>
          </motion.div>

          {/* ✅ Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Main Large Image */}
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-3">
              <img
                src={images[activeImage]}
                alt={`${property.title} - image ${activeImage + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail Row — only show if more than 1 image */}
            {images.length > 1 && (
              <div
                className={`grid gap-3 ${
                  images.length === 2
                    ? "grid-cols-2"
                    : images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4" // up to 4 images
                }`}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 md:h-28 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-purple-500 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${property.title} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1">
                  {s.icon && (
                    <span className="text-purple-400">{s.icon}</span>
                  )}
                  <p className="text-gray-300 text-xs uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
                <p className="text-white font-semibold text-lg">{s.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {property.description ||
                "No description available. Please contact us for more information about this property."}
            </p>
          </motion.div>

          {/* Price + CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8"
          >
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">
                Price
              </p>
              <p className="text-3xl md:text-4xl font-bold text-purple-400">
                ₹{property.price?.toLocaleString()}
                <span className="text-sm text-gray-400 font-normal ml-1">
                  /month
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M18 13l1.5 6M9 21h6M12 21v-8"
                  />
                </svg>
                Book Now
              </button>
              <button
                onClick={handleContactAgent}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contact Agent
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              * Contact us for more details and availability
            </p>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-white font-semibold mb-2">
                Property Features
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                {[
                  "Fully Furnished",
                  "Modern Amenities",
                  "Prime Location",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-white font-semibold mb-2">
                Nearby Amenities
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                {[
                  "Schools & Colleges",
                  "Hospitals & Clinics",
                  "Shopping Malls",
                ].map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}