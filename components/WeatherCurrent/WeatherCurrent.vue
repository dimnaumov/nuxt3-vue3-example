<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { PROXY_URL, WEATHER_CURRENT_REQUEST_OPTIONS, WEATHER_SERVICE_BASE_URL } from '~/constants/weather';
import type { ProxyResponse, WeatherCurrentContents } from '../Weather/types';

const queryString = computed(() =>
  getQueryString({
    ...WEATHER_CURRENT_REQUEST_OPTIONS.parameters,
  }),
);

const url = computed(() => `${WEATHER_SERVICE_BASE_URL}${WEATHER_CURRENT_REQUEST_OPTIONS.url}?${queryString.value}`);

const { data, refresh, status } = await useAsyncData<ProxyResponse>(
  'weatherCurrent',
  () => $fetch(
    PROXY_URL,
    {
      method: 'GET',
      params: {
        url: url.value,
      },
    },
  ),
);

// const { data, refresh, status } = await useFetch<ProxyResponse>(PROXY_URL, {
//   query: { url }
// });

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
})

</script>

<template>
  <pre>
    {{ weatherCurrent }}
  </pre>

  <!-- <UCard v-if="status === 'pending'">
    <Loading />
  </UCard> -->

  <UCard v-if="weatherCurrent">
    <template #header>
      <div :class="$style.header">
        <p class="text-4xl">
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

    <div class="currentWeather">
      <p>
        {{ weatherCurrent.dt }}
      </p>

      <p class="text-8xl font-medium">
        {{ Math.round(weatherCurrent.main.temp) }}°C
      </p>

      <p>
        по ощущению: {{ Math.round(weatherCurrent.main.feels_like) }}°C
      </p>
    </div>

    <div :class="$style.weather">
      <div
        v-for="item in weatherCurrent.weather"
        :key="item.id"
      >
        <p>
          {{ item.description }}
        </p>

        <div
          :class="$style.icon"
          class="border-slate-200 rounded border">
          <img
            :class="$style.image"
            :src="`https://openweathermap.org/img/wn/${item.icon}@2x.png`"
            :alt="item.description"
          >
        </div>
      </div>
    </div>

    <div
      :class="$style.wind"
      class="border-slate-200 rounded border">
      <div
        :class="$style.arrowContainer"
        :style="arrowContainerStyles"
      >
        <span :class="$style.upArrow" />
      </div>

      <div class="p-1.5">
        <p>
          {{ weatherCurrent.wind.speed }} м/с
        </p>

        <p>
          до {{ weatherCurrent.wind.gust }} м/с
        </p>
      </div>
    </div>
  </UCard>
</template>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
}

.weather {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.icon {
  width: 50px;
  height: 50px;
}

.image {
  filter: brightness(50%);
}

.wind {
  display: inline-flex;
  flex-wrap: nowrap;
}

.arrowContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.upArrow {
  display: inline-block;
  margin: 10px;
  width: 10px;
  height: 10px;
  border-top: 3px solid #F10C0C;
  border-left: 3px solid #F10C0C;
  transform-origin: center;
  transform: rotate(45deg);

  &::after {
    content: "";
    display: block;
    width: 3px;
    height: 20px;
    background-color: #F10C0C;
    transform: rotate(-45deg) translate(6px, 0px);
  }
}
</style>
