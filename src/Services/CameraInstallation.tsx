// src/pages/CameraInstallation.tsx
import React from 'react';

export default function CameraInstallation() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Camera Installation Services
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
              <strong>Consultation &amp; Site Survey:</strong> We evaluate your
              property, discuss coverage needs, and recommend optimal camera
              placement.
            </li>
            <li>
              <strong>System Design &amp; Quotation:</strong> We draft a custom
              layout with cable pathways, power requirements, and equipment
              specifications—then deliver a clear, no-surprise quote.
            </li>
            <li>
              <strong>Wiring &amp; Mounting:</strong> Our team runs low-voltage
              cable, installs mounts/brackets, and conceals wiring for a
              clean, professional finish.
            </li>
            <li>
              <strong>Camera Setup &amp; Configuration:</strong> We mount each
              camera, adjust angles, configure DVR/NVR settings, and integrate
              remote viewing on your smartphone or computer.
            </li>
            <li>
              <strong>Testing &amp; Training:</strong> Full system walk-through,
              performance check in day/night modes, and a brief tutorial on
              live playback, recording, and alerts.
            </li>
            <li>
              <strong>Follow-Up Support:</strong> 30-day check-in and a 1-year
              warranty on labor to ensure everything runs smoothly.
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
                <p className="text-2xl font-bold mb-4">$100 / camera</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Mounting &amp; angle adjustment</li>
                  <li>Basic DVR configuration</li>
                  <li>Up to 30 ft of cable</li>
                  <li>30-day support</li>
                </ul>
              </div>
            </div>

            {/* Standard */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Standard
                </h3>
                <p className="text-2xl font-bold mb-4">$150 / camera</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>Includes Basic plus:</li>
                  <li>Up to 75 ft of cable</li>
                  <li>Motion-detection setup</li>
                  <li>Smartphone &amp; remote access</li>
                  <li>90-day support &amp; warranty</li>
                </ul>
              </div>
            </div>

            {/* Premium */}
            <div className="flex flex-col bg-white rounded-lg shadow border border-green-100">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-2">
                  Premium
                </h3>
                <p className="text-2xl font-bold mb-4">$200 / camera</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 flex-1">
                  <li>All Standard features</li>
                  <li>Unlimited cable length</li>
                  <li>24/7 motion alerts &amp; cloud backup</li>
                  <li>1-year full support &amp; maintenance</li>
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
