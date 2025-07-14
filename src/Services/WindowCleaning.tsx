// src/pages/services/WindowCleaning.tsx
import React from "react";

export default function WindowCleaning() {
  return (
    <div className="bg-gray-50 text-gray-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Window Cleaning
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Bring in more light and make your home shine with our streak-free,
          professional window cleaning services. We handle windows of all sizes
          and heights safely and efficiently.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">What’s Included</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Exterior window cleaning</li>
            <li>Screen cleaning</li>
            <li>Tracks & sills wiped down</li>
            <li>Hard-to-reach windows</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Our Difference</h2>
          <p className="text-gray-700">
            We use purified water and soft tools to deliver spotless, streak-free
            results without leaving any residue — so your windows stay cleaner,
            longer.
          </p>
        </div>

        <a
          href="/contact"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded transition"
        >
          Book a Window Cleaning Appointment
        </a>
      </div>
    </div>
  );
}
