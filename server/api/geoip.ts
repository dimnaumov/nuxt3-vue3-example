import geoip from 'geoip-lite';
import { coordDefault } from '~/constants/weather';

export default defineEventHandler(async (event) => {
  const { clientIp } = event.context;

  const geo = geoip.lookup(clientIp || '');

  if (geo) {
    const [ lat, lon ] = geo.ll;

    return {
      lat,
      lon,
    };
  }

  return {
    ...coordDefault,
  };
});
