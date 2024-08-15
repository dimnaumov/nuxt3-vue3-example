<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center justify-center w-12 h-12">
      <div
        :class="$style.iconHumidity"
        class="w-6 h-6"
      />
    </div>

    <div class="p-1.5">
      {{ humidity }}%
    </div>
  </div>
</template>

<style lang="scss" module>
.iconHumidity {
  @include iconHumidity;
}
</style>
