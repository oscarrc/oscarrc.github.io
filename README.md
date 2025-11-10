[![Deployment](https://github.com/oscarrc/oscarrc.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/oscarrc/oscarrc.github.io/actions/workflows/deploy.yml)

# oscarrc.github.io

Personal blog and portfolio website built with [Astro](https://astro.build), featuring blog posts, project showcases, and an AI-powered search experience.

## ✨ Features

- **📝 Blog System**: MDX-based blog posts with series support, tags, and reading time estimation
- **🚀 Projects Portfolio**: Showcase projects with GitHub integration, live demos, and cover images
- **🔍 AI-Powered Search**: Semantic search using embeddings and Pagefind for full-text search
- **🎨 Modern UI**: Built with Tailwind CSS 4 and DaisyUI, featuring Catppuccin Mocha theme
- **📱 Responsive Design**: Fully responsive layout that works on all devices
- **⚡ Performance**: Static site generation with Astro for optimal performance
- **💬 Comments**: Giscus integration for blog posts and projects
- **🔗 RSS Feed**: Automatic RSS feed generation for blog posts
- **🗺️ Sitemap**: Automatic sitemap generation for SEO
- **📊 GitHub Integration**: Dynamic GitHub repository cards with stats

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oscarrc/oscarrc.github.io.git
cd oscarrc.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## 📜 Available Scripts

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run build:pagefind`  | Generate Pagefind search index                   |
| `npm run build:embeddings`| Generate AI embeddings for semantic search       |
| `npm run postbuild`       | Run both Pagefind and embeddings generation      |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📁 Project Structure

```
/
├── public/              # Static assets (fonts, favicon, etc.)
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Astro components
│   │   ├── GithubCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── PostCard.astro
│   │   └── ...
│   ├── content/        # Content collections
│   │   ├── home/       # Home page content
│   │   ├── posts/      # Blog posts (MDX/MD)
│   │   ├── projects/   # Project showcases (MDX/MD)
│   │   └── skills/     # Skills data (JSON)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── plugins/        # Remark/Rehype plugins
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── workers/        # Web workers
│   ├── content.config.ts  # Content collection schemas
│   └── site.config.ts  # Site configuration
├── scripts/            # Build scripts
└── astro.config.mjs    # Astro configuration
```

## 📝 Content Management

### Creating a Blog Post

Create a new directory in `src/content/posts/` with an `index.md` or `index.mdx` file:

```markdown
---
title: "My Blog Post"
published: 2024-01-01
description: "A brief description"
tags: ["astro", "web-development"]
series: "web-development" # Optional
cover:
  src: "./cover.png"
  alt: "Cover image"
---

# Your content here
```

### Creating a Project

Create a new directory in `src/content/projects/` with an `index.md` or `index.mdx` file:

```markdown
---
title: "My Project"
published: 2024-01-01
description: "Project description"
tags: ["react", "typescript"]
repo: "username/repo-name" # Optional
url: "https://example.com" # Optional
active: true
cover:
  src: "./cover.png"
  alt: "Project cover"
---

# Project details
```

## 📝 Markdown Features

This project includes several custom markdown plugins that enhance the writing experience. Here are the available features:

### Alerts / Callouts

Use container directives to create styled alert boxes with icons:

```markdown
:::info
This is an info alert! Use it to provide helpful information to your readers.
:::

:::error
This is an error alert! Perfect for highlighting critical issues or problems.
:::

:::success
This is a success alert! Great for confirming successful actions or positive outcomes.
:::

:::warning
This is a warning alert! Use it to draw attention to potential issues or important cautions.
:::

:::question
This is a question alert! Ideal for posing questions or highlighting areas that need clarification.
:::
```

**Available alert types:** `info`, `error`, `success`, `warning`, `question`

### Image Captions

Add captions to images by including a `title` attribute. Images with titles are automatically wrapped in a `<figure>` element with a `<figcaption>`:

```markdown
![Alt text](./image.png "This is the caption text")
```

The title text will appear as a caption below the image.

### External Links

External links are automatically enhanced with:
- `target="_blank"` attribute
- `rel="noreferrer noopener"` for security
- External link icon (🔗) indicator

No special syntax needed - just use regular markdown links. The plugin automatically detects external links based on the URL.

```markdown
[External Link](https://example.com)  <!-- Automatically gets target="_blank" and icon -->
[Internal Link](/about/)              <!-- No special handling -->
```

### Heading Hash Symbols

Headings automatically display hash symbols based on their level:
- `# Heading 1` → `# Heading 1`
- `## Heading 2` → `## Heading 2`
- `### Heading 3` → `### Heading 3`

This happens automatically - no special syntax required.

### Horizontal Rules

Horizontal rules (`---`) are automatically styled as dashed lines:

```markdown
---
```

### Custom List Markers

Lists automatically get custom markers:
- Unordered lists: `> ` prefix
- Ordered lists: `1> `, `2> `, etc. prefix

```markdown
- Item 1
- Item 2

1. First item
2. Second item
```

### Reading Time

Reading time is automatically calculated and displayed for all blog posts. This is handled automatically based on word count.

## 🎨 Customization

### Site Configuration

Edit `src/site.config.ts` to customize:
- Site name, title, and description
- Social media links
- Navigation links
- Giscus comment settings
- Page size for pagination

### Styling

The site uses:
- **Tailwind CSS 4** for utility classes
- **DaisyUI** for component styling
- **Catppuccin Mocha** theme (customized in `src/styles/global.css`)

To customize colors, edit the theme variables in `src/styles/global.css`.

### Components

Reusable components are located in `src/components/`:
- `GithubCard.astro`: Displays GitHub repository information
- `ProjectCard.astro`: Project showcase card
- `PostCard.astro`: Blog post preview card
- `Icon.astro`: Icon component using Nerd Font icons

## 🔧 Technologies Used

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[DaisyUI](https://daisyui.com)** - Component library
- **[MDX](https://mdxjs.com)** - Markdown with JSX
- **[Pagefind](https://pagefind.app)** - Search engine
- **[Giscus](https://giscus.app)** - Comments system
- **[Alpine.js](https://alpinejs.dev)** - Lightweight JavaScript framework
- **[Expressive Code](https://expressive-code.com)** - Code block styling
- **[@huggingface/transformers](https://huggingface.co/docs/transformers.js)** - AI embeddings for semantic search

## 📦 Build & Deployment

### Production Build

```bash
npm run build
npm run postbuild  # Generate search index and embeddings
```

The built site will be in the `dist/` directory.

### Deployment

This site is configured for GitHub Pages. The build process generates:
- Static HTML files
- Pagefind search index
- AI embeddings for semantic search

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Website**: [oscarrc.me](https://oscarrc.me)
- **GitHub**: [@oscarrc](https://github.com/oscarrc)
- **LinkedIn**: [oscarrc-web](https://www.linkedin.com/in/oscarrc-web/)
- **Instagram**: [@oscarrc_web](https://www.instagram.com/oscarrc_web/)

---

Built with ❤️ using Astro
