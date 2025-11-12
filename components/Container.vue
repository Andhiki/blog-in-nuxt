<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const attrs = useAttrs();
const containerClass = computed(() => {
  const baseClasses =
    "mx-auto flex w-full max-w-6xl flex-col gap-4 px-[18.75px]";
  const customClass = attrs.class as string | undefined;
  return customClass ? `${baseClasses} ${customClass}` : baseClasses;
});
</script>
