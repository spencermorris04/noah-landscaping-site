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
    <section className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-xl shadow-md border border-blue-100 h-full flex flex-col transform transition-all hover:shadow-lg">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-bold text-blue-900">Design Your Perfect Setup</h3>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {(Object.entries(counts) as [keyof typeof counts, number][]).map(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').trim();
          const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
          
          return (
            <div key={key} className="bg-white rounded-lg p-4 shadow-sm border border-blue-50 transition-all hover:border-blue-200">
              <label className="block text-sm font-medium text-blue-800 mb-2">
                {capitalizedLabel}
              </label>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 rounded-l-lg bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200 transition-colors"
                  onClick={() => setCounts(prev => ({
                    ...prev,
                    [key]: Math.max(0, prev[key] - 1)
                  }))}
                  disabled={value <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
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
                  className="block w-full text-center h-10 border-y border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-400"
                />
                <button 
                  className="w-10 h-10 rounded-r-lg bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200 transition-colors"
                  onClick={() => setCounts(prev => ({
                    ...prev,
                    [key]: prev[key] + 1
                  }))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 text-right text-sm text-blue-600">${prices[key]} each</div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto bg-blue-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-lg font-medium">Estimated Total:</span>
          <span className="text-3xl font-display font-bold">${totalCost}</span>
        </div>
        <div className="flex items-baseline justify-between text-blue-100">
          <span>Installation Time:</span>
          <span>{hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''} ` : ""}{minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : "0 minutes"}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-200 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-100">
              All prices include professional installation and necessary wiring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}