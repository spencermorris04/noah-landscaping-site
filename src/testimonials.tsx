// src/components/TestimonialSlider.tsx
import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Noah turned our yard into a nighttime masterpiece. It looks amazing.",
    name: "Sarah L., Canton GA",
    rating: 5,
  },
  {
    quote: "I never knew lighting could change everything. Highly recommended!",
    name: "James W., Hickory Flat",
    rating: 5,
  },
  {
    quote: "Professional work, fast setup, and beautiful results.",
    name: "Ava M., Sixes",
    rating: 4,
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[index];

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <div className="flex justify-center mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-lg lg:text-xl text-gray-800 italic leading-relaxed mb-4 border-l-4 border-lime-500 pl-4">
            “{t.quote}”
          </blockquote>
          <p className="text-base text-gray-600 font-medium text-right">
            — {t.name}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        aria-label="Previous testimonial"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((index + 1) % testimonials.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        aria-label="Next testimonial"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`block w-2 h-2 rounded-full transition ${
              i === index ? "bg-lime-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
