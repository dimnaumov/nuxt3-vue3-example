<script setup lang="ts">
import {
  WEATHER_FORECAST_PERIOD_COUNT_IN_DAY,
  WEATHER_FORECAST_REQUEST_OPTIONS,
} from '~/constants/weather';
import type { WeatherForecastContents } from '../Weather/types';

const { path, parameters } = WEATHER_FORECAST_REQUEST_OPTIONS;

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

const requestParameters = computed(() => ({
  ...parameters,
  cnt: forecastPeriodSelected.value,
}));

const {
  data: weatherForecastGroupByDate,
  status,
  refresh,
  error,
} = await useFetchWeather(path, requestParameters);

const isPending = computed(() => status.value === 'pending');
const isError = computed(() => status.value === 'error');

function update() {
  if (!isPending.value) {
    refresh();
  }
}
</script>

<template>
  <!-- <pre>
    {{ weatherForecastGroupByDate }}
  </pre> -->

  <UCard>
    <template #header>
      <div class="flex flex-col items-start md:justify-between md:flex-row">
        <p class="text-2xl mb-2 md:flex md:items-center md:mb-0">
          Погода: {{ weatherForecastGroupByDate?.city.name }}
        </p>
  
        <USelect
          v-model="forecastPeriodSelected"
          :options="forecactPeriods"
          option-attribute="name"
          size="xl"
          class="mb-2 md:mb-0"
        />

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

    <div v-else-if="weatherForecastGroupByDate">
      <div
        v-for="(itemForecastList, date) in weatherForecastGroupByDate.listByDate"
        :key="date"
      >
        <UDivider class="mb-4">
          <span class="text-2xl">{{ date }}</span>
        </UDivider>

        <div class="mb-4 grid grid-cols-1 gap-2 md:grid-cols-4">
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

            <WeatherDescription :weather="itemForecast.weather" />

            <WeatherWind :wind="itemForecast.wind" />

            <WeatherPressure :grnd_level="itemForecast.main.grnd_level" />

            <WeatherHumidity :humidity="itemForecast.main.humidity" />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
