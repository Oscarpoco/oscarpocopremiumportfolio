import { useLayoutEffect, useRef, useState } from "react";

const SCROLL_HIDE_THRESHOLD = 16;
const SCROLLABLE_EPSILON = 12;

function isOverflowScrollable(element) {
  const { overflowY } = getComputedStyle(element);
  return overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
}

function getPageScrollRoot(container) {
  if (!container) return null;
  if (isOverflowScrollable(container)) return container;

  const dashboard = container.closest(".Child-dashboard");
  if (dashboard && isOverflowScrollable(dashboard)) return dashboard;

  let node = container.parentElement;
  while (node) {
    if (isOverflowScrollable(node)) return node;
    node = node.parentElement;
  }

  return dashboard ?? container;
}

export function useDashboardScrollHint() {
  const containerRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHint = () => {
      const scrollRoot = getPageScrollRoot(container);
      if (!scrollRoot) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRoot;
      const scrollable = scrollHeight > clientHeight + SCROLLABLE_EPSILON;
      const hasScrolled = scrollTop > SCROLL_HIDE_THRESHOLD;
      setShowScrollHint(scrollable && !hasScrolled);
    };

    const scrollRoot = getPageScrollRoot(container);
    updateHint();

    scrollRoot?.addEventListener("scroll", updateHint, { passive: true });

    window.addEventListener("resize", updateHint);
    window.addEventListener("load", updateHint);

    const resizeObserver = new ResizeObserver(updateHint);
    resizeObserver.observe(container);
    if (scrollRoot) resizeObserver.observe(scrollRoot);

    const dashboard = container.closest(".Child-dashboard");
    if (dashboard) resizeObserver.observe(dashboard);

    const layoutTimers = [100, 300, 800, 1500].map((delay) =>
      window.setTimeout(updateHint, delay)
    );

    return () => {
      scrollRoot?.removeEventListener("scroll", updateHint);
      window.removeEventListener("resize", updateHint);
      window.removeEventListener("load", updateHint);
      resizeObserver.disconnect();
      layoutTimers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return { containerRef, showScrollHint };
}
