# Indus AI Admin — Brand System Guide

This project now ships with the Indus AI brand system layered on top of the existing React + Vite stack. Routing, data hooks, and analytics are untouched — only visual tokens, utilities, and presentation components were refactored.

## Design Tokens

All tokens live in `src/index.css` as CSS variables and are surfaced to Tailwind via `tailwind.config.js`.

- **Colors**: `--color-brand-*` for the monochrome black & white palette, `--color-brand-mint/jade/aqua` (now tuned to subtle neutral tints) for glass glows, and `--color-ink/coal/slate/fog/mist/snow` for neutral surfaces.
- **Gradients**: `--grad-surface`, `--grad-stripe`, `--grad-glow` control the layered background and glow washes.
- **Glass / Shadows**: `--glass-bg`, `--glass-border`, `--shadow-glass`, `--backdrop-glass` drive translucent surfaces.
- **Typography**: `--font-display` provides the Inter-first font stack. Heading/body colors come from `--text-heading`, `--text-body`, `--text-muted`.
- **Light Theme**: Add `.theme-light` to the `<html>` (or `<body>`) element to re-map the same tokens for a light surface. No duplicate styles are needed.

## Tailwind Extensions

`tailwind.config.js` extends Tailwind with:

- `colors.brand.*` and `colors.surface.*` -> reference the CSS variables directly (`bg-brand-400`, `text-surface-fog`, etc.).
- `fontFamily.display` & `fontFamily.body` -> both point to the tokenised Inter stack.
- `borderRadius['2xl'] = 1.25rem`, `boxShadow.glass`, `backgroundImage.brand-*` map to the poster radius and gradients.
- Utility components via a plugin: `.glass`, `.pill`, `.brand-gradient`, `.section-pad`, `.focus-ring`, `.content-auto`, `.grid-auto-fit`.
- Keyframe `reveal-up` with `animate-reveal-up` for staggered fades.

## Core Components

- **VoiceWaveBg** (`src/components/background/VoiceWaveBg.jsx`) renders soft soft neutral oscilloscope waves with `mix-blend-mode: screen`, disabled when `prefers-reduced-motion` is set.
- **Button** now supports `primary`, `secondary`, `ghost`, `link` variants mapped to brand tokens. `outline`/`soft` remain as aliases to `secondary` for backwards compatibility.
- **Card**, **Badge**, **Field**, **Pill**, **SortableTable** all consume the glass utilities automatically. Dropping content into these components keeps typography and contrast aligned.
- **useRevealAnimation** (`src/hooks/useRevealAnimation.js`) applies scroll-triggered fade-up motion to any element that carries `data-reveal`.

## Motion & Accessibility

- Body has smooth scrolling by default and respects `prefers-reduced-motion` for waves and reveal animations.
- Interactive controls include focus outlines via `.focus-ring` or built-in `focus-visible` styles.
- Buttons, pills, and CTA links expose `aria-label`s where icon-only controls are used.

## Background & Shell

- Body uses the `--grad-surface` radial wash with `--grad-stripe` and `--grad-glow` overlays. The navigation shell is fully glass, with CTA slots (“Sign in”, “Start free”) and search adopting brand strokes.
- For optional light mode, set `document.documentElement.classList.add("theme-light")` (handled automatically when the stored theme is `light`).

## Content Visibility & Performance

- Sections below the fold use `.content-auto` to hint `content-visibility: auto`.
- Videos/animations are lazy loaded, and the wave canvas tears down listeners when motion is disabled.

## Working With the System

1. **Use tokens** — never hard-code hex strings. Pull colours via Tailwind (`bg-brand-500`) or `style={{ color: 'var(--color-brand-50)' }}` when necessary.
2. **Prefer glass utilities** (`glass`, `pill`) for surfaces and chips. They already ship with the required blur, border, and shadow tokens.
3. **Animate with `data-reveal`** on cards or metric tiles to get staggered fade-ups without manual keyframes.
4. **Respect theming** — when adding new sections, ensure text uses `text-brand-50`, `text-brand-100`, or `text-body` so light theme overrides continue to work.
5. **Accessibility** — keep `aria-label`s on icon buttons, and ensure new gradients maintain AA contrast (use brand light text).

## File Map

- `src/index.css` – token definitions, base typography, theme flips.
- `tailwind.config.js` – Tailwind extensions + utilities.
- `src/components/background/VoiceWaveBg.jsx` – brand wave background.
- `src/components/ui` – Buttons, Cards, Pills, Badges, Fields (token-aware).
- `src/hooks/useRevealAnimation.js` – scroll-reveal behaviour.
- Updated pages (`Dashboard`, `Training`, `Submissions`, `StoreByStore`, `Sku*`, `Login`) now reference the system.

Happy shipping — plug new UI into the existing data flow and it will inherit the Indus AI look & feel automatically.



## API Integration

Set VITE_API_BASE_URL in .env (or .env.local) to your ngrok base URL. The API client lives in src/lib/apiClient.js and exposes get, postJSON, and postFormData. Services in src/services/apiService.js wrap the documented endpoints (/search, /calculate-metrics, /add-new-product, /analyze-shelf-with-planogram, etc.).

Use useApiRequest (src/hooks/useApiRequest.js) to handle loading/error state in components:

`jsx
import useApiRequest from "../hooks/useApiRequest";
import { searchSimilarImages } from "../services/apiService";

const { execute, loading, error, data } = useApiRequest(searchSimilarImages);

const onSubmit = async (file) => {
  await execute(file);
};
`

Data hooks under src/hooks/data (e.g. useAnalysisReports, useProducts) provide a simple pattern for fetching GET endpoints with fallbacks so UI keeps rendering until the backend is ready.

All requests opt-in to credentials: "include" so you can plug in auth later without rewriting calls. Error payloads are returned on error.payload for UI messaging.
