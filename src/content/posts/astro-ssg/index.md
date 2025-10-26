---
title: Astro SSG
description: Explore Astro's Static Site Generation capabilities for building lightning-fast websites. Learn how to leverage SSG for optimal performance, SEO, and user experience in modern web development.
published: 2023-03-01
updated: 2023-03-01
draft: false
author: Oscar RC
series: Astro Development
tags: [Astro, SSG, Static Sites, Performance, SEO, Web Development]
---

## Astro Static Site Generation

Static Site Generation (SSG) represents the pinnacle of web performance, and Astro excels at creating lightning-fast static sites. This comprehensive guide explores how to leverage Astro's SSG capabilities to build websites that load instantly, rank highly in search engines, and provide exceptional user experiences.

### Understanding Static Site Generation

**What is SSG?**
- **Pre-built Pages**: All pages are generated at build time
- **Static Assets**: HTML, CSS, and JavaScript are pre-compiled
- **CDN Distribution**: Content can be served from global CDNs
- **Zero Runtime**: No server processing required for page requests

**Benefits of SSG**
- **Performance**: Pages load instantly with minimal JavaScript
- **SEO**: Fully rendered HTML for search engine crawlers
- **Security**: No server-side vulnerabilities
- **Scalability**: Handle massive traffic with ease
- **Cost**: Host on CDNs for minimal hosting costs

**When to Use SSG**
- **Content Sites**: Blogs, documentation, marketing sites
- **E-commerce**: Product catalogs, landing pages
- **Portfolios**: Personal and business websites
- **Documentation**: Technical docs, API references

### Astro SSG Architecture

**Build Process**
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

**Output Structure**
```
dist/
├── index.html
├── about.html
├── blog/
│   ├── post-1.html
│   └── post-2.html
├── _astro/
│   ├── page.css
│   └── page.js
└── assets/
    └── images/
```

**Configuration**
```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Default for SSG
  site: 'https://yourdomain.com',
  build: {
    assets: '_astro',
  },
});
```

### Content Management

**Content Collections**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**Querying Content**
```typescript
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const publishedPosts = allPosts
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

**Dynamic Routes**
```typescript
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
```

### Performance Optimization

**Image Optimization**
```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={post.data.heroImage}
  alt={post.data.title}
  width={800}
  height={400}
  format="webp"
  quality={80}
/>
```

**Code Splitting**
```astro
---
// Only load JavaScript when needed
import InteractiveComponent from '../components/InteractiveComponent.tsx';
---

<div class="page">
  <h1>Static content</h1>
  <InteractiveComponent client:load />
</div>
```

**Asset Optimization**
```typescript
// astro.config.mjs
export default defineConfig({
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

### SEO Optimization

**Meta Tags**
```astro
---
export const prerender = true;

const { post } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{post.data.title}</title>
    <meta name="description" content={post.data.description} />
    <link rel="canonical" href={canonicalURL} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Structured Data**
```astro
---
const { post } = Astro.props;
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.data.title,
  "description": post.data.description,
  "datePublished": post.data.pubDate,
  "author": {
    "@type": "Person",
    "name": "Your Name"
  }
};
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

**Sitemap Generation**
```typescript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  site: 'https://yourdomain.com',
});
```

### Advanced SSG Features

**Incremental Static Regeneration**
```typescript
// src/pages/api/revalidate.ts
export async function GET() {
  // Trigger rebuild of specific pages
  await fetch(`${process.env.SITE_URL}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paths: ['/blog', '/about'] }),
  });
  
  return new Response('OK');
}
```

**Build-time Data Fetching**
```astro
---
// Fetch data at build time
const posts = await fetch('https://api.example.com/posts').then(r => r.json());
const processedPosts = posts.map(post => ({
  ...post,
  slug: post.title.toLowerCase().replace(/\s+/g, '-'),
}));
---

<div class="posts">
  {processedPosts.map(post => (
    <article class="post">
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </article>
  ))}
</div>
```

**Environment Variables**
```typescript
// .env
PUBLIC_SITE_URL=https://yourdomain.com
API_KEY=your-api-key
```

```astro
---
// Use environment variables
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const apiKey = import.meta.env.API_KEY;
---
```

### Deployment Strategies

**CDN Deployment**
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Vercel Deployment**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Performance Monitoring

**Core Web Vitals**
```astro
---
// Add performance monitoring
---

<script>
  // Monitor Core Web Vitals
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
</script>
```

**Analytics Integration**
```astro
---
// Google Analytics
---

<script>
  // Google Analytics 4
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Best Practices

**Content Strategy**
- **Consistent Publishing**: Regular content updates
- **Quality Content**: Focus on valuable, original content
- **SEO Optimization**: Keyword research and optimization
- **User Experience**: Intuitive navigation and design

**Technical Excellence**
- **Performance**: Regular performance audits
- **Accessibility**: WCAG compliance
- **Security**: Implement security headers
- **Monitoring**: Track performance metrics

**Maintenance**
- **Regular Updates**: Keep dependencies current
- **Content Audits**: Review and update old content
- **Performance Monitoring**: Track and improve metrics
- **User Feedback**: Incorporate user suggestions

### Future Considerations

**Emerging Technologies**
- **Edge Computing**: Deploy to edge locations
- **WebAssembly**: High-performance client-side code
- **Progressive Enhancement**: Advanced user experiences
- **AI Integration**: Content generation and optimization

**Platform Evolution**
- **Astro Updates**: Stay current with framework changes
- **Web Standards**: Adopt new web technologies
- **Performance**: Continuous optimization
- **User Experience**: Evolving design patterns

Astro's Static Site Generation capabilities provide the foundation for building exceptional web experiences. By leveraging SSG, you can create websites that load instantly, rank highly in search engines, and provide outstanding user experiences while maintaining developer productivity.

The key to success with Astro SSG is understanding the balance between static generation and dynamic functionality, and leveraging the framework's unique capabilities to create optimal user experiences.
