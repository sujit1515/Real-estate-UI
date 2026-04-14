// components/Interior/InteriorPortfolio.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    description: "Contemporary living space with neutral tones and natural light"
  },
  {
    id: 2,
    title: "Luxury Bedroom",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    description: "Elegant master bedroom with custom headboard and soft lighting"
  },
  {
    id: 3,
    title: "Modern Kitchen",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80",
    description: "Sleek modular kitchen with smart storage solutions"
  },
  {
    id: 4,
    title: "Spa Bathroom",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    description: "Luxurious bathroom with freestanding tub and marble finishes"
  },
  {
    id: 5,
    title: "Home Office",
    category: "Office",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    description: "Productive workspace with ergonomic design"
  },
  {
    id: 6,
    title: "Dining Area",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    description: "Elegant dining space with statement lighting"
  }
];

export default function InteriorPortfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-purple-600">Portfolio</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            Explore our latest interior design projects
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-purple-300 text-xs font-semibold mb-1">{item.category}</p>
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-purple-600 text-sm font-semibold">{selectedItem.category}</p>
                <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full rounded-lg mb-4" />
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}