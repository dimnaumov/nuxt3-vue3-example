import type { WeatherCurrentContents, WeatherForecastContents, WeatherForecastContentsGroupByDate, WeatherItemForecast } from "~/components/Weather/types";
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

export function formattedWeatherForecast (data: string | undefined): WeatherForecastContents | null {
  if (!data) {
    return null;
  }
  
  try {
    const dataJson: WeatherForecastContents = JSON.parse(data);
    
    return {
      ...dataJson,
      list: dataJson.list.map((item: WeatherItemForecast) => {
        return {
          ...item,
          dt: format(fromUnixTime(item.dt as number), 'yyyy-MM-dd HH:mm'),
          wind: {
            ...item.wind,
            speed: Math.round(item.wind.speed),
            gust: Math.round(item.wind.gust),
          },
        }
      }),
    };
  } catch (error) {
    console.error("Invalid JSON string:", error);

    return null;
  }
}

export function formattedWeatherForecastGroupByDate (data: string | undefined): WeatherForecastContentsGroupByDate | null {
  if (!data) {
    return null;
  }
  
  try {
    const dataJson: WeatherForecastContents = JSON.parse(data);
    
    return {
      ...dataJson,
      listByDate: dataJson.list.reduce((result: Record<string, WeatherItemForecast[]>, item: WeatherItemForecast) => {
          const formattedDate = format(fromUnixTime(item.dt as number), 'dd.MM.yyyy');

          const formattedItem = {
            ...item,
            dt: format(fromUnixTime(item.dt as number), 'HH:mm'),
            wind: {
              ...item.wind,
              speed: Math.round(item.wind.speed),
              gust: Math.round(item.wind.gust),
            },
          };

          if (!result[formattedDate]) {
            result[formattedDate] = [formattedItem];
          } else {
            result[formattedDate].push(formattedItem);
          }

          return result;
        }, {}),
    };
  } catch (error) {
    console.error("Invalid JSON string:", error);

    return null;
  }
}

