# oscarrc.me

My personal site — a single-page landing built with [Astro](https://astro.build),
[Tailwind CSS](https://tailwindcss.com) and [daisyUI](https://daisyui.com), deployed to GitHub
Pages at [oscarrc.me](https://oscarrc.me).

## Project structure

```text
/
├── public/                 # static assets (favicon, …)
├── src/
│   ├── assets/             # bundled images (project logos, social icons)
│   ├── components/         # ProjectGrid, Footer, CursorBubble, PlusMark
│   ├── content/            # content collections (projects.json, socials.json)
│   ├── content.config.ts   # collection schemas (projects + socials)
│   ├── layouts/            # Layout.astro
│   ├── pages/              # index.astro (the landing page)
│   └── styles/             # global.css
└── astro.config.mjs        # site config + font providers
```

Content is data-driven: the project grid is generated from `src/content/projects.json` and the
footer social links from `src/content/socials.json`, both validated by the schemas in
`src/content.config.ts`. To add a project or social link, edit the JSON and drop the referenced
icon into `src/assets/`.

## Commands

This project uses **pnpm** (pinned via the `packageManager` field). Requires Node ≥ 22.13.

| Command          | Action                                       |
| :--------------- | :------------------------------------------- |
| `pnpm install`   | Install dependencies                         |
| `pnpm dev`       | Start the dev server at `localhost:4321`     |
| `pnpm build`     | Build the production site to `./dist/`       |
| `pnpm preview`   | Preview the build locally before deploying   |
| `pnpm astro ...` | Run Astro CLI commands (`astro add`, etc.)   |

## Deployment

Pushing to `master` triggers the [`Deploy to GitHub Pages`](.github/workflows/deploy.yml) workflow,
which builds the site with `withastro/action` and publishes it to GitHub Pages. The custom domain
`oscarrc.me` is configured in the repository's Pages settings.
