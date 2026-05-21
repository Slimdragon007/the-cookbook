# ADR-007: Re-introduce Surface, MacroPill, Ring, SerifIt, Mono primitives

**Date:** 2026-05-21
**Status:** accepted
**Decider:** Michael Haslim

## Context

The Paper Editorial reskin (TASK-018 → TASK-026, shipped 2026-05-20/21) deliberately removed `Surface`, `Tag`, and `MacroPill` per YAGNI after the canary surfaces shipped without importing them (cleanup re-applied as commit `a39e95a` on TASK-023's branch; the original deletion was lost in PR #29's squash-merge and had to be re-done). That decision was correct at the time — those three primitives had **zero call sites** after `Button`, `Input`, `MacroGrid`, `MeasurementToggle`, and `StepRibbon` covered the retoned screens.

The Omelette prototype (May 2026 handoff, sources at `~/Downloads/{Julie's Cookbook.html, app.jsx, ui.jsx, mobile.jsx, desktop.jsx, tweaks-app.jsx, tweaks-panel.jsx, browser-window.jsx, ios-frame.jsx, data.js, HANDOFF.md}`) defines a richer set of interior layouts that the shipped reskin did not implement — greeting bubble + Today snapshot Ring on the gallery, italic display hero on Pulse, kcal Ring + macro bars on the food log, ingredient checkboxes + asterisk-footnoted notes, sender eyebrows + typing dots on chat. The user identified this gap on 2026-05-21 via the Chrome DevTools verification flow (tokens correct, layouts not).

TASK-027 (prototype-parity retrofit) is the work that closes the gap. It creates **5+ call sites** for `Surface` and `MacroPill`, plus introduces `Ring` (circular SVG progress), `SerifIt` (Instrument Serif italic span wrapper), and `Mono` (JetBrains Mono + tabular-nums wrapper) — all lifted from prototype `ui.jsx`.

The architectural question: re-add the deleted primitives + add the new ones, or inline the patterns per call site?

## Options considered

### Option A — Inline every pattern, never extract a primitive

- Pros: zero new files; "low abstraction" feel; matches the prior YAGNI cleanup ethos.
- Cons: 5+ call sites for the same `bg-card border border-rule shadow-lift-sm` Surface pattern, 4+ for the MacroPill atom, and ≥3 distinct Ring instances across Library/Log/Nutrition/Pulse — inlining duplicates 30-50 lines of identical JSX + Tailwind per call site. Drift risk: when the `Surface` "glass" treatment needs tweaking, we have to find and update every inlined copy. Maintenance burden compounds with every new screen.

### Option B — Re-add Surface, MacroPill, Ring; add SerifIt and Mono as thin wrappers

- Pros: each primitive has 3+ call sites by the end of Phase 5, comfortably above the YAGNI threshold the prior cleanup correctly enforced. Lifts directly from prototype `ui.jsx` (proven shapes) so TS-conversion is mechanical. `SerifIt` and `Mono` are trivially thin wrappers (`<span className="font-display">{children}</span>` and similar) but make intent legible at call sites and centralize letter-spacing.
- Cons: reverses a recent YAGNI cleanup — future contributors may delete them again unless this ADR is discoverable. Mitigation: a "Pitfall 7" in CLAUDE.md cross-referencing this ADR.

### Option C — Re-add Surface + MacroPill only; skip Ring/SerifIt/Mono

- Pros: minimal scope expansion vs. the deleted primitives.
- Cons: Ring is the most-used new primitive — it appears in Library Today snapshot, Log hero, Nutrition tab hero, optional Pulse micro-rings. Inlining a 17-line SVG-with-strokeDasharray per call site is exactly the case Surface was originally extracted to prevent. SerifIt + Mono are ~4 lines each; extracting them is cheaper than not.

## Decision

Option B. Re-add `Surface`, `MacroPill`, and add `Ring`, `SerifIt`, `Mono`, `GreetingBubble` as new files in `src/components/ui/`. Document the YAGNI-reversal here so future contributors find this ADR before deleting them again.

`Tag` from the prototype is **not** re-added — it has zero confirmed call sites in TASK-027's six phases (the prototype uses `<Tag>` only on the recipe-detail header for dietary chips, which the shipped recipe page already renders via inline span; not a delta worth fixing).

## Consequences

- **What changes immediately.** Six new files land in `src/components/ui/` in Phase 1: `Ring.tsx`, `MacroPill.tsx`, `Surface.tsx`, `SerifIt.tsx`, `Mono.tsx`, `GreetingBubble.tsx`. Each has minimal unit tests (renders without crash + a representative prop combination).
- **What it locks us into.** Prototype-shape primitives become the canonical building blocks for any future screen-level retrofit. If a future redesign drops Instrument Serif (unlikely — it's the brand) or switches off Tailwind utility classes (also unlikely), the wrappers need re-implementation. Acceptable lock-in.
- **What we give up.** The cleanest-possible "no extra primitives" story we had after the YAGNI cleanup. Net file count in `src/components/ui/` goes from 5 to 11. Worth it: each new primitive has 3+ call sites by end of TASK-027.

## Rollback plan

If the primitives turn out wrong-shaped (props don't fit, lift-from-prototype assumptions break):

1. Each primitive is independently revertable. `git revert <PR-1-commit>` removes all six in one operation.
2. Phases 2-6 import from `@/components/ui/Ring` etc. — replacing those imports with inlined JSX is search-replace work, ~30 lines per call site, completable in one work-day per phase.
3. If only Surface needs to go (e.g. treatment-switching turns out to be never-used in production despite the Tweaks panel having a "Cards" toggle that we don't ship), delete `Surface.tsx` alone; the other primitives have no Surface dependency.

The rollback constraint per the base handbook is "within one sprint" — concretely ≤5 working days. All six primitives + their call sites would take ~2 days of careful refactoring to fully undo, well within budget.
