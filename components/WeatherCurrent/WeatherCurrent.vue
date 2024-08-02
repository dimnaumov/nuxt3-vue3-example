<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { WeatherCurrentContents } from '../Weather/types';

const { data, refresh, status, error } = await useFetchWeatherCurrent();

const weatherCurrent: ComputedRef<WeatherCurrentContents | null> = computed(() => {
  return formattedWeatherCurrent(data.value?.contents);
});

const arrowContainerStyles = computed(() => {
  if (!weatherCurrent.value) {
    return null;
  }

  return {
    transform: `rotate(${weatherCurrent.value?.wind.deg + 180}deg)`,
    transformOrigin: 'center center',
  };
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

      <div
        class="flex items-center justify-center border-slate-200 rounded border self-start"
      >
        <template
          v-for="item in weatherCurrent.weather"
          :key="item.id"
        >
          <div
            :class="$style.icon"
          >
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

      <div
        :class="$style.wind"
        class="border-slate-200 rounded border self-start"
      >
        <div
          :class="$style.arrowContainer"
          :style="arrowContainerStyles"
        >
          <span class="text-3xl text-slate-500">&#8593;</span>
        </div>

        <div class="p-1.5 text-sm">
          <p>
            {{ weatherCurrent.wind.speed }} м/с
          </p>

          <p>
            до {{ weatherCurrent.wind.gust }} м/с
          </p>
        </div>
      </div>
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

.icon {
  width: 50px;
  height: 50px;
}

.wind {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.arrowContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}
</style>
