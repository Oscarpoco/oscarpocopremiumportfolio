import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/NavigationBar.css";

// ICONS
import { MdDarkMode, MdLightMode, MdTouchApp, MdSettings } from "react-icons/md";

// IMAGE
import oscar from "./../../assets/avatar4.jfif";
import { BiCodeAlt } from "react-icons/bi";

function NavigationBar({ onOpen, onOpenSettings, darkMode, toggleTheme, activeItem }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 769px)").matches
      : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.Child-dashboard');
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(progress);
        setIsScrollable(scrollHeight > 0);
      }
    };

    const scrollContainer = document.querySelector('.Child-dashboard');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial call
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setScrollProgress(0);
    const scrollContainer = document.querySelector(".Child-dashboard");
    if (scrollContainer) {
      const scrollHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      setIsScrollable(scrollHeight > 0);
    }
  }, [activeItem]);

  return (
    <motion.nav
      className={`Parent-nav ${darkMode ? "dark-mode" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* SCROLL PROGRESS BAR - Only show when content is scrollable */}
      {isScrollable && (
        <motion.div
          className="scroll-progress-bar"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
          style={{
            background: darkMode
              ? 'linear-gradient(90deg, var(--primary) 0%, var(--accent-success) 100%)'
              : 'var(--primary)',
            height: '7px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000
          }}
        />
      )}

      {/* PORTFOLIO NAME */}
      <motion.div
        className="Portfolio-name"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.div
          className="logo-container"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <BiCodeAlt className="logo-icon" />
        </motion.div>
        <div className="portfolio-text">
          <h2 className="Portfolio-h2">Portfolio</h2>
          <span className="portfolio-subtitle">Software Developer</span>
        </div>
        <h2 className="Portfolio-h2" id="mobile-device-only">
          OSCAR POCO
        </h2>
      </motion.div>


      {/* ACTIVE SECTION INDICATOR - Desktop Only */}
      <motion.div
        className="active-section-indicator"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}        
      >
        <span className="current-section-label">Currently viewing:</span>
        <motion.span
          className="current-section-name"
          key={activeItem}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeItem}
        </motion.span>
      </motion.div>

      <span className="current-section-label label-tab" style={{ color: "green", fontSize: "16px", marginTop: "4px", fontWeight: "200" }}>
        153 designs in one portfolio
      </span>
      

      {/* PORTFOLIO USER — whole block opens one-page portfolio (desktop) */}
      <div className="Portfolio-user">
        <motion.div
          className={`portfolio-onepage-cta ${isDesktop ? "portfolio-onepage-cta--active" : ""}`}
          onClick={isDesktop ? onOpen : undefined}
          onKeyDown={(e) => {
            if (!isDesktop || !onOpen) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen();
            }
          }}
          role={isDesktop ? "button" : undefined}
          tabIndex={isDesktop ? 0 : undefined}
          aria-label="Open one-page portfolio view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="user-info">
         
            <div className="portfolio-cta-bubble">
              <span className="portfolio-cta-dot" aria-hidden />
              <MdTouchApp className="portfolio-cta-icon" aria-hidden />
              <p className="portfolio-cta-label">
                CLICK TO VIEW 1-PAGE PORTFOLIO
              </p>
            </div>
          </div>

          <motion.div
            className="abbreviation"
            whileHover={isDesktop ? { scale: 1.05 } : undefined}
            whileTap={isDesktop ? { scale: 0.95 } : undefined}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="nav-avatar">
              <img src={oscar} alt="Oscar Poco" className="nav-image" />
            </div>
            <div className="avatar-ring"></div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="nav-settings-btn"
          onClick={onOpenSettings}
          aria-label="Open portfolio settings"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
        >
          <MdSettings className="nav-settings-icon" size={20} />
        </motion.button>

        <motion.div
          className="Dark-Mode"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <motion.div
            key={darkMode ? "light" : "dark"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="Dark-Mode-1"
          >
            {darkMode ? (
              <MdLightMode className="mode-icon" size={20} />
            ) : (
              <MdDarkMode className="mode-icon" size={20} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default NavigationBar;
