# Cherokee landscaping & Decor

A modern, single-page web app for booking and managing landscaping consultations in the Cherokee neighborhood (Cherokee County, GA). Built with [Convex](https://convex.dev) for backend and state management, this project is designed for a clean, image-free user experience with strong interactivity and a simple admin workflow.

---

## Features

- **Instant Quote Calculator:**  
  Users can estimate the cost and installation time for their landscaping project by entering the number of spotlights, pathway lights, area lights, and transformers. Pricing and time estimates are shown live.

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

3. **Generate and Add Convex JWT Environment Variables**

- Run the following script to generate the required JWT environment variables:
  ```bash
  node generateConvexEnv.mjs
  ```
- Copy the output from the script.
- In your Convex dashboard, go to your project’s **Settings** > **Environment Variables**.
- Paste the output into the environment variables section.

4. **Get Your Convex Environment Variables**

- In your Convex dashboard, go to your project’s **Settings**.
- Find your **Deploy Key** and **Deployment Name**.
- You’ll also need your **Convex Cloud URL** (shown in the dashboard).

5. **Configure Your Local Environment**

Create a `.env` file in the root of your project and add the following (replace with your actual values):

```env
# Convex deploy key (keep this secret!)
CONVEX_DEPLOY_KEY=project:your-email:your-project-name|your-key

# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:your-deployment-name

# Convex Cloud URL for your deployment
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud
```

6. **Test Locally**

To test the app on your local machine:

```bash
npx convex dev
```

This starts a local Convex server and runs your app against it. You can now develop and test without deploying to the cloud.

Once you're happy with your changes, push them to your convex cloud:

```bash
npx convex deploy
```

---

### 7. **Disable New User Sign-Ups After Initial Setup**

After you create your initial user account, you should disable new sign-ups to prevent unauthorized registrations.

**To do this:**

1. Open `convex/auth.ts` in your project.
2. Update the `NoSignupPassword` provider and the `signUpsEnabled` query as shown below:

```ts
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { query } from "./_generated/server";

/**
 * Disable new sign-ups:
 * – if the frontend tries to send `flow=signUp` we immediately throw.
 */
const NoSignupPassword = Password({
  profile: (params) => {
    // uncomment to disable sign ups
    if (params.flow === "signUp") {
      throw new Error("Sign-ups are disabled for this app.");
    }
    return { email: params.email as string };
  },
});

export const {
  auth,
  signIn,
  signOut,
  store,
  isAuthenticated,
} = convexAuth({
  providers: [NoSignupPassword],
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return userId ? await ctx.db.get(userId) : null;
  },
});

export const signUpsEnabled = query({
  handler: async (_ctx) => {
    // Return false to indicate sign-ups are disabled
    return false;
  },
});
```

- **Uncomment** the code in the `NoSignupPassword` provider to throw an error if a sign-up is attempted.
- **Set** `signUpsEnabled` to return `false`.

This will prevent any new users from signing up after your initial account is created.

---

8. **Push to GitHub**

Initialize a Git repository (if you haven’t already) and push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/noah-landscaping-site.git
git push -u origin main
```

Replace the remote URL with your actual GitHub repo.

9. **Publish on Vercel**

- Go to [Vercel](https://vercel.com/) and sign in.
- Click **"New Project"** and import your GitHub repo.
- In the setup:
   - Set the framework to **React** (or auto-detect).
   - Add the same `.env` variables used locally.
- Click **Deploy**.

Your app will be live at `https://your-project-name.vercel.app` after deployment.