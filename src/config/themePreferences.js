export const STORAGE_KEY = "portfolio-preferences-v1";

export const THEME_PALETTES = [
  {
    id: "male",
    label: "Male",
    description: "Classic blue & teal",
    swatch: ["#0d9488", "#06d1ff"],
  },
  {
    id: "female",
    label: "Female",
    description: "Soft pink & rose",
    swatch: ["#db2777", "#f472b6"],
  },
  {
    id: "forest",
    label: "Forest",
    description: "Deep greens & moss",
    swatch: ["#15803d", "#4ade80"],
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Warm amber & coral",
    swatch: ["#ea580c", "#fb923c"],
  },
  {
    id: "aurora",
    label: "Aurora",
    description: "Violet & cosmic purple",
    swatch: ["#7c3aed", "#a78bfa"],
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Deep navy & seafoam",
    swatch: ["#0369a1", "#22d3ee"],
  },
];

export const PARTICLE_EFFECTS = [
  { id: "none", label: "None", description: "No falling animation" },
  { id: "snow", label: "Snow", description: "Gentle snowflakes" },
  { id: "flowers", label: "Flowers", description: "Blossoms & petals" },
  { id: "dev", label: "Dev icons", description: "Software dev symbols" },
];

export const DEFAULT_PREFERENCES = {
  palette: "forest",
  darkMode: true,
  particles: "none",
  backgroundMusic: false,
  randomizePalette: false,
};

export function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PREFERENCES,
        ...parsed,
        palette: THEME_PALETTES.some((t) => t.id === parsed.palette)
          ? parsed.palette
          : DEFAULT_PREFERENCES.palette,
        particles: PARTICLE_EFFECTS.some((p) => p.id === parsed.particles)
          ? parsed.particles
          : DEFAULT_PREFERENCES.particles,
        backgroundMusic: Boolean(parsed.backgroundMusic),
        randomizePalette:
          Boolean(parsed.backgroundMusic) && Boolean(parsed.randomizePalette),
      };
    }
    const legacyTheme = localStorage.getItem("theme");
    if (legacyTheme != null) {
      return {
        ...DEFAULT_PREFERENCES,
        darkMode: JSON.parse(legacyTheme),
      };
    }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_PREFERENCES };
}

export function savePreferences(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  localStorage.setItem("theme", JSON.stringify(prefs.darkMode));
}

export function applyPreferences({ palette, darkMode }) {
  const root = document.documentElement;
  const isDark = Boolean(darkMode);
  const activePalette = palette || "forest";

  root.setAttribute("data-theme-palette", activePalette);
  root.setAttribute("data-theme-mode", isDark ? "dark" : "light");
  root.classList.toggle("dark-theme", isDark);
  document.body.classList.toggle("dark-theme", isDark);
  document.body.setAttribute("data-theme-palette", activePalette);
}
