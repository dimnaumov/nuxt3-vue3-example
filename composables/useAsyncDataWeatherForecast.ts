import type { ProxyResponse, WeatherCoord } from "~/components/Weather/types";
import {
  PROXY_URL,
  WEATHER_FORECAST_REQUEST_OPTIONS,
  WEATHER_SERVICE_BASE_URL,
} from "~/constants/weather";

export async function useAsyncDataWeatherForecast(requestParameters: ComputedRef<Record<string, unknown>>) {
  const coords: Ref<WeatherCoord> = useState('coords');

  const queryString = computed(() => {
    return getQueryString({
      ...WEATHER_FORECAST_REQUEST_OPTIONS.parameters,
      ...requestParameters.value,
      ...coords.value,
    });
  });

  const url = computed(() => `${WEATHER_SERVICE_BASE_URL}${WEATHER_FORECAST_REQUEST_OPTIONS.url}?${queryString.value}`);

  return await useAsyncData<ProxyResponse>(
    'weatherForecast',
    () => $fetch(
      PROXY_URL,
      {
        method: 'GET',
        params: {
          url: url.value,
        },
      },
    ),
    {
      watch: [ url ],
    },
  );
}
