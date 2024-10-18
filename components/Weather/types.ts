
export type WeatherType = 'current' | 'forecast';

export type WeatherPath = 'weather' | 'forecast';

export type WeaterLangCode = 'sq' | 'af' | 'ar' | 'az' | 'eu' | 'be' | 'bg' | 'ca' | 'zh_cn' | 'zh_tw' | 'hr' | 'cz' | 'da' | 'nl' | 'en' | 'fi' | 'fr' | 'gl' | 'de' | 'el' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'it' | 'ja' | 'kr' | 'ku' | 'la' | 'lt' | 'mk' | 'no' | 'fa' | 'pl' | 'pt' | 'pt_br' | 'ro' | 'ru' | 'sr' | 'sk' | 'sl' | 'sp, es' | 'sv, se' | 'th' | 'tr' | 'ua, uk' | 'vi' | 'zu';

export type WeatherUnits = 'metric' | 'standart' | 'imperial';

export type WeatherMode = 'json' | 'xml';

export type partOfDay = 'n' | 'd';

export type WeatherCoord = {
  lon: number;
  lat: number;
}

export type WeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

export interface FormattedWeatherMain extends Omit<WeatherMain, 'grnd_level'> {
  grnd_level: string;
}

export type WeatherWind = {
  speed: number;
  deg: number;
  gust: number;
}

export type WeatherClouds = {
  all: number;
}

export type WeatherSys = {
  country: string;
  sunrise: number | string;
  sunset: number | string;
}

export interface WeatherParameters {
  lat: number;
  lon: number;
  mode: WeatherMode;
  units: WeatherUnits;
  lang: WeaterLangCode;
}

export interface WeatherParametersForecast extends WeatherParameters {
  cnt: number;
}

export interface WeatherRequestOptions<T> {
  path: WeatherPath;
  parameters: T;
}

export type WeatherCurrentRequestOptions = WeatherRequestOptions<WeatherParameters>;

export interface WeatherCurrentContents {
  coord: WeatherCoord;
  weather: WeatherItem[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: WeatherWind;
  clouds: WeatherClouds;
  dt: number | string;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}

export type WeatherForecastRequestOptions = WeatherRequestOptions<WeatherParametersForecast>;

export type WeatherTabItem = {
  slot: string;
  name: WeatherType;
  label: string;
}

export interface WeatherForecastContents {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItemForecast[];
  city: WeatherCity;
}

export type WeatherItemForecast = {
  dt: number |string;
  main: WeatherMain;
  weather: WeatherItem[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility: number;
  pop: number;
  sys: {
    pod: partOfDay;
  };
  dt_txt: string;
}

export interface WeatherForecastContentsGroupByDate extends WeatherForecastContents {
  listByDate: Record<string, WeatherItemForecast[]>;
};

export type WeatherCity = {
  id: number;
  name: string;
  coord: WeatherCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
