<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { PROXY_URL, WEATHER_FORECAST_PERIOD_COUNT_IN_DAY, WEATHER_FORECAST_REQUEST_OPTIONS, WEATHER_SERVICE_BASE_URL } from '~/constants/weather';
import type { ProxyResponse, WeatherForecastContents } from '../Weather/types';

const forecactPeriods = [
  {
    name: 'сутки',
    value: WEATHER_FORECAST_PERIOD_COUNT_IN_DAY,
  },
  {
    name: '2 суток',
    value: WEATHER_FORECAST_PERIOD_COUNT_IN_DAY * 2,
  },
  {
    name: '3 суток',
    value: WEATHER_FORECAST_PERIOD_COUNT_IN_DAY * 3,
  },
  {
    name: '4 суток',
    value: WEATHER_FORECAST_PERIOD_COUNT_IN_DAY * 4,
  },
  {
    name: '5 суток',
    value: WEATHER_FORECAST_PERIOD_COUNT_IN_DAY * 5,
  },
];

const forecastPeriodSelected = ref(forecactPeriods[0].value);

const queryString = computed(() => {
  return getQueryString({
    ...WEATHER_FORECAST_REQUEST_OPTIONS.parameters,
    ...{
      cnt: forecastPeriodSelected.value,
    }
  });
});

const url = computed(() => `${WEATHER_SERVICE_BASE_URL}${WEATHER_FORECAST_REQUEST_OPTIONS.url}?${queryString.value}`);

// const { data, status, refresh } = await useAsyncData<ProxyResponse>(
//   'weatherForecast',
//   () => $fetch(
//     PROXY_URL,
//     {
//       method: 'GET',
//       params: {
//         url: url.value,
//       }
//     }
//   )
// );

const { data, status, refresh } = await useFetch<ProxyResponse>(PROXY_URL, {
  query: { url },

  watch: [ url ]
});

const weatherForecast: ComputedRef<WeatherForecastContents | null> = computed(() => {
  if (!data.value?.contents) {
    return null;
  }

  try {
    const dataJson = JSON.parse(data.value.contents);

    return dataJson;
  } catch (error) {
    return null;
  }
});
</script>

<template>
  <!-- <pre>
    {{ status }}
  </pre> -->

  <!-- <UCard v-if="status === 'pending'" class="ease">
    <Loading />
  </UCard> -->

  <UCard v-if="weatherForecast">
    <template #header>
      <div :class="$style.header">
        <p class="text-4xl">
          Погода: {{ weatherForecast.city.name }}
        </p>
  
        <USelect
          v-model="forecastPeriodSelected"
          :options="forecactPeriods"
          option-attribute="name"
          size="xl"
        />

        <UButton
          size="xl"
          variant="outline"
          @click="refresh()"
        >
          Обновить
        </UButton>
      </div>
    </template>

    <div :class="$style.forecast">
      <div
        v-for="itemForecast in weatherForecast.list"
        :key="itemForecast.dt_txt"
        class="bg-slate-200 p-2 rounded-md"
      >
        <p>
          {{ itemForecast.dt_txt }}
        </p>

        <p class="text-5xl font-medium">
          {{ Math.round(itemForecast.main.temp) }}°C
        </p>
  
        <p>
          по ощущению: {{ Math.round(itemForecast.main.feels_like) }}°C
        </p>

        <p v-for="item in itemForecast.weather" :key="item.id">
          {{ item.description }}
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

.forecast {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
</style>
