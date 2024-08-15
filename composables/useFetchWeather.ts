import type { ProxyResponse, WeatherCoord } from "~/components/Weather/types";

export async function useFetchWeather(
  path: string,
  requestParameters?: ComputedRef<Record<string, unknown>>,
) {
  const coords: Ref<WeatherCoord> = useState('coords');

  const query = computed(() => ({
    path,
    ...requestParameters?.value,
    ...coords.value,
  }));

  return await useFetch<ProxyResponse>(`/api/weather`, {
    query,
    cache: 'no-cache',
  });
}
