<template>
  <div :class="$style.root">
    <AppHeader :class="$style.header" />
  
    <main
      :class="$style.content"
      class="py-4"
    >
      <UContainer>
        <slot />
      </UContainer>
    </main>
  
    <AppFooter />
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;

  min-height: 100%;
  position: relative;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
}

.content {
  flex: 1 0 auto;
  z-index: 1;
}
</style>
