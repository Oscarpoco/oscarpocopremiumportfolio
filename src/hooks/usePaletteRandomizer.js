import { useEffect, useRef } from "react";
import { THEME_PALETTES } from "../config/themePreferences";

export const PALETTE_RANDOMIZE_INTERVAL_MS = 5000;

export function getNextPaletteId(currentId) {
  const index = THEME_PALETTES.findIndex((p) => p.id === currentId);
  const nextIndex = index < 0 ? 0 : (index + 1) % THEME_PALETTES.length;
  return THEME_PALETTES[nextIndex].id;
}

/**
 * Cycles theme palettes on an interval; loops forever through all palettes.
 */
export function usePaletteRandomizer(enabled, currentPalette, onPaletteChange) {
  const indexRef = useRef(0);
  const paletteRef = useRef(currentPalette);
  const onChangeRef = useRef(onPaletteChange);

  paletteRef.current = currentPalette;

  useEffect(() => {
    onChangeRef.current = onPaletteChange;
  }, [onPaletteChange]);

  useEffect(() => {
    if (!enabled) return undefined;

    const startIndex = THEME_PALETTES.findIndex((p) => p.id === paletteRef.current);
    indexRef.current = startIndex >= 0 ? startIndex : 0;

    const tick = () => {
      indexRef.current = (indexRef.current + 1) % THEME_PALETTES.length;
      onChangeRef.current(THEME_PALETTES[indexRef.current].id);
    };

    const intervalId = window.setInterval(tick, PALETTE_RANDOMIZE_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [enabled]);
}
