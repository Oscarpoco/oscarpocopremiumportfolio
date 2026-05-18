import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdCampaign,
  MdSettings,
  MdTouchApp,
  MdSmartToy,
  MdConstruction,
} from "react-icons/md";
import {
  isWelcomeAlertDismissed,
  dismissWelcomeAlert,
} from "../config/appAlerts";
import "./AppUpdatesAlert.css";

export default function AppUpdatesAlert({
  ready = false,
  darkMode = false,
  idleSessionOpen = false,
}) {
  const [open, setOpen] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(false);
  const doNotShowAgainRef = useRef(false);

  useEffect(() => {
    setPermanentlyDismissed(isWelcomeAlertDismissed());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    doNotShowAgainRef.current = doNotShowAgain;
  }, [doNotShowAgain]);

  const closeUpdates = useCallback(() => {
    if (doNotShowAgainRef.current) {
      dismissWelcomeAlert();
      setPermanentlyDismissed(true);
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!storageReady || permanentlyDismissed || !ready || idleSessionOpen) {
      return;
    }

    const showTimer = window.setTimeout(() => setOpen(true), 500);
    return () => window.clearTimeout(showTimer);
  }, [storageReady, permanentlyDismissed, ready, idleSessionOpen]);

  useEffect(() => {
    if (!idleSessionOpen || !open) return;
    closeUpdates();
  }, [idleSessionOpen, open, closeUpdates]);

  useEffect(() => {
    if (!open || idleSessionOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, idleSessionOpen]);

  const handleOk = () => {
    closeUpdates();
  };

  const mounted = typeof document !== "undefined";
  if (!mounted || !storageReady || permanentlyDismissed) return null;

  const showLayer = open && !idleSessionOpen;

  return createPortal(
    <AnimatePresence>
      {showLayer ? (
        <motion.div
          key="app-updates-layer"
          className={`app-updates-layer ${darkMode ? "dark-theme" : ""}`}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="app-updates-backdrop" aria-hidden />

          <motion.div
            className="app-updates-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-updates-title"
            aria-describedby="app-updates-desc"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
              mass: 0.85,
            }}
          >
            <header className="app-updates-header">
              <div className="app-updates-header-icon" aria-hidden>
                <MdCampaign size={26} />
              </div>
              <div className="app-updates-header-text">
                <h2 id="app-updates-title">Updates &amp; alerts</h2>
                <p id="app-updates-desc">
                  Welcome — here&apos;s what&apos;s new and where to find key
                  features in this portfolio.
                </p>
              </div>
            </header>

            <div className="app-updates-body">
              <article className="app-updates-item">
                <div className="app-updates-item-icon" aria-hidden>
                  <MdSettings />
                </div>
                <div className="app-updates-item-content">
                  <h3>Customize your experience</h3>
                  <p>
                    In the <strong>top-right corner</strong>, click the{" "}
                    <strong>Settings</strong> (gear) icon to change theme
                    palette, light/dark mode, and falling particle effects.
                  </p>
                </div>
              </article>

              <article className="app-updates-item">
                <div className="app-updates-item-icon" aria-hidden>
                  <MdTouchApp />
                </div>
                <div className="app-updates-item-content">
                  <h3>1-page portfolio</h3>
                  <p>
                    Also in the <strong>top-right corner</strong>, click your
                    profile area labeled{" "}
                    <strong>&ldquo;Click to view 1-page portfolio&rdquo;</strong>{" "}
                    to open the professional black-and-white one-page portfolio
                    view.
                  </p>
                </div>
              </article>

              <article className="app-updates-item">
                <div
                  className="app-updates-item-icon app-updates-item-icon--osbot"
                  aria-hidden
                >
                  <MdSmartToy />
                </div>
                <div className="app-updates-item-content">
                  <h3>OSBOT — powered by Claude AI</h3>
                  <p>
                    OSBOT is still under construction. When live, it will learn
                    from our conversations, update my portfolio experience
                    automatically, and generate a fresh resume each month.
                  </p>
                  <span className="app-updates-badge">
                    <MdConstruction
                      size={12}
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    />
                    Under construction
                  </span>
                </div>
              </article>
            </div>

            <footer className="app-updates-footer">
              <label className="app-updates-dismiss">
                <input
                  type="checkbox"
                  checked={doNotShowAgain}
                  onChange={(e) => setDoNotShowAgain(e.target.checked)}
                />
                <span>Do not show again</span>
              </label>

              <motion.button
                type="button"
                className="app-updates-ok"
                onClick={handleOk}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                autoFocus
              >
                Okay
              </motion.button>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
