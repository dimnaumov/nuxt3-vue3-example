import type { ProxyResponse, WeatherCoord } from "~/components/Weather/types";
import { formattedWeatherForecastGroupByDate, formattedWeatherCurrent } from "~/utils/weather.js";

export async function useFetchWeather(
  path: string,
  requestParameters?: ComputedRef<Record<string, unknown>>,
) {
  const coords: Ref<WeatherCoord> = useState('coords');

  const formattedByPath: Record<string, Function> = {
    weather: formattedWeatherCurrent,
    forecast: formattedWeatherForecastGroupByDate,
  };

  const query = computed(() => ({
    path,
    ...requestParameters?.value,
    ...coords.value,
  }));

  const response = await useFetch<ProxyResponse>(`/api/weather`, {
    query,
    cache: 'no-cache',
  });

  return {
    ...response,
    data: formattedByPath[path](response.data.value?.contents),
  };
}
