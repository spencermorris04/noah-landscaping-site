// src/pages/ContactPage.tsx
import React, { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mldbzovw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white text-gray-900 flex flex-col">
      {/* Page Header */}
      <header className="bg-[#0f3d2e] py-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Contact Us
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info & Quick Links */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#0f3d2e]">Get in Touch</h2>

          {/* Phone */}
          <div>
            <p className="font-medium">Phone</p>
            <p>
              <a
                href="tel:4706418216"
                className="text-[#0f3d2e] hover:text-lime-400 transition"
              >
                (470) 641-8216
              </a>
            </p>
            <a
              href="tel:4706418216"
              className="inline-block mt-2 px-5 py-3 bg-lime-400 text-[#0f3d2e] font-medium rounded-md hover:bg-lime-500 transition"
            >
              Call Now
            </a>
          </div>

          {/* Email */}
          <div>
            <p className="font-medium">Email</p>
            <p>
              <a
                href="mailto:info@cherokeelandscaping.com"
                className="text-[#0f3d2e] hover:text-lime-400 transition"
              >
                info@cherokeelandscaping.com
              </a>
            </p>
            <a
              href="mailto:info@cherokeelandscaping.com"
              className="inline-block mt-2 px-5 py-3 bg-[#0f3d2e] text-white font-medium rounded-md hover:bg-[#0f3d2e]/90 transition"
            >
              Email Us
            </a>
          </div>

          {/* Address & Hours */}
          <div>
            <p className="font-medium">Address</p>
            <p>161 Boling Ct, Cumming, GA 30028</p>
          </div>
          <div>
            <p className="font-medium">Business Hours</p>
            <p>Mon–Sat: 8 AM – 6 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#0f3d2e]">Send a Message</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-lime-400"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-5 py-3 bg-[#0f3d2e] text-white font-medium rounded-md hover:bg-[#0f3d2e]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending'
              ? 'Sending…'
              : status === 'success'
              ? 'Thanks! We’ll be in touch.'
              : 'Submit'}
          </button>

          {status === 'error' && (
            <p className="text-red-600 text-sm">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
