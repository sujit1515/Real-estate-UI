// components/Renovation/RenovationGallery.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Modern Kitchen Makeover",
    category: "Kitchen",
    beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&q=80",
  },
  {
    id: 2,
    title: "Luxury Bathroom Renovation",
    category: "Bathroom",
    beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    id: 3,
    title: "Living Room Transformation",
    category: "Living",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
  },
  {
    id: 4,
    title: "Bedroom Renovation",
    category: "Bedroom",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
  },
];

export default function RenovationGallery() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
            Our <span className="text-purple-600">Projects</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            Before & After transformations that showcase our expertise
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <img src={project.beforeImage} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">BEFORE</div>
                  </div>
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <img src={project.afterImage} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">AFTER</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-purple-600 font-semibold">{project.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-red-500 mb-2">BEFORE</p>
                  <img src={selectedProject.beforeImage} alt="Before" className="w-full rounded-lg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-500 mb-2">AFTER</p>
                  <img src={selectedProject.afterImage} alt="After" className="w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}