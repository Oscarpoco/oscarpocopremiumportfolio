import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './IdleSessionPrompt.css';

/** No user activity for this long → idle prompt shown */
export const IDLE_SESSION_MS = 3 * 60 * 1000;

const ACTIVITY_EVENTS = [
  'mousedown',
  'mouseup',
  'click',
  'keydown',
  'keyup',
  'scroll',
  'wheel',
  'touchstart',
  'touchend',
  'pointerdown',
  'mousemove',
];

const MOUSEMOVE_THROTTLE_MS = 400;

/**
 * Global idle watcher: opens a modal after `idleMs` without interaction on
 * this page. Timer keeps running while the tab is in the background — time in
 * other tabs/apps counts as inactive here. Reload via primary action.
 */
export default function IdleSessionPrompt({
  idleMs = IDLE_SESSION_MS,
  darkMode = false,
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const lastMouseMoveRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const armTimer = useCallback(() => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, idleMs);
  }, [idleMs, clearTimer]);

  const bump = useCallback(
    (e) => {
      if (open) return;
      if (e?.type === 'mousemove') {
        const now = Date.now();
        if (now - lastMouseMoveRef.current < MOUSEMOVE_THROTTLE_MS) return;
        lastMouseMoveRef.current = now;
      }
      armTimer();
    },
    [armTimer, open]
  );

  useEffect(() => {
    bump();
    ACTIVITY_EVENTS.forEach((evt) => {
      window.addEventListener(evt, bump, { passive: true, capture: true });
    });

    return () => {
      clearTimer();
      ACTIVITY_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, bump, { capture: true });
      });
    };
  }, [bump, clearTimer, open]);

  useEffect(() => {
    if (open) {
      clearTimer();
    }
  }, [open, clearTimer]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const reloadApp = () => {
    window.location.reload();
  };

  const mounted = typeof document !== 'undefined';

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="idle-session-layer"
          className={`idle-session-popup ${darkMode ? 'dark-theme' : ''}`}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="idle-session-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="idle-session-heading"
            aria-describedby="idle-session-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              className="idle-session-card"
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 28,
                mass: 0.85,
              }}
            >
              <h2 id="idle-session-heading">Still there?</h2>
              <p id="idle-session-desc">
                We haven&apos;t seen any activity for a little while. Refresh the
                app to reload the portfolio and restore the smoothest experience.
              </p>
              <div className="idle-session-actions">
                <motion.button
                  type="button"
                  className="idle-session-btn"
                  onClick={reloadApp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  autoFocus
                >
                  Refresh app
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
