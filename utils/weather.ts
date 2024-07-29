import type { WeatherCurrentContents, WeatherForecastContents } from "~/components/Weather/types";
import { fromUnixTime, format } from "date-fns";

export function getQueryString(parameters: object) {
  return Object.entries(parameters)
  .reduce((acc: string[], param) => {
    acc.push(param.join('='));
  
    return acc;
  }, [])
  .join('&');
}

export function formattedWeather(data: string | undefined): WeatherCurrentContents | WeatherForecastContents | null {  
  if (!data) {
    return null;
  }

  try {
    const dataJson = JSON.parse(data);

    return dataJson;
  } catch (error) {
    console.error("Invalid JSON string:", error);

    return null;
  }   
}

export function formattedWeatherCurrent(data: string | undefined): WeatherCurrentContents | null {  
  if (!data) {
    return null;
  }

  try {
    const dataJson: WeatherCurrentContents = JSON.parse(data);

    // console.warn("format(fromUnixTime(dataJson.dt), 'YYYY-MM-DD hh:mm')", format(fromUnixTime(dataJson.dt as number), 'yyyy-MM-DD hh:mm'));

    return {
      ...dataJson,
      main: {
        ...dataJson.main,
        temp: Math.round(dataJson.main.temp),
        feels_like: Math.round(dataJson.main.temp),
        pressure: Math.round(dataJson.main.sea_level * 0.75006),
        sea_level: Math.round(dataJson.main.sea_level * 0.75006),
        grnd_level: Math.round(dataJson.main.grnd_level * 0.75006),
      },
      dt: format(fromUnixTime(dataJson.dt as number), 'yyyy-MM-dd HH:mm'),
      sys: {
        ...dataJson.sys,
        sunrise: format(fromUnixTime(dataJson.sys.sunrise as number), 'yyyy-MM-dd HH:mm'),
        sunset: format(fromUnixTime(dataJson.sys.sunset as number), 'yyyy-MM-dd HH:mm'),
      },
      wind: {
        ...dataJson.wind,
        speed: Math.round(dataJson.wind.speed),
        gust: Math.round(dataJson.wind.gust),
      },
    };
  } catch (error) {
    console.error("Invalid JSON string:", error);

    return null;
  }   
}