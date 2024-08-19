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

const uiTabs = {
  list: {
    height: 'h-16',
    tab: {
      height: 'h-14',
      size: 'text-lg',
      font: 'font-bold',
    },
  },
};
</script>

<template>
  <UTabs
    :items="items"
    :default-index="defaultIndex"
    :ui="uiTabs"
    class="w-full"
  >
    <template #current>
      <WeatherCurrent />
    </template>

    <template #forecast>
      <WeatherForecast />
    </template>
  </UTabs>
</template>
