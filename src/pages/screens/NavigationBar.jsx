import React from "react";
import {  motion } from "framer-motion";
import "../styles/NavigationBar.css";

// ICONS
import { FaBriefcase } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// IMAGE
import oscar from "./../../assets/avatar4.jfif";
import { BiCodeAlt } from "react-icons/bi";

function NavigationBar({ onOpen, darkMode, toggleTheme, activeItem }) {
  return (
    <motion.nav
      className={`Parent-nav ${darkMode ? "dark-mode" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
          <span className="portfolio-subtitle">React Developer</span>
        </div>
        <h2 className="Portfolio-h2" id="mobile-device-only">
          OSCAR
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
      <motion.div
        className="active-section-indicator"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{ backgroundColor: "aquamarine", cursor: "pointer" }}
        onClick={() => window.open("https://oscar-oldsite.vercel.app/", "_blank")}
      >
        <span className="current-section-label" style={{ color: "black" }}>
          CLICK HERE TO VIEW THE OLD SITE
        </span>
      </motion.div>

      {/* PORTFOLIO USER */}
      <div className="Portfolio-user">
        {/* USER INFO */}
        <motion.div
          className="user-info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="name">Oscar Poco</p>
          <div className="status-wrapper">
            <span className="status-dot"></span>
            <p className="role">Available for work</p>
          </div>
        </motion.div>

        <motion.div
          className="abbreviation"
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="nav-avatar">
            <img src={oscar} alt="Oscar Poco" className="nav-image" />
          </div>
          <div className="avatar-ring"></div>
        </motion.div>

        {/* DARK MODE TOGGLE */}
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
