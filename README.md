# JVGC Studio

> Joy · Victory · Game · Creation
> Create Joyful Victories.

A small independent studio in Beijing crafting sunny, easy-to-pick-up casual games for everyone — so anyone can land that small, satisfying win, anytime.

## Live Site

https://robertcong.github.io/JvgcGameStudio/

## Stack

Pure static. No build tools, no frameworks.

- HTML5
- CSS3 (custom properties + media queries)
- Vanilla JavaScript (ES6+, IIFE pattern)
- GitHub Pages (auto-deploy via Actions)

## Local Preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

You can also open `index.html` directly via `file://`. The first screen (Hero + featured Tile Garden Match + 7 thumbnails) renders without JavaScript thanks to the static SSR fallback; JavaScript adds the live language switch and clickable thumbnails.

## Edit Content

| Want to | Edit |
|---|---|
| Add / remove a game | `assets/js/games.js` |
| Change copy (EN / ZH) | `assets/js/i18n.js` |
| Tweak colors / spacing | `:root` in `assets/css/styles.css` |
| Replace a game icon | drop `assets/games/<id>.png` (512×512) |
| Update App Store URL | set `appStoreUrl` in `assets/js/games.js` |

## Owner Action Items

These are the steps remaining for the site to feel "complete":

1. **Fill App Store URLs.** In `assets/js/games.js`, set each game's `appStoreUrl` to its real App Store link. Until you do, the CTA button shows "Coming soon".
2. **Drop real game icons.** Place 512×512 PNGs (or WebP) in `assets/games/`, named after each game's `id`:
   - `tile-garden-match.png`
   - `ludo.png`
   - `connect-4.png`
   - `one-fill.png`
   - `triple-match-joy.png`
   - `archery-pro.png`
   - `finger-dunk.png`
3. **Enable GitHub Pages.** In repo Settings → Pages → Source: "GitHub Actions". The workflow `.github/workflows/static.yml` will deploy automatically on push to `main`.
4. **(Optional) Run Lighthouse.** Open the site in Chrome DevTools → Lighthouse → Desktop → all categories. Target ≥ 90 on Performance / Accessibility / Best Practices.

## Architecture

- `index.html` — single-page skeleton with all six sections (Hero / Games / About / Contact / Footer + sticky Nav)
- `assets/css/styles.css` — design tokens, reset, per-section styles, 4 media queries (1099 / 767 / 479 + prefers-reduced-motion), a11y additions
- `assets/js/i18n.js` — `window.I18N = { en: {...}, zh: {...} }` (31 keys per language, including `aria-label` translations)
- `assets/js/games.js` — `window.GAMES` array (7 records, each with bilingual name/tagline/category, gradient fallback, icon path, appStoreUrl)
- `assets/js/app.js` — IIFE; renders Featured + Thumbs, applies i18n (text + aria-labels), wires lang switch and thumb clicks, handles icon load errors and disabled CTA fallback

## Contact

jvgcgame@163.com — open to publishing, marketing, and collaboration inquiries.

## License

© 2026 JVGC Studio. All rights reserved.
