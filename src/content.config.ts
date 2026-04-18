import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});


// To add a blog:
// 1. Uncomment the `posts` collection below.
// 2. Create `src/content/posts/` and add markdown files matching the schema.
// 3. Add `posts` to the exported `collections` object.
// 4. Create a route (e.g. `src/pages/blog/[slug].astro`) that calls
//    `getEntry("posts", slug)` / `getCollection("posts")`.
//
// const posts = defineCollection({
//   loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
//   schema: z.object({
//     title: z.string(),
//     pubDate: z.coerce.date(),
//     description: z.string().optional(),
//     author: z.string().optional(),
//     tags: z.array(z.string()).default([]),
//     draft: z.boolean().default(false),
//   }),
// });

export const collections = { pages };
