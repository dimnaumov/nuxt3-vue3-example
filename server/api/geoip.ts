import geoip from 'geoip-lite';
import { coordDefault } from '~/constants/weather';

export default defineEventHandler(async (event) => {
  const { clientIp } = event.context;
  const result = {
    coords: coordDefault,
    ip: clientIp || '',
  }

  const geo = geoip.lookup(clientIp || '');

  if (geo) {
    const [ lat, lon ] = geo.ll;

    return {
      ...result,
      coords: { lat, lon },
      ip: clientIp,
    };
  }

  return result;
});
