import geoip from 'geoip-lite';

export default defineEventHandler(async (event) => {
  // const ip = getRequestHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress || '';
  // const ipStatic = "207.97.227.239";

  const ip = event.context.clientIp;

  const geo = geoip.lookup(ip);

  if (geo) {
    const [ lat, lon ] = geo.ll;

    return {
      lat,
      lon,
    };
  }

  return null;
});
