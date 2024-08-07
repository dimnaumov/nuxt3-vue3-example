import type { ProxyResponse, WeatherCoord } from "~/components/Weather/types";
import {
  PROXY_URL,
  WEATHER_CURRENT_REQUEST_OPTIONS,
  WEATHER_SERVICE_BASE_URL,
} from "~/constants/weather";

export async function useAsyncDataWeatherCurrent() {
  const coords: Ref<WeatherCoord> = useState('coords');

  const queryString = computed(() =>
    getQueryString({
      ...WEATHER_CURRENT_REQUEST_OPTIONS.parameters,
      ...coords.value,
    }),
  );

  const url = computed(() => `${WEATHER_SERVICE_BASE_URL}${WEATHER_CURRENT_REQUEST_OPTIONS.url}?${queryString.value}`); 

  return await useAsyncData<ProxyResponse>(
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
}
