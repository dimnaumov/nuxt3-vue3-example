<script setup lang="ts">
  const coords = useState('coords');

  await callOnce(async () => {
    const { data } = await useFetch('/api/geoip');

    if (data.value) {
      coords.value = data.value;
    }
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
