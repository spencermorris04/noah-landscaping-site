import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  consultations: defineTable({
    date: v.string(),
    name: v.string(),
    address: v.string(),
    phone: v.string(),
    status: v.string(), // "pending", "confirmed", "rescheduled", "cancelled"
    notes: v.optional(v.string()),
  }).index("by_date", ["date"]),
  
  partialEntries: defineTable({
    timestamp: v.number(),
    name: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
  }).index("by_timestamp", ["timestamp"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});