# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds Next.js app router pages and layouts (for example `app/page.tsx`).
- `components/` contains shared React components; `components/ui/` is the UI toolkit layer.
- `hooks/` provides reusable React hooks.
- `lib/` contains small utilities (for example `lib/utils.ts`).
- `public/` stores static assets and images served at the root URL.
- `styles/` and `app/globals.css` define global styling and Tailwind layers.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies.
- `pnpm dev`: run the local dev server with hot reload.
- `pnpm build`: produce the production build.
- `pnpm start`: run the production server after a build.
- `pnpm lint`: run ESLint over the project.

## Coding Style & Naming Conventions
- TypeScript + React + Next.js; use function components and hooks.
- Indentation is 2 spaces; avoid semicolons to match existing files.
- File names in `components/` are kebab-case (`hero-section.tsx`), component names are PascalCase (`HeroSection`).
- Styling uses Tailwind CSS; prefer utility classes and shared variants from `lib/utils.ts`.

## Testing Guidelines
- No test framework is configured in this repo.
- If you add tests, document the tooling and add scripts to `package.json` (for example `pnpm test`).

## Commit & Pull Request Guidelines
- Git history is not available in this checkout, so no commit message convention can be inferred.
- Use clear, scoped commit messages (for example `feat: add hero CTA`) and include screenshots for UI changes.
- In PRs, describe the change, link related issues, and note any follow-up work.

## Configuration Tips
- Tailwind and PostCSS configs live at `postcss.config.mjs` and `app/globals.css`.
- Environment variables should be documented in the README if introduced.
