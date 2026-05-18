import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdSmartToy, MdClose, MdConstruction } from "react-icons/md";
import "./Osbot.css";

export default function Osbot() {
  const [open, setOpen] = useState(false);
  const mounted = typeof document !== "undefined";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      <motion.button
        type="button"
        className="osbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Open Osbot assistant"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <MdSmartToy size={26} aria-hidden />
        <span className="osbot-fab-label">Osbot</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="osbot-layer"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              type="button"
              className="osbot-backdrop"
              aria-label="Close Osbot"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="osbot-popup"
              role="dialog"
              aria-modal="true"
              aria-labelledby="osbot-title"
              aria-describedby="osbot-desc"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <button
                type="button"
                className="osbot-popup-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <MdClose size={22} />
              </button>

              <div className="osbot-popup-icon" aria-hidden>
                <MdSmartToy size={32} />
              </div>

              <h2 id="osbot-title" className="osbot-popup-title">
                Osbot
              </h2>
              <p id="osbot-desc" className="osbot-popup-message">
                Coming soon — still in dev mode.
              </p>
              <p className="osbot-popup-sub">
                <MdConstruction size={16} aria-hidden />
                My portfolio assistant is on the way.
              </p>

              <motion.button
                type="button"
                className="osbot-popup-btn"
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
