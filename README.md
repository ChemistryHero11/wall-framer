# 🖼️ Wall Framer

**Plan how to hang framed pictures on a wall — to scale — before you drill.**

A dead-simple, mobile-first web app with exactly one job: arrange your frames on a
to-scale wall, then read off the exact position (and the **nail height to mark**) so
you get it right the first time. One self-contained HTML file — no build, no
dependencies, no accounts, works offline.

## Features

- 📐 **To-scale wall** — enter your wall's real width × height (in / cm / ft).
- 🖼️ **Add frames** two ways: snap a **photo** (crop, one-tap auto-trim, rotate,
  EXIF auto-corrected) or add a **blank** sized rectangle. Common sizes
  (5×7, 8×10, 16×20, 24×36…) are one-tap presets.
- ✋ **Drag to arrange** with finger or mouse. Optional **grid** + **snap-to-grid**
  (independent toggles).
- 📏 **Exact measurements** — select a frame to see its position, center height, and
  the **nail height to mark** (accounts for wire sag). Toggle a 57″ eye-level guide.
- 💾 **Auto-saves** locally (IndexedDB). **Export / import** a project file to move it
  between devices. **Export a PNG** of your layout to carry to the wall.

## Run it locally

It's a single static file. Easiest:

```bash
# any static server works; e.g. Python:
python -m http.server 8123
# then open http://localhost:8123
```

> Opening `index.html` directly via `file://` works too, but browsers disable saved
> photos on `file://` — serve it (above) or deploy it for full persistence + phone
> camera capture.

## Deploy to Vercel

It's a **zero-config static site**:

1. Push this repo to GitHub.
2. In Vercel → **Add New → Project** → import the repo.
3. **Framework Preset: Other**, **no Build Command**, Output Directory = repo root
   (the defaults are correct).
4. Deploy, then open the URL on your phone and laptop.

No `vercel.json` or build step is needed — Vercel serves `index.html` from the root.

## Phone + laptop workflow

Snap & crop photos on your phone, then arrange on your laptop (or vice-versa):
**⋯ menu → Export project** (photos travel inside the file) → **Import** on the other
device. Real-time cloud sync is a planned **v2** (it needs a backend, intentionally
left out to keep this simple).

## Tech

Single `index.html`, vanilla JS, no framework, no build step. Canonical unit is
inches (display converts to cm/ft); Pointer Events for unified touch + mouse drag;
IndexedDB for persistence with an in-memory fallback.
