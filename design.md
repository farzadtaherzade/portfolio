# Design Document — farzadtaherzadeh personal portfolio

The source of truth for how this site looks and feels, and why. Read this before changing
`app/globals.css`, `app/page.tsx`, or any component.

---

## 1. Identity

**Owner:** Farzad Taherzadeh — backend developer, creative coder, game-dev enthusiast. Tehran, Iran.
**GitHub:** [farzadtaherzade](https://github.com/farzadtaherzade)

**Tagline (use verbatim, do not paraphrase):**

> Turning caffeine and curiosity into fun little programs.

**Positioning:** *curious creative developer*. Useful tools, backends, and game experiments are given
equal weight — none is presented as the "real job" and the others as toys.

**Origin story** (used in the About section, from an interview — keep it authentic):

- Watched *Mr. Robot*; a friend said "let's learn it", Farzad said "I love it", and he started coding.
- Before that, he built parkour maps and puzzles in *Fortnite*'s creative mode — that urge to build
  playful things carried straight into programming.
- Today he uses AI as a daily tool and builds simple, fun, useful things for himself.

---

## 2. Art direction

**Direction:** retro game / pixel art, specifically a **cozy pixel workshop** — desk, computer,
coffee, inventions.

**Explicitly NOT:** a generic neon arcade, a corporate template, or a generic dev-site gradient.

**Influences the visual language is built from:**

| Influence | What it contributes |
|---|---|
| **Cultic** | Retro pixel-3D beauty; Farzad wants the site to *feel like Cultic* |
| **Inside** | Atmospheric depth, dark silhouettes, industrial mood |
| **Celeste** | Warm pixel precision; the warmth counterweight |
| **Gris** | Emotional colour flow |
| **Alan Wake** | Light-vs-dark tension |
| **The Last of Us** | Muted, emotional weight |

**Music reference:** *Stairway to Heaven* — layered, builds slowly, mood over flash. This is why the
site favours slow atmospheric build over immediate punch.

**Synthesis:** deep, moody backgrounds with warm amber desk-light accents. Pixel art with depth and
atmosphere, not flat decoration.

**Workshop identity objects** (the things that make the scene read as *his*): console, keyboard,
music, games — plus coffee, headphones, and a hoodie.

**Character:** pixel-art Farzad — hoodie, headphones, coffee. Appears in the hero and as the sprite
in the mini-game. No photograph of a real person is used.

---

## 3. Colour palette

Defined as CSS variables in `app/globals.css`, exposed to Tailwind via `@theme inline`.

| Variable | Value | Role |
|---|---|---|
| `--bg-deep` | `#0d0b1a` | page background |
| `--bg-mid` | `#151227` | page background, second layer |
| `--bg-surface` | `#1e1a35` | cards, panels |
| `--bg-surface-light` | `#2a2444` | raised elements, track bars |
| `--accent-amber` | `#e8a838` | **primary accent**, active states, links |
| `--accent-amber-dim` | `#b07d28` | amber shadows, scrollbar hover |
| `--accent-cyan` | `#4ec9b0` | secondary accent, "working with" |
| `--accent-magenta` | `#c678dd` | tertiary accent, "currently learning" |
| `--accent-red` | `#e06c75` | errors, close buttons, coffee cup |
| `--text-primary` | `#c4c0d8` | body text |
| `--text-secondary` | `#8b87a8` | secondary text, inactive nav |
| `--text-tertiary` | `#5e5b7a` | hints, captions |
| `--text-bright` | `#e8e4f5` | headings |

Tailwind utility names map directly: `bg-bg-deep`, `text-text-secondary`, `text-accent-amber`,
`border-border-mid`, etc.

---

## 4. Typography

| Font | Usage | Notes |
|---|---|---|
| **Press Start 2P** | headings, labels, section titles, nav labels | Very wide. Keep at **8–14px** and always add `letter-spacing`. Mobile labels drop to 8–10px. |
| **VT323** | all readable body/UI text | 16–20px. Line-height 1.7. |
| **Vazirmatn** | Persian | Loaded as the RTL fallback. |

**RTL rule:** under `[dir="rtl"]`, both `font-pixel` and `font-mono` fall back to Vazirmatn —
Press Start 2P has no Persian glyphs and would render tofu.

---

## 5. Page structure

Single page, normal scrolling with anchor sections. Optional playable layer, never gated content.

```
1. Hero            — pixel character, name, tagline, coffee-cup button, scroll cue
2. About           — three-paragraph origin story + pixel workshop scene
3. Projects        — grid of cards, one per public GitHub repo
4. Tech stack      — two groups: Working with / Currently learning
5. GitHub activity — vertical timeline, 2020 → 2026
6. Contact         — GitHub link, glow-pulse card
7. Footer          — ASCII tagline + copyright
```

Plus overlays: CRT scanlines, sound toggle, language toggle, scroll-progress bar, back-to-top
button, and the Coffee Quest modal.

### Navigation

- **Desktop:** a centered floating pill (`fixed top-4 left-0 right-0 flex justify-center`), generous
  padding (`px-6 py-3`), links at VT323 17px with `px-3 py-2` each.
- **Mobile:** fixed **bottom** bar with 5 pixel-SVG icons above the labels, minimum 48px tap
  targets, `env(safe-area-inset-bottom)` padding.
- **Active state:** amber text + tinted background + inset amber underline + `aria-current="true"`.
- **Scroll behaviour:** entrance fade + slide-down, then it **compacts** (smaller padding and text)
  past 120px. It stays visible — it never hides.

---

## 6. Components

| File | Purpose |
|---|---|
| `components/PixelCharacter.tsx` | Pixel-art character drawn as a 15×18 rect grid |
| `components/PixelWorkshop.tsx` | Pixel-art desk scene (monitor with code, keyboard, coffee with steam, headphones, cartridge, shelf, moonlit window) |
| `components/Navbar.tsx` | Desktop pill + mobile bar, scroll-spy, compact-on-scroll |
| `components/ScrollProgress.tsx` | Fixed 3px top progress bar, `transform: scaleX()` driven |
| `components/BackToTop.tsx` | Appears past 500px, sits above the mobile nav |
| `components/SoundToggle.tsx` | WebAudio ambient hum, **muted by default** |
| `components/LanguageToggle.tsx` | EN / فارسی switch |
| `components/ScrollReveal.tsx` | Fail-safe progressive-enhancement scroll reveal |
| `components/CoffeePlatformer.tsx` | The mini-game |

### Coffee Quest (the easter egg)

Triggered by the coffee cup in the hero. Arrow keys / WASD to move, Space / W / Up to jump, R to
restart. The player collects coffee cups; finishing all shows "CAFFEINE OVERLOAD!". On-screen touch
controls appear below 768px. It is **optional** — everything on the site is reachable without playing.

---

## 7. Motion rules

| Effect | Detail |
|---|---|
| CRT overlay | repeating 2px scanlines + vignette; opacity 0.5 on mobile |
| Scan line | slow vertical sweep; **hidden on mobile** |
| Entrance | fade + slide down ~12px, 400ms ease-out |
| Idle | character floats; coffee steam drifts; cursor blinks |
| Nav | compacts past 120px scroll, ~250ms transitions |
| Reveals | fade + rise 20px on scroll into view |

**Hard rules:**
- Animate `transform` and `opacity` only — never `width`, `height`, or `top/left`.
- Throttle scroll handlers with `requestAnimationFrame`, listener with `{ passive: true }`.
- **Everything** switches off under `@media (prefers-reduced-motion: reduce)`. The CRT overlay is
  removed entirely and reveal animations are skipped.

---

## 8. Accessibility

- Real `<nav>` landmarks with `aria-label`; visible `focus-visible` rings in accent-amber.
- `aria-current="true"` on the active nav link — colour is never the only indicator (active state
  also carries a background and an underline).
- `prefers-reduced-motion` respected site-wide.
- Audio is **muted on load** — never auto-play.
- Minimum 48px tap targets on mobile.
- Decorative SVGs are `aria-hidden="true"`; meaningful ones get labels.

---

## 9. Internationalisation

- English and Persian, switched from the top-left toggle; `dir="rtl"` is set on the page wrapper.
- Persian labels are hand-written, not transliterated.
- All UI strings — including the back-to-top label and nav aria-labels — exist in both languages.
- Layout is mirror-aware: the timeline, grids, and nav all behave correctly in RTL.

---

## 10. Content rules (do not violate)

These came directly from the owner and are strict:

1. **Do not fabricate** project descriptions, proficiency levels, dates, employment history, metrics,
   or screenshots.
2. **Projects** are transcribed from *public GitHub repositories only*. Keep descriptions factual.
3. **Skills** are grouped into *Working with* / *Currently learning* — **never** percentage bars or
   invented levels. The owner describes himself as "starting over" with low-level C++.
4. **No job history.** The timeline is GitHub contribution activity since 2020 only.
5. **GitHub is the only contact link.** No email, Telegram, or social links unless he asks.
6. No downloadable resume.

> `sepehr-k` has no public description, so its card is intentionally vague. Ask the owner for a
> one-liner rather than inventing one.

---

## 11. Editing guide

- **All content** — projects, skills, timeline — lives in `lib/data.ts`.
- **All copy**, EN and FA, lives in the `content` object at the top of `app/page.tsx`.
- Design tokens live in `app/globals.css` under `:root` and `@theme inline`.
- To add a project, add an entry to `projects` in `lib/data.ts`. Nothing else needs to change.

---

## 12. Known pitfalls in this codebase

Both Tailwind v4 gotchas below caused real, shipped bugs. **Read before editing `globals.css`.**

### 12.1 Never add an unlayered `*` reset

Tailwind v4 emits utilities inside `@layer utilities`. An **unlayered** rule in `globals.css`
outranks *every* layered utility regardless of specificity. An unlayered
`* { margin: 0; padding: 0 }` therefore silently killed all `px-*`, `py-*`, `p-*` and `m-*` classes
across the whole site. Tailwind's preflight already does this reset inside `@layer base` — never
duplicate it outside a layer.

### 12.2 SVGs are `display: block`

Tailwind preflight sets `img, svg, video, canvas { display: block; vertical-align: middle }`.
`text-align: center` therefore **cannot** centre an SVG. Centre SVG icons with flex/grid
(`flex flex-col items-center`) or `mx-auto`.

### 12.3 Other landmines

- **Tailwind needs a dev-server restart** to notice a *newly created* component file. Otherwise its
  classes are missing and the component renders unstyled.
- **Don't centre the nav with `left-1/2 -translate-x-1/2`** — use
  `left-0 right-0 flex justify-center`, which was verified to centre reliably.
- **React StrictMode double-mount:** an effect that sets `running = false` in cleanup and never
  resets it in setup will freeze after one frame. The platformer had this bug — always re-arm loop
  flags at the top of the effect.
- **IntersectionObserver misses the final resting position** during smooth scroll. Pair it with an
  `rAF`-throttled `scroll` listener as ground truth.
- **Last-section scroll-spy edge case:** if the page cannot scroll the final section's top above the
  detection line, that section never highlights. Activate the last section when
  `scrollY >= scrollHeight - innerHeight - 2`.
- **Fail-safe reveals:** `.reveal` must default to `opacity: 1`; the animation should only be
  additive. Otherwise every section below the hero renders blank in contexts where the observer
  never fires (iframes, non-scrolling preview panels).

---

## 13. Open items

| Item | Status |
|---|---|
| Palette approval | Chosen by the assistant, **not yet signed off** by the owner |
| `sepehr-k` one-line description | Waiting on the owner |
| More project detail | Only repos are verified; descriptions are factual but thin |
| Deploy / publish | Not deployed. **No git remote configured** |
| The "top-secret project" | Mentioned on his GitHub profile; deliberately not shown on the site |
| Mobile nav | Bottom bar with icons — owner has not given final feedback on it |

---

## 14. History

| Date | Change |
|---|---|
| 2026-10-12 | Interview: identity, art direction, sections, languages, game, sound, timeline, skill grouping |
| 2026-10-12 | v1 build: full site, coffee platformer, ambient audio, EN/FA |
| 2026-10-12 | Fix: removed unlayered `*` reset that had killed all padding/margin utilities |
| 2026-10-12 | Fix: fail-safe scroll reveal; platformer StrictMode freeze; coffee icon centring; last-section scroll-spy |
| 2026-10-12 | Rebuild navbar: centered pill, compact-on-scroll, mobile bottom bar, scroll-progress, back-to-top |
| 2026-10-12 | README + first full git commit (`6ce4963`) |
| 2026-10-12 | `design.md` written |
