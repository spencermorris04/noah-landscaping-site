// src/components/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialSlider } from './testimonials';

export function Hero() {
  return (
    <section
      className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/HeroImage.jpg')" }}
    >
      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Text block */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 drop-shadow-md">
            Upgrade Your Lawn
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">
            Get your outdoor lighting now
          </p>
          <a
            href="#calendar"
            className="block sm:inline-block w-full sm:w-auto px-6 py-3 bg-lime-400 hover:bg-lime-500 rounded-md text-[#0f3d2e] text-lg font-semibold shadow-lg transition"
          >
            Book a Free Consultation
          </a>
        </motion.div>

        {/* Testimonial slider */}
        <motion.div
          className="w-full md:w-1/2 max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </section>
  );
}
