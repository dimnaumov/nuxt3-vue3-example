<script setup lang="ts">
import type { Props } from './types';

defineProps<Props>();
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center justify-center w-12 h-12">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVR4nN2VyyvEURTHPyIjj7KhTMZraSOPv4HyXMjCin/CmNhYSvayUgpJsbCxE0pkxVJejYw9iomJTn1/uk1z5zcjpXzr1/2dc8/rnnvOufDf0QQkgCMgBaSBB+AQmAZiPzVcASwCb8Bnnu8VWAAixRivB05kIAOsAYNAA1Cm/X7xPyR3DNQVGnlg/BroDJHvAq4cJ6EnWXSMBxG1AcvAPfCu1ehW58SBk/mwC31TWoLI+4AnT/6N3yu5HqXL7qTR5yAhRcutoQV4EW9HTquAvSwnzZLfFC/uc3AkAbtQlIZPYBsoEW9CPHO8r/8lJ6BH4MDnICUFqxbDnehu0e3OiSaBDv3fOjZM9tLnIC2Fcs/+nPZXyI9R38ZD1glyYUz3kA3jbXn2vnEoB0MUj1Xp2kpYFa0XaXw8q3yNzomY6jijDi0ElUBShne1JsXPiQWnk61DwxCXvI2XUuBU9JRPIaKZYkI3Ton6cCHZEafzjT7Pp1TnOMkAG8AwEFUJR53GC/qiVnSN04h5EdHgevXMoWA8nImeAaqBWdGWqoLQqDwfqE+CFy0YJ4OeAOy9+DUMKOJnrb9q/O/xBQHdmFHBBEf3AAAAAElFTkSuQmCC"
        class="w-6 h-6"
      >
    </div>
    <div class="p-1.5">
      {{ humidity }}%
    </div>
  </div>
</template>
