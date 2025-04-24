import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { AdminDashboard } from "./AdminDashboard";
import { BookingCalendar } from "./BookingCalendar";
import { ServiceCalculator } from "./ServiceCalculator";
import { CallButton } from "./CallButton";


export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1 p-8 bg-gradient-to-b from-blue-50 to-white">
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </main>
      <CallButton />
      <Toaster />
    </>
  );
}

/* ---------- Routes ------------------------------------------------------ */

function AdminRoute() {
  const me = useQuery(api.auth.loggedInUser);
  if (me === undefined) return null; // loading
  return me ? <AdminDashboard /> : <Navigate to="/" replace />;
}

/* ---------- Layout pieces ---------------------------------------------- */

function Header() {
  const me = useQuery(api.auth.loggedInUser);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-blue-100">
      <h1 className="text-xl font-display text-blue-900">
        Woodmont Landscape Lighting
      </h1>
      <div className="flex gap-2 items-center">
        {me ? (
          <>
            <a
              href="/admin"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Admin
            </a>
            <SignOutButton />
          </>
        ) : (
          <button
            onClick={() =>
              (document.getElementById("signin") as HTMLDialogElement)?.showModal()
            }
            className="text-blue-600 hover:text-blue-800"
          >
            Admin Login
          </button>
        )}
      </div>

      {/* modal */}
      <dialog id="signin" className="p-6 rounded-lg shadow-xl backdrop:bg-black/20">
        <SignInForm />
        <button
          onClick={() =>
            (document.getElementById("signin") as HTMLDialogElement)?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>
    </header>
  );
}

function PublicView() {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <Intro />
      <ServiceCalculator />
      <BookingCalendar />
    </div>
  );
}

function Intro() {
  return (
    <section className="text-center space-y-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-display font-bold mb-6 text-blue-900">
          Hey there! I'm Noah, your local landscape lighting expert 👋
        </h2>
        <p className="text-xl text-blue-800 leading-relaxed mb-6">
          I'm a junior at Creekview High School with an entrepreneurial spirit
          and an eye for detail. I've turned my passion for outdoor aesthetics
          into a mission: bringing professional landscape lighting to our
          community at prices that make sense.
        </p>
        <p className="text-lg text-blue-700">
          What sets me apart? I'm not a big corporation with overhead
          costs — I'm a dedicated student who does this because I love it.
          Every installation gets my personal attention, and I won't rest until
          your home looks exactly how you imagined it.
        </p>
      </div>
    </section>
  );
}
