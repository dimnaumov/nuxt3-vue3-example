<template>
  <footer :class="$style.footer">
    <UContainer class="flex justify-between py-4">
      <AppLogo />
  
      <AppContacts />
    </UContainer>
  </footer>
</template>

<style lang="scss" module>
.footer {
  border-top-width: 1px;
}
</style>
