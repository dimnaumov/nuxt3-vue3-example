<template>
  <div class="grid gap-4 grid-cols-3 items-center">
    <a
      :class="$style.iconMail"
      class="w-6 h-6"
      href="mailto:naumovdv2010@yandex.ru"
    />

    <a
      :class="$style.iconTelegram"
      class="w-6 h-6"
      href=" https://t.me/dimnaumov"
      target="_blank"
      rel="noopener noreferrer"
    />

    <a
      :class="$style.iconGithub"
      class="w-6 h-6"
      href="https://github.com/dimnaumov/nuxt3-vue3-example"
      target="_blank"
      rel="noopener noreferrer"
    />
  </div>
</template>

<style lang="scss" module>
.iconMail {
  display: block;
  @include iconMail;
}

.iconTelegram {
  display: block;
  @include iconTelegram;
}

.iconGithub {
  display: block;
  @include iconGithub;
}
</style>
