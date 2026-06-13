import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MdHome,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdEmail,
  MdDownload,
  MdDashboard,
  MdCode,
  MdWork,
  MdSchool,
  MdTravelExplore,
  MdLinkOff,
  MdSupportAgent,
  MdOutlineErrorOutline,
} from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { BsAward, BsCompass } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { TbRouteOff, TbMapSearch } from "react-icons/tb";
import {
  loadPreferences,
  savePreferences,
  applyPreferences,
} from "../../config/themePreferences";
import { getResumeUrl } from "../../config/siteUrl";
import "../styles/Error404.css";

const QUICK_LINKS = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Skills", path: "/skills", icon: MdCode },
  { label: "Experience", path: "/experience", icon: MdWork },
  { label: "Education", path: "/education", icon: MdSchool },
  { label: "Featured", path: "/featured", icon: AiFillStar },
  { label: "Testimonials", path: "/testimonials", icon: BsAward },
  { label: "Journey", path: "/journey", icon: GiPathDistance },
  { label: "Contact", path: "/contact", icon: BiSolidMessageDetail },
];

const STATUS_ITEMS = [
  {
    label: "Page missing",
    detail: "Resource not found",
    icon: MdOutlineErrorOutline,
  },
  {
    label: "Route offline",
    detail: "Invalid navigation path",
    icon: HiOutlineStatusOffline,
  },
  {
    label: "Safe exits",
    detail: "Portfolio sections ready",
    icon: TbMapSearch,
  },
];

const ORBIT_ICONS = [MdCode, MdWork, MdSchool, AiFillStar];

function navigateTo(path) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function Error404() {
  const reduceMotion = useReducedMotion();
  const [preferences, setPreferences] = useState(() => loadPreferences());
  const attemptedPath =
    typeof window !== "undefined" ? window.location.pathname : "/unknown";

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: ((i * 37) % 97) + 1,
        y: ((i * 53) % 93) + 3,
        delay: (i % 5) * 0.35,
        duration: 2.8 + (i % 4) * 0.6,
      })),
    []
  );

  useEffect(() => {
    applyPreferences(preferences);
  }, [preferences]);

  const toggleTheme = () => {
    setPreferences((prev) => {
      const next = { ...prev, darkMode: !prev.darkMode };
      savePreferences(next);
      return next;
    });
  };

  const motionTransition = (delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : {
          type: "spring",
          stiffness: 120,
          damping: 18,
          delay,
        };

  return (
    <div
      className={`error-page ${preferences.darkMode ? "dark-theme" : ""}`}
      data-theme-palette={preferences.palette}
    >
      <div className="error-grid-bg" aria-hidden />
      <div className="error-glow error-glow--one" aria-hidden />
      <div className="error-glow error-glow--two" aria-hidden />

      {!reduceMotion && (
        <div className="error-stars" aria-hidden>
          {stars.map((star) => (
            <motion.span
              key={star.id}
              className="error-star"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.15, 0.8] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="error-theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {preferences.darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>

      <motion.main
        className="error-shell"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition()}
      >
        <section className="error-hero">
          <motion.div
            className="error-badge"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(0.04)}
          >
            <span className="error-badge-icon" aria-hidden>
              <BsCompass />
            </span>
            <span>Navigation interrupted</span>
          </motion.div>

          <div className="error-code-wrap">
            {!reduceMotion && (
              <div className="error-orbit" aria-hidden>
                {ORBIT_ICONS.map((Icon, index) => (
                  <motion.span
                    key={index}
                    className={`error-orbit-icon error-orbit-icon--${index + 1}`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 14 + index * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.span
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 14 + index * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Icon className="error-orbit-glyph" />
                    </motion.span>
                  </motion.span>
                ))}
              </div>
            )}

            <motion.div
              className="error-code-icon"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={motionTransition(0.08)}
              aria-hidden
            >
              <MdTravelExplore />
            </motion.div>

            <motion.h1
              className="error-code"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.1)}
            >
              404
            </motion.h1>
          </div>

          <motion.div
            className="error-path-chip"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={motionTransition(0.18)}
          >
            <span className="error-path-head">
              <MdLinkOff aria-hidden />
              <span className="error-path-label">Requested route</span>
            </span>
            <code>{attemptedPath}</code>
          </motion.div>

          <motion.div
            className="error-status-strip"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(0.24)}
          >
            {STATUS_ITEMS.map(({ label, detail, icon: Icon }) => (
              <div key={label} className="error-status-item">
                <span className="error-status-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="error-status-copy">
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        <motion.section
          className="error-card"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(0.22)}
        >
          <div className="error-card-accent" aria-hidden />

          <div className="error-breadcrumb">
            <span className="error-breadcrumb-icon" aria-hidden>
              <MdDashboard />
            </span>
            <span>Portfolio</span>
            <IoIosArrowForward aria-hidden />
            <span className="error-breadcrumb-icon error-breadcrumb-icon--warn" aria-hidden>
              <TbRouteOff />
            </span>
            <span className="error-breadcrumb-current">Not found</span>
          </div>

          <div className="error-title-row">
            <span className="error-title-icon" aria-hidden>
              <TbMapSearch />
            </span>
            <h2 className="error-title">This page drifted off the map</h2>
          </div>

          <p className="error-desc">
            The URL you opened is not part of this portfolio. Pick a valid
            section below or head back to the dashboard.
          </p>

          <div className="error-links-header">
            <span className="error-links-icon" aria-hidden>
              <MdCode />
            </span>
            <span>Jump to a valid section</span>
          </div>

          <div className="error-links">
            {QUICK_LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.button
                  key={link.path}
                  type="button"
                  className="error-link-chip"
                  onClick={() => navigateTo(link.path)}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={motionTransition(0.28 + index * 0.03)}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <span className="error-link-chip-icon" aria-hidden>
                    <Icon className="error-nav-glyph" />
                  </span>
                  <span className="error-link-chip-label">{link.label}</span>
                  <IoIosArrowForward className="error-link-chip-arrow" aria-hidden />
                </motion.button>
              );
            })}
          </div>

          <div className="error-actions">
            <motion.button
              type="button"
              className="error-btn error-btn--primary"
              onClick={() => navigateTo("/")}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <MdHome aria-hidden />
              <span>Back to portfolio</span>
            </motion.button>

            <motion.button
              type="button"
              className="error-btn error-btn--secondary"
              onClick={() => navigateTo("/contact")}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <MdEmail aria-hidden />
              <span>Contact me</span>
            </motion.button>

            <motion.a
              href={getResumeUrl()}
              className="error-btn error-btn--ghost"
              download="oscarkylpoco.pdf"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <MdDownload aria-hidden />
              <span>Download CV</span>
            </motion.a>
          </div>

          <p className="error-help">
            <span className="error-help-icon" aria-hidden>
              <MdSupportAgent />
            </span>
            <span>
              Need help?{" "}
              <a href="mailto:oscarkylepoco@gmail.com">oscarkylepoco@gmail.com</a>
            </span>
          </p>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default Error404;
