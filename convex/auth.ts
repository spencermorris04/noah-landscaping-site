import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { query } from "./_generated/server";

/**
 * Disable new sign-ups:
 * – if the frontend tries to send `flow=signUp` we immediately throw.
 */
const NoSignupPassword = Password({
  profile: (params) => {
    if (params.flow === "signUp") {
      throw new Error("Sign-ups are disabled for this app.");
    }
    // the provider still needs an email to work:
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
