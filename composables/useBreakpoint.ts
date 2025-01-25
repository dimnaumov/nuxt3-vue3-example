import { BREAKPOINTS, type Breakpoint } from "@/constants/breakpoints";

export function useBreakpoint() {
  const width = ref(0);

  const breakpoint: ComputedRef<Breakpoint> = computed(() => {
    if (width.value >= BREAKPOINTS['2xl']) return '2xl';
    if (width.value >= BREAKPOINTS.xl) return 'xl';
    if (width.value >= BREAKPOINTS.lg) return 'lg';
    if (width.value >= BREAKPOINTS.md) return 'md';
    return 'sm';
  });

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    width.value = window.innerWidth;
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return {
    width,
    breakpoint,
  };
}
