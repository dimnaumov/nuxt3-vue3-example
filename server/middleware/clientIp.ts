import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress;

  console.warn('ip middleware', ip);

  event.context.clientIp = ip;
});
