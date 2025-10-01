<script setup lang="ts">
  import { useGeolocation, watchOnce } from '@vueuse/core';

  const coords = useState('coords');
  const ip = useState('ip');

  const { coords: browserCoords } = useGeolocation();

  // example get IP from composable
  // const clientIP = useClientIP();
  // console.warn('clientIP', clientIP.value);

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
      userStore.setCoordsByIp(data.value.coords);
      userStore.setIp(data.value.ip);
    }
  });

  watchOnce(
    () => browserCoords.value,
    (value: Ref<GeolocationCoordinates>) => {      
      if (value
        && value.accuracy > 0
        && Number.isFinite(value.latitude)
        && Number.isFinite(value.longitude)
      ) {
        console.warn('value.latitude, value.longitude', value.latitude, value.longitude);

        const newCoords = { lat: value.latitude, lon: value.longitude };
        
        if (
          !userStore.coordsByGeolocation ||
          userStore.coordsByGeolocation.lat !== newCoords.lat ||
          userStore.coordsByGeolocation.lon !== newCoords.lon
        ) {
          userStore.setCoordsByGeolocation(newCoords);
        }
      }
    },
    // { immediate: true },
  );
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
