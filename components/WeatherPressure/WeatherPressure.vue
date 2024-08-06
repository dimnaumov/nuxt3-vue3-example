<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center justify-center w-12 h-12">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nOWSIQoCURRFb5piFRGDzQ2YjLoEF2E02gUR7AZBo5sRg4htVqBG44gwMnDD8OHx7tOmF4aBM4d3QAR+dV0A6wAPrQEgB1ACGAkcZOljbkbhzKMeDwcOFMYiT+cGHhQ6Ig8HCgqZyNPDbuBGoSXycOBCoS9yK2RuT2Ei8nBgSmEn8vpR6ScaUDiJPBxoU7iK3IqZyygUIg8HmhTuIk8Pu4EhhaPI5cCc7y2FhcOtmYEKbgA8AbwA9Bz+UaCsHfR4+G9a/7gU+FeB6lk5/E/2BvfYnEE2x57FAAAAAElFTkSuQmCC"
        class="w-6 h-6"
      >
    </div>
    <div class="p-1.5">
      {{ grnd_level }} мм рт. ст.
    </div>
  </div>
</template>
