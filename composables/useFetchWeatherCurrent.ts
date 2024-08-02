import type { ProxyResponse } from "~/components/Weather/types";
import {
  PROXY_URL,
  WEATHER_CURRENT_REQUEST_OPTIONS,
  WEATHER_SERVICE_BASE_URL,
} from "~/constants/weather";

export async function useFetchWeatherCurrent() {
  const queryString = computed(() =>
    getQueryString({
      ...WEATHER_CURRENT_REQUEST_OPTIONS.parameters,
    }),
  );  

  const url = computed(() => `${WEATHER_SERVICE_BASE_URL}${WEATHER_CURRENT_REQUEST_OPTIONS.url}?${queryString.value}`);

  return await useFetch<ProxyResponse>(PROXY_URL, {
    query: { url },
    cache: 'no-cache',
  });
}
