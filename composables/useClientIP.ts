// Заголовок x-forwarded-for может быть ненадежным в конфигурациях с несколькими
// прокси или CDN. Его могут подделать, если не настроена защита на уровне сервера.
export const useClientIP = () => {
  const ip = ref('');

  if (import.meta.server) {
    const headers = useRequestHeaders();
    
    const forwardedFor = headers['x-forwarded-for'];
    const remoteAddr = headers['remote-addr'];

    if (forwardedFor) {
      ip.value = forwardedFor.split(',')[0];
    } else if (remoteAddr) {
      ip.value = remoteAddr;
    }
  }

  return ip;
}
