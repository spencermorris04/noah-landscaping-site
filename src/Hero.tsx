import { motion } from "framer-motion"
import { TestimonialSlider } from "./testimonials"

export function Hero() {
  return (
    <section
      className="relative h-[90vh] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/HeroImage.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 dark:from-black/90" />

      <div className="relative z-10 h-full w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text */}
        <motion.div
            className="flex-1 max-w-xl text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-5xl font-display font-bold mb-4 drop-shadow-lg">
            Upgrade Your Lawn
            </h1>
            <p className="text-xl mb-6 text-white/90">
            Get your outdoor lighting now
            </p>
            <a
            href="#calendar"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white text-lg font-semibold shadow-lg"
            >
            Book a Free Consultation
            </a>
        </motion.div>

        {/* Right: Testimonial */}
        <motion.div
            className="flex-1 min-w-[280px] max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
        >
            <TestimonialSlider />
        </motion.div>
        </div>

    </section>
  )
}
