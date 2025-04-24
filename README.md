# Woodmont Landscape Lighting & Decor

A modern, single-page web app for booking and managing landscape lighting consultations in the Woodmont neighborhood (Cherokee County, GA). Built with [Convex](https://convex.dev) for backend and state management, this project is designed for a clean, image-free user experience with strong interactivity and a simple admin workflow.

---

## Features

- **Instant Quote Calculator:**  
  Users can estimate the cost and installation time for their landscape lighting project by entering the number of spotlights, pathway lights, area lights, and transformers. Pricing and time estimates are shown live.

- **Consultation Booking Calendar:**  
  Users can book an in-person consultation by selecting an available day (one per day, no time slots). The form collects name, address, and phone number.

- **Partial Entry Tracking:**  
  If a user starts filling out the booking form but doesn’t submit, their partial entry is saved for follow-up or analytics.

- **Admin Dashboard:**  
  - View all consultation bookings (list and calendar views)
  - Edit, accept, or reschedule bookings (with status tracking)
  - View and delete partial (draft) entries
  - All admin actions are protected by authentication

- **Floating Call Button:**  
  Users can call the business directly. During school hours or late at night, the button displays a friendly message and suggests booking or emailing instead.

---

## Pricing Logic

- **Spotlights:** $40 each (installed, includes wiring)
- **Pathway Lights:** $30 each (installed, includes wiring)
- **Area Lights:** $50 each (installed, includes wiring)
- **Transformer:** $100 each (installed, includes wiring)
- **Installation Time:**  
  - Spotlights/Area Lights: 10 minutes each  
  - Pathway Lights: 5 minutes each  
  - Transformers: 20 minutes each

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Convex (serverless database, mutations, queries)
- **State Management:** Convex React hooks
- **Notifications:** [sonner](https://sonner.emilkowal.ski/) for toasts

---

## Project Structure

- `/convex/`  
  Convex backend functions (mutations, queries, data models)
- `/src/`  
  React components for calculator, booking calendar, admin dashboard, call button, etc.
- `/src/main.tsx`  
  Main SPA entry point

---

## Key Files

- `ServiceCalculator.tsx`  
  Interactive quote calculator for users
- `BookingCalendar.tsx`  
  Consultation booking form and calendar
- `CallButton.tsx`  
  Floating call button with school hours logic
- `AdminDashboard.tsx`  
  Admin interface for managing bookings and drafts
- `/convex/consultations.ts`  
  Convex backend logic for bookings, partial entries, and admin queries

---

## Setup & Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/spencermorris04/noah-landscaping-site.git
   cd noah-landscaping-site
   ```

2. **Create a Convex Project**

- Go to [Convex Dashboard](https://dashboard.convex.dev/) and sign in.
- Click **"Create Project"** and follow the prompts to set up a new project.

3. **Get Your Convex Environment Variables**

- In your Convex dashboard, go to your project’s **Settings**.
- Find your **Deploy Key** and **Deployment Name**.
- You’ll also need your **Convex Cloud URL** (shown in the dashboard).

4. **Configure Your Local Environment**

Create a `.env` file in the root of your project and add the following (replace with your actual values):

```env
# Convex deploy key (keep this secret!)
CONVEX_DEPLOY_KEY=project:your-email:your-project-name|your-key

# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:your-deployment-name

# Convex Cloud URL for your deployment
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud
```