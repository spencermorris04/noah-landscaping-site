// App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { Toaster } from "sonner";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { SignOutButton } from "./SignOutButton";
import { AdminDashboard } from "./AdminDashboard";
import HomePage from "./Home";

// This Header component is now global
function Header() {
  const me = useQuery(api.auth.loggedInUser);
  const signUpsEnabled = useQuery(api.auth.signUpsEnabled);

  return (
    <header className="bg-[#0f3d2e] text-white sticky top-0 z-50 shadow-md">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <h1 className="text-xs sm:text-xl font-bold whitespace-nowrap">
          <a href="/" className="hover:text-lime-400"> {/* Make logo a link to home */}
            Cherokee Landscaping
          </a>
        </h1>
        <nav className="flex items-center gap-x-4 text-xs sm:text-base font-medium whitespace-nowrap">
          {/* Restored navigation links */}
          <a href="/services" className="hover:text-lime-400">
            Services
          </a>
          <a href="/about" className="hover:text-lime-400">
            About
          </a>
          <a href="/pricing" className="hover:text-lime-400">
            Pricing
          </a>

          {me ? ( // If user is logged in
            <>
              <a href="/admin" className="hover:text-lime-400">
                Admin
              </a>
              <SignOutButton />
            </>
          ) : // User is not logged in
          signUpsEnabled === undefined ? null : signUpsEnabled ? (
            // Sign ups are enabled
            <>
              <button
                onClick={() =>
                  (document.getElementById("global-signin-modal") as HTMLDialogElement)?.showModal()
                }
                className="hover:text-lime-400 transition"
              >
                Login
              </button>
              <button
                onClick={() =>
                  (document.getElementById("global-signup-modal") as HTMLDialogElement)?.showModal()
                }
                className="hover:text-lime-400 transition text-green-400"
              >
                Sign Up
              </button>
            </>
          ) : (
            // Sign ups are NOT enabled
            <button
              onClick={() =>
                (document.getElementById("global-signin-modal") as HTMLDialogElement)?.showModal()
              }
              className="hover:text-lime-400 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>

      {/* Login Modal (now part of the global Header) */}
      <dialog id="global-signin-modal" className="p-6 rounded-lg shadow-xl backdrop:bg-black/20">
        <SignInForm />
        <button
          onClick={() =>
            (document.getElementById("global-signin-modal") as HTMLDialogElement)?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>

      {/* Sign Up Modal (now part of the global Header) */}
      <dialog id="global-signup-modal" className="p-6 rounded-lg shadow-xl backdrop:bg-black/20">
        <SignUpForm />
        <button
          onClick={() =>
            (document.getElementById("global-signup-modal") as HTMLDialogElement)?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>
    </header>
  );
}

// Admin-only route protection: redirects if not logged in
function AdminRoute() {
  const me = useQuery(api.auth.loggedInUser);
  if (me === undefined) return null; // Still loading
  return me ? <AdminDashboard /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Global Header is rendered here, above the routes */}
      <main className="flex-1"> {/* This will contain the page content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminRoute />} />
          {/* Define routes for /services, /about, /pricing if you create those pages */}
          {/* <Route path="/services" element={<ServicesPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/pricing" element={<PricingPage />} /> */}
        </Routes>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
