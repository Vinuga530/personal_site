# VinugaK — Personal Portfolio
Astro + TypeScript static site, patch-panel design. Deployed on Vercel from `main`.
- `src/data/config.ts` — all content (projects, stack, contacts)
- `src/data/icons.ts` + `src/icons/` — icon system: 24px grid, 1.5px stroke, `icon-[category]-[name]`
- `src/components/Icon.astro` — throws on unknown icon
- Build runs `astro check` first; type errors fail the deploy.
