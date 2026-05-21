import { describe, it, expect } from "vitest";
import { buildGreetingMessage } from "@/components/ui/GreetingBubble";

// Pure function — the React component side of GreetingBubble is render-only
// and exercised in Phase 2 integration. This test covers the four message
// branches in buildGreetingMessage so the kcal-left rounding + day-of-week
// derivation can't silently regress.

describe("buildGreetingMessage", () => {
  const baseOpts = {
    displayName: "Julie",
    caloriesTarget: 2100,
    // Wednesday 2026-05-20 in the test fixture so day-of-week is deterministic.
    date: "2026-05-20",
  };

  it("returns the 'have about X kcal left' message when 400+ remain", () => {
    const msg = buildGreetingMessage({
      ...baseOpts,
      caloriesEatenToday: 1000, // 1100 left, > 400 threshold
    });
    expect(msg).toBe(
      "Happy Wednesday, Julie. You have about 1100 kcal left for the day. What are we cooking tonight?",
    );
  });

  it("returns the 'almost there' message in the 0-400 kcal-left window", () => {
    const msg = buildGreetingMessage({
      ...baseOpts,
      caloriesEatenToday: 1800, // 300 left
    });
    expect(msg).toBe(
      "Happy Wednesday, Julie. Almost there — just 300 kcal left. One more meal to go!",
    );
  });

  it("returns the 'hit your goal' message when calLeft is at or below zero", () => {
    const msg = buildGreetingMessage({
      ...baseOpts,
      caloriesEatenToday: 2200, // 100 over
    });
    expect(msg).toBe(
      "Happy Wednesday, Julie. You hit your goal today. Proud of you!",
    );
  });

  it("returns the 'nothing logged yet' branch when zero calories logged", () => {
    // Codex review fix (PR #41, 2026-05-21): when caloriesEatenToday === 0,
    // the zero-logged check now runs BEFORE the >400-left check. Without
    // this ordering, the user would see "you have 2100 kcal left" first
    // thing in the morning instead of the gentler "Nothing logged yet"
    // greeting.
    const msg = buildGreetingMessage({
      ...baseOpts,
      caloriesEatenToday: 0,
      caloriesTarget: 2100,
    });
    expect(msg).toBe(
      "Happy Wednesday, Julie. Nothing logged yet today — what kicked it off?",
    );
  });

  it("uses the system today's date when `date` is omitted", () => {
    // Just verify it doesn't crash and produces a string with the
    // user's name + a recognizable day-of-week prefix.
    const msg = buildGreetingMessage({
      displayName: "Julie",
      caloriesEatenToday: 500,
      caloriesTarget: 2100,
    });
    expect(msg).toMatch(/^Happy \w+, Julie\./);
  });
});
