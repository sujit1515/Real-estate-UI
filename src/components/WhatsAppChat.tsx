"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);
  const phoneNumber = "9348317283"; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      setMessage("");
      setIsOpen(false);
      setShowGreeting(false);
    }
  };

  const handleQuickReply = (text: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setShowGreeting(false);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Greeting Bubble */}
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 mb-2 mr-2 bg-white rounded-2xl shadow-2xl p-3 max-w-[220px] border border-gray-200"
          >
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-lg">
                💬
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Hello! 👋</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Need help finding your dream property? Chat with us!
                </p>
                <div className="absolute -bottom-1 right-4 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowGreeting(false);
          }}
          className="relative bg-[#25D366] hover:bg-[#20b859] text-white rounded-full p-4 shadow-2xl transition-all duration-300 group"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-50"
          />
          
          <svg
            className="w-7 h-7 relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.032 12.053c-1.557-1.527-3.295-2.809-3.295-2.809s-1.698-1.159-2.265-1.159c-.532 0-.877.31-.877.31s-1.155.718-1.155 1.754c0 1.035.963 2.323 1.748 3.136.785.813 3.116 3.032 5.496 4.09 2.38 1.059 3.627 1.151 4.419.818.792-.333 1.395-1.001 1.395-1.001s.451-.665.443-1.197c-.008-.532-.296-1.152-.296-1.152s-.577-.447-1.351-.447c-.774 0-2.178.865-2.178.865s-.861.291-1.469-.317c-.608-.608-1.837-1.818-1.837-1.818s-.263-.311-.263-.6c0-.288.369-.659.369-.659s.819-.819.819-1.293c0-.474-.463-.822-.463-.822z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 2.125.648 4.104 1.764 5.783L2.05 21.95l4.167-1.714C7.896 21.352 9.865 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.808 0-3.496-.557-4.896-1.5l-.351-.21-2.697 1.11.83-2.627-.229-.356C4.618 15.463 4 13.77 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
          
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
            1
          </span>
        </motion.button>

        {/* Chat Popup Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-20 right-0 mb-2 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.032 12.053c-1.557-1.527-3.295-2.809-3.295-2.809s-1.698-1.159-2.265-1.159c-.532 0-.877.31-.877.31s-1.155.718-1.155 1.754c0 1.035.963 2.323 1.748 3.136.785.813 3.116 3.032 5.496 4.09 2.38 1.059 3.627 1.151 4.419.818.792-.333 1.395-1.001 1.395-1.001s.451-.665.443-1.197c-.008-.532-.296-1.152-.296-1.152s-.577-.447-1.351-.447c-.774 0-2.178.865-2.178.865s-.861.291-1.469-.317c-.608-.608-1.837-1.818-1.837-1.818s-.263-.311-.263-.6c0-.288.369-.659.369-.659s.819-.819.819-1.293c0-.474-.463-.822-.463-.822z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.125.648 4.104 1.764 5.783L2.05 21.95l4.167-1.714C7.896 21.352 9.865 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.808 0-3.496-.557-4.896-1.5l-.351-.21-2.697 1.11.83-2.627-.229-.356C4.618 15.463 4 13.77 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">WhatsApp Chat</h3>
                  <p className="text-white/80 text-xs">Online • Typically replies in mins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 bg-[#ECE5DD] space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      A
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2 shadow-sm max-w-[80%] relative">
                      <p className="text-sm text-gray-800">
                        Hello! 👋 Welcome to The Curator. How can I help you today?
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">Just now</span>
                    </div>
                  </motion.div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">Quick replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "I'm looking for a property",
                        "Schedule a viewing",
                        "Property valuation",
                        "Contact an agent"
                      ].map((reply, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-white hover:bg-[#25D366] text-gray-700 hover:text-white px-3 py-1.5 rounded-full transition-all shadow-sm border border-gray-200"
                        >
                          {reply}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500 font-medium mb-2">Featured Properties:</p>
                    <div className="space-y-2">
                      {[
                        { name: "Luxury Villa in Beverly Hills", price: "₹200000" },
                        { name: "Penthouse with Ocean View", price: "₹190000" },
                        { name: "Modern Estate with Pool", price: "₹300000" }
                      ].map((property, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleQuickReply(`I'm interested in ${property.name}`)}
                          className="w-full text-left p-2 rounded-lg bg-white hover:bg-[#DCF8C6] transition-colors border border-gray-100"
                        >
                          <p className="text-sm font-medium text-gray-800">{property.name}</p>
                          <p className="text-xs text-[#25D366] font-semibold">{property.price}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-[#25D366] hover:bg-[#20b859] text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Powered by WhatsApp • Response within minutes
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}