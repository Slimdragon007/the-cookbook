"use client";

import useSWR from "swr";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  GreetingBubble,
  buildGreetingMessage,
} from "@/components/ui/GreetingBubble";
import { Ring } from "@/components/ui/Ring";
import { MacroPill } from "@/components/ui/MacroPill";
import { Surface } from "@/components/ui/Surface";
import { Mono } from "@/components/ui/Mono";

// TodaySnapshot — client component composing the prototype's two
// Library-screen daily-rhythm widgets: the greeting bubble + the
// today-snapshot card with a kcal Ring and macro pills.
//
// Lifted layout from prototype mobile.jsx MLibrary lines 95-156:
// - Greeting bubble: dynamic day-of-week + remaining-kcal message
// - Today snapshot Surface: Ring + label row + 3 MacroPills + log button
//
// Both widgets share the same data fetch, so this component owns the SWR
// call and passes the computed totals down. Server-side rendering of
// these widgets is intentionally avoided — they refresh whenever the
// user returns to Library after logging a meal, which a server-render
// could not do without a route revalidation hint.

interface LogEntry {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  recipes: { name: string } | null;
}

interface DailyTargets {
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Default targets matching the prototype's data.js weekly.target. When
// the project later adds per-user target storage, this becomes a server
// prop with these as the fallback. Wired via a single constant so the
// future swap is a one-line change.
const DEFAULT_TARGETS: DailyTargets = {
  cal: 2100,
  protein: 130,
  carbs: 230,
  fat: 70,
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TodaySnapshotProps {
  displayName: string;
}

// Local-timezone YYYY-MM-DD formatter. `new Date().toISOString().split("T")[0]`
// returns the UTC date, which flips to "tomorrow" in US timezones after
// ~5 PM PT. The Library greeting + Today snapshot need the user's local
// "today" so meals logged just before midnight stay associated with the
// correct visual day. Fix per Codex P1 finding on PR #42 (2026-05-21).
//
// Server-side log_date storage still uses UTC — full timezone correctness
// would also require API changes (out of TASK-027 scope; see TASK-028
// follow-up in the plan addendum).
function localDateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function TodaySnapshot({ displayName }: TodaySnapshotProps) {
  const today = localDateString();
  const { data, isLoading } = useSWR(`/api/log-meal?date=${today}`, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const entries: LogEntry[] = data?.entries || [];

  const totals = entries.reduce(
    (acc, e) => ({
      cal: acc.cal + (e.calories || 0),
      p: acc.p + (e.protein_g || 0),
      c: acc.c + (e.carbs_g || 0),
      f: acc.f + (e.fat_g || 0),
    }),
    { cal: 0, p: 0, c: 0, f: 0 },
  );

  const target = DEFAULT_TARGETS;
  const calPct = Math.round((totals.cal / target.cal) * 100);
  const initial = (displayName[0] || "?").toUpperCase();

  const greetingMessage = buildGreetingMessage({
    displayName,
    caloriesEatenToday: totals.cal,
    caloriesTarget: target.cal,
    date: today,
  });

  return (
    <div className="space-y-3 mb-6">
      <GreetingBubble initial={initial} message={greetingMessage} />

      <Surface
        treatment="bordered"
        className="p-4 flex items-center gap-3.5 shadow-lift-sm rounded-[18px]"
      >
        <Ring
          pct={calPct}
          size={64}
          stroke={6}
          ariaLabel={`${calPct}% of daily calorie target`}
        >
          <Mono className="text-[13px] font-semibold">
            {isLoading ? "…" : `${calPct}%`}
          </Mono>
        </Ring>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-soft mb-0.5">
            Today
          </div>
          <div className="text-base font-medium mb-2 tracking-[-0.01em]">
            <Mono>{totals.cal}</Mono>{" "}
            <span className="text-ink-mute font-normal">
              / {target.cal} kcal
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-soft">
            <span>
              <Mono className="text-ink font-semibold">{totals.p}</Mono> P
            </span>
            <span aria-hidden>·</span>
            <span>
              <Mono className="text-ink font-semibold">{totals.c}</Mono> C
            </span>
            <span aria-hidden>·</span>
            <span>
              <Mono className="text-ink font-semibold">{totals.f}</Mono> F
            </span>
          </div>
        </div>

        {/* 44×44 hit area (ADR-005 / WCAG 2.5.5) wrapping a 36×36 visible
            disc. Same pattern as the IngredientsTab Stepper buttons.
            The aria-label sits on the Link itself so SR users hear "Log a
            meal" regardless of which DOM node receives focus. */}
        <Link
          href="/log"
          aria-label="Log a meal"
          className="w-11 h-11 grid place-items-center shrink-0 active:scale-95 group"
        >
          <span
            aria-hidden
            className="w-9 h-9 rounded-full bg-ink text-paper grid place-items-center transition-colors group-hover:bg-accent-ink"
          >
            <Plus size={16} />
          </span>
        </Link>
      </Surface>

      {/* Desktop-only macro pill row — on mobile the macro readout above
          (P / C / F inline) is enough; on desktop the pills give more
          breathing room and match prototype DLibrary right rail. */}
      <div className="hidden md:grid grid-cols-3 gap-2.5">
        <MacroPill label="Protein" value={totals.p} unit="g" size="md" />
        <MacroPill label="Carbs" value={totals.c} unit="g" accent size="md" />
        <MacroPill label="Fat" value={totals.f} unit="g" size="md" />
      </div>
    </div>
  );
}
