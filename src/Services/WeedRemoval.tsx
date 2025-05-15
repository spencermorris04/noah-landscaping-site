// src/pages/WeedRemoval.tsx
import React from 'react';

export default function WeedRemoval() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Weed Removal Services
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">
            Our Weed Removal Process
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Site Assessment:</strong> Identify weed types, infestation
              level, and areas of concern to tailor the removal strategy.
            </li>
            <li>
              <strong>Manual Removal:</strong> Hand-pull or dig out deep-rooted
              weeds to prevent regrowth.
            </li>
            <li>
              <strong>Chemical Treatment (Optional):</strong> Apply EPA-approved
              herbicides precisely, protecting desirable plants.
            </li>
            <li>
              <strong>Debris Cleanup:</strong> Remove all uprooted weeds and
              dispose of them responsibly.
            </li>
            <li>
              <strong>Preventative Care:</strong> Apply pre-emergent controls or
              landscape fabric to inhibit future weed growth.
            </li>
            <li>
              <strong>Follow-Up Inspection:</strong> Return within 30 days to
              check for missed sprouts and perform touch-ups.
            </li>
          </ol>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-8">
            Pricing Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Basic
                </h3>
                <p className="text-2xl font-bold mb-4">$2 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Manual hand-pulling</li>
                  <li>Debris removal</li>
                  <li>30-day recheck</li>
                </ul>
              </div>
            </div>

            {/* Standard */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Standard
                </h3>
                <p className="text-2xl font-bold mb-4">$3.50 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Basic package plus:</li>
                  <li>Targeted herbicide application</li>
                  <li>Pre-emergent barrier</li>
                  <li>60-day follow-up</li>
                </ul>
              </div>
            </div>

            {/* Premium */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Premium
                </h3>
                <p className="text-2xl font-bold mb-4">$5 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Standard features plus:</li>
                  <li>Landscape fabric installation</li>
                  <li>Quarterly maintenance visits</li>
                  <li>1-year no-weeds guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-lime-400 text-[#0f3d2e] font-semibold rounded-md hover:bg-lime-500 transition"
          >
            Get a Free Quote
          </a>
        </section>
      </main>
    </div>
  );
}
