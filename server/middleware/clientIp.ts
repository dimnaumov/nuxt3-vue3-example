export default defineEventHandler(async (event) => {
  const xForwardedFor = event.node.req.headers['x-forwarded-for'] as string;
  const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : event.node.req.socket.remoteAddress;

  // здесь можно проверять тип контента, чтобы убедиться,
  // что middleware обрабатывает только HTML-страницы
  if (ip) {
    event.context.clientIp = ip;
    // event.context.clientIp = "207.97.227.239";
  }
})
