<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex">
    <div class="flex items-center">
      <div class="flex items-center justify-center w-12 h-12">
        <div
          :class="$style.iconSunrise"
          class="w-6 h-6"
        />
      </div>

      <div class="p-1.5">{{ sunrise }}</div>
    </div>

    <div class="flex items-center">
      <div class="flex items-center justify-center w-12 h-12">
        <div
          :class="$style.iconSunset"
          class="w-6 h-6"
        />
      </div>

      <div class="p-1 5">{{ sunset }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.iconSunset {
  @include iconSunset;
}

.iconSunrise {
  @include iconSunrise;
}
</style>
