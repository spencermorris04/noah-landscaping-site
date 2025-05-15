// src/components/Gallery.tsx
import React from 'react';
import { projects } from './GalleryData';

export default function Gallery() {
  return (
    <section id="gallery" className="bg-gray-100 py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-[#0f3d2e] mb-8">
        Before &amp; After Gallery
      </h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ id, before, after }) => (
          <div key={id}>
            {/* wrapper with background and divider */}
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Before image */}
              <div className="relative group w-1/2">
                <img
                  src={before}
                  alt={`Project ${id} before`}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-2 left-2 bg-[#0f3d2e] text-white text-xs px-2 py-1 rounded">
                  Before
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black/25 rounded-lg" />
              </div>

              {/* vertical divider */}
              <div className="w-px bg-[#0f3d2e]/50" />

              {/* After image */}
              <div className="relative group w-1/2">
                <img
                  src={after}
                  alt={`Project ${id} after`}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-2 left-2 bg-[#0f3d2e] text-white text-xs px-2 py-1 rounded">
                  After
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black/25 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
