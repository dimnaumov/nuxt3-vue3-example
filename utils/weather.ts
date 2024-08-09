import type {
  WeatherCurrentContents,
  WeatherForecastContents,
  WeatherForecastContentsGroupByDate,
  WeatherItemForecast,
} from "~/components/Weather/types";
import moment from "moment";

function getDateByTimeStampAndOffset(
  timestamp: number,
  offsetSeconds: number,
  template: string = 'DD.MM.YYYY H:mm',
) {
  return  moment
    .unix(timestamp + offsetSeconds)
    .utc()
    .format(template);
}

export function getQueryString(parameters: object) {
  return Object.entries(parameters)
  .reduce((acc: string[], param) => {
    acc.push(param.join('='));
  
    return acc;
  }, [])
  .join('&');
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
      dt: getDateByTimeStampAndOffset(dataJson.dt as number, dataJson.timezone),
      sys: {
        ...dataJson.sys,
        sunrise: getDateByTimeStampAndOffset(dataJson.sys.sunrise as number, dataJson.timezone, 'HH:mm'),
        sunset: getDateByTimeStampAndOffset(dataJson.sys.sunset as number, dataJson.timezone, 'HH:mm'),
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
          dt: getDateByTimeStampAndOffset(item.dt as number, dataJson.city.timezone),
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
          const formattedDate = getDateByTimeStampAndOffset(item.dt as number, dataJson.city.timezone, 'DD.MM.YYYY');

          const formattedItem = {
            ...item,
            dt: getDateByTimeStampAndOffset(item.dt as number, dataJson.city.timezone, 'HH:mm'),
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

