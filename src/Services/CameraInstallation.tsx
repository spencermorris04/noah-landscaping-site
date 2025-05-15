// src/pages/ResidentialServices.tsx
import React from 'react';

export default function ResidentialServices() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero section without image */}
      <header className="bg-[#0f3d2e] flex items-center justify-center h-48">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
          Residential Landscaping
        </h1>
      </header>

      {/* Content section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#0f3d2e]">Our Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            At Cherokee Landscaping, we transform your outdoor space into a
            vibrant, functional environment. Our team handles everything from
            initial design sketches to final installation and ongoing care,
            ensuring your lawn and garden thrive in every season.
          </p>

          <h3 className="text-xl font-semibold text-[#0f3d2e]">Services Included</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Custom garden & hardscape design</li>
            <li>Lawn installation & seasonal maintenance</li>
            <li>Planting, mulching, pruning & edging</li>
            <li>Irrigation setup & water management</li>
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <a
            href="/contact"
            className="px-6 py-3 bg-[#0f3d2e] text-white font-medium rounded-md hover:bg-lime-400 transition"
          >
            Request a Quote
          </a>
        </div>
      </main>
    </div>
  );
}
