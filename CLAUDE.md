# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal Chrome extension (Manifest V3) that removes the max-width constraint on the Libby (libbyapp.com) magazine reader, allowing magazines to fill the full browser viewport.

## Architecture

- **manifest.json** — Extension manifest. Content scripts inject into all frames (`all_frames: true`, `match_about_blank: true`) because the Libby reader lives inside a nested iframe (dewey-* frame), not the top-level document.
- **override.css** — CSS overrides with `!important` to remove container constraints (e.g., `max-width` on `.book-pillar`).
- **content.js** — JS that finds `.book-pillar` (the width-constrained container) and applies a CSS `transform: scale()` to fill the viewport. Uses a MutationObserver to wait for the element if it hasn't rendered yet.

## Key Libby DOM Details

- `.book-pillar` — Main container, has inline `max-width: 1320px`
- `.book-bounds` — Inner container, has inline `max-height`
- `.scene` — Contains the page spread, has fixed inline width/height
- `.sheet.pre-paginated` — Individual page wrappers
- `iframe` inside sheets — Actual page content, rendered at 960x1285 native with `transform: scale(0.6875)` to fit the constrained layout

The app's JS continuously sets inline styles on these elements, so CSS `!important` or transform-based scaling is needed rather than directly modifying inline styles (which get overwritten).

## Development Workflow

1. Load/reload the unpacked extension at `chrome://extensions/` (enable Developer Mode)
2. After code changes, click the reload arrow on the extension card
3. Reload the Libby magazine page to see changes
4. Debug via DevTools console — look for `[Libby Full Width]` log messages
5. When checking the DOM, switch to the correct frame context in the console dropdown (the `dewey-*` frame, not `top`)
