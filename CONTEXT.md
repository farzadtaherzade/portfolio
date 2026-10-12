# CONTEXT — farzadtaherzadeh portfolio

Hand-written project context for anyone picking this up cold. Complements `README.md`
(what the project is) and `design.md` (how it looks and why). This file is about **state,
workflow, and constraints**.

Last updated: **2026-10-12**

---

## 1. What this is

A personal-brand portfolio website for **Farzad Taherzadeh**, a backend developer in
Tehran, Iran, whose real interest is making games.

Not a job-hunting CV site. A personality-driven piece: a normal scrollable website with an
optional playable layer (a coffee-collecting platformer behind the hero's coffee cup).

**Status: v1 complete and working.** Design approved in principle; two small things still
waiting on the owner (see §7).

## 2. Where things are

| Path | What |
|---|---|
| `portfolio/` | The project. **Its own git repo**, branch `main`, 3 commits. Clean. |
| `lib/data.ts` | **All content** — projects, skills, timeline. Start here for text changes. |
| `app/page.tsx` | The whole page + the `content` object holding every EN/FA string. |
| `app/globals.css` | Design tokens (`:root` + `@theme inline`), animations, base styles. |
| `components/` | 9 components, all self-contained (see `design.md` §6). |
| `design.md` | Design decisions, palette, typography, pitfalls. **Read before styling.** |
| `README.md` | Public-facing project readme. |
| `AGENTS.md` | Auto-written by `next dev` — do not edit, it regenerates. |

The workspace root is a **separate** git repo holding only `.gitignore` and the
`shots/` screenshots. It is not part of the app.

## 3. Commands

```bash
npm install
npm run dev                      # dev server, default :3000
npm run dev -- --port 3111       # the port used during this build
npx tsc --noEmit                 # type-check — USE THIS, see §8
npm run lint
```

Verified working: `tsc --noEmit` passes, dev server runs, page renders.

## 4. Hard constraints (from the owner, not negotiable)

1. **Never fabricate** project descriptions, proficiency levels, dates, employment history,
   metrics, or screenshots.
2. Projects come from **public GitHub repositories only** — keep descriptions factual.
3. **No skill percentages or proficiency bars.** Skills are grouped *Working with* /
   *Currently learning*. He describes himself as "starting over" with low-level C++.
4. **No job history or resume.** The timeline is GitHub activity since 2020 only.
5. **GitHub is the only contact link.** No email, Telegram, Instagram unless he asks.
6. No downloadable resume/CV.
7. Sound must stay **muted by default**.
8. Everything must work **without playing the game** — never gate content behind it.

## 5. Design decisions already made

See `design.md` for the full reasoning. The short version:

- **Art direction:** atmospheric pixel workshop — Cultic/Inside depth + Celeste warmth +
  Gris colour flow. Explicitly *not* neon arcade. Moody, layered.
- **Palette:** deep purple backgrounds (`#0d0b1a` family) with amber (`#e8a838`) accent,
  cyan, magenta. **Chosen by the assistant; owner has not formally signed off.**
- **Fonts:** Press Start 2P (headings, 8–14px), VT323 (body), Vazirmatn for Persian.
- **Character:** pixel-art Farzad — hoodie, headphones, coffee. No photo of a real person.
- **Nav:** centered pill on desktop, bottom bar on mobile, compacts (never hides) past
  120px scroll. Owner explicitly disliked hiding behaviour.
- **Languages:** English + Persian with full RTL.

## 6. Verified working

Measured in a real browser at 1280 / 390 / 320px:

- Zero horizontal overflow at any width
- Desktop nav: `pillCenter === viewportCenter` exactly, padding applied, active-section
  highlight, smooth-scroll navigation, hash updates
- Mobile nav: 5 items, 48px tap targets, back-to-top button sits above it
- Scroll-progress bar; nav compacts on scroll
- Coffee Quest: keyboard input works, canvas animates, touch controls present
- Scroll reveal never leaves content invisible
- Coffee icon centered over its label (offset 0)

## 7. Open items

| # | Item | Blocked on |
|---|---|---|
| 1 | Palette sign-off | Owner |
| 2 | One-line description for `sepehr-k` (its card is deliberately vague — the repo has no public description) | Owner |
| 3 | Retry the deploy (see §8.9) | Cloudflare API |
| 4 | OpenNext incremental cache not configured | Optional |
| 5 | Custom domain | Owner decision |
| 6 | Git remote for `portfolio/` | Owner decision |

## 8. Environment gotchas — read this before you get stuck

These cost real time during the build. All are sandbox/tooling issues, not code bugs.

1. **`npm run build` is blocked *in this sandbox only*.** A sandbox delete-guard refuses
   Next.js's `.next` cleanup (`SAFE_DELETE_BULK_CONFIRM_REQUIRED`) and the build exits
   non-zero *after* compiling fine. Use `npx tsc --noEmit` to type-check instead.
   **This is a local sandbox limitation, not a project problem** — see §8.9, the real
   production build has since been proven to succeed on Cloudflare's CI.

2. **Tailwind v4 + unlayered CSS (bit us twice):**
   - Utilities live in `@layer utilities`. Any **unlayered** rule in `globals.css`
     outranks them. An unlayered `* { margin:0; padding:0 }` silently killed every
     `px-*`/`py-*`/`p-*`/`m-*` class site-wide. Preflight already handles this in
     `@layer base` — never duplicate it outside a layer.
   - Preflight sets `img, svg, video, canvas { display: block }`, so `text-align: center`
     **cannot** centre an SVG. Use flex/grid or `mx-auto`.

3. **Tailwind needs a dev-server restart** to pick up a *newly created* component file.
   Otherwise the component renders completely unstyled — no classes generated, no error
   message. If a new component looks unstyled, restart before debugging.

4. **Visual verification recipe** (what worked):
   - Chrome headless + Chrome DevTools Protocol over a Node `WebSocket`.
   - **Port 9333 works; 9600+/9777 are blocked by the sandbox.**
   - `--window-size` does **not** emulate a viewport — Chrome enforces a ~500px minimum
     width, which silently gives wrong measurements. Use
     `Emulation.setDeviceMetricsOverride`.
   - Probe `requestAnimationFrame` frame counters to prove an animation loop actually
     runs, rather than trusting a screenshot.
   - Chrome leaves behind profile dirs like `shots/.chrome-*`, `shots/.probe*`,
     `shots/.nv-*`, `shots/.ip-*`, `shots/.shot-*`. They are 1.7 MB+ of browser junk.
     Delete them and keep `shots/.*` in `.gitignore` — a `git add -A` once swept them in.

5. **Don't centre the nav with `left-1/2 -translate-x-1/2`.** Use
   `left-0 right-0 flex justify-center` — verified reliable, the translate version
   reported as left-stuck.

6. **React StrictMode double-mounts effects in dev.** A loop flag set to `false` in
   cleanup and never reset in setup freezes after one frame — this is exactly what broke
   the mini-game. Always re-arm loop flags at the top of the effect.

7. **A stale `.git/index.lock`** (exit 128, "Another git process seems to be running")
   is usually just a killed command's leftover. Confirm no git process is running with
   `tasklist`, then `rm -f .git/index.lock`.

8. **`next dev` rewrites `AGENTS.md`.** Committing unrelated work will otherwise include
   that uncommitted change.

9. **Deployment state (2026-10-12).** The repo is wired to **Cloudflare Workers Builds**
   (not Pages — Workers picked it up and ran the OpenNext adapter, creating
   `wrangler.jsonc`, `open-next.config.ts`, `.dev.vars` and `public/_headers` in the CI
   environment only; they are not in the local tree). The build itself **succeeds**:
   `next build` compiled in 7–12s, TypeScript passed, 4 pages prerendered as static.
   The deploy got as far as uploading 18 assets (4.76 MiB) and the Worker itself
   (startup 21 ms), then failed only on the last API call:

   ```
   POST /accounts/.../workers/scripts/portfolio/subdomain -> 504 Gateway Timeout
   ```

   That enables the `*.workers.dev` URL. It is an **idempotent, retryable step** — the
   Worker is deployed, just unpublishable. Fix: re-run the deploy (or push a commit to
   retrigger CI). If it 504s again, enable it in the dashboard under
   *Workers & Pages → portfolio → Settings → Domains & Routes*.

   Separately, the OpenNext migration logged `WARN Failed to set up cache for your
   project` — non-fatal, and largely irrelevant for a site with no ISR or revalidation.

## 9. Recommended next actions

1. Ask the owner for **palette sign-off** + the **`sepehr-k` one-liner** — both are one
   message and unblock everything else.
2. **Retry the Cloudflare deploy** to get past the `workers.dev` subdomain 504 (§8.9).
3. Register a custom domain so the site never depends on a platform subdomain.
4. Optional simplification: the site is fully client-side with no API routes, so it could
   drop the OpenNext/Work stack entirely via `output: 'export'` and be served as plain
   static files. Not necessary while Workers is working — it is only a smaller,
   faster-building alternative.
5. Optionally configure the OpenNext incremental cache (§8.9) — only worth it if dynamic
   content or revalidation is ever added.
