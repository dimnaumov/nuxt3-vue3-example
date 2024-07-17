<template>
  <UContainer :class="$style.root">
    <AppHeader />

    <main :class="$style.content">
      <slot />
    </main>

    <AppFooter />
  </UContainer>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;

  min-height: 100%;
}

.content {
  flex: 1 0 auto;
}
</style>
