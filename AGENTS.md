# AGENTS.md

This repository is a small Vite + React + TypeScript app for an AI Maturity Spectrum visualization.
Use this guide to work safely and consistently inside the repo.

**Repository Facts**
- Package manager: npm (package.json only)
- Build tool: Vite
- Language: TypeScript + React
- Styling: utility classes (Tailwind-like), `clsx`, `tailwind-merge`
- No test or lint tooling configured

**Project Commands**
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

**Tests / Lint**
- No test runner configured in `package.json`.
- No lint scripts configured.
- There is no “single test” command available yet.
- If you add tests later, also add `test` and `test:watch` scripts and update this file.

**Environment Variables**
- `.env.local` is expected in the repo root.
- `GEMINI_API_KEY` is read by Vite in `vite.config.ts` and injected into `process.env`.
- Don’t commit secrets; keep `.env.local` local.

**Paths and Aliases**
- TypeScript path alias: `@/*` resolves to the repo root.
- Example: `import { AI_LEVELS } from '@/constants';`

**Code Style: General**
- Follow the existing file’s style when editing; formatting varies slightly across files.
- Prefer explicit, readable code over clever abstractions.
- Keep components small; split UI panels into separate files under `components/`.
- Keep business data in `constants.ts` and types in `types.ts`.
- Avoid introducing non-ASCII characters unless already present in the file.

**Imports**
- Order imports with this grouping:
  1) React / ReactDOM
  2) Third-party libraries
  3) Local modules (`./`, `../`, or `@/`)
- Use `@/` for root-level imports when it clarifies paths.
- Use named exports where appropriate; default exports are used for components.

**Formatting**
- Indentation is 2 spaces in most files; keep consistent per file.
- Quotes:
  - TS/TSX files mostly use single quotes in imports and strings.
  - JSX props use double quotes as normal in JSX.
- Semicolons are used in most TS/TSX files; preserve existing conventions.
- Keep lines reasonably short; break long JSX props into multiple lines.

**React Component Patterns**
- Use function components typed as `React.FC` where already used.
- Keep hooks at the top of components, before helpers.
- Extract reusable blocks into small local components (see `InfoPanel` and `CollapsibleSection`).
- When adding new components, keep them in `components/` or `components/ui/`.

**Types**
- Use `interface` for object shapes and props (see `types.ts`).
- Prefer explicit union types for state (`'light' | 'dark'`).
- Keep shared types in `types.ts`.

**State and Effects**
- Keep state minimal and colocated in the component that owns it.
- Prefer derived state via `useMemo` (see `Diagram` calculations).
- In effects, clean up side effects when needed.

**Styling**
- Styling is done via utility classes.
- Use `clsx` for conditional classes; use `cn` helper from `lib/utils.ts`.
- Keep class lists readable; break across lines for long className props.

**SVG and Canvas**
- The diagram is SVG-based in `components/Diagram.tsx`.
- Keep geometry values at the top of the component.
- Use `useMemo` for expensive computations (coordinates, zones, paths).

**Error Handling**
- Guard against missing DOM elements (see `index.tsx`).
- Validate inputs or state before acting (e.g., null checks).
- Prefer early returns for invalid state.

**Data Conventions**
- `AI_LEVELS` in `constants.ts` is the source of truth.
- Keep the shape aligned with `LevelData` in `types.ts`.
- Colors are stored as hex strings.

**Testing Guidance (If Added Later)**
- Prefer React Testing Library + Vitest for Vite projects.
- Add a `test` script and a “single test” script (e.g., `test:watch -- <pattern>`).
- Document exact commands here if you add tests.

**Linting / Formatting Guidance (If Added Later)**
- Prefer ESLint + TypeScript plugin + React hooks rules.
- Add a `lint` script and document any autofix command.

**File Layout (Key Files)**
- `App.tsx`: top-level UI and page layout
- `components/Diagram.tsx`: SVG visualization
- `components/InfoPanel.tsx`: side panel with collapsible sections
- `components/ui/ScrollArea.tsx`: Radix UI wrapper
- `constants.ts`: AI maturity data
- `types.ts`: shared TypeScript interfaces
- `lib/utils.ts`: `cn` helper
- `index.tsx`: app bootstrap

**Operational Notes for Agents**
- This repo is not a git repo; avoid git commands unless told otherwise.
- Do not generate or commit large new assets without explicit request.
- Keep changes scoped to the task; avoid unrelated refactors.

**Cursor / Copilot Rules**
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` were found.
- If any are added later, merge them into this guide.

**Quick Change Checklist**
- Did you follow the existing file’s formatting style?
- Did you keep `AI_LEVELS` in sync with `LevelData`?
- Did you avoid adding new dependencies without need?
- Did you update this file if you added tests/lint scripts?
