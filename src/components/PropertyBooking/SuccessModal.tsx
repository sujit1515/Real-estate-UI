// components/PropertyBooking/SuccessModal.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  selectedOption: "visit" | "booking";
  onClose?: () => void;
}

export default function SuccessModal({ selectedOption, onClose }: SuccessModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 max-w-md"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          {selectedOption === "visit" ? "Visit Scheduled!" : "Booking Initiated!"}
        </h2>
        <p className="text-gray-300 mb-4">
          {selectedOption === "visit" 
            ? "Thank you for your interest. Our agent will contact you shortly to confirm the visit."
            : "Thank you for your interest. You will be redirected to complete your booking."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
        >
          Return to Home
        </button>
      </motion.div>
    </div>
  );
}