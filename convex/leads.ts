import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS = 3;

export const submit = mutation({
  args: {
    email: v.string(),
    consent: v.boolean(),
    country: v.string(),
    city: v.optional(v.string()),
    lifestyle: v.string(),
    stayLength: v.number(),
    housingType: v.string(),
    travelerType: v.string(),
    workStyle: v.string(),
    totalCost: v.number(),
    breakdown: v.string(),
    deviceId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { deviceId } = args;
    const now = Date.now();

    // Rate limiting
    if (deviceId) {
      const existing = await ctx.db
        .query("rateLimits")
        .withIndex("by_device", (q) => q.eq("deviceId", deviceId))
        .first();

      if (existing) {
        const recentSubmissions = existing.submissions.filter(
          (t) => now - t < RATE_LIMIT_WINDOW
        );

        if (recentSubmissions.length >= MAX_SUBMISSIONS) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }

        await ctx.db.patch(existing._id, {
          submissions: [...recentSubmissions, now],
        });
      } else {
        await ctx.db.insert("rateLimits", {
          deviceId,
          submissions: [now],
        });
      }
    }

    // Insert the lead
    return await ctx.db.insert("emailLeads", {
      email: args.email,
      consent: args.consent,
      country: args.country,
      city: args.city,
      lifestyle: args.lifestyle,
      stayLength: args.stayLength,
      housingType: args.housingType,
      travelerType: args.travelerType,
      workStyle: args.workStyle,
      totalCost: args.totalCost,
      breakdown: args.breakdown,
      createdAt: now,
      deviceId,
    });
  },
});

// Admin query - requires passcode check on frontend
export const listAll = query({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    // Simple passcode protection
    if (args.passcode !== "travelhub2024admin") {
      return [];
    }

    return await ctx.db
      .query("emailLeads")
      .order("desc")
      .collect();
  },
});

export const exportCSV = query({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    if (args.passcode !== "travelhub2024admin") {
      return "";
    }

    const leads = await ctx.db
      .query("emailLeads")
      .order("desc")
      .collect();

    const headers = "id,email,consent,country,city,lifestyle,stay_length,housing_type,traveler_type,work_style,total,breakdown,created_at\n";
    const rows = leads.map((l) =>
      `${l._id},"${l.email}",${l.consent},"${l.country}","${l.city || ""}","${l.lifestyle}",${l.stayLength},"${l.housingType}","${l.travelerType}","${l.workStyle}",${l.totalCost},"${l.breakdown.replace(/"/g, '""')}",${new Date(l.createdAt).toISOString()}`
    ).join("\n");

    return headers + rows;
  },
});
