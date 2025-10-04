import { server } from "typescript";
import type {
  WeatherCoord,
  // WeatherCoord,
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
  coords?: ComputedRef<WeatherCoord>,
) {
  // useState example
  // const coords: Ref<WeatherCoord> = useState('coords');

  // pinia store example
  // const userStore = useUserStore();
  // const { coords } = storeToRefs(userStore);

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

  const { data, pending, error, refresh, status } = useAsyncData(
    `weather-${path}`,
    async () => {
      try {
        const result = await $fetch(`/api/weather`, {
          query: {
            path,
            ...unref(requestParameters),
            ...unref(coords),
          },
          cache: "no-cache",
        });

        return weatherFunctionFormatter[path](result) as WeatherResponse<T>;
      } catch (error) {
        console.error('Ошибка загрузки:', error);

        throw error;
      }
    },
  );

  return {
    data,
    pending,
    error,
    refresh,
    status,
  };
}
