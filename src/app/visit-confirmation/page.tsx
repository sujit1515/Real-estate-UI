// app/visit-confirmation/page.tsx
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, Home, ArrowRight } from "lucide-react";

// Separate component that uses useSearchParams
function VisitConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const propertyName = searchParams.get("propertyName") || "Property";
  const visitDate = searchParams.get("date") || "To be confirmed";
  const visitTime = searchParams.get("time") || "To be confirmed";
  const agentName = searchParams.get("agent") || "Suryakanta Das";
  const agentPhone = searchParams.get("agentPhone") || "+91 9348185822";

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
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Visit Scheduled Successfully!</h1>
            <p className="text-gray-300">Your property visit has been scheduled. Our agent will contact you shortly.</p>
          </div>

          {/* Visit Details */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Visit Details
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Home className="w-4 h-4 text-purple-400" />
                <span>Property: <strong className="text-white">{propertyName}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Date: <strong className="text-white">{visitDate}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Time: <strong className="text-white">{visitTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Agent Details */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Your Agent
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <User className="w-4 h-4 text-purple-400" />
                <span>Name: <strong className="text-white">{agentName}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>Phone: <strong className="text-white">{agentPhone}</strong></span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">What's Next?</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">✓ Our agent will call you within 1 hour to confirm the visit</li>
              <li className="flex items-center gap-2">✓ You'll receive a confirmation SMS/Email with visit details</li>
              <li className="flex items-center gap-2">✓ Bring your ID proof for verification during the visit</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
            <button
              onClick={() => router.push("/buy")}
              className="flex-1 border border-purple-400 text-purple-400 hover:bg-purple-600/20 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              Browse More Properties
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Loading fallback component
function VisitConfirmationLoading() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading visit confirmation...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VisitConfirmationPage() {
  return (
    <Suspense fallback={<VisitConfirmationLoading />}>
      <VisitConfirmationContent />
    </Suspense>
  );
}