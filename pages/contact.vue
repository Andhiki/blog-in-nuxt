<script setup lang="ts">
definePageMeta({
  ssr: true,
});

useHead({
  title: "Contact - Personal Blog",
  meta: [
    {
      name: "description",
      content: "Get in touch with me. Send me a message and I'll get back to you.",
    },
    {
      property: "og:title",
      content: "Contact - Personal Blog",
    },
    {
      property: "og:description",
      content: "Get in touch with me. Send me a message and I'll get back to you.",
    },
  ],
});
</script>

<template>
  <Container class="max-w-2xl py-16">
    <div class="mb-12">
      <h1 class="text-3xl font-semibold mb-3">Contact Me</h1>
      <p class="text-muted-foreground">
        Have a question or want to get in touch? Send me a message below.
      </p>
    </div>

    <ContactForm />
  </Container>
</template>

