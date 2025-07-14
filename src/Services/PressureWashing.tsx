// src/pages/services/PressureWashing.tsx
import React from "react";

export default function PressureWashing() {
  return (
    <div className="bg-gray-50 text-gray-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Pressure Washing
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Restore the fresh look of your home’s exterior with our professional
          pressure washing services. We remove years of dirt, grime, mildew, and
          stains from driveways, sidewalks, patios, and siding.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">What We Clean</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Driveways & walkways</li>
            <li>Patios & decks</li>
            <li>Home exteriors & siding</li>
            <li>Fences & retaining walls</li>
            <li>Outdoor furniture</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
          <p className="text-gray-700">
            We use top-of-the-line equipment, eco-friendly detergents, and
            careful techniques to deliver spotless results without damaging your
            surfaces.
          </p>
        </div>

        <a
          href="/contact"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded transition"
        >
          Get a Free Pressure Washing Quote
        </a>
      </div>
    </div>
  );
}
