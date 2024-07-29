<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { WeatherTabItem } from './types';

const items: WeatherTabItem[] = [{
  slot: 'current',
  name: 'current',
  label: 'Текущая погода'
}, {
  slot: 'forecast',
  name: 'forecast',
  label: 'Прогноз погоды'
}];


const defaultIndex = ref(0);
// const currentTabName = ref(items[defaultIndex.value].name);

// const dataWeather = ref(await useWeather(currentTabName.value));

// async function onChange (index: number) {
//   const item = items[index];

//   console.warn(`${item.name} was clicked!`);

//   dataWeather.value = await useWeather(currentTabName.value)
// }
</script>

<template>
  <!-- <pre>
    {{ dataWeather }}
  </pre> -->

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