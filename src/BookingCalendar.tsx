import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Id } from "../convex/_generated/dataModel";

export function BookingCalendar() {
  /* ---------- backend hooks ----------------------------------------- */
  const bookedDates = useQuery(api.consultations.getBookedDates) || [];
  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  const savePartial = useMutation(api.consultations.savePartialEntry);
  const book = useMutation(api.consultations.bookConsultation);

  /* ---------- local state ------------------------------------------- */
  const [partialId, setPartialId] = useState<Id<"partialEntries">>();
  const creatingRef = useRef(false);
  const latestDraftRef = useRef({ name: "", address: "", phone: "" });

  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState(latestDraftRef.current);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const days = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  const pad = Array.from({ length: firstDay.getDay() });

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  /* ---------- render ------------------------------------------------- */
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-xl shadow-md border border-blue-100 h-full flex flex-col transform transition-all hover:shadow-lg">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-bold text-blue-900">Schedule a Visit</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
          {/* calendar */}
          <div className="mb-6 md:mb-0 md:flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
              <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
                <button 
                  type="button" 
                  onClick={prevMonth}
                  className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="font-medium">
                  {currentMonthName} {currentYear}
                </div>
                <button 
                  type="button" 
                  onClick={nextMonth}
                  className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                    <div key={d} className="text-xs font-medium text-blue-800 pb-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {pad.map((_, i) => (
                    <div key={i} className="h-10 w-full" />
                  ))}
                  {days.map((day) => {
                    const date = new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );
                    const dateStr = date.toISOString().split("T")[0];
                    const booked = bookedSet.has(dateStr);
                    const past = date < today;
                    const sel = dateStr === selectedDate;
                    const isToday = date.getDate() === today.getDate() && 
                                   date.getMonth() === today.getMonth() && 
                                   date.getFullYear() === today.getFullYear();

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={booked || past}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`
                          h-10 w-full rounded-lg flex items-center justify-center text-sm transition-all relative
                          ${isToday ? 'font-bold' : ''}
                          ${past
                            ? "text-gray-300 cursor-not-allowed"
                            : booked
                            ? "bg-red-50 text-red-300 cursor-not-allowed"
                            : sel
                            ? "bg-blue-600 text-white ring-2 ring-blue-300"
                            : "hover:bg-blue-100 text-blue-900"}
                        `}
                      >
                        {day}
                        {isToday && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* inputs */}
          <div className="md:flex-1 flex flex-col">
            <div className="text-sm md:text-base font-medium text-blue-800 mb-2 md:mb-4">
              Your Information
            </div>
            <div className="space-y-4 flex-1 flex flex-col">
              {(
                [
                  ["name", "Your Name", "Name?"],
                  ["address", "Your Address", "Location?"],
                  ["phone", "Your Phone", "Phone Number?"],
                ] as const
              ).map(([field, label, placeholder]) => (
                <div key={field} className="relative">
                  <input
                    type={field === "phone" ? "tel" : "text"}
                    value={form[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full rounded-lg border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/80 py-3 px-4 pl-10"
                    placeholder={placeholder}
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                    {field === "name" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {field === "address" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {field === "phone" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              
              {/* submit */}
              <div className="mt-auto pt-4 md:mt-6">
                <button
                  type="submit"
                  disabled={!selectedDate}
                  className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm relative overflow-hidden group"
                >
                  <span className="relative z-10">Book Free Consultation</span>
                  <div className="absolute inset-0 h-full w-full bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-out"></div>
                </button>
                {!selectedDate && (
                  <p className="text-sm text-blue-600 text-center mt-2">Please select a date first</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}