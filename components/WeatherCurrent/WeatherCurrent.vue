<script setup lang="ts">
import { WEATHER_CURRENT_REQUEST_OPTIONS } from '~/constants/weather';
import type { WeatherCurrentContents } from '../Weather/types';

const { path, parameters } = WEATHER_CURRENT_REQUEST_OPTIONS;

const requestParameters = computed(() => ({
  ...parameters,
}));

const {
  data,
  refresh,
  status,
  error,
} = await useFetchWeather(path, requestParameters);

const isPending = computed(() => status.value === 'pending');
const isError = computed(() => status.value === 'error');

const weatherCurrent: ComputedRef<WeatherCurrentContents | null> = computed(() => {
  return formattedWeatherCurrent(data.value?.contents as WeatherCurrentContents);
});

function update() {
  if(!isPending.value) {
    refresh();
  }
}
</script>

<template>
  <!-- <pre>
    {{ weatherCurrent }}
  </pre> -->

  <UCard>
    <template #header>
      <div :class="$style.header">
        <p
          :class="$style.title"
          class="text-2xl"
        >
          Погода: {{ weatherCurrent?.name }}
        </p>

        <UButton
          size="xl"
          variant="outline"
          @click="update"
        >
          Обновить
        </UButton>
      </div>
    </template>

    <Loading v-if="isPending" />

    <UAlert
      v-else-if="isError"
      color="red"
      variant="subtle"
      title="Не удалось получить данные!"
      :description="error?.message"
    />

    <div
      v-else-if="weatherCurrent"
      class="flex flex-col"
    >
      <div class="currentWeather">
        <p>
          {{ weatherCurrent.dt }}
        </p>

        <p class="text-8xl font-medium">
          {{ Math.round(weatherCurrent.main.temp) }}°C
        </p>
      </div>

      <WeatherDayLight
        :sunrise="weatherCurrent.sys.sunrise as string"
        :sunset="weatherCurrent.sys.sunset as string"
      />

      <WeatherDescription :weather="weatherCurrent.weather" />

      <WeatherWind :wind="weatherCurrent.wind" />

      <WeatherPressure :grnd_level="weatherCurrent.main.grnd_level" />

      <WeatherHumidity :humidity="weatherCurrent.main.humidity" />
    </div>
  </UCard>
</template>

<style lang="scss" module>
.header {
  @screen md {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.title {
  margin-bottom: 8px;

  @screen md {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
}
</style>
