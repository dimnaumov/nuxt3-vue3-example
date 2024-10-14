import { PROXY_URL } from '~/constants/weather';
import type { ProxyData } from '~/types/proxy';

export function useProxy() {
  const proxyFetch = async function(targetUrl: string): Promise<ProxyData> {
    const url = `${PROXY_URL}?url=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Proxy error response: ${response.status} - ${response.statusText}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error}`);
    }
  };

  return { proxyFetch };
}
