<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>()
</script>

<template>
  <div class="flex items-center">
    <template
      v-for="item in weather"
      :key="item.id"
    >
      <div class="w-12 h-12">
        <img
          class="brightness-75"
          :src="`https://openweathermap.org/img/wn/${item.icon}@2x.png`"
          :alt="item.description"
        >
      </div>

      <p class="p-1.5 text-sm">
        {{ item.description }}
      </p>
    </template>
  </div>
</template>
