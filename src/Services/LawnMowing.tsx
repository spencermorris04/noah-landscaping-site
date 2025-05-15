// src/pages/LawnMowing.tsx
import React from 'react';

export default function LawnMowing() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Lawn Mowing &amp; Care Services
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">
            Our Lawn Care Process
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Consultation &amp; Estimate:</strong> We assess lawn size,
              grass type, and your schedule to recommend an optimal mowing
              frequency and service plan.
            </li>
            <li>
              <strong>Edge &amp; Trim Preparation:</strong> We outline driveways,
              walkways, and beds so every corner is neat and precise.
            </li>
            <li>
              <strong>Mowing &amp; Blowing:</strong> Our technician mows at the
              ideal blade height, then blows clippings off hard surfaces for a
              clean finish.
            </li>
            <li>
              <strong>Clipping Removal & Clean-Up:</strong> Grass clippings are
              bagged or mulched per your preference, and all debris is removed.
            </li>
            <li>
              <strong>Seasonal Treatments:</strong> We offer fertilization,
              aeration, and weed control add-ons to keep your lawn healthy year-round.
            </li>
            <li>
              <strong>Quality Check &amp; Feedback:</strong> After each visit,
              we inspect for missed areas and welcome your feedback to fine-tune service.
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
                <p className="text-2xl font-bold mb-4">$40 / visit</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Mowing &amp; edging</li>
                  <li>Grass clipping mulching</li>
                  <li>Blowing debris off hard surfaces</li>
                  <li>30-day guarantee</li>
                </ul>
              </div>
            </div>

            {/* Standard */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Standard
                </h3>
                <p className="text-2xl font-bold mb-4">$60 / visit</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>All Basic features</li>
                  <li>Trimming around obstacles</li>
                  <li>Weed control in beds &amp; borders</li>
                  <li>Bi-weekly visits available</li>
                </ul>
              </div>
            </div>

            {/* Premium */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Premium
                </h3>
                <p className="text-2xl font-bold mb-4">$200 / month</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Weekly mowing &amp; edging</li>
                  <li>Seasonal fertilization &amp; aeration</li>
                  <li>Comprehensive weed control</li>
                  <li>Priority scheduling &amp; 24/7 support</li>
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
