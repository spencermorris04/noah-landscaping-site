// src/components/ServicesGrid.tsx
import React from "react";

interface Service {
  title: string;
  description: string;
  link: string;
  gradient: string;
}

const services: Service[] = [
  {
    title: "Pressure Washing",
    description:
      "Restore your driveway, sidewalks, and patio to look brand new with our powerful pressure washing.",
    link: "/services/pressure-washing",
    gradient: "from-green-600 via-lime-500 to-green-400",
  },
  {
    title: "Landscape Lighting",
    description:
      "Add stunning outdoor lighting to highlight your home’s best features and boost curb appeal.",
    link: "/services/lighting",
    gradient: "from-emerald-700 via-green-500 to-lime-400",
  },
  {
    title: "Window Cleaning",
    description:
      "Enjoy crystal-clear views with our streak-free exterior window cleaning service.",
    link: "/services/window-cleaning",
    gradient: "from-cyan-700 via-sky-500 to-teal-400",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4" id="services">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#0f3d2e]">
          What Do We Provide??
        </h2>
        <p className="text-lg text-gray-600">
          Our specialty services are designed to elevate your property.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <a
            key={service.title}
            href={service.link}
            className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition bg-gradient-to-br ${service.gradient} text-white p-8 flex flex-col justify-between h-64`}
          >
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="opacity-0 group-hover:opacity-100 transition duration-300">
              {service.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
