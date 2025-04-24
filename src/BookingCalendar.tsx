import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Id } from "../convex/_generated/dataModel";

export function BookingCalendar() {
  /* ---------- backend hooks ----------------------------------------- */
  const bookedDates = useQuery(api.consultations.getBookedDates) || [];
  // turn array → Set for O(1) look-ups
  const bookedSet   = useMemo(() => new Set(bookedDates), [bookedDates]);

  const savePartial = useMutation(api.consultations.savePartialEntry);
  const book        = useMutation(api.consultations.bookConsultation);

  /* ---------- local state ------------------------------------------- */
  const [partialId, setPartialId] = useState<Id<"partialEntries">>();
  const creatingRef               = useRef(false);
  const latestDraftRef            = useRef({ name: "", address: "", phone: "" });

  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState(latestDraftRef.current);

  /* ---------- sync on every change ---------------------------------- */
  const syncDraft = useCallback(
    async (draft: typeof form) => {
      if (partialId) {
        await savePartial({ id: partialId, ...draft });
        return;
      }
      if (creatingRef.current) return;

      creatingRef.current = true;
      const newId = (await savePartial(draft)) as Id<"partialEntries">;
      setPartialId(newId);
      creatingRef.current = false;
      await savePartial({ id: newId, ...latestDraftRef.current });
    },
    [partialId, savePartial]
  );

  const handleInputChange = (field: keyof typeof form, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    latestDraftRef.current = next;
    void syncDraft(next);
  };

  /* ---------- final submission -------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await book({ date: selectedDate, ...form });
      toast.success("Consultation booked successfully!");
      setSelectedDate("");
      setForm({ name: "", address: "", phone: "" });
      latestDraftRef.current = { name: "", address: "", phone: "" };
      setPartialId(undefined);
    } catch {
      toast.error("Failed to book consultation");
    }
  };

  /* ---------- calendar helpers -------------------------------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);                 // normalise to midnight

  const monthContext = new Date(selectedDate || today);
  const firstDay     = new Date(monthContext.getFullYear(), monthContext.getMonth(), 1);
  const lastDay      = new Date(monthContext.getFullYear(), monthContext.getMonth() + 1, 0);
  const days         = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  const pad          = Array.from({ length: firstDay.getDay() });

  /* ---------- render ------------------------------------------------- */
  return (
    <section className="bg-blue-50/50 p-8 rounded-xl shadow-sm border border-blue-100">
      <h3 className="text-2xl font-display font-semibold mb-6 text-blue-900">
        Schedule a Visit
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          {(
            [
              ["name",    "Your Name",    "What should I call you?"],
              ["address", "Your Address", "Where's the project located?"],
              ["phone",   "Your Phone",   "Best number to reach you?"],
            ] as const
          ).map(([field, label, placeholder]) => (
            <div key={field} className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-2">
                {label}
              </label>
              <input
                type={field === "phone" ? "tel" : "text"}
                value={form[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/80"
                placeholder={placeholder}
                required
              />
            </div>
          ))}
        </div>

        {/* calendar */}
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-4">
            Pick a Day
          </label>
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} className="text-sm font-medium text-blue-800">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {pad.map((_, i) => (
                <div key={i} className="h-12" />
              ))}
              {days.map((day) => {
                const date    = new Date(monthContext.getFullYear(), monthContext.getMonth(), day);
                const dateStr = date.toISOString().split("T")[0];
                const booked  = bookedSet.has(dateStr);
                const past    = date < today;
                const sel     = dateStr === selectedDate;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={booked || past}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      h-12 rounded-lg flex items-center justify-center text-sm
                      ${past
                        ? "text-gray-300 cursor-not-allowed"
                        : booked
                        ? "bg-red-50 text-red-300 cursor-not-allowed"
                        : sel
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100 text-blue-900"}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={!selectedDate}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Book Consultation
        </button>
      </form>
    </section>
  );
}
