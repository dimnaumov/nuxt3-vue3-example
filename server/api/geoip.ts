// В API-роутах доступен объект event.context.clientIp, что может быть более
// надежным способом получения IP, если Nuxt настроен на работу с прокси-серверами.
// Этот метод напрямую использует IP клиента, даже если он находится за прокси.

// import geoip from 'geoip-lite';
import { coordDefault } from '~/constants/weather';

export default defineEventHandler(async (event) => {
  const { clientIp } = event.context;
  const result = {
    coords: coordDefault,
    ip: clientIp || '',
  }

  // const geo = geoip.lookup(clientIp || '');

  // if (geo) {
  //   const [ lat, lon ] = geo.ll;

  //   return {
  //     ...result,
  //     coords: { lat, lon },
  //     ip: clientIp,
  //   };
  // }

  return result;
});
