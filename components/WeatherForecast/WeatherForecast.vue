<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import {
  PROXY_URL,
  WEATHER_FORECAST_PERIOD_COUNT_IN_DAY,
  WEATHER_FORECAST_REQUEST_OPTIONS,
  WEATHER_SERVICE_BASE_URL,
} from '~/constants/weather';
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
    },
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

  watch: [ url ],
});

const weatherForecast: ComputedRef<WeatherForecastContents | null> = computed(() => {
  return formattedWeatherForecast(data.value?.contents);
});

const weatherForecastGroupByDate = computed(() => {
  return formattedWeatherForecastGroupByDate(data.value?.contents);
});

function getArrowContainerStyle(deg: number) {
  if(!deg) {
    return null;
  }

  return {
    transform: `rotate(${deg + 180}deg)`,
    transformOrigin: 'center center',
  };
}
</script>

<template>
  <!-- <pre>
    {{ weatherForecastGroupByDate }}
  </pre> -->

  <UCard
    v-if="status === 'pending'"
  >
    <Loading />
  </UCard>

  <UCard v-else-if="weatherForecastGroupByDate">
    <template #header>
      <div :class="$style.header">
        <p class="text-2xl flex items-center">
          Погода: {{ weatherForecastGroupByDate.city.name }}
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

    <div>
      <div
        v-for="(itemForecastList, date) in weatherForecastGroupByDate.listByDate"
        :key="date"
      >
        <UDivider class="mb-4">
          <span class="text-2xl">{{ date }}</span>
        </UDivider>

        <div
          :class="$style.forecast"
          class="mb-4"
        >
          <div
            v-for="itemForecast in itemForecastList"
            :key="itemForecast.dt"
            class="p-2 rounded-md border border-slate-300 bg-slate-50"
          >
            <p class="flex justify-center font-semibold">
              {{ itemForecast.dt }}
            </p>

            <UDivider class="mb-4" />
  
            <p class="text-5xl font-medium">
              {{ Math.round(itemForecast.main.temp) }}°C
            </p>
      
            <div
              class="flex items-center border border-slate-300 rounded border self-start mb-1"
            >
              <template
                v-for="item in itemForecast.weather"
                :key="item.id"
              >
                <div
                  :class="$style.icon"
                  class="w-12 h-12"
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
              class="flex border-slate-300 rounded border self-start"
            >
              <div
                class="flex items-center justify-center w-12 h-12"
                :style="getArrowContainerStyle(itemForecast.wind.deg)"
              >
                <span class="text-3xl text-slate-500">&#8593;</span>
              </div>
  
              <div class="p-1.5 text-sm">
                <p>
                  {{ itemForecast.wind.speed }} м/с
                </p>
  
                <p>
                  до {{ itemForecast.wind.gust }} м/с
                </p>
              </div>
            </div>
          </div>
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

.forecast {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;

  @screen md {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
