import { SerifIt } from "@/components/ui/SerifIt";

// GreetingBubble — composite component for the Library screen header.
// Renders a card-with-tail message bubble containing a 28×28 ink-disc with
// the user's initial in Instrument Serif italic, plus the dynamic greeting
// text (day-of-week + remaining-kcal). The tail points bottom-right.
//
// Lifted from prototype mobile.jsx MLibrary lines 96-131. The greeting
// message is computed by the caller (server-side, since it depends on
// today's logged calories vs. target) and passed in as `message`. This
// keeps the component itself pure and easy to test.

interface GreetingBubbleProps {
  initial: string;
  message: string;
}

export function GreetingBubble({ initial, message }: GreetingBubbleProps) {
  return (
    <div className="relative my-4">
      <div className="bg-card border border-rule rounded-[18px] rounded-br-[4px] px-4 py-3.5 flex items-start gap-2.5 shadow-lift-sm">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 bg-ink text-paper text-base leading-none"
          aria-hidden
        >
          <SerifIt>{initial}</SerifIt>
        </div>
        <p className="m-0 text-sm leading-[1.5] text-ink-soft flex-1">
          {message}
        </p>
        {/* Tail — bottom right. Two stacked triangles: outer = rule color,
            inner = card color sitting 1px inside. Together they paint a
            chat-tail with the matching border treatment. */}
        <div
          aria-hidden
          className="absolute -bottom-2 right-[18px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid rgb(var(--rule))",
            borderTop: "8px solid rgb(var(--rule))",
            borderRight: "8px solid transparent",
            borderBottom: "8px solid transparent",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-1.5 right-[19px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid rgb(var(--card))",
            borderTop: "7px solid rgb(var(--card))",
            borderRight: "7px solid transparent",
            borderBottom: "7px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

// Helper: build the dynamic message given today's intake. Exported so the
// caller (server component in Library page) computes message text from
// fetched data and passes it in.
//
// Branch order matters: the zero-logged check must come FIRST. Otherwise
// on a default 2100 kcal target, calLeft = 2100 > 400 wins immediately and
// the user sees "you have 2100 kcal left for the day" first thing in the
// morning — which is technically true but reads as goading. Fix per Codex
// P1 finding on PR #41 (2026-05-21): first-of-day users should hear the
// gentler "Nothing logged yet" branch when caloriesEatenToday === 0.
export function buildGreetingMessage(opts: {
  displayName: string;
  caloriesEatenToday: number;
  caloriesTarget: number;
  /** ISO date string ('YYYY-MM-DD') — used to derive day-of-week */
  date?: string;
}): string {
  const { displayName, caloriesEatenToday, caloriesTarget, date } = opts;
  const calLeft = caloriesTarget - caloriesEatenToday;
  const dayName = new Date(
    (date ?? new Date().toISOString().split("T")[0]) + "T12:00:00",
  ).toLocaleDateString("en-US", { weekday: "long" });

  if (caloriesEatenToday === 0) {
    return `Happy ${dayName}, ${displayName}. Nothing logged yet today — what kicked it off?`;
  }
  if (calLeft > 400) {
    return `Happy ${dayName}, ${displayName}. You have about ${calLeft} kcal left for the day. What are we cooking tonight?`;
  }
  if (calLeft > 0) {
    return `Happy ${dayName}, ${displayName}. Almost there — just ${calLeft} kcal left. One more meal to go!`;
  }
  return `Happy ${dayName}, ${displayName}. You hit your goal today. Proud of you!`;
}
