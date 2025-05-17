// src/components/Gallery.tsx
import React from 'react';
import { projects } from './GalleryData';
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-16 bg-[#0f3d2e]"
    >
      {/* Optional light texture overlay */}
      <div className="absolute inset-0 bg-[url('/bg-texture-light.svg')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white mb-10">
        Before &amp; After Gallery
      </h2>

        {/* "Board" container with gray background and light border */}
        <div className="bg-gray-900 rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ id, before, after }) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow-sm p-3 transition hover:shadow-md"
              >
                <div className="flex rounded-md overflow-hidden">
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
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black/25 rounded-md" />
                  </div>

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
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black/25 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
