// src/components/ServiceCalculator.tsx
import { useState } from "react";

export function ServiceCalculator() {
  const [counts, setCounts] = useState({
    spotlights: 0,
    pathwayLights: 0,
    areaLights: 0,
    transformers: 0,
  });

  const prices = {
    spotlights: 40,
    pathwayLights: 30,
    areaLights: 50,
    transformers: 100,
  };

  const times = {
    spotlights: 10,
    pathwayLights: 5,
    areaLights: 10,
    transformers: 20,
  };

  const totalMinutes =
    counts.spotlights * times.spotlights +
    counts.pathwayLights * times.pathwayLights +
    counts.areaLights * times.areaLights +
    counts.transformers * times.transformers;

  const hourlyRate = 20;
  const laborCost = Math.ceil(totalMinutes / 60) * hourlyRate;

  const equipmentCost =
    counts.spotlights * prices.spotlights +
    counts.pathwayLights * prices.pathwayLights +
    counts.areaLights * prices.areaLights +
    counts.transformers * prices.transformers;

  const totalCost = equipmentCost + laborCost;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <section className="bg-gradient-to-br from-green-50 to-white p-4 md:p-6 rounded-xl shadow-md border border-green-100 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="bg-[#0f3d2e] rounded-full p-2 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-[#0f3d2e]">
          Design Your Setup
        </h3>
      </div>

      {/* Controls */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mb-6 flex-1">
        {(Object.entries(counts) as [keyof typeof counts, number][]).map(
          ([key, value]) => {
            const label = key.replace(/([A-Z])/g, " $1").trim();
            const capitalizedLabel =
              label.charAt(0).toUpperCase() + label.slice(1);

            return (
              <div
                key={key}
                className="bg-white rounded-lg p-3 shadow-sm border border-green-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#0f3d2e]">
                    {capitalizedLabel}
                  </label>
                  <span className="text-sm text-[#0f3d2e]">
                    ${prices[key]} each
                  </span>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setCounts((prev) => ({
                        ...prev,
                        [key]: Math.max(0, prev[key] - 1),
                      }))
                    }
                    disabled={value <= 0}
                    aria-label={`Decrease ${capitalizedLabel}`}
                    className="w-10 h-10 rounded-l-lg bg-green-100 text-[#0f3d2e] flex items-center justify-center hover:bg-green-200 active:bg-green-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <input
                    type="number"
                    min="0"
                    value={value || ""}
                    placeholder="0"
                    onChange={(e) =>
                      setCounts((prev) => ({
                        ...prev,
                        [key]: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="block w-full text-center h-10 border-y border-green-100 focus:outline-none text-lg"
                    aria-label={`${capitalizedLabel} quantity`}
                  />

                  <button
                    onClick={() =>
                      setCounts((prev) => ({
                        ...prev,
                        [key]: prev[key] + 1,
                      }))
                    }
                    aria-label={`Increase ${capitalizedLabel}`}
                    className="w-10 h-10 rounded-r-lg bg-green-100 text-[#0f3d2e] flex items-center justify-center hover:bg-green-200 active:bg-green-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Summary */}
      <div className="bg-[#0f3d2e] rounded-lg shadow-sm p-4 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex items-baseline">
            <span className="font-medium mr-1">Estimated Cost:</span>
            <span className="text-2xl font-bold">${totalCost}</span>
          </div>
          <div className="flex items-center text-sm text-green-100">
            <span className="font-medium mr-1">Time:</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{hours}h {minutes}m</span>
          </div>
        </div>
        <div className="text-xs text-green-100 mt-1">
          Includes installation, wiring, and material
        </div>
      </div>
    </section>
  );
}
