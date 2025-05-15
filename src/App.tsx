// App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { Toaster } from "sonner";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { SignOutButton } from "./SignOutButton";
import { AdminDashboard } from "./AdminDashboard";
import Header from "./Header";
import HomePage from "./Home";
import CameraInstallation from "./Services/CameraInstallation";
import LawnMowing from "./Services/LawnMowing";
import Lighting from "./Services/Lighting";
import WeedRemoval from "./Services/WeedRemoval";
import Mulching from "./Services/Mulching";

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
          <Route path="/services/CameraInstallation" element={<CameraInstallation />} />
          <Route path="/services/LawnMowing" element={<LawnMowing />} />
          <Route path="/services/Lighting" element={<Lighting />} />
          <Route path="/services/WeedRemoval" element={<WeedRemoval />} />
          <Route path="/services/Mulching" element={<Mulching />} />
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
