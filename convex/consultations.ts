import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/* ───────────── constants ──────────────────────────────────────────── */

const ACTIVE_STATUSES = ["pending", "confirmed", "rescheduled"] as const;

/* ───────────── drafts ─────────────────────────────────────────────── */

export const savePartialEntry = mutation({
  args: {
    id: v.optional(v.id("partialEntries")),
    name: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...rest }) => {
    if (id) {
      await ctx.db.patch(id, { ...rest, timestamp: Date.now() });
      return id;
    }
    return await ctx.db.insert("partialEntries", {
      timestamp: Date.now(),
      ...rest,
    });
  },
});

export const deletePartialEntry = mutation({
  args: { id: v.id("partialEntries") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.delete(id);
  },
});

/* ───────────── consultations ──────────────────────────────────────── */

/**
 * Create or revive a consultation.
 * – If the date has a *cancelled* row we PATCH it back to "pending".
 * – Otherwise we INSERT a brand-new document.
 * – Any active booking blocks the date.
 */
export const bookConsultation = mutation({
  args: {
    date: v.string(),
    name: v.string(),
    address: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("consultations")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .unique();

    if (existing) {
      if (existing.status !== "cancelled") {
        throw new Error("This date is already booked");
      }
      // revive the cancelled row instead of creating a duplicate
      await ctx.db.patch(existing._id, { ...args, status: "pending" });
      return;
    }

    await ctx.db.insert("consultations", { ...args, status: "pending" });
  },
});

export const updateConsultation = mutation({
  args: {
    id: v.id("consultations"),
    date: v.optional(v.string()),
    name: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...changes }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(id, changes);
  },
});

/* ───────────── queries ────────────────────────────────────────────── */

/** Calendar view – return *only* active (non-cancelled) bookings. */
export const getBookedDates = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("consultations").collect();
    return rows
      .filter((r) => ["pending", "confirmed", "rescheduled"].includes(r.status))
      .map((r) => r.date);
  },
});


/** Same filter but returns the full rows for admin dashboards. */
export const getActiveBookings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("consultations")
      .filter((q) =>
        q.or(
          q.eq("status", ACTIVE_STATUSES[0]),
          q.eq("status", ACTIVE_STATUSES[1]),
          q.eq("status", ACTIVE_STATUSES[2])
        )
      )
      .collect();
  },
});

/** Auth-required: list every consultation, regardless of status. */
export const listConsultations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.query("consultations").collect();
  },
});

/** Auth-required: recover the most recent partial entries. */
export const listPartialEntries = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("partialEntries")
      .withIndex("by_timestamp", (q) => q)
      .order("desc")
      .collect();
  },
});
