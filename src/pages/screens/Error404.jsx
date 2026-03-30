import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/Error404.css";

function Error404() {
  return (
    <div className="error-page">
      <div className="glow-bg"></div>

      <motion.div
        className="error-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 TEXT */}
        <motion.h1
          className="error-code"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          404
        </motion.h1>

        <h2 className="error-title">Lost in Space 🚀</h2>
        <p className="error-desc">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTONS */}
        <div className="button-group">
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.history.pushState(null, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            <FaHome /> Home
          </motion.button>

          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://oscar-oldsite.vercel.app/", "_blank")
            }
          >
            <FaExternalLinkAlt /> Old Site
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Error404;