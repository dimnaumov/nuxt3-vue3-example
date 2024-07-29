<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-5xl">
        Погода: {{ data.name }}
      </p>
    </template>

    <div class="temp">
      <p class="text-8xl font-medium">
        {{ Math.round(data.main.temp) }}°C
      </p>

      <p>
        по ощущению: {{ Math.round(data.main.feels_like) }}°C
      </p>
    </div>

    <div>
      <p
        v-for="item in data.weather"
        :key="item.id">
        {{ item.description }}
      </p>
    </div>
  </UCard>
</template>
