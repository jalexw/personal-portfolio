import { useMemo } from "react";

function getPrefersReducedMotion() {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}

export function usePrefersReducedMotion(): boolean {
  const prefersReducedMotion = useMemo((): boolean => {
    return getPrefersReducedMotion()
  }, []);

  return prefersReducedMotion;
}
