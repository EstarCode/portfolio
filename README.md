# Abraham Tiruneh — Portfolio

Live production deployment: [https://abrahamtiruneh.vercel.app/](https://abrahamtiruneh.vercel.app/)

Built with React 18, TypeScript, and Vite. Designed with an editorial typography aesthetic, light/dark mode persistence, accessible semantic markup (WCAG 2.1 AA), and zero-FOUC initialization.

## Production Build

```bash
npm install
npm run build
```

Production bundle outputs to `/dist` and is automatically deployed via Vercel on push to `main`.

## Project Structure

```
src/
├── data/profile.ts       # Single source of truth for portfolio profile data
├── types.ts              # TypeScript schemas and contracts
├── components/           # Header, Hero, Projects, Experience, Stack, Education, Contact
├── hooks/                # useTheme, useActiveSection
└── styles/               # Design tokens, CSS variables, typography, and responsive styles
public/
├── assets/               # Production certificates and portrait photography
├── robots.txt            # Search engine crawler directives
└── sitemap.xml           # Canonical XML sitemap
```
