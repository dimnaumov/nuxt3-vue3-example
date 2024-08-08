import type {
  WeatherCurrentRequestOptions,
  WeatherForecastRequestOptions,
} from "~/components/Weather/types";

export const coordDefault = {
  lat: 54.3142,
  lon: 48.4031,
};

export const PROXY_URL = 'http://api.allorigins.win/get';

export const WEATHER_SERVICE_BASE_URL = 'http://api.openweathermap.org/data/2.5/';

export const WEATHER_CURRENT_REQUEST_OPTIONS: WeatherCurrentRequestOptions = {
  url: 'weather',
  parameters: {
    ...coordDefault,
    appid: 'ee5183b68e470bb98bf6b56d8bf74384',
    mode: 'json',
    units: 'metric',
    lang: 'ru',
  },
};

export const WEATHER_FORECAST_REQUEST_OPTIONS: WeatherForecastRequestOptions = {
  url: 'forecast',
  parameters: {
    ...coordDefault,
    appid: 'ee5183b68e470bb98bf6b56d8bf74384',
    mode: 'json',
    units: 'metric',
    lang: 'ru',
    cnt: 15,
  },
}

export const WEATHER_FORECAST_PERIOD_IN_HOURS = 3;
export const WEATHER_FORECAST_PERIOD_COUNT_IN_DAY = 24 / WEATHER_FORECAST_PERIOD_IN_HOURS;
