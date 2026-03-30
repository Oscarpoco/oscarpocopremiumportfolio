import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaCode } from "react-icons/fa";
import "./IntroAnimation.css";

/* ── Easing curves ── */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1];
const EASE_IN_EXPO = [0.95, 0.05, 0.795, 0.035];

/* ── Particle field ── */
const PARTICLE_COUNT = 40;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  dur: 3 + Math.random() * 5,
  delay: Math.random() * 4,
  size: Math.random() > 0.7 ? 3 : 2,
}));

/* ── Scanline animation ── */
function Scanline({ active }) {
  return (
    <motion.div
      className="intro-scanline"
      initial={{ top: "-2px", opacity: 0 }}
      animate={
        active
          ? {
              top: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }
          : { opacity: 0 }
      }
      transition={{ duration: 1.8, ease: "linear", times: [0, 0.05, 0.95, 1] }}
    />
  );
}

/* ── HUD corners ── */
function HUDFrame({ visible }) {
  const corners = ["tl", "tr", "bl", "br"];
  return (
    <AnimatePresence>
      {visible &&
        corners.map((pos, i) => (
          <motion.div
            key={pos}
            className={`intro-corner intro-corner--${pos}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: EASE_OUT_EXPO }}
          />
        ))}
    </AnimatePresence>
  );
}

/* ── HUD labels ── */
function HUDLabels({ visible, phase }) {
  const labels = [
    { pos: "tl", lines: ["PORTFOLIO", "V 2.0 — 2024"] },
    { pos: "tr", lines: ["OSCAR KYLE POCO", "REACT DEV"] },
    {
      pos: "bl",
      lines: [
        "INIT",
        phase === "expand"
          ? "RENDERING"
          : phase === "complete"
            ? "COMPLETE"
            : "LOADING",
      ],
    },
    { pos: "br", lines: ["DESIGNS", "23 TOTAL"] },
  ];
  return (
    <AnimatePresence>
      {visible &&
        labels.map(({ pos, lines }, i) => (
          <motion.div
            key={pos}
            className={`intro-hud intro-hud--${pos}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
          >
            {lines.map((l, j) => (
              <div key={j}>{l}</div>
            ))}
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

/* ── Main component ── */
function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState("initial");
  const [scanActive, setScanActive] = useState(false);

  useEffect(() => {
    // initial → expand
    const t1 = setTimeout(() => {
      setScanActive(true);
      setTimeout(() => setPhase("expand"), 300);
    }, 2000);

    // expand → complete
    const t2 = setTimeout(() => setPhase("complete"), 3600);

    // exit
    const t3 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isExpanded = phase === "expand" || phase === "complete";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: EASE_IN_EXPO }}
        >
          {/* Grid */}
          <motion.div
            className="intro-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          {/* Vignette */}
          <div className="intro-vignette" />

          {/* Ambient light */}
          <motion.div
            className="intro-ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 0.4 : 1 }}
            transition={{ duration: 1 }}
          />

          {/* HUD chrome */}
          <HUDFrame visible={!isExpanded} />
          <HUDLabels visible={!isExpanded} phase={phase} />

          {/* Scan line */}
          <Scanline active={scanActive} />

          {/* Particles */}
          <div className="intro-particles">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="intro-particle"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  phase === "expand"
                    ? {
                        y: [0, -(200 + Math.random() * 300)],
                        x: [
                          (Math.random() - 0.5) * 60,
                          (Math.random() - 0.5) * 400,
                        ],
                        opacity: [0, 0.9, 0],
                        scale: [0, 1.5, 0],
                      }
                    : {
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                      }
                }
                transition={{
                  duration: phase === "expand" ? 1.4 : p.dur,
                  delay: phase === "expand" ? Math.random() * 0.5 : p.delay,
                  repeat: phase === "expand" ? 0 : Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* ─────────────── PHASE: initial ─────────────── */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                className="intro-content"
                key="intro-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                {/* Logo mark */}
                <motion.div
                  className="intro-logo-wrapper"
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE_OUT_EXPO,
                    delay: 0.1,
                  }}
                >
                  <div className="intro-logo-ring" />
                  <div className="intro-logo-box">
                    <FaCode className="intro-logo-icon" />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="intro-name"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  Oscar Kyle <span>Poco</span>
                </motion.h1>

                {/* Divider */}
                <motion.div
                  className="intro-divider"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: 0.75,
                    duration: 0.5,
                    ease: EASE_OUT_EXPO,
                  }}
                />

                {/* Title row */}
                <motion.div
                  className="intro-title-row"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="intro-title-dot" />
                  <span className="intro-title-text">React Developer</span>
                  <motion.span
                    className="intro-cursor"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    _
                  </motion.span>
                  <div className="intro-title-dot" />
                </motion.div>

                {/* Progress */}
                <motion.div
                  className="intro-progress-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <div className="intro-progress-header">
                    <span className="intro-progress-label">Initialising</span>
                    <span className="intro-progress-label">Loading assets</span>
                  </div>
                  <div className="intro-progress-track">
                    <motion.div
                      className="intro-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 1.1,
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="intro-tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  Building exceptional digital experiences
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─────────────── PHASE: expand ─────────────── */}
          <AnimatePresence>
            {phase === "expand" && (
              <motion.div
                className="intro-reveal"
                key="reveal-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Flash burst */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(41,98,255,0.08)",
                    pointerEvents: "none",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="reveal-eyebrow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  Curated Works
                </motion.div>

                <motion.div
                  className="reveal-number"
                  initial={{ opacity: 0, scale: 0.7, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.7,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  53
                </motion.div>

                <motion.div
                  className="reveal-label"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55,
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  Designs in one portfolio
                </motion.div>

                <motion.div
                  className="reveal-rule"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                  }}
                />

                <motion.div
                  className="reveal-sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                >
                  React · UI/UX · Full-Stack
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─────────────── Expanding ring on transition ─────────────── */}
          <AnimatePresence>
            {phase === "expand" && (
              <motion.div
                key="ring-burst"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "1px solid rgba(41,98,255,0.7)",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 15,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 20, opacity: 0 }}
                transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroAnimation;
