<script setup lang="ts">
import type { Props } from './types';

const { wind } = defineProps<Props>();

const arrowContainerStyles = computed(() => {
  return {
    transform: `rotate(${wind.deg + 180}deg)`,
    transformOrigin: 'center center',
  };
});
</script>

<template>
  <div class="flex">
    <div
      :style="arrowContainerStyles"
      class="flex w-12 h-12 items-center justify-center"
    >
      <span class="text-3xl text-slate-500">&#8593;</span>
    </div>
  
    <div class="p-1.5 text-sm">
      <p>
        {{ wind.speed }} м/с
      </p>
  
      <p>
        до {{ wind.gust }} м/с
      </p>
    </div>
  </div>
</template>
