import { defineEventHandler } from 'h3';
import { useProxy } from '~/composables/useProxy';
import { WEATHER_SERVICE_BASE_URL } from '~/constants/weather';
import type { ProxyData } from '~/types/proxy';
import { getQueryString } from '~/utils/weather';

export default defineEventHandler(async (event) => {
  const { private: { WEATHER_API_KEY } } = useRuntimeConfig();
  const { path, ...parameters } = getQuery(event);
  
  const queryString = getQueryString({
    ...parameters,
    appId: WEATHER_API_KEY,
  });

  const urlWeather = `${WEATHER_SERVICE_BASE_URL}${path}?${queryString}`;
  
  try {
    const responseProxy: ProxyData = await useProxy().proxyFetch(urlWeather);

    const weatherData = JSON.parse(responseProxy.contents);
    
    if (parseInt(weatherData.cod) !== 200) {
      throw new Error(`Weather API error! Status: ${weatherData.cod}`);
    }

    return weatherData;
  } catch (error) {
    throw new Error(`Error fetch weather: ${error}`);
  }
});
