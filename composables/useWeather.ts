import type {
  ProxyResponse,
  WeatherCurrentRequestOptions,
  WeatherCurrentContents,
  WeatherForecastRequestOptions,
} from "~/components/Weather/types";
import {
  PROXY_URL,
  WEATHER_CURRENT_REQUEST_OPTIONS,
  WEATHER_FORECAST_REQUEST_OPTIONS,
  WEATHER_SERVICE_BASE_URL,
} from "~/constants/weather";

export async function useWeather(
  type: 'current' | 'forecast',
  parameters: WeatherCurrentRequestOptions | WeatherForecastRequestOptions | object = {},
) {
  const requestOptionsByType = {
    current: WEATHER_CURRENT_REQUEST_OPTIONS,
    forecast: WEATHER_FORECAST_REQUEST_OPTIONS,
  };

  const queryString = getQueryString({
    ...requestOptionsByType[type].parameters,
    ...parameters,
  });

  const url = `${WEATHER_SERVICE_BASE_URL}${requestOptionsByType[type].url}?${queryString}`;

  const response = await useFetch<ProxyResponse>(PROXY_URL, {
    query: { url },
  });

  const weatherResponse: Ref<ProxyResponse | null> = response.data;

  const dataWeather: Ref<WeatherCurrentContents | null> = ref(null);
  
  if (weatherResponse.value) {
    try {
      dataWeather.value = JSON.parse(weatherResponse.value.contents);
    } catch (error) {
      console.error("Invalid JSON string:", error);
    }    
  }

  return dataWeather;
}
