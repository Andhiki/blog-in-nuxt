<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection("posts").all());

const posts = computed(() => data.value ?? []);
</script>

<template>
  <main class="flex items-center justify-center min-h-screen flex-col">
    <h1>In Blog</h1>
    <NuxtLink to="/">To Home</NuxtLink>

    <section class="mt-12">
      <h2 class="text-3xl font-bold mb-6">Latest Posts</h2>

      <div v-if="posts.length > 0" class="grid gap-6">
        <article
          v-for="post in posts"
          :key="post.slug || post.path"
          class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <NuxtLink
            :to="post.slug ? `/blog/${post.slug}` : post.path"
            class="block p-6"
          >
            <h3
              class="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600"
            >
              {{ post.title }}
            </h3>
            <p class="text-gray-600 mb-3">
              {{ post.description }}
            </p>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <time v-if="post.date">{{
                new Date(post.date).toLocaleDateString("id-ID")
              }}</time>
              <span v-if="post.tags" class="flex gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="bg-gray-100 px-2 py-1 rounded text-xs"
                >
                  {{ tag }}
                </span>
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-500">Belum ada artikel tersedia</p>
      </div>
    </section>
  </main>
</template>
