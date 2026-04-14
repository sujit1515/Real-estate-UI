"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pressLogos = [
  { name: "Architectural Digest", style: "italic font-light text-lg" },
  { name: "VOGUE", style: "font-bold tracking-widest text-base" },
  { name: "The New York Times", style: "font-light text-base" },
  { name: "WALLPAPER*", style: "font-semibold tracking-wider text-sm" },
];

const testimonials = [
  {
    quote:
      "The Curator isn't a listing site; it's a gallery of living art. They found us a home that matches our collection of 20th-century sculpture perfectly.",
    name: "Julian & Elena Thorne",
    title: "Private Collectors, London",
  },
  {
    quote:
      "An unparalleled experience. They understood our vision before we could even articulate it, and delivered something that exceeded our every expectation.",
    name: "Margaux de Villiers",
    title: "Art Director, Paris",
  },
];

export default function PressTestimonial() {
  const [active, setActive] = useState(0);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: "#0f1c2e" }}
    >
      {/* Press logos bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 pb-8 mb-14 px-4 md:px-10 lg:px-16"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center">
          {pressLogos.map((press, index) => (
            <motion.div
              key={press.name}
              custom={index}
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start"
            >
              <span className={`text-white/30 font-serif ${press.style}`}>{press.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonial */}
      <div className="px-4 md:px-10 lg:px-16 max-w-4xl mx-auto text-center">
        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-amber-400 text-5xl font-serif leading-none mb-6"
        >
          "
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-white text-xl md:text-2xl lg:text-3xl font-normal italic leading-relaxed mb-8"
          >
            "{testimonials[active].quote}"
          </motion.blockquote>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-author`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-400 mb-1">
              {testimonials[active].name}
            </p>
            <p className="text-xs text-white/40">{testimonials[active].title}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === active ? "bg-amber-400 w-6" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}