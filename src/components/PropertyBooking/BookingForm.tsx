// components/PropertyBooking/BookingForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, Phone, Mail, Clock, CalendarDays, MessageCircle, CheckCircle } from "lucide-react";

interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  hearAbout: string;
}

interface BookingFormProps {
  propertyId?: string | null;
  propertyName?: string;
  propertyPrice?: string;
  propertyLocation?: string;
  sellerDetails?: {
    name: string;
    phone: string;
  };
}

export default function BookingForm({ 
  propertyId, 
  propertyName = "Property", 
  propertyPrice = "0",
  propertyLocation = "",
  sellerDetails = { name: "Suryakanta Das", phone: "+91 9348185822" }
}: BookingFormProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"visit" | "booking">("visit");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    hearAbout: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleScheduleVisit = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Schedule Visit Request:", {
        ...formData,
        propertyId,
        propertyName,
        type: "schedule_visit"
      });
      
      setLoading(false);
      
      // Redirect to visit confirmation page
      router.push(
        `/visit-confirmation?propertyName=${encodeURIComponent(propertyName)}&date=${encodeURIComponent(
          formData.preferredDate || "To be confirmed"
        )}&time=${encodeURIComponent(
          formData.preferredTime || "To be confirmed"
        )}&agent=${encodeURIComponent(sellerDetails.name)}&agentPhone=${sellerDetails.phone}`
      );
    }, 1500);
  };

  const handleProceedToBooking = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Booking Request:", {
        ...formData,
        propertyId,
        propertyName,
        propertyPrice,
        type: "proceed_booking"
      });
      
      setLoading(false);
      
      // Generate a booking ID
      const bookingId = "BOOK" + Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Redirect to booking confirmation page
      router.push(
        `/booking-confirmation?propertyName=${encodeURIComponent(propertyName)}&bookingId=${bookingId}&propertyId=${propertyId}&price=${propertyPrice}`
      );
    }, 1500);
  };

  const handleSubmit = () => {
    if (selectedOption === "visit") {
      handleScheduleVisit();
    } else {
      handleProceedToBooking();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-2">Express Interest</h2>
      <p className="text-gray-300 mb-6">
        Fill in your details to schedule a visit or proceed with booking
      </p>

      {/* Action Selection Tabs */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedOption("visit")}
          className={`py-3 rounded-lg font-semibold transition-all ${
            selectedOption === "visit"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Schedule Visit
        </button>
        <button
          onClick={() => setSelectedOption("booking")}
          className={`py-3 rounded-lg font-semibold transition-all ${
            selectedOption === "booking"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          <CheckCircle className="w-4 h-4 inline mr-2" />
          Proceed to Booking
        </button>
      </div>

      <form className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Preferred Visit Date (only show for schedule visit) */}
        {selectedOption === "visit" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Message / Requirements
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
              placeholder="Tell us about your requirements or any specific questions..."
            />
          </div>
        </div>

        {/* How did you hear about us? */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How did you hear about us?
          </label>
          <select
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
          >
            <option value="">Select an option</option>
            <option value="google">Google Search</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              {selectedOption === "visit" ? (
                <>
                  <Calendar className="w-5 h-5" />
                  Schedule Visit
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Proceed to Booking
                </>
              )}
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
          Your information will be shared with the property seller.
        </p>
      </form>
    </div>
  );
}