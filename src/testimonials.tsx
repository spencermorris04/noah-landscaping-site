import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react" // or use Heroicons, or plain ★

const testimonials = [
  {
    quote: "Noah turned our yard into a nighttime masterpiece. It looks amazing.",
    name: "Sarah L., Canton GA",
    rating: 5
  },
  {
    quote: "I never knew lighting could change everything. Highly recommended!",
    name: "James W., Hickory Flat",
    rating: 5
  },
  {
    quote: "Professional work, fast setup, and beautiful results.",
    name: "Ava M., Sixes",
    rating: 4
  }
]

export function TestimonialSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <div className="relative h-[250px] w-full max-w-lg rounded-xl shadow-xl 
  bg-white/50 dark:bg-gray-900/50 backdrop-blur-md 
  text-blue-900 dark:text-white p-8 overflow-hidden border border-white/20">

      <AnimatePresence mode="wait">
        <div className="relative h-full w-full">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full"
          >
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: t.rating }, (_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <blockquote className="text-xl italic font-medium leading-relaxed mb-4">
              “{t.quote}”
            </blockquote>
            <p className="text-base text-blue-800 dark:text-gray-300 font-semibold">
              — {t.name}
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
      <button
        onClick={() => setIndex((index + 1) % testimonials.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-600 dark:text-white hover:text-blue-800"
      >
        ➤
      </button>
    </div>
  )
}
