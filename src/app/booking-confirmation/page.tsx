"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Home, ArrowRight, FileText, Clock, MessageCircle } from "lucide-react";

// Separate component that uses useSearchParams
function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const propertyName = searchParams.get("propertyName") || "Property";
  const bookingId = searchParams.get("bookingId") || "BOOK" + Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }} />
      <div className="fixed inset-0 bg-black/60" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Booking Initiated Successfully!</h1>
            <p className="text-gray-300">Your booking request has been received. Our team will contact you shortly.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Booking ID:</span>
                <span className="text-white font-mono">{bookingId}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Property:</span>
                <span className="text-white">{propertyName}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Status:</span>
                <span className="text-yellow-400">Pending Confirmation</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">Next Steps:</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                1. Our executive will call you within 2 hours
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                2. Complete documentation and payment discussion
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                3. Schedule property visit (if not already done)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                4. Finalize the deal with legal assistance
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/")}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/contact")}
              className="flex-1 border border-purple-400 text-purple-400 hover:bg-purple-600/20 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Loading fallback component
function BookingConfirmationLoading() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }} />
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading booking details...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationLoading />}>
      <BookingConfirmationContent />
    </Suspense>
  );
}