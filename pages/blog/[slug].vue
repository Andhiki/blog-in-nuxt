<script setup lang="ts">
const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: post, refresh } = await useAsyncData(
  () => `blog-${slug.value}`,
  async () => {
    const posts = await queryCollection("posts").all();
    const found = posts.find((p: any) => p.slug === slug.value);
    if (!found) {
      throw createError({
        status: 404,
        statusText: "Post not found",
      });
    }
    return found;
  }
);

watch(
  () => route.params.slug,
  () => {
    refresh();
  }
);
</script>

<template>
  <main class="flex items-center justify-center min-h-screen flex-col px-4">
    <Container v-if="post" class="max-w-4xl mx-auto py-12">
      <NuxtLink
        to="/blog"
        class="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Back to Blog
      </NuxtLink>
      <article class="prose prose-lg max-w-none">
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center gap-4 text-gray-600 text-sm">
            <time v-if="post.date">
              {{
                new Date(post.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </time>
            <span v-if="post.tags" class="flex gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="bg-gray-100 px-3 py-1 rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </span>
          </div>
          <p v-if="post.description" class="text-xl text-gray-600 mt-4">
            {{ post.description }}
          </p>
        </header>
        <ContentRenderer :value="post" class="mt-8" />
      </article>
    </Container>
  </main>
</template>
