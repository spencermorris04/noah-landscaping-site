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

  const totalCost =
    counts.spotlights * prices.spotlights +
    counts.pathwayLights * prices.pathwayLights +
    counts.areaLights * prices.areaLights +
    counts.transformers * prices.transformers;

  const totalMinutes =
    counts.spotlights * times.spotlights +
    counts.pathwayLights * times.pathwayLights +
    counts.areaLights * times.areaLights +
    counts.transformers * times.transformers;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <section className="bg-blue-50/50 p-8 rounded-xl shadow-sm border border-blue-100">
      <h3 className="text-2xl font-display font-semibold mb-6 text-blue-900">Design Your Perfect Setup</h3>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-blue-800">
              {key.split(/(?=[A-Z])/).join(" ")}
            </label>
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
              className="block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/80 placeholder-blue-200"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-blue-100">
        <div className="text-xl font-display font-semibold text-blue-900">
          Estimated Total: ${totalCost}
        </div>
        <div className="mt-2 text-blue-700">
          Installation Time: {hours > 0 ? `${hours} hours ` : ""}{minutes > 0 ? `${minutes} minutes` : ""}
        </div>
        <p className="mt-4 text-sm text-blue-600 italic">
          Includes professional installation and all necessary wiring!
        </p>
      </div>
    </section>
  );
}
