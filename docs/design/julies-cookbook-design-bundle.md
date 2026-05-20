# Julie's Cookbook — UI Redesign Bundle

> **Purpose:** Apply the Hearth aesthetic (Magnolia warmth + Liquid Glass polish) as a UI reskin on top of the existing production app at `julies-cookbook.pages.dev`.
> **Owner:** Michael Haslim
> **Repo:** github.com/Slimdragon007/julies-cookbook
> **Created:** 2026-04-30
> **How to use:** Paste this entire file to Claude design as a single message. Section 1 is the system spec. Section 2 is the prompt that tells Claude design what to do with it.

> **⚠️ 2026-05-20 — Hearth deprecated in favor of Paper Editorial.** Sections 1 + 2 below describe the original Hearth aesthetic and are kept for historical reference only. The active design system is now Paper Editorial; see [§3 — Paper Editorial direction (2026-05)](#section-3--paper-editorial-direction-2026-05) at the bottom of this file for the live token + typography contract.

---

# SECTION 1 — DESIGN LAW (system spec)

## 🎨 DESIGN LAW: julies-cookbook

> **Read `flowstateai-claude-md-base` skill first.** This file is the design-system layer for Julie's Cookbook.
> **Owner:** Michael Haslim | **Client:** Internal (Julie + family) | **Last updated:** 2026-04-30
> **Pairs with:** `julies-cookbook/CLAUDE.md` (engineering law) and `@docs/architecture/ui.md`

---

### 🎯 1. DESIGN IDENTITY

**One-sentence purpose:** Reskin the existing Julie's Cookbook production app with a warm, editorial aesthetic that operates with the precision of a modern productivity tool.

**Audience:** Julie (primary). Busy mom, cooks every other day, tare scale on the counter, phone propped against a flour bag while her hands are wet.

**Design stage:** UI overhaul on a production app. Features, routes, copy structure, and information architecture are locked. Only the visual layer changes.

**Aesthetic name:** **Hearth** (Magnolia warmth + Liquid Glass polish)

**The one-line vibe:** Joanna Gaines opens Linear.

---

### 🏛️ 2. DESIGN PRINCIPLES (the four laws)

These extend, never override, the engineering CLAUDE.md.

#### Law 1 — Warmth over slickness

Cream backgrounds, serif headers, organic edges. If a screen feels like a B2B SaaS dashboard, it has failed.

#### Law 2 — Precision is invisible until summoned

Macros, gram math, portion calculators are present but never shouty. Numbers earn their visual weight only when Julie asks for them (Nutrition tab, portion calculator, weekly summary). Everywhere else, food and photos lead.

#### Law 3 — Thumb-zone first, eyes-can-be-anywhere

Primary actions sit in the bottom 40% of the viewport. The Chat FAB, Log Meal CTA, and tab bar all fall under the right thumb. Top of screen is for content, not controls.

#### Law 4 — One signature interaction per surface

Every screen has exactly one moment of delight. Gallery: card hover lift. Recipe Detail: live servings scaler. Nutrition tab: portion calculator. Food Log: meal-card swipe. Don't pile on. One per surface.

---

### 🎨 3. DESIGN TOKENS

#### Color Palette

| Token           | Hex                        | Usage                                       |
| --------------- | -------------------------- | ------------------------------------------- |
| `--cream`       | `#FAF8F4`                  | App background                              |
| `--linen`       | `#F0EAE0`                  | Card backgrounds, raised surfaces           |
| `--linen-dim`   | `#E6DFD2`                  | Hover state for cards, dividers             |
| `--ink`         | `#2A2520`                  | Primary text (warm near-black)              |
| `--ink-soft`    | `#5C5249`                  | Secondary text                              |
| `--ink-mute`    | `#8A7F73`                  | Tertiary text, captions                     |
| `--brown`       | `#8B7355`                  | Primary accent, buttons, active states      |
| `--brown-deep`  | `#6B5742`                  | Hover/pressed buttons                       |
| `--brown-glass` | `rgba(139, 115, 85, 0.12)` | Translucent overlays, chip backgrounds      |
| `--leaf`        | `#7A8B5C`                  | Secondary accent (Chat FAB, success states) |
| `--ember`       | `#C77D4A`                  | Warning, partial-success amber              |
| `--rust`        | `#A04A3C`                  | Errors, destructive actions                 |
| `--gold`        | `#C9A96E`                  | Splash particles only                       |

**Liquid Glass note:** Frosted-glass surfaces (modals, drawers, sticky tab bars) use `backdrop-filter: blur(20px) saturate(140%)` over a `rgba(250, 248, 244, 0.72)` base. Borders on glass surfaces are `rgba(139, 115, 85, 0.16)`, 1px.

**No dark mode.** Don't ask. Don't build it.

#### Typography

| Token            | Font             | Weight   | Usage                                |
| ---------------- | ---------------- | -------- | ------------------------------------ |
| `--font-display` | Playfair Display | 600, 700 | Recipe titles, page headers, splash  |
| `--font-serif`   | Lora             | 400, 500 | Body, ingredient lists, instructions |
| `--font-sans`    | Inter            | 500, 600 | Numbers, macros, UI chrome, buttons  |

**Why three:** Playfair for editorial moments, Lora for content density, Inter for anything numeric or interface-y. Inter exists _only_ to make macro tables and timers legible. Don't let it leak into headers.

| Scale   | Size                | Line-height | Usage                                                 |
| ------- | ------------------- | ----------- | ----------------------------------------------------- |
| Display | 36px / 48px desktop | 1.15        | Page titles, "Julie's Cookbook" splash                |
| H1      | 28px                | 1.2         | Recipe titles                                         |
| H2      | 22px                | 1.3         | Section headers                                       |
| H3      | 18px                | 1.4         | Tab labels, card titles                               |
| Body    | 16px                | 1.6         | All readable content. **Never below 16px on mobile.** |
| Caption | 14px                | 1.5         | Stats row, chips, helper text                         |
| Mono    | 14px Inter          | 1.4         | Macros, gram values, timers                           |

#### Spacing

8px base unit. Use multiples: 8, 16, 24, 32, 48, 64. Card padding is 24px on mobile, 32px on desktop. Section spacing is 48px mobile, 64px desktop.

#### Radii

| Token           | Value  | Usage                           |
| --------------- | ------ | ------------------------------- |
| `--radius-sm`   | 8px    | Chips, tags, small inputs       |
| `--radius`      | 16px   | Cards, buttons, drawers         |
| `--radius-lg`   | 24px   | Hero images, modals             |
| `--radius-pill` | 9999px | FAB, primary CTAs, filter chips |

No sharp corners. Anywhere.

#### Shadows

| Token       | Value                                                                    | Usage                |
| ----------- | ------------------------------------------------------------------------ | -------------------- |
| `--lift-sm` | `0 1px 2px rgba(42, 37, 32, 0.06)`                                       | Resting cards        |
| `--lift`    | `0 4px 16px rgba(42, 37, 32, 0.08)`                                      | Hover cards, drawers |
| `--lift-lg` | `0 12px 32px rgba(42, 37, 32, 0.12)`                                     | Modals, FAB          |
| `--glass`   | `0 8px 24px rgba(42, 37, 32, 0.06), inset 0 1px 0 rgba(255,255,255,0.4)` | Frosted surfaces     |

---

### 📜 4. PROJECT-SPECIFIC DESIGN RULES

#### Rule 1 — Photos earn the cream

Every recipe card uses warm, natural-light food photography (slight overhead angle, real plates, no staged steam). If a photo is missing, fall back to a tonal cream-on-linen pattern, never a generic placeholder gray.

#### Rule 2 — Macros use Inter, recipes use Lora

Never mix. A calorie count on a recipe card is Inter. The instruction "Whisk 3 eggs" is Lora. This separation is what keeps the editorial feeling editorial.

#### Rule 3 — One serif weight per surface

Don't mix Playfair 600 and Playfair 700 on the same screen. Pick one. The hierarchy comes from size, not weight.

#### Rule 4 — Glass goes on top, never on bottom

Frosted surfaces (drawers, sticky tab bars, modals) sit _above_ warm content. Never use glass as a base layer. Cream is always the floor.

#### Rule 5 — The FAB pulses, nothing else does

The Chat FAB has a subtle 3.5-second-delayed pulse (scale 1.0 → 1.04 → 1.0, 1.6s ease). No other element animates on idle. Don't add bouncing icons, breathing buttons, or shimmering skeletons. One ambient motion, one place.

#### Rule 6 — Numbers round, prose doesn't

All macros round to whole integers. All times round to whole minutes. Recipe text preserves original casing and punctuation. The system is precise about data, generous about language.

#### Rule 7 — Servings scaler is live, not a form

The +/- buttons on the Recipe Detail page recalculate ingredient quantities instantly. No "Apply" button. No reload. If the scaler ever requires confirmation, the implementation is wrong.

#### Rule 8 — Portion calculator is the hero of the Nutrition tab

This is Julie's killer feature. It must feel premium: large input (Inter 28px), live macro updates as she types, soft animation on the macro grid when values change. Don't bury it under a fold.

#### Rule 9 — Keep the meditative tone of existing copy

The live app reads "A meditative space to organize your recipes and simplify your kitchen workflow." Don't replace that voice with editorial-magazine breathlessness. The redesign warms the existing tone, doesn't overwrite it.

---

### 🚧 5. DESIGN PITFALLS

#### Pitfall 1 — Generic AI aesthetic creep

**Symptom:** Purple gradients, neon accents, glassmorphism with rainbow borders, AI-stock-illustration vibes.
**Cause:** Default LLM design tendencies.
**Rule:** If a screen could ship from any of 50 SaaS startups, throw it out. Cream + brown + serif is the entire identity.

#### Pitfall 2 — Emoji as iconography

**Symptom:** 🍳 in headers, ✅ in success states, 🔥 on featured recipes.
**Cause:** Easy. Lazy. Wrong.
**Rule:** Lucide line icons in `--brown` only. Emoji are allowed in user-generated content (recipe notes), nowhere in chrome.

#### Pitfall 3 — Dashboard-itis

**Symptom:** The Weekly Nutrition Summary starts looking like a fitness tracker with rings, gauges, and percentages.
**Cause:** Treating the data as the product.
**Rule:** Julie wants to know "did I eat well this week," not stare at telemetry. Bar chart + 4 stat cards. That's it. Resist the urge to add streaks, badges, or progress rings.

#### Pitfall 4 — Dark mode requests

**Symptom:** Someone asks for a dark variant. Someone always does.
**Cause:** Convention.
**Rule:** Refuse. The warmth is the brand. A dark variant breaks the entire premise.

#### Pitfall 5 — Three serifs collision

**Symptom:** Playfair, Lora, AND a third serif somewhere (often a script font for "elegance").
**Cause:** Wedding-invitation instincts.
**Rule:** Two serifs + Inter. Final answer.

#### Pitfall 6 — Mobile-as-afterthought

**Symptom:** Beautiful 1440px desktop mockup, mobile feels like a squished version.
**Cause:** Designing desktop first.
**Rule:** Mobile (390x844) is the primary canvas. Desktop is the responsive variant. Build mobile first, every time.

#### Pitfall 7 — Inventing screens that don't exist

**Symptom:** Designer adds "Profile," "Achievements," or "Discover" tabs that aren't in the live app.
**Cause:** Filling perceived gaps.
**Rule:** This is a reskin. The screen inventory in Section 7 is the complete set. Adding a screen requires Slim's sign-off.

---

### 📂 6. POINTER TABLE

```
@design/screens/                → individual screen specs
  ├── 01-login.md
  ├── 02-signup.md
  ├── 03-demo.md
  ├── 04-gallery.md
  ├── 05-recipe-detail.md
  ├── 06-add-recipe.md
  ├── 07-food-log.md
  ├── 08-weekly-summary.md
  ├── 09-chat-drawer.md
  └── 10-settings.md
@design/components/              → reusable component patterns
  ├── recipe-card.md
  ├── chat-fab.md
  ├── servings-scaler.md
  ├── portion-calculator.md
  ├── tab-bar.md
  └── meal-log-sheet.md
@design/tokens.md                → design tokens (canonical)
@design/motion.md                → animation specs
@design/photography.md           → image direction, fallbacks
@design/tailwind-translation.md  → token-to-Tailwind mapping for tailwind.config.ts
```

**Load triggers:**

- New screen → load tokens + relevant screen spec + photography
- Component work → tokens + component spec
- Animation → motion.md
- Anything visual → tokens, always

---

### 🖥️ 7. SCREEN INVENTORY (locked — matches production)

Every screen ships in production today. The redesign covers all of them. No additions, no removals.

| #   | Screen             | Route                             | Mobile | Desktop | Signature interaction                             |
| --- | ------------------ | --------------------------------- | ------ | ------- | ------------------------------------------------- |
| 1   | Login              | `/login`                          | ✅     | ✅      | Particle convergence intro                        |
| 2   | Signup             | `/signup`                         | ✅     | ✅      | Calm form pacing                                  |
| 3   | Public Demo        | `/demo`                           | ✅     | ✅      | 4-step ribbon (Paste → Extract → Ready → Grocery) |
| 4   | Recipe Gallery     | `/`                               | ✅     | ✅      | Card hover lift                                   |
| 5   | Recipe Detail      | `/recipe/[slug]`                  | ✅     | ✅      | Live servings scaler                              |
| 6   | Add Recipe (admin) | `/admin/import` (or current path) | ✅     | ✅      | 6-state import flow                               |
| 7   | Food Log           | `/food-log`                       | ✅     | —       | Log Meal sheet slide-up                           |
| 8   | Weekly Summary     | `/weekly`                         | ✅     | ✅      | Day drill-down on tap                             |
| 9   | Chat Drawer        | overlay (global)                  | ✅     | ✅      | Web search citation render                        |
| 10  | Settings           | `/settings`                       | ✅     | —       | (none — quietest screen)                          |

**Empty states required for:** Gallery (no recipes), Food Log (no meals today), Weekly Summary (insufficient data), Chat (first open). No empty state ships as "Nothing here yet." Each gets warm, useful copy.

**Error states required for:** Login failure, scrape blocked, partial save (image failed), chat API down. Each uses `--ember` or `--rust` per the token table.

**Loading states required for:** Gallery initial load, scrape in progress, chat thinking, web search running.

---

### 🧪 8. DEFINITION OF DONE (design-specific)

- [ ] All 10 screens redesigned at 390x844 mobile reference
- [ ] Desktop variants for screens marked desktop-required
- [ ] Empty states for every list-based screen
- [ ] Error states per the inventory
- [ ] Loading states per the inventory
- [ ] All copy preserved from production (warmed, not rewritten)
- [ ] Real recipe content used (Shakshuka, Tini's Mac and Cheese, Moroccan Couscous, Best Hamburger, Cumin-Spiced Chicken with Apricots, Fluffiest Blueberry Pancakes — actually in the Supabase DB)
- [ ] Tokens referenced by name in every spec, never hardcoded
- [ ] Motion specs documented for all 4 signature interactions
- [ ] Lucide icons sourced and named (no emoji, no custom SVG without sign-off)
- [ ] Photography direction document includes fallback pattern
- [ ] Tailwind translation: tokens mapped to `theme.extend` block, ready to drop into `tailwind.config.ts`
- [ ] Prototype clickable: Login → Gallery → Detail → Nutrition → Portion Calculator → Log Meal flow works end-to-end
- [ ] Public flow clickable: visitor → /demo → /signup

---

### 🎬 9. MOTION & INTERACTION SPECS

#### Splash particle convergence (Login)

80 particles in `--gold`, sized 2-4px. Spawn at random screen edges. Converge to center over 1.4s with eased deceleration (`cubic-bezier(0.2, 0.8, 0.2, 1)`). Text reveals: "Julie's" at 0.8s, "Cookbook" at 1.2s, both with a 12px upward drift + opacity 0→1 over 600ms. Form fade-in at 2.0s. Skip on subsequent same-session loads (sessionStorage flag).

#### Chat FAB pulse

Trigger at 3500ms after page settle. Scale 1.0 → 1.04 → 1.0 over 1600ms ease-in-out. Pulse twice, then rest. Repeat every 45s while idle.

#### Servings scaler

Quantity numbers crossfade (200ms) when scaled. No layout shift. Numbers use Inter 16px, scaler buttons are 36x36 pill-shaped, `--brown` background.

#### Portion calculator

As Julie types grams, macro grid updates in real time. Each macro value uses a 180ms scale-up bounce (1.0 → 1.06 → 1.0) on change. Subtle. The whole grid never animates at once, just the values that changed.

#### Tab bar (sticky on Recipe Detail)

Becomes glass-frosted on scroll past hero (translateY transition 240ms). Underline indicator slides between tabs over 220ms ease-out.

#### Log Meal sheet

Slides up from bottom, 320ms ease-out, with backdrop fade-in (rgba black 0 → 0.32). Drag-to-dismiss enabled. Snap points: 60% height (default), 90% (expanded for notes).

#### Card hover (desktop only)

Translate-y -2px, shadow `--lift-sm` → `--lift`, 180ms ease.

#### Web search loading state

"Searching the web..." with three dots that fade-pulse sequentially at 600ms intervals. Brown text, 14px Inter.

#### Demo step ribbon

Active step in `--brown`, completed steps in `--leaf`, upcoming in `--ink-mute`. Connector lines fill left-to-right over 240ms when advancing.

---

### 🛠️ 10. COMPONENT INVENTORY (reusable)

Listed roughly in dependency order.

| Component           | Used on                          | Notes                                                                                  |
| ------------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `Button`            | Everywhere                       | Primary (`--brown`), Secondary (outline), Ghost. Pill on mobile, `--radius` on desktop |
| `Chip`              | Gallery filters, recipe tags     | `--linen` background, `--ink-soft` text, `--radius-pill`                               |
| `Card`              | Gallery, Food Log, Weekly stats  | `--linen` bg, `--radius`, `--lift-sm` resting                                          |
| `RecipeCard`        | Gallery only                     | Photo (4:3), title, stats row, rating                                                  |
| `StatRow`           | Recipe Detail                    | Time, servings, calories, condensed                                                    |
| `ServingsScaler`    | Recipe Detail                    | +/- buttons, live qty update                                                           |
| `IngredientList`    | Recipe Detail (Ingredients tab)  | Grouped by category                                                                    |
| `InstructionList`   | Recipe Detail (Instructions tab) | Numbered, generous line height                                                         |
| `MacroGrid`         | Nutrition tab, Food Log          | 2x2 on mobile, 4-up on desktop                                                         |
| `PortionCalculator` | Nutrition tab                    | Hero input + live macro grid                                                           |
| `TabBar`            | Recipe Detail                    | Sticky, frosted on scroll                                                              |
| `ChatFAB`           | Global (except Login)            | Bottom-right, leaf icon, pulse                                                         |
| `ChatDrawer`        | Global overlay                   | Slides up, frosted glass                                                               |
| `LogMealSheet`      | Food Log                         | Bottom sheet, recipe picker + portion                                                  |
| `WeekStrip`         | Food Log header                  | 7-day row, today highlighted                                                           |
| `BarChart`          | Weekly Summary                   | Calorie totals per day                                                                 |
| `EmptyState`        | Gallery, Food Log, Chat          | Illustration + warm copy + primary action                                              |
| `ErrorState`        | Scrape blocked, API failures     | `--ember` or `--rust`, recoverable copy                                                |
| `StepRibbon`        | Demo only                        | 4-step progression indicator                                                           |

For each component, deliver: anatomy (mobile + desktop), states (default, hover, active, disabled, loading, error), and Tailwind class examples.

---

### 📓 11. NOTION POINTERS (humans only)

- Project plan: `31e16230-665c-8107-91e5-ee03d6cbd636`
- Engineering CLAUDE.md: in repo at `CLAUDE.md`
- This design doc lives in Notion as a sibling of the project plan

---

### 🚦 12. CURRENT STATE

_(Last edit: 2026-04-30)_

**Decided:** Hearth aesthetic locked (Magnolia + Liquid Glass hybrid). Tokens canonical. Three-font system confirmed (Playfair / Lora / Inter). 10 screens scoped (matches production exactly). 4 signature interactions named. Tailwind config currently bare; redesign output must include the `theme.extend` block to bring it up to spec.

**Pending Claude design output:** All 10 screen mockups (mobile + desktop variants where applicable), 19 components, motion specs translated to interactive prototype, Tailwind translation, photography sourced or AI-generated per direction doc.

**Blocked:** Nothing. Engineering CLAUDE.md ADR-001 (deploy target ambiguity) does not block design work.

**Next action:** This bundle lives in Notion and locally. Paste it whole to Claude design. Section 2 below tells it what to do.

---

# SECTION 2 — PASTE-TO-CLAUDE-DESIGN PROMPT

```
I have a production app, Julie's Cookbook, live at julies-cookbook.pages.dev.
The app is feature-complete. I'm not changing functionality, routes, or
information architecture. I want a full UI redesign of every existing screen,
applied as a reskin on top of what's already shipping.

Repo: github.com/Slimdragon007/julies-cookbook
Stack: Next.js 14 App Router, Tailwind, Supabase, Cloudflare Pages

WHAT EXISTS TODAY (do not change)
- Public landing/login at /login
- Signup at /signup
- Public interactive demo at /demo (4-step import preview: Paste a Link →
  AI Extracts → Recipe Ready → Grocery List)
- Authenticated app: recipe gallery, recipe detail with Ingredients /
  Instructions / Nutrition tabs, portion calculator, food log, weekly
  nutrition summary, AI chat drawer, admin add-recipe flow, settings
- Empty states, error states, loading states all already implemented

CURRENT VISUAL STATE
Minimalist, meditative tone. Inter-only typography. Tailwind config is bare
(no color tokens, no fonts beyond Inter). Live copy reads: "A meditative
space to organize your recipes and simplify your kitchen workflow." Calm,
productivity-tool adjacent. Closer to Notion or Linear than to a cooking
magazine.

WHAT I WANT
Apply the "Hearth" aesthetic — Magnolia warmth + Liquid Glass polish — as a
reskin. Every existing screen, redesigned. No new screens. No new features.
No removed features.

Keep the existing meditative tone in copy. Don't make it loud. The redesign
adds warmth and editorial weight without losing the calm. Think: a quiet
cooking magazine that loads instantly.

DESIGN SYSTEM TO APPLY
Section 1 of this bundle, above. Treat it as the canonical system spec.
Tokens, four laws, seven pitfalls, screen inventory, component inventory,
motion specs — all binding.

DELIVERABLES
1. Redesigned mockups (mobile 390x844 primary, desktop responsive variants
   where applicable) for all 10 screens in Section 7.

2. A clickable, interconnected prototype showing key flows:
   - Login → Gallery → Recipe Detail → Nutrition tab → Portion Calculator
     → Log Meal
   - Public visitor → /demo → /signup
   - Recipe import (admin path)

3. A token-to-Tailwind translation: every color, font, radius, and shadow
   in Section 3 mapped to a Tailwind config `theme.extend` block I can drop
   directly into tailwind.config.ts. This is what I'll hand to Claude Code
   to ship.

4. Component-level specs for the 19 components in Section 10, each with
   anatomy, states (default, hover, active, disabled, loading, error), and
   Tailwind class examples.

CONSTRAINTS
- Do not invent new screens or features (Pitfall 7)
- Do not change routes, copy structure, or information architecture
- Keep the meditative tone of the existing copy; warm it, don't replace it (Rule 9)
- Mobile first, every time (Pitfall 6)
- Use real recipe content (Shakshuka, Tini's Mac and Cheese, Moroccan
  Couscous, Best Hamburger, Cumin-Spiced Chicken with Apricots, Fluffiest
  Blueberry Pancakes)
- Lucide line icons only, in --brown (Pitfall 2)
- No emoji in chrome
- No dark mode (Pitfall 4)

START BY: confirming the screen inventory in Section 7 matches what you
see at julies-cookbook.pages.dev, flagging any divergence, and proposing
the order you'd design them in.
```

---

_End of original Hearth bundle._

---

# SECTION 3 — Paper Editorial direction (2026-05)

> **Status:** Active. Replaces the Hearth aesthetic above as of 2026-05-20 (TASK-018).
> **Source:** Omelette prototype handoff (May 2026) for "Mise" reskinned as Julie's Cookbook. Prototype source files live outside this repo (per the trust contract); the tokens + decisions are absorbed here as canon.

## Why the shift

Hearth shipped clean (Phase 1 → Phase 3 closed 2026-04-30) but read as "B2B SaaS with warm colors" on Julie's phone in real kitchen light. The Paper Editorial direction trades the Magnolia/brown system for a warm-paper background with cream cards floating on top, a single terracotta accent, and an italic display serif. Reads more like a torn-out cookbook page than a productivity dashboard.

## Tokens

| Token         | Hex       | Usage                                                                                                         |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `paper`       | `#F2EFE8` | Page background. The "stage."                                                                                 |
| `card`        | `#FCFBF7` | Card / surface background. Brighter than paper (inverted from Hearth, where cards were darker than the page). |
| `ink`         | `#14130F` | Primary text (warm near-black).                                                                               |
| `ink-soft`    | `#5A5953` | Secondary text.                                                                                               |
| `ink-mute`    | `#B8B0A2` | Tertiary / placeholder text.                                                                                  |
| `rule`        | `#E5DFD0` | Dividers, borders. The pencil-line on the page.                                                               |
| `accent`      | `#D97757` | Terracotta. Primary accent, buttons, active states.                                                           |
| `accent-soft` | `#F6E7DC` | Tinted accent background (chip bg, halo wash).                                                                |
| `accent-ink`  | `#8E3F1F` | Burnt sienna. Hover/pressed accent + destructive cues.                                                        |
| `accent-on`   | `#FCFBF7` | Text color when placed ON an accent fill.                                                                     |

**No dark mode.** **No splash gold.** **No leaf-green.** All amber/leaf/gold from Hearth collapse to the single accent ramp.

## Typography

| Role      | Font             | Weight / style | CSS variable        | Usage                                                                                 |
| --------- | ---------------- | -------------- | ------------------- | ------------------------------------------------------------------------------------- |
| Display   | Instrument Serif | 400 italic     | `--font-instrument` | Recipe titles, page headers, section headers. Italic-only — the font loads as italic. |
| Body / UI | Inter            | 400, 500, 600  | `--font-inter`      | All readable content, labels, buttons.                                                |
| Numerals  | JetBrains Mono   | 400, 500, 600  | `--font-jetbrains`  | Macros, timers, quantities, ratings. Pair with `tabular-nums`.                        |

**Scale (unchanged from Hearth):** display 36/48px, h1 28px, h2 22px, h3 18px, body 16px, caption 14px, mono 14px. Never below 16px on mobile body.

**Why three:** Instrument Serif (italic) is the editorial moment — recipe names and "What's on your plate." Inter handles everything ambient. JetBrains Mono is for any number Julie's eye is going to land on — a tabular-nums rhythm that reads like a kitchen scale display.

## Component primitive deltas

The Hearth primitives (`Button`, `Input`, `MacroGrid`, `MeasurementToggle`, `StepRibbon`) stay; their tokens are retoned but the shape and props are unchanged.

No new primitives added in TASK-018. The reskin uses inline Tailwind for card surfaces (`bg-card border border-rule`), pill chips (`bg-card border-rule` inactive / `bg-accent text-accent-on` active), and macro displays. A reusable `Surface` / `Tag` / `MacroPill` primitive lands the moment a third caller wants the same class bundle, under TDD at that point. Per YAGNI: no speculative components.

## Inline patterns (no new files)

- `<span className="font-display">` — Instrument Serif italic. The `italic` modifier is redundant; the font face IS the italic.
- `<span className="font-mono tabular-nums">` — JetBrains Mono with locked-width digits. Use for every number Julie will compare.

## Step numbers

Accent-soft disc (`bg-accent-soft text-accent-ink`), 36×36, with the numeral rendered in Instrument Serif italic at 20px. Editorial moment, not a Linear ticket badge.

## Ingredient row notes

Asterisk superscript + footnote block below the ingredient list. Don't inline comma-notes ("salt, kosher" → "salt*" + footnote "*kosher"). Future Phase 2 work.

## Decisions deferred from Phase 1 (TASK-018)

- **Tweaks panel + multi-palette switcher** (Voice/Imagery/Paper toggles + Paper/Bone-Sage/Ink/Terra palettes from the prototype) → TASK-026. Requires persistence layer design (localStorage vs Supabase) before code lands.
- **Hand-rolled SVG icon set** from the prototype's `ui.jsx Icon` system → Lucide stays for now. Icon swap is its own design pass, not bundled with the reskin.

## Migration status

| Surface                                                                                            | Phase 1 (TASK-018) | Notes                                                                                        |
| -------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| Foundation: `tailwind.config.ts`, `globals.css`, `layout.tsx`, `next/font`                         | ✅ Done            | Single-PR token swap.                                                                        |
| UI primitives: `Button`, `Input`, `MacroGrid`, `MeasurementToggle`, `StepRibbon`                   | ✅ Retoned         |                                                                                              |
| New primitives                                                                                     | ⏸️ None yet        | YAGNI. Add `Surface`/`Tag`/`MacroPill` when a third caller appears, under TDD at that point. |
| `/` (gallery): `(main)/page.tsx`, `RecipeCard`, `RecipeGrid`                                       | ✅ Done            |                                                                                              |
| `/recipe/[id]`: `RecipeTabs`, `IngredientsTab`, `InstructionsTab`, `NutritionTab`, `RecipeActions` | ✅ Done            |                                                                                              |
| `MainNav`                                                                                          | ✅ Done            | Restyled in TASK-019 (commit 5a4946a) on this same PR.                                       |
| `/log` + `FoodLogForm` + `MealCard`                                                                | ⏳ TASK-020        |                                                                                              |
| `/summary` + `WeeklySummary`                                                                       | ⏳ TASK-021        |                                                                                              |
| `/grocery-list` + `GroceryListBuilder`                                                             | ⏳ TASK-022        |                                                                                              |
| `ChatDrawer` + `ChatFAB` (→ "Kitchen line")                                                        | ⏳ TASK-023        |                                                                                              |
| `/login`, `/signup`, `/auth/*`, `/demo`                                                            | ⏳ TASK-024        |                                                                                              |
| `/add-recipe`, `/profile`                                                                          | ⏳ TASK-025        |                                                                                              |
| Tweaks panel + multi-palette                                                                       | ⏳ TASK-026        | Persistence design first.                                                                    |

_End of Section 3._
