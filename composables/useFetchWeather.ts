import type { WeatherCoord } from "~/components/Weather/types";
import { formattedWeatherForecastGroupByDate, formattedWeatherCurrent } from "~/utils/weather.js";

export async function useFetchWeather(
  path: string,
  requestParameters?: ComputedRef<Record<string, unknown>>,
) {
  const coords: Ref<WeatherCoord> = useState('coords');

  const formattedByPath: Record<string, any> = {
    weather: formattedWeatherCurrent,
    forecast: formattedWeatherForecastGroupByDate,
  };

  const query = computed(() => ({
    path,
    ...requestParameters?.value,
    ...coords.value,
  }));

  const response = await useFetch(`/api/weather`, {
    query,
    cache: 'no-cache',
  });

  console.warn('response.error', response.error.value);

  return {
    ...response,
    data: formattedByPath[path](response.data.value),
  };
}
