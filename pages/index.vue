<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <main>
    <Container class="flex items-start min-h-[calc(100vh-8rem)] py-20">
      <div class="space-y-6">
        <h1
          class="text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]"
        >
          Write, share, and learn together
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A place for thoughts, ideas, and discoveries. Explore articles on
          technology, design, and everything in between.
        </p>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors font-medium"
        >
          Read articles
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </Container>
  </main>
</template>
