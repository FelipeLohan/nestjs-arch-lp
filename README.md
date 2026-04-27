# nestjs-arch-lp

Landing page for [nestjs-arch-explorer](https://github.com/FelipeLohan/nestjs-architecture-explorer) — a plug-and-play NestJS library that renders an interactive architecture graph dashboard at `/arch`.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** (dev server + build)
- Plain **CSS** with custom properties — no CSS framework

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

```bash
pnpm build      # type-check + production build → dist/
pnpm preview    # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── Navbar.tsx / .css         # sticky header — logo, npm badge, GitHub
│   ├── Hero.tsx / .css           # tagline, CTAs, install snippet
│   ├── GraphMock.tsx             # animated SVG graph (used inside Hero)
│   ├── Features.tsx / .css       # 3×2 feature cards
│   ├── QuickStart.tsx / .css     # 3-step timeline with code blocks
│   ├── HowItWorks.tsx / .css     # internals steps + node colour legend
│   ├── Configuration.tsx / .css  # options table + example snippet
│   └── Footer.tsx / .css         # tagline, MIT, author, links
├── ui/
│   └── CodeBlock.tsx / .css      # syntax-highlighted code block, copy button
├── hooks/
│   └── useInView.ts              # IntersectionObserver — scroll animations
├── index.css                     # design tokens, reset, global utilities
├── App.tsx
└── main.tsx
public/
├── Logo.svg                      # official project logo (navbar + favicon)
└── favicon.svg                   # browser tab icon (legacy, unused)
```

## Design tokens

All colours, spacing, and typography are defined as CSS custom properties in `src/index.css`.

| Token | Value | Usage |
|---|---|---|
| `--indigo` | `#6366f1` | Primary buttons, borders, badges |
| `--indigo-light` | `#818cf8` | Text accents, icon colours, hover |
| `--emerald` | `#10b981` | Controller nodes, feature icons |
| `--amber` | `#f59e0b` | Provider nodes, decorator highlights |
| `--bg-deep` | `#09090f` | Page background |
| `--bg-surface` | `#111118` | Section alternating background |
| `--bg-card` | `#16161f` | Cards, code blocks |

## Animations

Scroll-triggered animations use a lightweight `useInView` hook (`src/hooks/useInView.ts`) backed by `IntersectionObserver`. All motion is gated behind `@media (prefers-reduced-motion: no-preference)` — users with reduced motion see content immediately without any transitions.

## Related

- **nestjs-arch-explorer** — [GitHub](https://github.com/FelipeLohan/nestjs-architecture-explorer) · [npm](https://www.npmjs.com/package/nestjs-arch-explorer)

## License

MIT © [FelipeLohan](https://github.com/FelipeLohan)
