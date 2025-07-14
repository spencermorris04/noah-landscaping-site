// src/pages/Home.tsx
import React from "react";
import ServicesGrid from "./ServicesGrid";
import Gallery from "./Gallery";
import { BookingCalendar } from "./BookingCalendar";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* HERO */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://www.tollbrothers.com/blog/wp-content/uploads/2020/09/Woodsons-Reserve-Executive_Valen-Modern-Farmhouse_Front-Elevetion_04.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Design. Light. Impress.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            High-impact, affordable outdoor lighting done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded transition"
            >
              Schedule an Appointment
            </a>
            <a
              href="#services"
              className="bg-white text-primary border border-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded transition"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <ServicesGrid />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">
            What Clients Say
          </h2>
          <p className="text-gray-600">
            We’re proud of our work — but our clients say it best.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
          {[
            {
              quote:
                "Our front yard looks like a luxury estate at night. Install was done in a day!",
              name: "Sarah L., Roswell, GA",
            },
            {
              quote:
                "Fast, friendly, and flawless. Our backyard is now the place to be after dark.",
              name: "Jason M., Alpharetta, GA",
            },
            {
              quote:
                "Super hard-working team that knew what they were doing. 10/10 would recommend!",
              name: "Nick R., Canton, GA",
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <blockquote className="italic text-gray-700 leading-relaxed mb-4 border-l-4 border-primary pl-4">
                “{review.quote}”
              </blockquote>
              <p className="text-gray-800 font-semibold text-right">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section
        id="quote"
        className="bg-primary-light py-16 px-4 sm:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-bold text-primary leading-tight">
              Book a Free Consultation
            </h2>
            <p className="text-lg text-primary/80">
              We’ll walk your property, design a custom lighting plan, and
              install everything within days — no obligations.
            </p>
            <ul className="text-primary space-y-2 text-base">
              <li>✓ 100% free walk-through</li>
              <li>✓ Real installation timeline & cost</li>
              <li>✓ No hard sales — just great work</li>
            </ul>
          </div>
          <div className="min-w-0 w-full">
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <Gallery />

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-2">Cherokee Landscaping</h4>
            <p>Lighting the way in Cherokee County, GA.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/services/lighting" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Contact</h4>
            <p>Email: info@cherokeelandscaping.com</p>
            <p>Phone: (470) 641-8216</p>
            <p>Mon–Sat: 8am–6pm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
