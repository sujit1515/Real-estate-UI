// components/PropertyBooking/SellerDetailsCard.tsx
"use client";

import React from "react";
import { Building, Award, Home, Shield, Phone, Mail } from "lucide-react";

interface SellerDetails {
  name: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  experience: string;
  propertiesSold: string;
  rating: string;
}

interface SellerDetailsCardProps {
  sellerDetails: SellerDetails;
}

export default function SellerDetailsCard({ sellerDetails }: SellerDetailsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Building className="w-5 h-5 text-purple-400" />
        Seller Details
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Agent Name</p>
          <p className="text-white font-medium">{sellerDetails.name}</p>
          <p className="text-gray-400 text-sm">{sellerDetails.role}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contact</p>
          <a href={`tel:${sellerDetails.phone}`} className="text-white hover:text-purple-400 transition-colors block">
            {sellerDetails.phone}
          </a>
          <a href={`mailto:${sellerDetails.email}`} className="text-white hover:text-purple-400 transition-colors text-sm">
            {sellerDetails.email}
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
          <div className="text-center">
            <Award className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{sellerDetails.experience}</p>
            <p className="text-gray-400 text-xs">Experience</p>
          </div>
          <div className="text-center">
            <Home className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{sellerDetails.propertiesSold}</p>
            <p className="text-gray-400 text-xs">Sold</p>
          </div>
          <div className="text-center">
            <Shield className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-sm font-semibold">{sellerDetails.rating}</p>
            <p className="text-gray-400 text-xs">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}