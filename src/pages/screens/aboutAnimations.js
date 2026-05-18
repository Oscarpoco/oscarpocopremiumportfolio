/** Shared About page motion — subtle scroll-into-view tweens */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const TWEEN = {
  duration: 0.5,
  ease: EASE_OUT,
};

export function getScrollViewport(scrollRoot) {
  return {
    once: true,
    amount: 0.12,
    margin: "0px 0px -6% 0px",
    ...(scrollRoot ? { root: scrollRoot } : {}),
  };
}

/** Gentle fade + slide up when section scrolls into view */
export function scrollIn(reduceMotion, delay = 0, y = 22, scrollRoot = null) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: getScrollViewport(scrollRoot),
    transition: { ...TWEEN, delay },
  };
}

export function scrollInFade(reduceMotion, delay = 0, scrollRoot = null) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: getScrollViewport(scrollRoot),
    transition: { duration: 0.45, ease: EASE_OUT, delay },
  };
}
