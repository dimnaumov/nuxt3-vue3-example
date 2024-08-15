import { defineEventHandler } from 'h3';
import { PROXY_URL, WEATHER_SERVICE_BASE_URL } from '~/constants/weather';
import { getQueryString } from '~/utils/weather';

export default defineEventHandler(async (event) => {
  const { private: { WEATHER_API_KEY } } = useRuntimeConfig();
  const { path, ...parameters } = getQuery(event);
  
  const queryString = getQueryString({
    ...parameters,
    appId: WEATHER_API_KEY,
  });

  const urlWeather = `${WEATHER_SERVICE_BASE_URL}${path}?${queryString}`;

  const url = `${PROXY_URL}?url=${encodeURIComponent(urlWeather)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    const data = await response.json();

    data.contents = JSON.parse(data.contents);
    
    if (
      data.status.http_code !== 200
      || parseInt(data.contents.cod) !== 200
    ) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Error parsing JSON: ${error}`);
  }
});
