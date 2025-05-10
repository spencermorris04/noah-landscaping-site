<<<<<<< HEAD
// App.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
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

=======
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
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </main>
      <CallButton />
      <Footer />
      <Toaster position="top-center" />
    </div>
<<<<<<< HEAD
  )
}

function AdminRoute() {
  const me = useQuery(api.auth.loggedInUser)
  if (me === undefined) return null
  return me ? <AdminDashboard /> : <Navigate to="/" replace />
}


function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white-100 dark:bg-white p-12 rounded-xl shadow-md hover:shadow-lg transition">

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}


function PublicView() {
  return (
    <div>
      <Hero />
      <section id="services" className="max-w-6xl mx-auto px-4 py-4 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="Professional Design" description="Tailored lighting plans that enhance beauty and safety." />
          <InfoCard title="Efficient Installation" description="Fast, clean, and expert setup by a local team." />
          <InfoCard title="Student Pricing" description="Premium quality work at a price that makes sense." />
        </div>
        <ProductSlider />
        <section id="services" className="max-w-12xl mx-auto px-6 py-12 space-y-12">

          <ServicesLayout />
        </section>
      </section>
    </div>
  )
}


function Header() {
  const me = useQuery(api.auth.loggedInUser)

  return (
    <header className="sticky top-0 z-50 bg-gray-100/90 dark:bg-gray-900/80 backdrop-blur p-4 shadow-sm">
      <div className=" flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold">
          <span className="text-blue-600">Canton</span>{" "}
          <span className="text-blue-400">Landscape Lighting</span>
        </h1>

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

=======
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
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
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
<<<<<<< HEAD

  )
=======
  );
}

function PublicView() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <Intro />
      <ServicesLayout />
    </div>
  );
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
}

function ServicesLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <ServiceCalculator />
<<<<<<< HEAD
      <section id="calendar" className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        <BookingCalendar />
      </section>

    </div>
  )
}


=======
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
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
<<<<<<< HEAD
          <div className="font-display font-bold text-xl">
            Canton Landscape Lighting
          </div>
          <div className="text-blue-200 text-sm mt-1">
            Serving Cherokee County and surrounding areas
          </div>
        </div>
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
=======
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
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
            </a>
          </div>
        </div>
      </div>
    </footer>
<<<<<<< HEAD
  )
}
=======
  );
} 
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
