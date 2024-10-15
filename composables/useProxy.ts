import { PROXY_URL } from '~/constants/weather';
import type { ProxyData } from '~/types/proxy';

export function useProxy() {
  const proxyFetch = async function(targetUrl: string): Promise<ProxyData> {
    const url = `${PROXY_URL}?url=${encodeURIComponent(targetUrl)}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw createError({
          status: response.status,
          statusCode: response.status,
          statusMessage: response.statusText,
          statusText: response.statusText,
          message: `Proxy error: ${response.status} - ${response.statusText}`,
        });  
      }

      return await response.json();
    } catch (error) {
      console.error('useProxy error details:', error);

      throw error;
    }
  };

  return { proxyFetch };
}
