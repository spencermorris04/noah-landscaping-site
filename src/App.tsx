// App.tsx

// === React routing and data fetching ===
import { Routes, Route, Navigate } from "react-router-dom"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

// === UI Components ===
import { Toaster } from "sonner"
import { SignInForm } from "./SignInForm"
import { SignOutButton } from "./SignOutButton"
import { AdminDashboard } from "./AdminDashboard"
import { BookingCalendar } from "./BookingCalendar"
import { ServiceCalculator } from "./ServiceCalculator"
import { CallButton } from "./CallButton"
import { ProductSlider } from "./ProductSlider"
import { Hero } from "./Hero"
import heroImg from "./HeroImage.jpg"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-blue-900">
      <Header />
      <main className="flex-1 p-4 md:p-8 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800">
        {/* Main route definitions */}
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </main>
      <CallButton />
      <Footer />
      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  )
}

// Admin-only route protection: redirects if not logged in
function AdminRoute() {
  const me = useQuery(api.auth.loggedInUser)
  if (me === undefined) return null // still loading
  return me ? <AdminDashboard /> : <Navigate to="/" replace />
}

// Reusable card for services section
function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white-100 dark:bg-white p-12 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}

// Public homepage layout
function PublicView() {
  return (
    <div>
      <Hero />
      <section id="services" className="max-w-6xl mx-auto px-4 py-4 space-y-2">
        {/* Core features in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="Professional Design" description="Tailored lighting plans that enhance beauty and safety." />
          <InfoCard title="Efficient Installation" description="Fast, clean, and expert setup by a local team." />
          <InfoCard title="Student Pricing" description="Premium quality work at a price that makes sense." />
        </div>
        <ProductSlider />
        {/* Booking + service calculator section */}
        <section id="services" className="max-w-12xl mx-auto px-6 py-12 space-y-12">
          <ServicesLayout />
        </section>
      </section>
    </div>
  )
}

// Top navbar with login and admin access
function Header() {
  const me = useQuery(api.auth.loggedInUser)

  return (
    <header className="sticky top-0 z-50 bg-gray-100/90 dark:bg-gray-900/80 backdrop-blur p-4 shadow-sm">
      <div className=" flex justify-between items-center">
        {/* Site name */}
        <h1 className="text-2xl font-display font-bold">
          <span className="text-blue-600">Canton</span>{" "}
          <span className="text-blue-400">Landscape Lighting</span>
        </h1>

        {/* Login/Admin actions */}
        <div className="flex gap-2 items-center">
          {me ? (
            <>
              <a href="/admin" className="text-blue-600 hover:underline">
                Admin
              </a>
              <SignOutButton />
            </>
          ) : (
            <button
              onClick={() =>
                (document.getElementById("signin") as HTMLDialogElement)?.showModal()
              }
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Login modal */}
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
  )
}

// Layout for service calculator + booking calendar
function ServicesLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <ServiceCalculator />
      <section id="calendar" className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <BookingCalendar />
      </section>
    </div>
  )
}

// Bottom footer with contact info
function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="mb-4 md:mb-0">
          <div className="font-display font-bold text-xl">
            Canton Landscape Lighting
          </div>
          <div className="text-blue-200 text-sm mt-1">
            Serving Picket County and surrounding areas and abroad
          </div>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <div className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Canton Lighting
          </div>
          <div className="mt-2">
            <a
              href="tel:+14041234567"
              className="text-white hover:text-blue-200 transition-colors mr-4"
            >
              (470) 641-8216
            </a>
            <a
              href="mailto:noah@cantonlighting.com"
              className="text-white hover:text-blue-200 transition-colors"
            >
              noah@cantonlighting.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
