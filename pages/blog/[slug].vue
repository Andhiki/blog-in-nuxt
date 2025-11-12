<script setup lang="ts">
import { ArrowLeft, Calendar } from "lucide-vue-next";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: post, refresh } = await useAsyncData(
  () => `blog-${slug.value}`,
  async () => {
    const posts = await queryCollection("posts").all();
    const found = posts.find((p: { slug: string }) => p.slug === slug.value);
    if (!found) {
      throw createError({
        status: 404,
        statusText: "Post not found",
      });
    }
    return found;
  },
);

watch(
  () => route.params.slug,
  () => {
    refresh();
  },
);

useHead(() => {
  if (!post.value) return {};

  const title = `${post.value.title} - Personal Blog`;
  const description = post.value.description || post.value.title;

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "article:published_time",
        content: post.value.date || "",
      },
      ...(post.value.tags
        ? post.value.tags.map((tag: string) => ({
            property: "article:tag",
            content: tag,
          }))
        : []),
    ],
  };
});
</script>

<template>
  <Container v-if="post" class="max-w-3xl py-16">
    <NuxtLink
      to="/blog"
      class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      Back to blog
    </NuxtLink>

    <article>
      <header class="mb-10">
        <h1 class="text-4xl font-semibold mb-4 leading-tight">
          {{ post.title }}
        </h1>

        <div
          class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6"
        >
          <time v-if="post.date" class="flex items-center gap-1.5">
            <Calendar class="w-4 h-4" />
            {{
              new Date(post.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
          <div
            v-if="post.tags && post.tags.length > 0"
            class="flex items-center gap-2 flex-wrap"
          >
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-md bg-muted"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <p
          v-if="post.description"
          class="text-lg text-muted-foreground leading-relaxed"
        >
          {{ post.description }}
        </p>
      </header>

      <div
        class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-foreground/90 prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-foreground/80 prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border"
      >
        <ContentRenderer :value="post" />
      </div>
    </article>
  </Container>

  <Container v-else class="py-20 items-center justify-center">
    not found
  </Container>
</template>
