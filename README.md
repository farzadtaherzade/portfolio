# farzadtaherzadeh

Personal portfolio of **Farzad Taherzadeh** — turning caffeine and curiosity into fun little programs.

A dark, atmospheric pixel-art portfolio built as a normal scrollable website with an optional
playable layer. Not a neon arcade: the visual language leans on moody depth, warm desk-light
accents, and hand-authored pixel scenes.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Press Start 2P (headings), VT323 (body), Vazirmatn (Persian/RTL) |
| Runtime | Node.js, npm |

No external UI or animation dependencies — the pixel art, ambient audio, and the mini-game are
all hand-rolled.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Useful scripts:

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # type-check only
```

To run the dev server on a different port:

```bash
npm run dev -- --port 3111
```

## Features

**Content**

- Hero with a pixel-art character and the "caffeine and curiosity" tagline
- About section written from the real origin story (Mr. Robot, Fortnite creative mode)
- Projects pulled from public GitHub repositories — no invented descriptions
- Tech stack split into *Working with* / *Currently learning* rather than fake proficiency bars
- GitHub activity timeline
- Contact via GitHub

**Interaction**

- **Coffee Quest** — a playable canvas platformer easter egg behind the coffee cup in the hero.
  Arrow keys / WASD to move, Space / W / Up to jump, R to restart. On-screen touch controls on
  mobile.
- Ambient workshop hum via WebAudio — **muted by default**, with a toggle in the top-right corner
- English / Persian language switch with full RTL layout support
- Scroll-progress bar, back-to-top button, and a navigation bar that compacts as you scroll
- Active-section highlighting in the navigation while scrolling

**Presentation**

- CRT scanline overlay and a slow-moving scan line
- Entrance animations, pixel character idle breathing
- Every animation is disabled under `@media (prefers-reduced-motion: reduce)`

## Project structure

```
app/
  layout.tsx        metadata + root layout
  page.tsx          the whole page (hero, about, projects, skills, activity, contact)
  globals.css       design tokens, base styles, animations
components/
  PixelCharacter.tsx    pixel-art character (hoodie, headphones, coffee)
  PixelWorkshop.tsx     pixel-art desk scene rendered as SVG
  Navbar.tsx            centered desktop pill + mobile bottom bar, scroll-spy
  ScrollProgress.tsx    top scroll-progress bar
  BackToTop.tsx         floating back-to-top button
  SoundToggle.tsx       WebAudio ambient hum with a mute switch
  LanguageToggle.tsx    EN/FA switch
  ScrollReveal.tsx      progressive-enhancement scroll reveal
  CoffeePlatformer.tsx  the mini-game
lib/
  data.ts           all site content — projects, skills, timeline
```

### Editing content

Text, projects, skills, and the timeline all live in **`lib/data.ts`**. English and Persian strings
are in the `content` object at the top of `app/page.tsx`.

Project entries are transcribed from public GitHub repositories. Keep descriptions factual — do
not add metrics, dates, or claims that are not visible in the repos themselves.

### Design tokens

Colours, fonts, and pixel-card utilities are defined as CSS variables in `app/globals.css` and
exposed to Tailwind via `@theme inline`:

| Token | Value | Used for |
|---|---|---|
| `bg-deep` | `#0d0b1a` | page background |
| `bg-surface` | `#1e1a35` | cards |
| `accent-amber` | `#e8a838` | primary accent, active states |
| `accent-cyan` | `#4ec9b0` | secondary accent |

## Two Tailwind v4 gotchas in this codebase

Both caused real bugs and are worth remembering before editing `globals.css`:

1. **Never add an unlayered `* { margin: 0; padding: 0 }` reset.** Tailwind utilities live in
   `@layer utilities`; an unlayered rule outranks them through cascade-layer precedence and
   silently kills every `px-*` / `py-*` / `p-*` class. Preflight already handles this in
   `@layer base`.
2. **SVGs are `display: block` via preflight,** so `text-align: center` does not center them.
   Center SVG icons with flex/grid or `mx-auto`.

## Deploying

A standard Next.js app — deployable to Vercel, Netlify, or any Node host. Build with
`npm run build` and serve with `npm run start`.

## Credits

Built by Farzad Taherzadeh ([farzadtaherzade](https://github.com/farzadtaherzade)).
Pixel art, copy, and the mini-game are original.
