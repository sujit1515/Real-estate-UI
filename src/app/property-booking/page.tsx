// app/property-booking/page.tsx
"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PropertySummaryCard from "@/components/PropertyBooking/PropertySummaryCard";
import SellerDetailsCard from "@/components/PropertyBooking/SellerDetailsCard";
import BookingForm from "@/components/PropertyBooking/BookingForm";

// Separate component that uses useSearchParams
function PropertyBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get property details from URL params
  const propertyId = searchParams.get("propertyId");
  const propertyName = searchParams.get("propertyName") || "Property";
  const propertyPrice = searchParams.get("price") || "0";
  const propertyImage = searchParams.get("image") || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";
  const propertyLocation = searchParams.get("location") || "Location not specified";

  // Mock seller details - replace with API call
  const sellerDetails = {
    name: "Suryakanta Das",
    role: "Senior Real Estate Consultant",
    phone: "+91 9348185822",
    email: "suryakanta@luminor.com",
    company: "Luminor Real Estate",
    experience: "15+ Years",
    propertiesSold: "500+",
    rating: "4.9"
  };

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
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Property
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Summary & Seller Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <PropertySummaryCard
                propertyId={propertyId}
                propertyName={propertyName}
                propertyPrice={propertyPrice}
                propertyLocation={propertyLocation}
                propertyImage={propertyImage}
              />
              <SellerDetailsCard sellerDetails={sellerDetails} />
            </motion.div>

            {/* Right Column - Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <BookingForm 
                propertyId={propertyId}
                propertyName={propertyName}
                propertyPrice={propertyPrice}
                propertyLocation={propertyLocation}
                sellerDetails={sellerDetails}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function PropertyBookingLoading() {
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
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading booking details...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function PropertyBookingPage() {
  return (
    <Suspense fallback={<PropertyBookingLoading />}>
      <PropertyBookingContent />
    </Suspense>
  );
}