# AI Maturity Spectrum Visualization

Interactive visualization of AI maturity levels with an SVG-based spectrum diagram and supporting details panel.

## Overview

This project renders a custom SVG diagram that maps AI maturity levels against task complexity and engineering involvement. It provides an interactive way to explore each level with hover highlights and detailed content.

## Tech Stack

- Vite
- React + TypeScript
- Utility-first styling with Tailwind-like classes
- `clsx` + `tailwind-merge` helpers

## Key Features

- Declarative SVG diagram with layered rendering
- Hover and active state highlighting
- Background zones and animated connectors
- Contextual information panels

## Local Setup

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file in the repo root when needed. The following variable is read by Vite and injected into `process.env`:

- `GEMINI_API_KEY`

Do not commit secrets.

## Project Structure Highlights

- `components/Diagram.tsx`: diagram composition
- `components/diagram/`: declarative diagram components + layout hooks
- `components/InfoPanel.tsx`: supporting details panel
- `constants.ts`: AI maturity data source
- `types.ts`: shared TypeScript types
