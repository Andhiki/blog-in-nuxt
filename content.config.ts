import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
    posts: defineCollection({
      type: "page",
      source: "posts/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string().optional(),
        slug: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
