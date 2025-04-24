"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Sign-in only – sign-up and anonymous access removed.
 */
export function SignInForm() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 w-72"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.target as HTMLFormElement);
        formData.set("flow", "signIn"); // force sign-in
        void signIn("password", formData).catch(() => {
          toast.error("Could not sign in");
          setSubmitting(false);
        });
      }}
    >
      <input
        className="input-field"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className="input-field"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button className="auth-button" type="submit" disabled={submitting}>
        Sign in
      </button>
    </form>
  );
}
