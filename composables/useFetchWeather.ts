import type {
  WeatherCoord,
  WeatherCurrentContents,
  WeatherForecastContents,
  WeatherPath,
} from "~/components/Weather/types";
import { formattedWeatherCurrent } from "~/utils/weather.js";

type WeatherPathMap = {
  weather: WeatherCurrentContents;
  forecast: WeatherForecastContents;
};

type WeatherResponse<T extends WeatherPath> = WeatherPathMap[T];

export async function useFetchWeather<T extends WeatherPath>(
  path: WeatherPath,
  requestParameters?: ComputedRef<Record<string, unknown>>,
) {
  const coords: Ref<WeatherCoord> = useState('coords');

  type FormatterFunction<T> = (data: T) => T | null;

  interface WeatherFunctionFormatter {
    weather: FormatterFunction<WeatherCurrentContents>;
    forecast: FormatterFunction<WeatherForecastContents>;
  }

  type WeatherFunctionMap = {
    [K in WeatherPath]: WeatherFunctionFormatter[K];
  };

  const weatherFunctionFormatter: WeatherFunctionMap = {
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
    data: computed(() => weatherFunctionFormatter[path](response.data.value) as WeatherResponse<T>),
  };
}
