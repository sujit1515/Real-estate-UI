// components/Legal/LegalServices.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileCheck, 
  Scale, 
  FileText, 
  Shield, 
  ScrollText,
  Home,
  Landmark,
  Users,
  Lock,
  Building,
  BookOpen,
  Award
} from "lucide-react";

const legalServices = [
  {
    icon: FileCheck,
    title: "Title Verification",
    description: "Complete property title search and verification",
    features: ["Chain of ownership", "Encumbrance check", "Title clearance", "Legal opinion"]
  },
  {
    icon: Scale,
    title: "Documentation",
    description: "Drafting and review of all legal documents",
    features: ["Sale deed", "Agreement of sale", "Power of attorney", "Lease agreements"]
  },
  {
    icon: Shield,
    title: "Due Diligence",
    description: "Comprehensive legal due diligence for properties",
    features: ["Land records check", "Approval verification", "Tax compliance", "Litigation check"]
  },
  {
    icon: Home,
    title: "Property Registration",
    description: "Assistance with property registration process",
    features: ["Stamp duty calculation", "Registration scheduling", "Document submission", "Final registration"]
  },
  {
    icon: Landmark,
    title: "Loan Legal Support",
    description: "Legal assistance for home loans and mortgages",
    features: ["Loan document review", "Mortgage creation", "Bank liaison", "Legal compliance"]
  },
  {
    icon: FileText,
    title: "Tax Advisory",
    description: "Property tax and capital gains tax guidance",
    features: ["Tax calculation", "Exemption guidance", "Tax filing support", "ITR assistance"]
  },
  {
    icon: Building,
    title: "Rental Agreements",
    description: "Comprehensive rental and lease agreement services",
    features: ["Lease drafting", "Tenant verification", "Rent agreement", "Eviction support"]
  },
  {
    icon: Users,
    title: "Dispute Resolution",
    description: "Expert resolution of property disputes",
    features: ["Mediation", "Arbitration", "Negotiation", "Legal representation"]
  },
  {
    icon: Lock,
    title: "Will & Inheritance",
    description: "Succession planning and inheritance support",
    features: ["Will drafting", "Probate assistance", "Succession certificate", "Family settlement"]
  },
  {
    icon: ScrollText,
    title: "RERA Compliance",
    description: "Real Estate Regulatory Authority compliance",
    features: ["RERA registration", "Compliance filing", "Buyer protection", "Project registration"]
  },
  {
    icon: BookOpen,
    title: "Legal Advisory",
    description: "Ongoing legal consultation for property matters",
    features: ["Regular consultation", "Document review", "Risk assessment", "Strategic advice"]
  },
  {
    icon: Award,
    title: "NRI Property Services",
    description: "Specialized services for non-resident Indians",
    features: ["POA creation", "Property management", "Tax compliance", "Legal representation"]
  }
];

export default function LegalServices() {
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
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-3 sm:mb-4">
            Legal <span className="text-purple-600">Solutions</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Comprehensive legal assistance for all your property needs
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {legalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 xs:p-7 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="bg-purple-50 w-14 h-14 rounded-full flex items-center justify-center mb-5 group-hover:bg-purple-600 transition-colors">
                  <Icon className="text-purple-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}