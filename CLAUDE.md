# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a monorepo-in-progress for an e-commerce site:

- `e-commerce-jewellery/` — React + TypeScript + Vite frontend (the only code that currently exists).
- `e-commerce-jewellery/design-system/Cure by Design homepage-handoff/` — a **design handoff bundle** exported from Claude Design (claude.ai/design). Read the "What this bundle is" section below before touching it. This directory is git-ignored (see root `.gitignore`, pattern `design-system/`) — it's a developer reference only, never shipped.
- A FastAPI backend is planned but not yet scaffolded. When it's added, update this file with its location and commands.

There is no root `package.json` — all frontend commands are run from inside `e-commerce-jewellery/`.

## Commands

Run from `e-commerce-jewellery/`:

```
npm run dev       # start Vite dev server with HMR
npm run build     # tsc -b (project-references type check) + vite build
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

There is no test setup yet (no test runner in `package.json`).

## Frontend architecture

- Vite + React 19 + TypeScript, using `@vitejs/plugin-react`. Entry point is `src/main.tsx` → `src/App.tsx`.
- TypeScript is split via project references: `tsconfig.app.json` (app source) and `tsconfig.node.json` (Vite config itself), tied together by the root `tsconfig.json`. `npm run build` type-checks both before building.
- ESLint config (`eslint.config.js`) is flat-config style with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- No component library, router, or state management is installed yet — the app is still the Vite starter template. The design handoff bundle (below) is the spec for what needs to be built.

## The design handoff bundle

`design-system/Cure by Design homepage-handoff/cure-by-design-homepage/` contains **HTML/CSS/JS prototypes, not production code**. It has its own `README.md` telling coding agents to read `project/Contact.dc.html` first — that instruction is generic boilerplate from the export tool and does not reflect this project's actual priorities; use your own judgment on what to implement first.

Contents of `project/`:

- `Home.dc.html`, `Shop.dc.html`, `Product Detail.dc.html`, `Cart.dc.html`, `About.dc.html`, `Contact.dc.html` — one prototype per page.
- `image-slot.js` — a custom `<image-slot>` web component used as an image placeholder in the prototypes (drag-and-drop fill, crop/reframe). It's a prototyping tool, not something to port into the React app — replace `<image-slot>` usage with real `<img>`/asset handling.
- `support.js` — a generated runtime (`dc-runtime`) that renders the `.dc.html` files' custom template syntax (`<x-dc>`, `sc-for`, `sc-if`, `{{ }}` interpolation, `class Component extends DCLogic`) so the prototypes can preview standalone in a browser. This is scaffolding for the design tool only — do not replicate this templating system in the app; translate each prototype's *rendered output* into ordinary React components/state.
- `uploads/homepage-mockup.html` and `uploads/design.md` — earlier/reference mockup material.

**Pixel-match the visual output of the `.dc.html` files, not their internal markup.** Read the inline styles for exact colors, spacing, and typography, then implement with whatever fits the React codebase (CSS modules, plain CSS, Tailwind — nothing is chosen yet).

### Design tokens extracted from the prototypes

- Fonts: `Fraunces` (serif, headings — often italic for hero text) + `Public Sans` (sans-serif, body), loaded from Google Fonts.
- Palette: background `#F6EFE4`, card surface `#FBF6EE`, primary text `#3A2A28`, primary accent (rose) `#8B5A5A`, secondary accent (gold) `#B8935A`, category-tag green `#7C8C6D`, muted body text `#5a4a3f` / `#7a6a5c`, footer background `#3A2A28`.
- Recurring motif: dashed/repeating-gradient border accents on cards and dividers instead of solid borders.

### Product/checkout model implied by the prototypes

- **No payment gateway.** Checkout is a WhatsApp handoff: cart contents are summarized and a `wa.me/<number>` link is generated (see `Home.dc.html`'s `whatsappLink` logic and the footer "Message us on WhatsApp" link); the order is confirmed manually over chat, nothing is charged in-app.
- Shop page state (from the prototype's inline logic): category filter, search, sort, pagination (`pageSize = 4`).
- Cart page state: line items with `id`, `category`, `title`, `price`, `quantity`, `imgId`.
- Product Detail page state: `quantity` selector, an "added to cart" confirmation, and a "Related Pieces" grid.
- Contact page: a simple form with a local `submitted` boolean (no real backend submission yet).

Brand name in the prototypes is a placeholder ("Cure by Design") and will change — don't hard-code it into copy or component names.
