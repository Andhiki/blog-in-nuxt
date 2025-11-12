<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Hash, ArrowUpRightIcon } from "lucide-vue-next";

const route = useRoute();
const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <Container class="h-16 items-center justify-between flex-row">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
      >
        <Hash class="w-5 h-5 text-primary" />
        <span>Personal Blog</span>
      </NuxtLink>
      <nav class="flex items-center gap-4">
        <Button
          as-child
          variant="ghost"
          :class="isActive('/about') ? 'bg-accent' : ''"
        >
          <NuxtLink to="/about" class="flex items-center gap-2">
            About Me
          </NuxtLink>
        </Button>
        <Button
          as-child
          variant="ghost"
          :class="isActive('/blog') ? 'bg-accent' : ''"
        >
          <NuxtLink to="/blog" class="flex items-center gap-2">
            Read Blog
          </NuxtLink>
        </Button>
        <Button
          as-child
          variant="ghost"
          :class="isActive('/contact') ? 'bg-accent' : ''"
        >
          <NuxtLink to="/contact" class="flex items-center gap-2">
            Contact
          </NuxtLink>
        </Button>
      </nav>
    </Container>
  </header>
</template>
