import type { WeatherCoord, WeatherCurrentContents, WeatherForecastContents } from "~/components/Weather/types";
import { formattedWeatherCurrent } from "~/utils/weather.js";

export async function useFetchWeather(
  path: string,
  requestParameters?: ComputedRef<Record<string, unknown>>,
) {
  const coords: Ref<WeatherCoord> = useState('coords');

  type FormatterFunction = (data: WeatherCurrentContents | WeatherForecastContents) => unknown;

  const formattedByPath: Record<typeof path, FormatterFunction> = {
    weather: formattedWeatherCurrent,
    forecast: formattedWeatherForecast,
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

  return {
    ...response,
    data: computed(() => formattedByPath[path](response.data.value)),
  };
}
