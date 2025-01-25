<script setup lang="ts">
import type { WeatherItem } from '../Weather/types';

defineProps({
  weather: {
    type: Array as PropType<WeatherItem[]>,
    required: true,
  },
  isDescription: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="flex items-center">
    <template
      v-for="item in weather"
      :key="item.id"
    >
      <div class="w-12 h-12 shrink-0">
        <img
          class="brightness-75"
          :src="`https://openweathermap.org/img/wn/${item.icon}@2x.png`"
          :alt="item.description"
        >
      </div>

      <p 
        v-if="isDescription"
        class="p-1.5 text-sm"
      >
        {{ item.description }}
      </p>
    </template>
  </div>
</template>
