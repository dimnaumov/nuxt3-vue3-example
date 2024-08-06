<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex">
    <div class="flex items-center">
      <div class="flex items-center justify-center w-12 h-12">
        <img
          class="h-7 w-7"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO2TQQrCMBREX72C0uvoSvA4KoJoF6Wr3se9l+hVXLkw8mFwIdEmNBEXefAhyc/MJIFAITEt0Oc0d6o+p7lLHdJ6zLPdpDCKU/13wAzogDoioJbGtKN0Mhk+hPjMB2lMGyVoAvY3kQd6hZyBSvMVcAVuKhsv1au0N9j8ndOXn3xkImvgAdyBLTAHFsBOa9bbTAm46KR7T++gnj1XEC5x/T6ggI8nagpeir51gRAAAAAASUVORK5CYII=">
      </div>

      <div class="p-1.5">{{ sunrise }}</div>
    </div>

    <div class="flex items-center">
      <div class="flex items-center justify-center w-12 h-12">
        <img
          class="h-7 w-7"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqUlEQVR4nO2UTQrCMBSEv3oFpdfRleBxVETRQqVXcu8lehVXLow8mLqQVBMafxb5YKDJy8yELAqZBGwB16P6kyV1qnBfSfLwjqOU+R1O+u+CEdAAZURBKY9539IopO0p8YW38pg3ylAFnK8iL/QoOQCF1jPgDFwk+55qVuhscPgz+xc/ux0DmQM34AosgTEwAVbas9liSMFJN117ZhvN7LmCcIn1/YIMPu4zNF5M5rLuFAAAAABJRU5ErkJggg==">
      </div>

      <div class="p-1 5">{{ sunset }}</div>
    </div>
  </div>
</template>