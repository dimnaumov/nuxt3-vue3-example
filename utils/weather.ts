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
  return moment
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

export function formattedWeatherCurrent(data: WeatherCurrentContents): WeatherCurrentContents | null {  
  if (!data) {
    return null;
  }

  return {
    ...data,
    main: {
      ...data.main,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.temp),
      pressure: Math.round(data.main.sea_level * 0.75006),
      sea_level: Math.round(data.main.sea_level * 0.75006),
      grnd_level: Math.round(data.main.grnd_level * 0.75006),
    },
    dt: getDateByTimeStampAndOffset(data.dt as number, data.timezone),
    sys: {
      ...data.sys,
      sunrise: getDateByTimeStampAndOffset(data.sys.sunrise as number, data.timezone, 'HH:mm'),
      sunset: getDateByTimeStampAndOffset(data.sys.sunset as number, data.timezone, 'HH:mm'),
    },
    wind: {
      ...data.wind,
      speed: Math.round(data.wind.speed),
      gust: Math.round(data.wind.gust),
    },
  };
}

export function formattedWeatherForecast(data: WeatherForecastContents): WeatherForecastContents | null {
  if (!data) {
    return null;
  }
  
  return {
    ...data,
    list: data.list.map((item: WeatherItemForecast) => {
      return {
        ...item,
        dt: getDateByTimeStampAndOffset(item.dt as number, data.city.timezone, 'DD.MM.YYYY HH:mm'),
        main: {
          ...item.main,
          pressure: Math.round(item.main.sea_level * 0.75006),
          sea_level: Math.round(item.main.sea_level * 0.75006),
          grnd_level: Math.round(item.main.grnd_level * 0.75006),
        },
        wind: {
          ...item.wind,
          speed: Math.round(item.wind.speed),
          gust: Math.round(item.wind.gust),
        },
      }
    }),
  };
}

export function formattedWeatherForecastGroupByDate(data: WeatherForecastContents): WeatherForecastContentsGroupByDate | null {
  if (!data) {
    return null;
  }
  
  return {
    ...data,
    listByDate: data.list.reduce((result: Record<string, WeatherItemForecast[]>, item: WeatherItemForecast) => {
      const formattedDate = moment(item.dt, 'DD.MM.YYYY HH:mm').format('DD.MM.YYYY');
      item = {
        ...item,
        dt: moment(item.dt, 'DD.MM.YYYY HH:mm').format('H:mm'),
      };

      if (!result[formattedDate]) {
        result[formattedDate] = [item];
      } else {
        result[formattedDate].push(item);
      }

      return result;
    }, {}),
  };
}
