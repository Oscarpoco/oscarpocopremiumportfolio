import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import "../styles/Error404.css";

function Error404() {
  // Floating animation for stars
  const floatingStars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="error-page">
      {/* Animated background elements */}
      <div className="glow-bg glow-1"></div>
      <div className="glow-bg glow-2"></div>
      
      {/* Floating stars */}
      <div className="stars-container">
        {floatingStars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="error-card"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Decorative corner accents */}
        <div className="card-accent top-left"></div>
        <div className="card-accent top-right"></div>
        <div className="card-accent bottom-left"></div>
        <div className="card-accent bottom-right"></div>

        {/* Rocket icon */}
        <motion.div
          className="rocket-icon"
          initial={{ y: 0, rotate: 45 }}
          animate={{ 
            y: [-8, 8, -8],
            rotate: [42, 48, 42],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaRocket />
        </motion.div>

        {/* 404 TEXT with glitch effect */}
        <motion.h1
          className="error-code"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="glitch-text" data-text="404">404</span>
        </motion.h1>

        <motion.h2
          className="error-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Lost in Space
        </motion.h2>

        <motion.p
          className="error-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          The page you're looking for doesn't exist or has been moved to another galaxy.
        </motion.p>

        {/* Divider line */}
        <motion.div
          className="divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        {/* BUTTONS */}
        <motion.div
          className="button-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.history.pushState(null, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            <FaHome />
            <span>Take Me Home</span>
          </motion.button>

          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://oscar-oldsite.vercel.app/", "_blank")
            }
          >
            <FaExternalLinkAlt />
            <span>Old Site</span>
          </motion.button>
        </motion.div>

        {/* Help text */}
        <motion.p
          className="help-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Need help? Contact me at{" "}
          <a href="mailto:oscarkylepoco@gmail.com">oscarkylepoco@gmail.com</a>
        </motion.p>
      </motion.div>

      {/* Particle effect container */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Error404;