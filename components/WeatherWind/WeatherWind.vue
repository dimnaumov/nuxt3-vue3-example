<script setup lang="ts">
import type { Props } from './types';

const { wind } = defineProps<Props>();

const isGust = computed(() => wind.gust && wind.speed !== wind.gust)

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
      <span class="text-3xl text-black">&#8593;</span>
    </div>
  
    <div class="flex flex-col justify-center p-1.5 text-sm">
      <p class="text-nowrap">
        {{ wind.speed }} м/с
      </p>
  
      <p
        v-if="isGust"
        class="text-nowrap"
      >
        до {{ wind.gust }} м/с
      </p>
    </div>
  </div>
</template>
