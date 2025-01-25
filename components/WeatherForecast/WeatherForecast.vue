<script setup lang="ts">
import {
  WEATHER_FORECAST_PERIOD_COUNT_IN_DAY,
  WEATHER_FORECAST_REQUEST_OPTIONS,
} from '~/constants/weather';

import { getDayName } from '@/utils/date';
import type { Breakpoint } from '~/constants/breakpoints';

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
  data,
  status,
  refresh,
  error,
} = await useFetchWeather<'forecast'>(path, requestParameters);

const weatherForecastGroupByDate = computed(() => formattedWeatherForecastGroupByDate(data.value));
const isPending = computed(() => status.value === 'pending');
const isError = computed(() => status.value === 'error');

// useState example
// const ip: Ref<string> = useState('ip');

// pinia store example
const { ip } = useUserStore();

const { breakpoint } = useBreakpoint()
const weatherDescriptionVisibleByBreakpoint: Record<Breakpoint, boolean> = {
  sm: false,
  md: false,
  lg: true,
  xl: true,
  '2xl': true,
}

function getVisibleWeatherDescription(breakpoint: Breakpoint): boolean {
  return weatherDescriptionVisibleByBreakpoint[breakpoint]
}

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
        <p class="text-2xl mb-2 md:mb-0">
          Погода: {{ weatherForecastGroupByDate?.city.name }}
          <span
            v-if="ip"
            class="block text-sm"
          >
            (по ip: {{ ip }})
          </span>
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

    <div
      v-else-if="weatherForecastGroupByDate"
      class="flex flex-col gap-4"
    >
      <div
        v-for="(itemForecastList, date) in weatherForecastGroupByDate.listByDate"
        :key="date"
      >
        <UDivider class="mb-4">
          <div>
            <div class="text-2xl">{{ date }}</div>
            <div>{{ getDayName(date) }}</div>
          </div>
        </UDivider>

        <div 
          v-for="itemForecast in itemForecastList"
          :key="itemForecast.dt"
          class="grid grid-cols-4 md:grid-cols-5 lg:md:grid-cols-6"
        >
          <div class="flex md:text-2xl items-center">
            {{ itemForecast.dt }}
          </div>

          <div class="flex md:text-2xl font-semibold items-center md:font-medium">
            {{ Math.round(itemForecast.main.temp) }}°C
          </div>

          <WeatherDescription
            :weather="itemForecast.weather"
            :is-description="getVisibleWeatherDescription(breakpoint)"
          />

          <WeatherWind :wind="itemForecast.wind" />

          <WeatherPressure
            class="hidden lg:flex"
            :grnd_level="itemForecast.main.grnd_level"
          />

          <WeatherHumidity
            class="hidden md:flex"
            :humidity="itemForecast.main.humidity"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
