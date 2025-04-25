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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8 bg-gradient-to-b from-blue-50 to-white">
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </main>
      <CallButton />
      <Footer />
      <Toaster position="top-center" />
    </div>
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
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-4 flex justify-between items-center border-b border-blue-100 shadow-sm">
      <h1 className="text-xl md:text-2xl font-display font-bold text-blue-900">
        Woodmont <span className="text-blue-600">Landscape Lighting</span>
      </h1>
      <div className="flex gap-2 items-center">
        {me ? (
          <>
            <a
              href="/admin"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
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
    <div className="space-y-12 max-w-6xl mx-auto">
      <Intro />
      <ServicesLayout />
    </div>
  );
}

function ServicesLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <ServiceCalculator />
      <BookingCalendar />
    </div>
  );
}

function Intro() {
  return (
    <section className="text-center space-y-6 py-4 md:py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 inline-block p-2 bg-blue-100 rounded-full text-blue-800 font-medium text-sm">
          Professional Quality ⭐ Student Prices
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-blue-900 leading-tight">
          Hey there! I'm Noah, your local landscape lighting expert 👋
        </h2>
        <p className="text-lg md:text-xl text-blue-800 leading-relaxed mb-6">
          I'm a junior at Creekview High School with an entrepreneurial spirit
          and an eye for detail. I've turned my passion for outdoor aesthetics
          into a mission: bringing professional landscape lighting to our
          community at prices that make sense.
        </p>
        <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
          What sets me apart? I'm not a big corporation with overhead
          costs — I'm a dedicated student who does this because I love it.
          Every installation gets my personal attention, and I won't rest until
          your home looks exactly how you imagined it.
        </p>
        
        
        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center w-32">
            <div className="text-2xl text-blue-500 font-bold">100+</div>
            <div className="text-sm text-blue-700">Happy Clients</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center w-32">
            <div className="text-2xl text-blue-500 font-bold">5★</div>
            <div className="text-sm text-blue-700">Avg. Rating</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center w-32">
            <div className="text-2xl text-blue-500 font-bold">30%</div>
            <div className="text-sm text-blue-700">Lower Prices</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="font-display font-bold text-xl">Woodmont Landscape Lighting</div>
          <div className="text-blue-200 text-sm mt-1">Serving Cherokee County and surrounding areas</div>
        </div>
        <div className="text-center md:text-right">
          <div className="text-blue-200 text-sm">© {new Date().getFullYear()} Woodmont Lighting</div>
          <div className="mt-2">
            <a href="tel:+14041234567" className="text-white hover:text-blue-200 transition-colors mr-4">
              (404) 123-4567
            </a>
            <a href="mailto:noah@woodmontlighting.com" className="text-white hover:text-blue-200 transition-colors">
              noah@woodmontlighting.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 