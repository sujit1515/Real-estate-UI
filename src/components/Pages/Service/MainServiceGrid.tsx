// components/Services/MainServicesGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, TrendingUp, Key, Paintbrush, Wrench, FileText, DollarSign } from "lucide-react";

const mainServices = [
  {
    icon: Home,
    title: "Property Buying",
    description:
      "Find your dream home from our extensive collection of verified properties. Expert guidance from selection to final handover.",
    features: [
      "Verified property listings",
      "Personalized property tours",
      "Price negotiation support",
      "Legal documentation assistance",
    ],
    link: "/buy",
  },
  {
    icon: DollarSign,
    title: "Property Valuation",
    description:
      "Get accurate market valuation for your property with our expert analysis and comparative market research.",
    features: [
      "Free property assessment",
      "Market comparables analysis",
      "Certified valuation report",
      "Bank-approved valuation",
    ],
    link: "/valuation",
  },
  {
    icon: TrendingUp,
    title: "Property Selling",
    description:
      "Get the best value for your property with our expert marketing and negotiation services.",
    features: [
      "Free property valuation",
      "Professional photography",
      "Targeted marketing",
      "Quick buyer matching",
    ],
    link: "/sell",
  },
  {
    icon: Wrench,
    title: "Renovation Services",
    description:
      "Transform your space with our comprehensive renovation and remodeling services.",
    features: [
      "Expert contractors",
      "Quality materials",
      "Project management",
      "Timely completion",
    ],
    link: "/renovation",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description:
      "Custom interior designs that reflect your style and maximize functionality.",
    features: [
      "3D visualization",
      "Space planning",
      "Furniture selection",
      "Complete execution",
    ],
    link: "/interior",
  },
  {
    icon: FileText,
    title: "Legal Assistance",
    description:
      "Complete legal support for all property transactions ensuring smooth and secure deals.",
    features: [
      "Document verification",
      "Title clearance",
      "Registration support",
      "Legal compliance",
    ],
    link: "/legal",
  },
];

export default function MainServicesGrid() {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };

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
            What We <span className="text-purple-600">Offer</span>
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Comprehensive real estate services designed to make your property journey seamless
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                onClick={() => handleCardClick(service.link)}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="bg-purple-50 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform border border-purple-200">
                  <Icon className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm xs:text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm xs:text-base"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Learn More Link */}
                <div className="mt-4 pt-2">
                  <span className="text-purple-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}