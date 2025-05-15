// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import {SignInForm} from './SignInForm';
import {SignUpForm} from './SignUpForm';
import {SignOutButton} from './SignOutButton';

export default function Header() {
  const me = useQuery(api.auth.loggedInUser);
  const signUpsEnabled = useQuery(api.auth.signUpsEnabled) ?? false;

  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#0f3d2e] text-white sticky top-0 z-50 shadow-md">
        <div className="w-full px-2 sm:px-4 py-3 flex flex-wrap justify-between items-center">
        <h1 className="text-[10px] sm:text-xs md:text-xl font-bold whitespace-normal sm:whitespace-nowrap">
          <a href="/" className="hover:text-lime-400">Cherokee Landscaping</a>
        </h1>
        <nav className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 md:gap-x-4 text-[10px] sm:text-xs md:text-base font-medium whitespace-normal sm:whitespace-nowrap">
          {/* Services dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => setServicesOpen(v => !v)}
              className="flex items-center hover:text-lime-400 transition"
            >
              Services
              <svg
                className="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0f3d2e] text-white rounded-md shadow-lg z-50">
                <a
                  href="/services/CameraInstallation"
                  className="block px-4 py-2 hover:bg-lime-600"
                >
                  Camera Installation
                </a>
                <a
                  href="/services/LawnMowing"
                  className="block px-4 py-2 hover:bg-lime-600"
                >
                  Lawn Mowing
                </a>
                <a
                  href="/services/Lighting"
                  className="block px-4 py-2 hover:bg-lime-600"
                >
                  Lighting
                </a>
                <a
                  href="/services/Mulching"
                  className="block px-4 py-2 hover:bg-lime-600"
                >
                  Mulching
                </a>
                <a
                  href="/services/WeedRemoval"
                  className="block px-4 py-2 hover:bg-lime-600"
                >
                  Weed Removal
                </a>
                {/* add or remove links as needed */}
              </div>
            )}
          </div>

          <a href="/about" className="hover:text-lime-400">About</a>
          <a href="/pricing" className="hover:text-lime-400">Pricing</a>

          {me ? (
            <>
              <a href="/admin" className="hover:text-lime-400">Admin</a>
              <SignOutButton />
            </>
          ) : signUpsEnabled === undefined ? null : signUpsEnabled ? (
            <>
              <button
                onClick={() =>
                  (document.getElementById('global-signin-modal') as HTMLDialogElement)
                    ?.showModal()
                }
                className="hover:text-lime-400 transition"
              >
                Login
              </button>
              <button
                onClick={() =>
                  (document.getElementById('global-signup-modal') as HTMLDialogElement)
                    ?.showModal()
                }
                className="hover:text-lime-400 transition text-green-400"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                (document.getElementById('global-signin-modal') as HTMLDialogElement)
                  ?.showModal()
              }
              className="hover:text-lime-400 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>


      {/* Sign-In Modal */}
      <dialog
        id="global-signin-modal"
        className="p-6 rounded-lg shadow-xl backdrop:bg-black/20"
      >
        <SignInForm />
        <button
          onClick={() =>
            (document.getElementById('global-signin-modal') as HTMLDialogElement)
              ?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>

      {/* Sign-Up Modal */}
      <dialog
        id="global-signup-modal"
        className="p-6 rounded-lg shadow-xl backdrop:bg-black/20"
      >
        <SignUpForm />
        <button
          onClick={() =>
            (document.getElementById('global-signup-modal') as HTMLDialogElement)
              ?.close()
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </dialog>
    </header>
  );
}
