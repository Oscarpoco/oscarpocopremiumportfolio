import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdSettings,
  MdPalette,
  MdDarkMode,
  MdLightMode,
  MdAutoAwesome,
  MdSave,
} from "react-icons/md";
import {
  THEME_PALETTES,
  PARTICLE_EFFECTS,
  DEFAULT_PREFERENCES,
  applyPreferences,
} from "../config/themePreferences";
import "./SettingsPanel.css";

export default function SettingsPanel({
  open,
  onClose,
  preferences,
  onSave,
}) {
  const [draft, setDraft] = useState(preferences);

  useEffect(() => {
    if (open) setDraft(preferences);
  }, [open, preferences]);

  useEffect(() => {
    if (open) {
      applyPreferences(draft);
    } else {
      applyPreferences(preferences);
    }
  }, [open, draft, preferences]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const mounted = typeof document !== "undefined";
  if (!mounted) return null;

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft({ ...DEFAULT_PREFERENCES });
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="settings-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="settings-backdrop"
            aria-label="Close settings"
            onClick={onClose}
          />
          <motion.div
            className="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <header className="settings-header">
              <div className="settings-header-title">
                <MdSettings size={22} aria-hidden />
                <h2 id="settings-title">Portfolio settings</h2>
              </div>
              <button
                type="button"
                className="settings-close"
                onClick={onClose}
                aria-label="Close"
              >
                <MdClose size={22} />
              </button>
            </header>

            <div className="settings-body">
              <section className="settings-section">
                <h3>
                  <MdPalette size={18} aria-hidden />
                  Color theme
                </h3>
                <p className="settings-hint">Choose a palette (Male = classic blue).</p>
                <div className="settings-theme-grid">
                  {THEME_PALETTES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={`settings-theme-card ${
                        draft.palette === theme.id ? "settings-theme-card--active" : ""
                      }`}
                      onClick={() => setDraft((d) => ({ ...d, palette: theme.id }))}
                    >
                      <span className="settings-theme-swatches" aria-hidden>
                        <span style={{ background: theme.swatch[0] }} />
                        <span style={{ background: theme.swatch[1] }} />
                      </span>
                      <span className="settings-theme-label">{theme.label}</span>
                      <span className="settings-theme-desc">{theme.description}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="settings-section">
                <h3>Appearance</h3>
                <div className="settings-appearance">
                  <button
                    type="button"
                    className={`settings-mode-btn ${
                      !draft.darkMode ? "settings-mode-btn--active" : ""
                    }`}
                    onClick={() => setDraft((d) => ({ ...d, darkMode: false }))}
                  >
                    <MdLightMode size={20} />
                    Light
                  </button>
                  <button
                    type="button"
                    className={`settings-mode-btn ${
                      draft.darkMode ? "settings-mode-btn--active" : ""
                    }`}
                    onClick={() => setDraft((d) => ({ ...d, darkMode: true }))}
                  >
                    <MdDarkMode size={20} />
                    Dark
                  </button>
                </div>
              </section>

              <section className="settings-section">
                <h3>
                  <MdAutoAwesome size={18} aria-hidden />
                  Falling animation
                </h3>
                <p className="settings-hint">
                  One effect at a time — also animates falling 1s and 0s under your
                  profile photo. Disabled if reduced motion is on.
                </p>
                <div className="settings-particle-list">
                  {PARTICLE_EFFECTS.map((fx) => (
                    <button
                      key={fx.id}
                      type="button"
                      className={`settings-particle-btn ${
                        draft.particles === fx.id ? "settings-particle-btn--active" : ""
                      }`}
                      onClick={() => setDraft((d) => ({ ...d, particles: fx.id }))}
                    >
                      <span className="settings-particle-label">{fx.label}</span>
                      <span className="settings-particle-desc">{fx.description}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <footer className="settings-footer">
              <button type="button" className="settings-reset" onClick={handleReset}>
                Reset
              </button>
              <button type="button" className="settings-save" onClick={handleSave}>
                <MdSave size={18} />
                Save preferences
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
