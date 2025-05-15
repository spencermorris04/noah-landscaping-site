import React, { useState } from "react"; // Added React import for JSX
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import { toast } from "sonner";

// Define a more specific type for consultations if possible, for now 'any' is used from original
type Consultation = any; // Replace 'any' with your actual Consultation type
type PartialEntry = any; // Replace 'any' with your actual PartialEntry type

export function AdminDashboard() {
  const [view, setView] = useState<"list" | "calendar" | "partial">("list");
  const [editing, setEditing] = useState<Consultation | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Consultation | null>(
    null,
  );

  const consultations = useQuery(api.consultations.listConsultations) || [];
  const partialEntries = useQuery(api.consultations.listPartialEntries) || [];

  const updateConsult = useMutation(api.consultations.updateConsultation);
  const deleteDraft = useMutation(api.consultations.deletePartialEntry);

  const activeBookings = consultations
    .filter((c: Consultation) => c.status !== "cancelled")
    .reduce((acc: Consultation[], row: Consultation) => {
      if (!acc.find((r) => r._id === row._id)) {
        acc.push(row);
      }
      return acc;
    }, []);

  const statusColors: Record<string, { bg: string; text: string; border?: string }> = {
    pending:     { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
    confirmed:   { bg: "bg-green-100",  text: "text-green-800",  border: "border-green-300" },
    rescheduled: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
    completed:   { bg: "bg-blue-100",   text: "text-blue-800",   border: "border-blue-300" },
    cancelled:   { bg: "bg-red-100",    text: "text-red-800",    border: "border-red-300" },
  };

  return (
    // Main container with padding
    <div className="p-4 md:p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="bg-white p-1.5 rounded-lg shadow-sm inline-flex border border-gray-200">
        {(
          [
            ["list", "List View"],
            ["calendar", "Calendar"],
            ["partial", "Drafts"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${
                view === key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content Area based on view */}
      <div className="mt-6">
        {/* List View */}
        {view === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultations.length > 0 ? (
              consultations.map((c: Consultation) => (
                <button
                  key={c._id}
                  onClick={() => setEditing(c)}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-left hover:shadow-xl hover:ring-2 hover:ring-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none"
                >
                  <header className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 break-words">
                      {c.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-bold leading-tight rounded-full capitalize whitespace-nowrap
                        ${statusColors[c.status]?.bg || "bg-gray-100"}
                        ${statusColors[c.status]?.text || "text-gray-800"}
                        ${statusColors[c.status]?.border ? `border ${statusColors[c.status]?.border}` : ""}
                      `}
                    >
                      {c.status}
                    </span>
                  </header>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Date:</strong> {c.date}</p>
                    <p className="truncate"><strong>Address:</strong> {c.address}</p>
                    <p><strong>Phone:</strong> {c.phone}</p>
                    {c.notes && (
                      <p className="mt-2 pt-2 border-t border-gray-200 italic text-gray-500 text-xs max-h-20 overflow-y-auto">
                        <strong>Notes:</strong> {c.notes}
                      </p>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10">No consultations found.</p>
            )}
          </div>
        )}

        {/* Calendar View */}
        {view === "calendar" && (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Calendar Header (Optional) */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center font-semibold text-xs text-gray-500 py-2 border-b border-gray-200">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = new Date();
                day.setHours(0, 0, 0, 0);
                // This calendar logic is basic, for a real app use a library
                // For simplicity, starting from 1st of current month (approx)
                const today = new Date();
                day.setDate(1); // Start from 1st of month
                day.setDate(day.getDate() - day.getDay() + i); // Adjust to start of week and iterate

                const dateStr = day.toISOString().split("T")[0];
                const booking = activeBookings.find(
                  (b: Consultation) => b.date === dateStr,
                );
                const isCurrentMonth = day.getMonth() === today.getMonth();

                return (
                  <button
                    key={i}
                    className={`p-2 border border-gray-200 rounded-md min-h-[80px] sm:min-h-[120px] text-left flex flex-col items-start justify-start transition-colors duration-150 ease-in-out
                      ${isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
                      ${booking ? "hover:bg-blue-50 cursor-pointer" : "hover:bg-gray-100"}
                      ${day.toDateString() === today.toDateString() ? "ring-2 ring-blue-500" : ""}
                    `}
                    onClick={() => booking && setSelectedBooking(booking)}
                    disabled={!isCurrentMonth && !booking}
                  >
                    <div className={`font-semibold text-sm ${isCurrentMonth ? "text-gray-700" : "text-gray-400"}`}>
                      {day.getDate()}
                    </div>
                    {booking && isCurrentMonth && (
                      <div className={`mt-1 p-1.5 rounded text-xs w-full overflow-hidden truncate ${statusColors[booking.status]?.bg || "bg-gray-100"} ${statusColors[booking.status]?.text || "text-gray-800"}`}>
                        <div className="font-semibold truncate">{booking.name}</div>
                        <div className="capitalize">{booking.status}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedBooking && (
              <Modal onClose={() => setSelectedBooking(null)}>
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  {selectedBooking.name}
                </h3>
                <InfoRow label="Date" value={selectedBooking.date} />
                <InfoRow label="Address" value={selectedBooking.address} />
                <InfoRow label="Phone" value={selectedBooking.phone} />
                <InfoRow label="Status" value={
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[selectedBooking.status]?.bg} ${statusColors[selectedBooking.status]?.text}`}>
                    {selectedBooking.status}
                  </span>
                } />
                {selectedBooking.notes && (
                  <InfoRow label="Notes" value={selectedBooking.notes} />
                )}
                 <button
                    onClick={() => {
                      setEditing(selectedBooking);
                      setSelectedBooking(null);
                    }}
                    className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit Booking
                  </button>
              </Modal>
            )}
          </div>
        )}

        {/* Drafts View */}
        {view === "partial" && (
          <div className="space-y-4">
            {partialEntries.length > 0 ? (
              partialEntries.map((e: PartialEntry) => (
                <div
                  key={e._id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="text-xs text-gray-500 mb-1">
                      Created: {new Date(e.timestamp).toLocaleString()}
                    </div>
                    {e.name && <div><strong>Name:</strong> {e.name}</div>}
                    {e.address && <div><strong>Address:</strong> {e.address}</div>}
                    {e.phone && <div><strong>Phone:</strong> {e.phone}</div>}
                  </div>
                  <button
                    onClick={() =>
                      deleteDraft({ id: e._id as Id<"partialEntries"> }).then(
                        () => toast.success("Draft deleted"),
                      )
                    }
                    className="self-start sm:self-center p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    aria-label="Delete draft"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No drafts found.</p>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <EditConsultationModal
          initial={editing}
          onSave={async (changes) => {
            await updateConsult({ id: editing._id, ...changes });
            toast.success("Consultation Saved");
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  // Improved modal styling
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-3 grid grid-cols-3 gap-2 items-start">
      <dt className="text-sm font-semibold text-gray-600 col-span-1">{label}:</dt>
      <dd className="text-sm text-gray-800 col-span-2">{value}</dd>
    </div>
  );
}

function EditConsultationModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Consultation;
  onSave: (changes: Partial<Consultation>) => void; // Use Partial for changes
  onClose: () => void;
}) {
  const [draft, setDraft] = useState({
    date: initial.date || "",
    name: initial.name || "",
    address: initial.address || "",
    phone: initial.phone || "",
    status: initial.status || "pending",
    notes: initial.notes || "",
  });

  const statuses = ["pending", "confirmed", "rescheduled", "completed", "cancelled"];

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-150 ease-in-out";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Edit Consultation
      </h3>

      <form onSubmit={(e) => { e.preventDefault(); onSave(draft); }} className="space-y-4">
        {(
          [
            ["date", "Date", "date"],
            ["name", "Name", "text"],
            ["address", "Address", "text"],
            ["phone", "Phone", "tel"],
          ] as const
        ).map(([field, label, type]) => (
          <div key={field}>
            <label htmlFor={field} className={labelClass}>
              {label}
            </label>
            <input
              id={field}
              type={type}
              value={draft[field as keyof typeof draft]} // Type assertion
              onChange={(e) =>
                setDraft((d) => ({ ...d, [field]: e.target.value }))
              }
              className={inputClass}
              required={field === "name" || field === "date"} // Example: make name and date required
            />
          </div>
        ))}

        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            value={draft.status}
            onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
            className={inputClass}
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Add this to your tailwind.config.js or a global CSS file for the modal animation
/*
@keyframes modalShow {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-modalShow {
  animation: modalShow 0.3s ease-out forwards;
}
*/
