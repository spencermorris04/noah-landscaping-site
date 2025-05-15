// src/pages/Home.tsx
import { useQuery } from "convex/react"; // Still needed if other parts of HomePage use queries
import { api } from "../convex/_generated/api"; // Still needed
import Gallery from './Gallery';
import React from "react";
// Removed SignInForm, SignUpForm, SignOutButton imports as they are handled by the global Header
// import { SignInForm } from "./SignInForm";
// import { SignUpForm } from "./SignUpForm";
// import { SignOutButton } from "./SignOutButton";
import { BookingCalendar } from "./BookingCalendar";
import { ServiceCalculator } from "./ServiceCalculator";

function ServicesLayout() {
  return (
    <section className="w-full px-4 sm:px-10 lg:px-16 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="w-full">
          <ServiceCalculator />
        </div>
        <div className="w-full">
          <BookingCalendar />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // No longer need 'me' or 'signUpsEnabled' for header logic,
  // as the global Header in App.tsx handles that.
  // const me = useQuery(api.auth.loggedInUser);
  // const signUpsEnabled = useQuery(api.auth.signUpsEnabled);

  return (
    <div className="bg-white text-gray-900">
      {/* Header is now global, rendered by App.tsx - REMOVE FROM HERE */}
      {/* Login Modal is now global - REMOVE FROM HERE */}
      {/* Sign Up Modal is now global - REMOVE FROM HERE */}

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url('https://www.tollbrothers.com/blog/wp-content/uploads/2020/09/Woodsons-Reserve-Executive_Valen-Modern-Farmhouse_Front-Elevetion_04.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white px-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Design. Light. Impress.
          </h2>
          <p className="text-lg md:text-xl mb-6">
            High-impact, affordable outdoor lighting done fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-3 rounded">
              Schedule an Appointment
            </a>
            <a href="#gallery" className="bg-white text-lime-700 border border-lime-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center">
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">1. On-Site Consultation</h3>
            <p className="text-gray-600">
              We walk your property, discuss your goals, and draft a lighting plan tailored to your needs.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <svg className="w-6 h-6 text-blue-400 block md:hidden" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg className="w-8 h-8 text-blue-400 hidden md:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">2. Fast, Clean Installation</h3>
            <p className="text-gray-600">
              Our team installs everything — lights, wiring, and smart timers — in just 1–2 days with minimal disruption.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <svg className="w-6 h-6 text-blue-400 block md:hidden" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg className="w-8 h-8 text-blue-400 hidden md:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">3. Nighttime Walkthrough</h3>
            <p className="text-gray-600">
              Once installed, we fine-tune angles, adjust brightness, and ensure everything looks perfect — live, after dark.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="italic text-lg mb-4">
            "Our front yard looks like a luxury estate at night. Install was done in a day!"
          </blockquote>
          <p className="font-semibold">— Sarah L., Roswell, GA</p>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-12">
          <blockquote className="italic text-lg mb-4">
            "Fast, friendly, and flawless. Our backyard is now the place to be after dark."
          </blockquote>
          <p className="font-semibold">— Jason M., Alpharetta, GA</p>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-12">
          <blockquote className="italic text-lg mb-4">
            "Super hard-working kid who knew what he was doing. 10/10 would recommend!"
          </blockquote>
          <p className="font-semibold">— Nick R., Canton, GA</p>
        </div>
      </section>

      {/* SCHEDULING AND BOOKING */}
      <section id="quote" className="bg-gray-100 py-2 sm:py-16 px-4">
        <ServicesLayout />
      </section>

      {/* GALLERY OF PAST PROJECTS */}
      <Gallery />

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-2">Cherokee Landscaping</h4>
            <p>Lighting the way in Georgia.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              {/* The Login link here might be redundant if the global header handles it,
                  but can be kept if it scrolls to a specific section or has other behavior.
                  For now, it's a simple link. */}
              <li><a href="#login" className="hover:underline">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Contact</h4>
            <p>Email: info@cherokeelandscaping.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Mon–Sat: 8am–6pm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
