// src/pages/Mulching.tsx
import React from 'react';

export default function MulchingServices() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Mulching &amp; Weed Control
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">
            Our Mulching Process
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Consultation &amp; Material Selection:</strong> Choose from
              hardwood, cedar, or colored mulch to match your landscape.
            </li>
            <li>
              <strong>Site Preparation:</strong> We clear debris, pull weeds,
              and edge beds for a clean boundary.
            </li>
            <li>
              <strong>Weed Barrier Installation (Standard &amp; Premium):</strong> 
              Optional landscape fabric to minimize future weed growth.
            </li>
            <li>
              <strong>Mulch Spreading &amp; Leveling:</strong> We apply to the
              recommended depth—2″ for basic, 3″ for standard, 4″ for premium.
            </li>
            <li>
              <strong>Edging &amp; Cleanup:</strong> We compact edges and remove
              excess mulch from walkways and lawn.
            </li>
            <li>
              <strong>Follow-Up &amp; Refresh (Premium):</strong> Annual mulch
              replenishment to maintain appearance and performance.
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
                <p className="text-2xl font-bold mb-4">$3 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>2″ depth hardwood or cedar mulch</li>
                  <li>Site preparation & basic edging</li>
                  <li>Clipping removal</li>
                  <li>30-day weed control check</li>
                </ul>
              </div>
            </div>

            {/* Standard */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Standard
                </h3>
                <p className="text-2xl font-bold mb-4">$5 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>3″ depth with mulch fabric</li>
                  <li>Enhanced edging & compaction</li>
                  <li>Pre-emergent application</li>
                  <li>90-day weed control warranty</li>
                </ul>
              </div>
            </div>

            {/* Premium */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Premium
                </h3>
                <p className="text-2xl font-bold mb-4">$7 / sq.ft.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>4″ depth premium mulch & fabric</li>
                  <li>Edge trimming & decorative borders</li>
                  <li>Quarterly refresh & weed barrier check</li>
                  <li>1-year maintenance & support</li>
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
