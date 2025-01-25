<script setup lang="ts">
import { WEATHER_CURRENT_REQUEST_OPTIONS } from '~/constants/weather';

const { path, parameters } = WEATHER_CURRENT_REQUEST_OPTIONS;

const requestParameters = computed(() => ({
  ...parameters,
}));

const {
  data: weatherCurrent,
  refresh,
  status,
  error,
} = await useFetchWeather<'weather'>(path, requestParameters);

const isPending = computed(() => status.value === 'pending');
const isError = computed(() => status.value === 'error');
// useState example
// const ip: Ref<string> = useState('ip');

// pinia store example
const { ip } = useUserStore();

function update() {
  if(!isPending.value) {
    refresh();
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="md:flex md:flex-row md:justify-between">
        <p class="text-2xl mb-2 md:mb-0">
          Погода: {{ weatherCurrent?.name }}
          <span
            v-if="ip"
            class="block text-sm"
          >
            (по ip: {{ ip }})
          </span>
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
      :description="error?.data.message ?? error?.message"
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
