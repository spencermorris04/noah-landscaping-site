// src/pages/LightingInstallation.tsx
import React from 'react';
import { ServiceCalculator } from '../ServiceCalculator';

export default function LightingInstallation() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Landscape Lighting Installation
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">
            Our Installation Process
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Consultation &amp; Design:</strong> Evaluate your property
              at dusk, identify focal points, and plan optimal fixture placement.
            </li>
            <li>
              <strong>Layout & Quotation:</strong> Recommend fixtures,
              transformers, cable runs, then provide a transparent quote.
            </li>
            <li>
              <strong>Wiring & Mounting:</strong> Install low-voltage cable,
              secure mounts, and conceal wiring for a clean look.
            </li>
            <li>
              <strong>Configuration & Testing:</strong> Mount each light,
              configure transformer and controls, then test in day/night modes.
            </li>
            <li>
              <strong>Training & Support:</strong> Walk through system operation
              and provide 30-day follow-up plus 1-year labor warranty.
            </li>
          </ol>
        </section>

        {/* Interactive Calculator */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-6">
            Design Your Lighting &amp; Get an Instant Estimate
          </h2>
          <ServiceCalculator />
        </section>

        {/* Call to action */}
        <section className="text-center">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-lime-400 text-[#0f3d2e] font-semibold rounded-md hover:bg-lime-500 transition"
          >
            Ready to Book? Contact Us
          </a>
        </section>
      </main>
    </div>
  );
}
