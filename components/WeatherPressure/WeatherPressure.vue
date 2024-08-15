<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center justify-center w-12 h-12">
      <div
        :class="$style.iconPressure"
        class="w-6 h-6"
      />
    </div>

    <div class="p-1.5">
      {{ grnd_level }} мм рт. ст.
    </div>
  </div>
</template>

<style lang="scss" module>
.iconPressure {
  @include iconPressure;
}
</style>
