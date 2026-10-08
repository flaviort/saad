## 🔭 Overview

This website is built using React/Next.js and incorporates GraphQL integration with WordPress.
[www.saad.cx](https://www.saad.cx/)

## 🚀 Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to get started.

Content comes from the WordPress site (WPGraphQL) at build time, so the local WordPress needs to be running in Local (site domains router mode, `http://saad.local`). Pages are static: content changes go live with the next deployment.

### Stack

- Next.js 16 (App Router, Turbopack, React Compiler) with React 19 and TypeScript (strict)
- next-intl for English (`/about`) and Portuguese (`/pt/about`), messages in `i18n/en.json` and `i18n/pt.json`
- GSAP + ScrollTrigger for animations, Lenis for smooth scrolling
- React `<ViewTransition>` for the page curtain (`assets/scss/atoms/view-transitions.scss`)
- Sass modules, SVGs imported as React components (SVGR)

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

### Environment variables

Create `.env.local` locally and set the same variables on Vercel.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SG_KEY` | yes, for the contact form | SendGrid API key |
| `NEXT_PUBLIC_SITE_URL` | recommended | Live domain, used for canonical URLs, Open Graph and the sitemap (falls back to the Vercel production URL) |
| `WP_GRAPHQL_URL` | no | Overrides the WordPress GraphQL endpoint (default `http://saad.local/graphql`) |

### Project structure

- `app/[locale]/` routes: each `page.tsx` fetches data and builds metadata on the server, then renders a view
- `views/` page UIs (client components)
- `components/` shared components
- `i18n/` locales, routing and translation messages
- `utils/` GraphQL fetcher, metadata helpers, routes
- `types/` shared TypeScript types (WordPress data)

## 🥷 The Team

Client: [Lucas Saad](https://www.linkedin.com/in/lucassaad/)
Design: [Gabriel Leon](https://www.linkedin.com/in/leonngabr/)
Development: [Flávio R. Troszczanczuk](https://www.linkedin.com/in/flaviort/)
Copywriter / SEO: [Jhonny Jessé](https://www.linkedin.com/in/jhonnyjesse)