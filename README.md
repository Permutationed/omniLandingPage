# Astro Starter Template

## Stack

- **Astro** — Static site framework
- **React 19** — UI components
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling with theme tokens
- **shadcn/ui** — Component library (ready to use)
- **Motion** — React animations

## Structure

```
src/
├── components/
│   ├── layout.tsx            ← React layout wrapper
│   ├── error-boundary.tsx    ← React error boundary
│   ├── pages/
│   │   ├── home.tsx          ← React page components
│   │   └── not-found.tsx
│   └── ui/                   ← shadcn components
├── hooks/                    ← Custom React hooks
├── lib/
│   ├── ploy-forms/
│   │   ├── PloyForm.astro    ← Form wrapper component
│   │   └── submit-form.ts    ← POST to /_ploy/form-submit
│   └── utils.ts              ← cn() utility
├── layouts/
│   └── Layout.astro          ← HTML shell (head, body)
├── pages/
│   ├── index.astro           ← Route wrappers
│   └── 404.astro
└── styles/
    └── globals.css           ← Tailwind + theme tokens
```

## Routing

Astro handles routing via `.astro` files. Each page is a thin wrapper that renders a React component:

```astro
---
import Layout from "../layouts/Layout.astro";
import { ContactPage } from "@/components/pages/contact";
---

<Layout title="Contact">
  <ContactPage client:load />
</Layout>
```

### Adding a page

1. Create React component `src/components/pages/contact.tsx`:

```tsx
import { Layout } from "@/components/layout";

export function ContactPage() {
  return (
    <Layout>
      <div>Contact page</div>
    </Layout>
  );
}
```

2. Create route `src/pages/contact.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import { ContactPage } from "@/components/pages/contact";
---

<Layout title="Contact">
  <ContactPage client:load />
</Layout>
```

## Styling

Tailwind CSS v4 with theme tokens. Config lives in `src/styles/globals.css`.

### Theme tokens

```tsx
// Backgrounds
bg - ploy - background - primary; // Main background
bg - ploy - background - secondary; // Secondary/card background
bg - ploy - background - inverse; // Inverted background

// Text
text - ploy - text - primary; // Main text
text - ploy - text - secondary; // Muted text
text - ploy - text - inverse; // Text on dark backgrounds

// Borders
border - ploy - border - primary; // Standard borders

// Accents (with 50-950 scale)
bg - ploy - accent - primary; // Primary accent
bg - ploy - accent - primary - 500; // Specific shade

// Buttons
bg - ploy - button - primary - background;
text - ploy - button - primary - text;
```

### Class utilities

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", conditional && "conditional-class")} />;
```

## Components

### shadcn/ui

Add components via CLI:

```bash
bunx shadcn@latest add button
```

Components install to `src/components/ui/`.

### Error Boundary

Wrap components to catch React errors:

```tsx
import { ErrorBoundary } from "@/components/error-boundary";

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <MyComponent />
</ErrorBoundary>;
```

## Forms

### PloyForm (simple forms)

Wrap inputs in `<PloyForm>` for automatic submission handling. No page navigation — submits via fetch, shows success/error feedback, resets on success.

```astro
---
import PloyForm from "../lib/ploy-forms/PloyForm.astro";
---

<PloyForm name="contact" successMessage="Thanks! We'll be in touch.">
  <input name="name" type="text" placeholder="Your name" required />
  <input name="email" type="email" placeholder="Email" required />
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</PloyForm>
```

Props: `name` (required, identifies form in dashboard), `successMessage` (optional), `class` (optional).

Inputs inside the slot can be plain HTML or shadcn components — PloyForm doesn't care.

### submitForm (complex/React forms)

For multi-step forms or forms needing react-hook-form/zod validation, use `submitForm` directly:

```tsx
import { submitForm } from "../lib/ploy-forms/submit-form";

await submitForm("signup", { email, plan });
```

Posts to `/_ploy/form-submit`. Submissions appear in the Ploy dashboard.

## Animations

Use `motion/react` for page and component animation.

```tsx
import { motion } from "motion/react";

export function Hero() {
  return (
    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      Ready to Ploy
    </motion.h1>
  );
}
```

## View Transitions

Native browser view transitions enabled via `@view-transition` in `globals.css`.

```css
.hero-image {
  view-transition-name: hero;
}
```

## Markdown Blog / CMS

This starter does not ship with blog routes or markdown content files by default.
If you want markdown-powered blog or CMS content, set it up with Astro routes that read from a `posts/**/*.md` source directory.

### Frontmatter

Use this shape:

```md
---
title: Post title
description: Short description for SEO and listing pages
date: 2026-03-11
draft: true
---
```

Rules:

- `date` is required and is used for sorting
- `draft: true` makes a post visible in local dev only
- omitting `draft` makes the post public in production
- nested folders are supported, so `posts/news/launch.md` becomes `/blog/news/launch/`

### Suggested setup

Create:

- `posts/**/*.md` for the markdown source files
- `src/pages/blog/index.astro` for the post listing page
- `src/pages/blog/[...slug].astro` for dynamic markdown post routes

### Sitemap behavior

If your blog pages are prerendered Astro routes, public posts will be included automatically in the generated sitemap during production builds.
Draft posts should be filtered out of production prerendering so they do not appear publicly or enter the sitemap.

## Commands

| Command                | Action                                |
| :--------------------- | :------------------------------------ |
| `npm install`          | Install dependencies                  |
| `npm run dev`          | Start dev server at `localhost:3000`  |
| `npm run check`        | Run Astro typecheck via `astro check` |
| `npm run build`        | Build production site to `./dist/`    |
| `npm run verify`       | Typecheck + build                     |
| `npm run preview`      | Preview build locally                 |
| `npm run astro -- ...` | Run Astro CLI                         |
