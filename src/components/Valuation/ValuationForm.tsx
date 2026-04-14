"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Ruler, Calendar, DollarSign, Mail, Phone, User } from "lucide-react";
import { createValuation } from "@/api/valuation"; // Import the API function
import toast from "react-hot-toast"; // Optional: for better notifications

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyAge: string;
  location: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  floorNumber: string;
  parking: string;
  facing: string;
  renovation: string;
  additionalInfo: string;
}

export default function ValuationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyAge: "",
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    floorNumber: "",
    parking: "",
    facing: "",
    renovation: "",
    additionalInfo: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [valuationResult, setValuationResult] = useState<any>(null); // Store valuation result

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare data for API
      const valuationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        propertyType: formData.propertyType,
        propertyAge: formData.propertyAge,
        location: formData.location,
        area: parseInt(formData.area) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        floorNumber: formData.floorNumber,
        parking: formData.parking,
        facing: formData.facing,
        renovation: formData.renovation,
        additionalInfo: formData.additionalInfo
      };

      console.log("Submitting valuation data:", valuationData);
      
      // Call the API
      const response = await createValuation(valuationData);
      
      console.log("Valuation API response:", response);
      
      // Store the valuation result if needed
      setValuationResult(response);
      
      // Show success message
      toast.success("Valuation request submitted successfully!");
      
      // Reset form or show success state
      setSubmitted(true);
      
    } catch (error: any) {
      console.error("Error submitting valuation:", error);
      
      // Show error message
      const errorMessage = error?.response?.data?.message || "Failed to submit valuation request. Please try again.";
      toast.error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setValuationResult(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyType: "",
      propertyAge: "",
      location: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      floorNumber: "",
      parking: "",
      facing: "",
      renovation: "",
      additionalInfo: ""
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Valuation Request Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for submitting your property details. Our valuation expert will contact you within 24 hours with a preliminary estimate.
        </p>
        
        {/* Display valuation result if available */}
        {valuationResult && valuationResult.estimatedValue && (
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-600 mb-1">Estimated Property Value</p>
            <p className="text-2xl font-bold text-purple-700">
              ${valuationResult.estimatedValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">*This is a preliminary estimate</p>
          </div>
        )}
        
        <button
          onClick={handleReset}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Submit Another Property
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-purple-600" />
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment/Flat</option>
                <option value="villa">Villa/Bungalow</option>
                <option value="independent-house">Independent House</option>
                <option value="commercial">Commercial Property</option>
                <option value="plot">Plot/Land</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Age <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyAge"
                value={formData.propertyAge}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select property age</option>
                <option value="under-construction">Under Construction</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-20">10-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                placeholder="e.g., Kalinga Nagar, Bhubaneswar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Area (sq ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                placeholder="e.g., 1500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5+">5+ BHK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floor Number
              </label>
              <select
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select floor</option>
                <option value="ground">Ground Floor</option>
                <option value="1">1st Floor</option>
                <option value="2">2nd Floor</option>
                <option value="3">3rd Floor</option>
                <option value="4+">4th Floor+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parking
              </label>
              <select
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="open">Open Parking</option>
                <option value="covered">Covered Parking</option>
                <option value="2-wheeler">2 Wheeler Only</option>
                <option value="multiple">Multiple Vehicles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facing Direction
              </label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select facing</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north-east">North-East</option>
                <option value="north-west">North-West</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recent Renovation
              </label>
              <select
                name="renovation"
                value={formData.renovation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              >
                <option value="">Select</option>
                <option value="none">No renovation</option>
                <option value="minor">Minor (within 2 years)</option>
                <option value="major">Major (within 5 years)</option>
                <option value="complete">Complete renovation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition resize-none"
            placeholder="Tell us more about your property (e.g., recent upgrades, unique features, nearby amenities...)"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Get Free Valuation"
          )}
        </button>
      </form>
    </div>
  );
}