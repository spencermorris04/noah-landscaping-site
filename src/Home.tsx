// src/pages/Home.tsx
// === React routing and data fetching ===
import { Routes, Route, Navigate } from "react-router-dom"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

import React from "react";
import { SignInForm } from "./SignInForm"
import { SignOutButton } from "./SignOutButton"
import { AdminDashboard } from "./AdminDashboard"
import { BookingCalendar } from "./BookingCalendar"
import { ServiceCalculator } from "./ServiceCalculator"


// Admin-only route protection
function AdminRoute() {
  const me = useQuery(api.auth.loggedInUser);
  if (me === undefined) return null;
  return me ? <AdminDashboard /> : <Navigate to="/" replace />;
}

// Layout for service calculator + booking calendar
function ServicesLayout() {
  return (
    <section className="w-full px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="w-full">
        <ServiceCalculator />
        </div>
        <div className="w-full">
        <BookingCalendar />
        </div>
    </div>
    </section>

  )
}

export default function HomePage() {
    const me = useQuery(api.auth.loggedInUser);

  return (
    <div className="bg-white text-gray-900">
      {/* Header */}
        <header className="bg-[#0f3d2e] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center overflow-x-auto">
            <h1 className="text-xs sm:text-xl font-bold whitespace-nowrap">
                Cherokee Landscaping
            </h1>
            <nav className="flex items-center gap-x-4 text-xs sm:text-sm font-medium whitespace-nowrap">
            <a href="#services" className="hover:text-lime-400">Services</a>
            <a href="#about" className="hover:text-lime-400">About</a>
            <a href="#pricing" className="hover:text-lime-400">Pricing</a>
            {me ? (
              <>
                <a href="/admin" className="hover:text-lime-400">Admin</a>
                <SignOutButton />
              </>
            ) : (
              <button
                onClick={() =>
                  (document.getElementById("signin") as HTMLDialogElement)?.showModal()
                }
                className="hover:text-lime-400 transition"
              >
                Login
              </button>
            )}
            </nav>
        </div>
        </header>

        {/* Login Modal */}
      <dialog id="signin" className="p-6 rounded-lg shadow-xl backdrop:bg-black/20">
        <SignInForm />
        <button
          onClick={() =>
            (document.getElementById("signin") as HTMLDialogElement)?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>


      {/* Hero */}
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
            
            {/* Step 1: Consultation */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">1. On-Site Consultation</h3>
            <p className="text-gray-600">
                We walk your property, discuss your goals, and draft a lighting plan tailored to your needs.
            </p>
            </div>

            {/* Arrow – Right on desktop, down on mobile */}
            <div className="flex justify-center items-center">
            {/* Down arrow (mobile only) */}
            <svg
                className="w-6 h-6 text-blue-400 block md:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>

            {/* Right arrow (desktop only) */}
            <svg
                className="w-8 h-8 text-blue-400 hidden md:block"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            </div>


            {/* Step 2: Installation */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">2. Fast, Clean Installation</h3>
            <p className="text-gray-600">
                Our team installs everything — lights, wiring, and smart timers — in just 1–2 days with minimal disruption.
            </p>
            </div>

            {/* Arrow – Right on desktop, down on mobile */}
            <div className="flex justify-center items-center">
            {/* Down arrow (mobile only) */}
            <svg
                className="w-6 h-6 text-blue-400 block md:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>

            {/* Right arrow (desktop only) */}
            <svg
                className="w-8 h-8 text-blue-400 hidden md:block"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            </div>


            {/* Step 3: Walkthrough */}
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
        <section className="bg-gray-100 py-2 sm:py-16 px-4">
        <div className="w-full mx-auto text-center">
            <ServicesLayout />
        </div>
        </section>

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
