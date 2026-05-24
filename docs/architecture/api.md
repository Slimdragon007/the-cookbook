# Architecture: API

> Load trigger: API route work, scraper work. See base handbook Law 3.

**Status:** Partial. Scraper and image-upload paths documented 2026-05-24 during TASK-035.

## Routes

TBD. Index live routes under `src/app/api/` when first audited.

## Scraper architecture

The scraper has one shared TypeScript core:

- `src/lib/scraper/core.ts` orchestrates fetch/text input -> Anthropic extraction -> USDA-first macro normalization -> optional Pexels image fallback -> optional Cloudinary upload -> Supabase persistence.
- `src/app/api/scrape/route.ts` is the authenticated web wrapper around `scrapeRecipe()`.
- `scripts/scrape-recipe.ts` is the CLI wrapper around the same `scrapeRecipe()` core, run with `tsx`.
- `src/lib/scraper/cloudinary.ts` contains the edge-compatible signed upload helper for both URL-based scraper images and manual file photo replacement.

Signed Cloudinary uploads are hand-built with Web Crypto SHA-1 because the Node Cloudinary SDK is not edge-compatible. Do not send boolean upload parameters unless the exact Cloudinary REST value is pinned by tests; signed uploads already overwrite by default, so the helper omits `overwrite`.

## Chat endpoint

- Provider: Anthropic SDK 0.78
- Model: `claude-sonnet-4-20250514`
- Per-user context loaded from Supabase.

## Cron

- `/api/audit` runs daily at 08:00 UTC. Currently configured in `vercel.json` — fate depends on ADR-001.
