# Arcadia — Next.js Games

Arcadia is a polished Next.js app featuring quick, fun browser games with a modern UI, favorites, and responsive design.

Tech stack:

- App Router (app/) — server components + client components
- Tailwind CSS + PostCSS (v3)
- Sass (SCSS modules and global styles)

Quick start:

```bash
cd next-test
# Install dependencies (exact versions are pinned in package.json)
npm install
# Start the dev server
npm run dev
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

Build:

```bash
npm run build
npm run start
```
