<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { WeatherCurrentContents } from '../Weather/types';

const { data, refresh, status, error } = await useFetchWeatherCurrent();

const weatherCurrent: ComputedRef<WeatherCurrentContents | null> = computed(() => {
  return formattedWeatherCurrent(data.value?.contents);
});
</script>

<template>
  <!-- <pre>
    {{ weatherCurrent }}
  </pre> -->

  <UCard v-if="status === 'pending'">
    <Loading />
  </UCard>

  <UCard v-else-if="status === 'error'">
    {{ error }}
  </UCard>

  <UCard v-else-if="weatherCurrent">
    <template #header>
      <div :class="$style.header">
        <p class="text-2xl flex justify-center items-center">
          Погода: {{ weatherCurrent.name }}
        </p>

        <UButton
          size="xl"
          variant="outline"
          @click="refresh()"
        >
          Обновить
        </UButton>
      </div>
    </template>

    <div class="flex flex-col">
      <div class="currentWeather">
        <p>
          {{ weatherCurrent.dt }}
        </p>

        <p class="text-8xl font-medium">
          {{ Math.round(weatherCurrent.main.temp) }}°C
        </p>
      </div>

      <WeatherDescription :weather="weatherCurrent.weather" />

      <WeatherWind :wind="weatherCurrent.wind" />
    </div>
  </UCard>
</template>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @screen md {
    flex-direction: row;
  }
}
</style>
