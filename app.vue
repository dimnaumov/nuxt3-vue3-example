<script setup lang="ts">
  const coords = useState('coords');

  await callOnce(async () => {
    const response = await $fetch('/api/geoip');

    if (response) {
      coords.value = response;
    }
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
