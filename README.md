# Arcadia — Next.js Games (Learning Playground)

Arcadia is a Next.js learning playground — a small, experimental app built while learning Next.js features.
It contains a handful of quick, browser games, a compact UI, and basic examples that showcase server and
client components, routing, and some interactive shaders.

Quick facts & demo:

- Live demo: https://arcadia-ochre-three.vercel.app/
- This repository is a personal playground (not production software). It was created to learn and experiment with Next.js.

Tech stack:

- App Router (app/) — server components + client components
- Tailwind CSS + PostCSS (v3)
- Sass (SCSS modules and global styles)

Prerequisites:

- Node.js 20.9 or later (check with `node -v`)
- Git

Clone and run locally:

```bash
# 1) Clone the repo
git clone https://github.com/Humaka01/arcadia.git
# 2) Change directory
cd arcadia
# 3) Verify Node.js version (needs Node v20+)
node -v
# 4) Install dependencies (recommended: npm ci for reproducible installs)
npm ci
# 5) Start the dev server (port 3000 by default)
npm run dev
# 6) Open your browser at http://localhost:3000
```

Key files:

- `app/layout.js`: root layout, global styles and progress bar
- `app/page.js`: hero, featured and all games sections
- `components/GameCard.js`: game card UI and favorite toggle
- `styles/globals.scss`: Tailwind utilities, CSS variables, card styles

Features:

- Games list: `app/games` and dynamic routes `app/games/[slug]`
- Favorites: click the star to add/remove (persisted in localStorage)
- Modern UI: Inter font, skeletons, micro-interactions, progress bar

Try it:

```bash
npm install
npm run dev
```

Build & deploy (production):

```bash
# Create a production build
npm run build
# Start production server
npm run start
```

Troubleshooting:

- If `npm ci` fails, try `npm install` instead.
- If `node -v` is < 20, upgrade Node or use `nvm`/`n` to switch to Node 20+.
- The app uses localStorage for favorites; clearing localStorage will reset favorites.

Notes:

- Some small components and UI patterns were inspired or adapted from reactbits.dev and uiverse.io.
- This project was scaffolded and iterated with the help of a GitHub Copilot VS Code extension (coding agent),
  so some code is generated or suggested via Copilot while being reviewed by the author.
- Pushes to the `main` branch trigger a GitHub Actions workflow that deploys to Vercel.
- This repo is intended for learning and experimentation — expect rough edges and quick demos.
```
