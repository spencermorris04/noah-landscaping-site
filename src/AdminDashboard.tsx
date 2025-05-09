import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import { toast } from "sonner";

export function AdminDashboard() {
  const [view, setView] = useState<"list" | "calendar" | "partial">("list");
  const [editing, setEditing] = useState<any | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const consultations  = useQuery(api.consultations.listConsultations)  || [];
  const partialEntries = useQuery(api.consultations.listPartialEntries) || [];

  const updateConsult  = useMutation(api.consultations.updateConsultation);
  const deleteDraft    = useMutation(api.consultations.deletePartialEntry);

  /* ---------- deduplicate after an edit ------------------------------ */
  const activeBookings = consultations
    .filter((c) => c.status !== "cancelled")
    .reduce((acc: any[], row) => {
      acc.find((r) => r._id === row._id) ? acc : acc.push(row);
      return acc;
    }, []);

  /* ---------- colors -------------------------------------------------- */
  const statusColors: Record<string, string> = {
    pending:     "bg-gray-100 text-gray-800",
    confirmed:   "bg-green-100 text-green-800",
    rescheduled: "bg-yellow-100 text-yellow-800",
    completed:   "bg-blue-100 text-blue-800",
    cancelled:   "bg-red-100 text-red-800",
  };

  /* =================== UI starts here ================================= */

  return (
    <div className="space-y-6">
      {/* nav */}
      <div className="inline-flex rounded-lg shadow-sm overflow-hidden">
        {([
          ["list",     "List View"],
          ["calendar", "Calendar"],
          ["partial",  "Drafts"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              view === key
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* list ----------------------------------------------------------- */}
      {view === "list" && (
        <div className="grid md:grid-cols-2 gap-4">
          {consultations.map((c) => (
            <button
              key={c._id}
              onClick={() => setEditing(c)}
              className="bg-white rounded-xl shadow p-4 border border-blue-50 text-left hover:ring-2 hover:ring-blue-200 transition"
            >
              <header className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-blue-900">{c.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                    statusColors[c.status]
                  }`}
                >
                  {c.status}
                </span>
              </header>
              <p className="text-sm">{c.date}</p>
              <p className="text-sm truncate">{c.address}</p>
              <p className="text-sm">{c.phone}</p>
              {c.notes && (
                <p className="text-sm mt-2 italic text-blue-800">{c.notes}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* calendar ------------------------------------------------------- */}
      {view === "calendar" && (
        <>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = new Date();
              day.setHours(0, 0, 0, 0);
              day.setDate(day.getDate() + i);
              const dateStr = day.toISOString().split("T")[0];
              const booking = activeBookings.find((b) => b.date === dateStr);

              return (
                <button
                  key={i}
                  className={`p-2 border rounded min-h-[100px] text-left ${
                    booking
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => booking && setSelectedBooking(booking)}
                >
                  <div className="font-semibold">{day.getDate()}</div>
                  {booking && (
                    <div className="text-xs mt-1 space-y-0.5">
                      <div className="truncate">{booking.name}</div>
                      <div className="capitalize">{booking.status}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* read-only modal */}
          {selectedBooking && (
            <Modal onClose={() => setSelectedBooking(null)}>
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
                {selectedBooking.name}
              </h3>
              <InfoRow label="Date"     value={selectedBooking.date} />
              <InfoRow label="Address"  value={selectedBooking.address} />
              <InfoRow label="Phone"    value={selectedBooking.phone} />
              <InfoRow label="Status"   value={selectedBooking.status} />
              {selectedBooking.notes && (
                <InfoRow label="Notes" value={selectedBooking.notes} />
              )}
            </Modal>
          )}
        </>
      )}

      {/* drafts --------------------------------------------------------- */}
      {view === "partial" && (
        <div className="space-y-4">
          {partialEntries.map((e) => (
            <div
              key={e._id}
              className="bg-white p-4 rounded-lg shadow border border-blue-50 flex justify-between gap-4"
            >
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(e.timestamp).toLocaleString()}
                </div>
                {e.name    && <div>Name: {e.name}</div>}
                {e.address && <div>Address: {e.address}</div>}
                {e.phone   && <div>Phone: {e.phone}</div>}
              </div>
              <button
                onClick={() =>
                  deleteDraft({ id: e._id as Id<"partialEntries"> }).then(() =>
                    toast.success("Draft deleted"),
                  )
                }
                className="self-start text-gray-400 hover:text-red-600 transition"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {/* edit modal ----------------------------------------------------- */}
      {editing && (
        <EditConsultationModal
          initial={editing}
          onSave={async (changes) => {
            await updateConsult({ id: editing._id, ...changes });
            toast.success("Saved");
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

/* ─────────── shared tiny components ───────────────────────────────── */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-3">
      <dt className="text-sm font-medium text-blue-700">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}

/* --------------- edit form modal ------------------------------------ */

function EditConsultationModal({
  initial,
  onSave,
  onClose,
}: {
  initial: any;
  onSave: (changes: Record<string, any>) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState({
    date:    initial.date,
    name:    initial.name,
    address: initial.address,
    phone:   initial.phone,
    status:  initial.status,
    notes:   initial.notes ?? "",
  });

  const statuses = ["pending", "confirmed", "rescheduled", "completed", "cancelled"];

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4 text-blue-900">
        Edit Consultation
      </h3>

      {(
        [
          ["date",    "Date"],
          ["name",    "Name"],
          ["address", "Address"],
          ["phone",   "Phone"],
        ] as const
      ).map(([field, label]) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-blue-800 mb-1">
            {label}
          </label>
          <input
            type={field === "date" ? "date" : "text"}
            value={draft[field]}
            onChange={(e) =>
              setDraft((d) => ({ ...d, [field]: e.target.value }))
            }
            className="w-full rounded border-blue-200 shadow-sm focus:ring-blue-200"
          />
        </div>
      ))}

      {/* status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-800 mb-1">
          Status
        </label>
        <select
          value={draft.status}
          onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
          className="w-full rounded border-blue-200 shadow-sm focus:ring-blue-200"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-800 mb-1">
          Notes
        </label>
        <textarea
          rows={3}
          value={draft.notes}
          onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
          className="w-full rounded border-blue-200 shadow-sm focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(draft)}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
