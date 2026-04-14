// components/Legal/LegalTeam.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Award, BookOpen, Briefcase } from "lucide-react";

const legalExperts = [
  {
    icon: Scale,
    name: "Adv. Suryakanta Das",
    position: "Senior Legal Counsel",
    experience: "15+ Years",
    specialization: "Property Law, RERA",
    description: "Expert in property litigation and documentation"
  },
  {
    icon: Award,
    name: "Adv. Jyotirmayee Panda",
    position: "Legal Consultant",
    experience: "10+ Years",
    specialization: "Corporate Law, Contracts",
    description: "Specializes in commercial property transactions"
  },
  {
    icon: BookOpen,
    name: "Adv. Satyabrata Rout",
    position: "Tax Attorney",
    experience: "12+ Years",
    specialization: "Tax Law, Compliance",
    description: "Expert in property tax and GST matters"
  },
  {
    icon: Briefcase,
    name: "Adv. Ashutosh Khuntia",
    position: "Real Estate Attorney",
    experience: "8+ Years",
    specialization: "Due Diligence, Registration",
    description: "Specializes in title verification and registration"
  }
];

export default function LegalTeam() {
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
            Meet Our <span className="text-purple-600">Legal Experts</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg max-w-3xl mx-auto px-2">
            Experienced professionals committed to protecting your interests
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {legalExperts.map((expert, index) => {
            const Icon = expert.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 xs:p-7 text-center border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-purple-600" size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-purple-600 text-sm font-medium mb-2">{expert.position}</p>
                <p className="text-xs text-gray-500 mb-1">Experience: {expert.experience}</p>
                <p className="text-xs text-gray-500 mb-3">Specialization: {expert.specialization}</p>
                <p className="text-sm text-gray-600">{expert.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}