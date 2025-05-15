import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Admin Account</h2>
      
      <form
        className="flex flex-col gap-4 w-72"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          setError("");
          
          try {
            const formData = new FormData(e.target as HTMLFormElement);
            // Log the form data for debugging (remove in production)
            console.log("Signing up with:", formData.get("email"));
            formData.set("flow", "signUp");
            
            // Use async/await for clearer error handling
            await signIn("password", formData);
            
            // If we get here, sign up succeeded
            console.log("Sign up successful!");
            toast.success("Account created! You are now signed in.");
            
            // Close the modal
            (document.getElementById("signup") as HTMLDialogElement)?.close();
            
            // Navigate to admin page
            setTimeout(() => {
              window.location.href = "/admin";
            }, 500);
          } catch (err) {
            console.error("Sign up error:", err);
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
            toast.error(`Account creation failed: ${message}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input
          className="input-field p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="input-field p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password (minimum 8 characters)"
          required
          minLength={8}
        />
        {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        <button 
          className="auth-button bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          type="submit" 
          disabled={submitting}
        >
          {submitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}