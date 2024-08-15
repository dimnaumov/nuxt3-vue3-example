<script setup lang="ts">
import type { WeatherTabItem } from './types';

const items: WeatherTabItem[] = [
  {
    slot: 'current',
    name: 'current',
    label: 'Текущая погода',
  },
  {
    slot: 'forecast',
    name: 'forecast',
    label: 'Прогноз погоды',
  },
];

const defaultIndex = ref(0);
</script>

<template>
  <UTabs
    :items="items"
    class="w-full"
    :default-index="defaultIndex"
  >
    <template #current>
      <WeatherCurrent />
    </template>

    <template #forecast>
      <WeatherForecast />
    </template>
  </UTabs>
</template>
