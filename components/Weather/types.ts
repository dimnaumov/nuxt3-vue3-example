
export type WeatherType = 'current' | 'forecast';

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

export type WeatherMain = {
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
  appid: string;
  mode: WeatherMode;
  units: WeatherUnits;
  lang: WeaterLangCode;
}

export interface WeatherParametersForecast extends WeatherParameters {
  cnt: number;
}

export interface WeatherRequestOptions<T> {
  url: string;
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
  cod: number;
}

export type WeatherForecastRequestOptions = WeatherRequestOptions<WeatherParametersForecast>;

export type ProxyResponseStatus = {
  "url": string;
  "content_type": string;
  "http_code": number;
  "response_time": number;
  "content_length": number;
}

export type ProxyResponse = {
  contents: string;
  status: ProxyResponseStatus;
}

export type WeatherTabItem = {
  slot: string;
  name: WeatherType;
  label: string;
}

export type WeatherForecastContents = {
  cod: number;
  message: number;
  cnt: number;
  list: WeatherItemForecast[];
  city: WeatherCity;
}

export type WeatherItemForecast = {
  dt: number;
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
