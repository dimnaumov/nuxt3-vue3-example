<template>
  <header
    :class="$style.header"
    class="border-slate-200 shadow-md bg-white"
  >
    <UContainer class="flex justify-between py-4">
      <AppLogo />

      <AppContacts />
    </UContainer>
  </header>
</template>

<style lang="scss" module>
.header {
  border-bottom-width: 1px;
}
</style>
