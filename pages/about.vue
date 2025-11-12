<script setup lang="ts">
definePageMeta({
  prerender: true,
});

useHead({
  title: "About - Personal Blog",
  meta: [
    {
      name: "description",
      content: "Learn more about the author of this personal blog.",
    },
    {
      property: "og:title",
      content: "About - Personal Blog",
    },
    {
      property: "og:description",
      content: "Learn more about the author of this personal blog.",
    },
  ],
});
</script>

<template>
  <Container class="max-w-3xl py-16 space-y-8">
    <h2 class="text-2xl font-semibold mb-4">Hi, it's me the author</h2>
    <p class="text-muted-foreground leading-relaxed text-lg">
      i wrote this blog to share my thoughts and experiences with the world. i
      hope you enjoy reading it!
    </p>
  </Container>
</template>
