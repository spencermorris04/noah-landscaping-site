// src/pages/AboutPage.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Hero */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          About Me
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Who I Am */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">Who I Am</h2>
          <p className="text-gray-700 leading-relaxed">
            I’m Noah Morris, a high-school student with a passion for creating and
            maintaining beautiful outdoor spaces. On weekends and during school
            breaks I’ve helped neighbors with lawn care, garden design, and
            landscape lighting—treating every job with the same care I’d give my
            own home.
          </p>
        </section>

                {/* Why Choose Me */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">Why Choose Me?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🔧 Dependable & professional—every project gets my full attention.</li>
            <li>💰 Affordable rates—I keep overhead low so you save more.</li>
            <li>🕒 Flexible scheduling—available after school, weekends, and breaks.</li>
            <li>🌿 Passion for the outdoors—pride in work and attention to detail.</li>
          </ul>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-4">Services I Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Landscaping</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                <li>Lawn mowing & edging</li>
                <li>Garden bed design & planting</li>
                <li>Mulching & weed control</li>
                <li>Seasonal cleanups</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Light Installation</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                <li>Pathway & accent lighting</li>
                <li>Security & motion-sensor lights</li>
                <li>Low-voltage LED setups</li>
                <li>Solar-powered fixtures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Additional Services</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                <li>Weed removal & trimming</li>
                <li>Gutter cleaning</li>
                <li>Power washing decks & patios</li>
                <li>Minor repairs & handyman tasks</li>
              </ul>
            </div>
               <div className="flex justify-center items-center md:justify-start md:items-start">
                <a
                href="/contact"
                className="px-8 py-4 bg-lime-400 text-[#0f3d2e] text-lg font-semibold rounded-md hover:bg-lime-500 transition"
                >
                Contact Me
                </a>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
