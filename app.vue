<script setup lang="ts">
  const coords = useState('coords');
  const ip = useState('ip');
  const clientIP = useClientIP();

  console.warn('clientIP', clientIP.value);

  const userStore = useUserStore();

  export interface GeoIpResponse {
    coords: {
      lon: number;
      lat: number;
    };
    ip: string;
  }

  await callOnce(async () => {
    const { data } = await useFetch<GeoIpResponse>('/api/geoip');

    if (data.value) {
      // useState example
      coords.value = data.value.coords;
      ip.value = data.value.ip;

      // pinia store example
      userStore.setCoords(data.value.coords);
      userStore.setIp(data.value.ip);
    }
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
