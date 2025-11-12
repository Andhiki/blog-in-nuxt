<script setup lang="ts">
import { Calendar, Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

useHead({
  title: "Blog - Personal Blog",
  meta: [
    {
      name: "description",
      content:
        "Latest articles and thoughts on technology, design, and everything in between.",
    },
    {
      property: "og:title",
      content: "Blog - Personal Blog",
    },
    {
      property: "og:description",
      content:
        "Latest articles and thoughts on technology, design, and everything in between.",
    },
  ],
});

const { data, refresh } = await useAsyncData(() =>
  queryCollection("posts").all()
);

const allPosts = computed(() => data.value ?? []);

const searchQuery = ref("");
const selectedCategory = ref<string | null>(null);

const categories = computed(() => {
  const cats = new Set<string>();
  allPosts.value.forEach((post: any) => {
    if (post.category) {
      cats.add(post.category);
    }
  });
  return Array.from(cats).sort();
});

const posts = computed(() => {
  let filtered = [...allPosts.value];

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((post: any) => {
      const title = (post.title || "").toLowerCase();
      const description = (post.description || "").toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (post: any) => post.category === selectedCategory.value
    );
  }

  return filtered;
});

if (import.meta.dev) {
  let intervalId: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    intervalId = setInterval(() => {
      refresh();
    }, 2000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
}
</script>

<template>
  <Container class="max-w-4xl py-16">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold mb-3">Blog</h1>
      <p class="text-muted-foreground">Latest articles and thoughts</p>
    </div>

    <!-- Search and Filters -->
    <div class="mb-8 space-y-4">
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search posts..."
          class="pl-10"
        />
      </div>

      <div v-if="categories.length > 0" class="flex flex-wrap gap-2">
        <Button
          :variant="selectedCategory === null ? 'default' : 'outline'"
          size="sm"
          @click="selectedCategory = null"
        >
          All
        </Button>
        <Button
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'default' : 'outline'"
          size="sm"
          @click="
            selectedCategory = selectedCategory === category ? null : category
          "
        >
          {{ category }}
        </Button>
      </div>
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

    <div v-else-if="allPosts.length === 0" class="text-center py-16">
      <p class="text-muted-foreground">No articles available yet</p>
    </div>
    <div v-else class="text-center py-16">
      <p class="text-muted-foreground">No posts found matching your search.</p>
      <Button
        variant="outline"
        size="sm"
        class="mt-4"
        @click="
          searchQuery = '';
          selectedCategory = null;
        "
      >
        Clear filters
      </Button>
    </div>
  </Container>
</template>
