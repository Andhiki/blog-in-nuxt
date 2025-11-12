<script setup lang="ts">
import { Calendar } from "lucide-vue-next";

const { data, refresh } = await useAsyncData(() =>
  queryCollection("posts").all()
);

const posts = computed(() => data.value ?? []);

if (import.meta.dev) {
  const intervalId = setInterval(() => {
    refresh();
  }, 2000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
}
</script>

<template>
  <Container class="max-w-4xl py-16">
    <div class="mb-12">
      <h1 class="text-3xl font-semibold mb-3">Blog</h1>
      <p class="text-muted-foreground">Latest articles and thoughts</p>
      <hr class="border-muted-foreground/20 mt-10" />
    </div>

    <div v-if="posts.length > 0" class="space-y-8">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug || post.path"
        :to="post.slug ? `/blog/${post.slug}` : post.path"
        class="block group"
      >
        <article
          class="border-b border-border pb-8 last:border-0 transition-colors hover:border-foreground/20"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <h2
              class="text-2xl font-semibold group-hover:text-foreground/80 transition-all duration-300 ease-in-out group-hover:underline group-hover:underline-offset-4"
            >
              {{ post.title }}
            </h2>
            <time
              v-if="post.date"
              class="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1.5"
            >
              <Calendar class="w-3.5 h-3.5" />
              {{
                new Date(post.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}
            </time>
          </div>

          <p
            v-if="post.description"
            class="text-muted-foreground mb-4 leading-relaxed"
          >
            {{ post.description }}
          </p>

          <div
            v-if="post.tags && post.tags.length > 0"
            class="flex items-center gap-2 flex-wrap"
          >
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-16">
      <p class="text-muted-foreground">No articles available yet</p>
    </div>
  </Container>
</template>
