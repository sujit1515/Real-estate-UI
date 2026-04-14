// app/payment-success/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Home, 
  Calendar, 
  Mail, 
  Download, 
  Share2,
  ArrowRight,
  Printer
} from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  // Get transaction details from URL params
  const transactionId = searchParams.get("transaction_id") || "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const propertyName = searchParams.get("property") || "Obsidian Villa";
  const amount = searchParams.get("amount") || "1,240,000";
  const paymentMethod = searchParams.get("method") || "Credit Card";

//   useEffect(() => {
//     // Auto redirect to dashboard after 5 seconds
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           router.push("/dashboard");
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Payment Confirmation',
        text: `Payment of $${amount} for ${propertyName} was successful!`,
        url: window.location.href,
      });
    }
  };

  const handleDownloadReceipt = () => {
    // Create receipt HTML
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .receipt { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
          .details { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; padding-top: 20px; border-top: 2px solid #7c3aed; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">Luminor Real Estate</div>
            <p>Payment Receipt</p>
          </div>
          <div class="details">
            <div class="row"><strong>Transaction ID:</strong> ${transactionId}</div>
            <div class="row"><strong>Date:</strong> ${new Date().toLocaleString()}</div>
            <div class="row"><strong>Property:</strong> ${propertyName}</div>
            <div class="row"><strong>Payment Method:</strong> ${paymentMethod}</div>
            <div class="row"><strong>Status:</strong> Completed</div>
            <div class="row total"><strong>Amount Paid:</strong> $${amount}</div>
          </div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>For any queries, contact: support@luminor.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([receiptHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${transactionId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
        </motion.div>

        {/* Transaction Details Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6"
        >
          <div className="bg-purple-600 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Transaction Details</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-500">Transaction ID</span>
              <span className="text-gray-900 font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-500">Date & Time</span>
              <span className="text-gray-900 font-medium">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-500">Property</span>
              <span className="text-gray-900 font-medium">{propertyName}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-900 font-medium">{paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              <span className="text-green-600 font-medium">Completed</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900 font-bold text-lg">Total Amount</span>
              <span className="text-purple-600 font-bold text-2xl">${amount}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <button
            onClick={handleDownloadReceipt}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Download className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-600">Download Receipt</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Printer className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-600">Print Receipt</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Share2 className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-600">Share</span>
          </button>
          
          <a
            href="/dashboard"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Home className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-600">Dashboard</span>
          </a>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-purple-50 rounded-2xl p-6 border border-purple-200 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Confirmation Email</p>
                <p className="text-sm text-gray-600">You'll receive a confirmation email shortly with all transaction details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Documentation</p>
                <p className="text-sm text-gray-600">Our team will contact you within 24 hours for documentation and legal formalities.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Property Handover</p>
                <p className="text-sm text-gray-600">Once all formalities are complete, we'll schedule the property handover.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Auto Redirect Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm">
            Redirecting to dashboard in {countdown} seconds...
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-2 text-purple-600 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Go to dashboard now
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-xs">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@luminor.com" className="text-purple-600 hover:underline">
              support@luminor.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919348185822" className="text-purple-600 hover:underline">
              +91 9348185822
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}