import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdCookie } from "react-icons/md";
import {
  acceptCookieConsent,
  hasCookieConsent,
} from "../config/cookiePreferences";
import "../pages/styles/About.css";
import "./CookieConsent.css";

export default function CookieConsent({ darkMode = false }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVisible(!hasCookieConsent());
  }, []);

  const handleAccept = () => {
    acceptCookieConsent();
    setVisible(false);
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.aside
          className={`cookie-consent ${darkMode ? "dark-theme" : ""}`}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <div className="cookie-consent-inner">
            <div className="cookie-consent-copy">
              <span className="cookie-consent-icon" aria-hidden>
                <MdCookie size={22} />
              </span>
              <p>
                This site uses cookies and similar tools for analytics and a
                smoother experience. By continuing, you agree to how they are
                used on this portfolio.
              </p>
            </div>
            <button
              type="button"
              className="action-button primary cookie-consent-accept"
              onClick={handleAccept}
            >
              Accept cookies
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
