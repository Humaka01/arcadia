# Router differences: App Router vs Pages Router

Short summary:

- App Router (`app/`) — modern, introduced in Next.js 13+. Supports nested layouts, React Server Components (RSC), streaming, and special file conventions (`layout.js`, `page.js`, `loading.js`, `error.js`). Default flow uses Server Components, with `use client` opt-in for client components.
- Pages Router (`pages/`) — older but widely used. Uses convention-based data fetching (`getStaticProps`, `getServerSideProps`, `getStaticPaths`) and traditional React rendering. It's stable and compatible with existing projects.

When to use which:
- Use App Router if you want the latest patterns like Server Components, nested layouts, and improved routing developer UX. It's recommended for new projects.
- Use Pages Router if you prioritize mature APIs or rely on features not moved to App Router yet (some APIs are still primarily pages-based). You can also use both in one project with special setup, but that's advanced.

Examples:

App Router example: `app/about/page.js` — nested layout: `app/about/layout.js`.

Pages Router example: `pages/about.js` that exports `getStaticProps`.

Which did I scaffold?
I scaffolded an App Router project by default since it is recommended for new projects and fits the structure that uses layouts and server components.
