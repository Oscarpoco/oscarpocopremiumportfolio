import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// STYLING
import "../styles/About.css";
import "../styles/Experience.css";

// ICONS
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdLocationOn,
  MdCode,
  MdTrendingUp,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import DashboardScrollHint from "../../components/DashboardScrollHint";
import { useDashboardScrollHint } from "../../hooks/useDashboardScrollHint";
import { FaCalendarAlt } from "react-icons/fa";
import { BsArrowRight, BsBriefcase } from "react-icons/bs";

// DATABASE
import {
  experienceData,
  EXPERIENCE_CATEGORIES,
} from "../Database/ExperienceData";

const uniqueTechCount = new Set(
  experienceData.flatMap((entry) => entry.technologies)
).size;

const currentRolesCount = experienceData.filter((entry) =>
  entry.period.toLowerCase().includes("current")
).length;

const EXPERIENCE_STATS = [
  {
    value: String(experienceData.length),
    label: "Roles held",
    icon: BsBriefcase,
  },
  {
    value: "3+",
    label: "Years building",
    icon: FaCalendarAlt,
  },
  {
    value: String(uniqueTechCount),
    label: "Tools & skills",
    icon: MdCode,
  },
  {
    value: String(currentRolesCount),
    label: "Current roles",
    icon: MdTrendingUp,
  },
];

const currentRole = experienceData.find((entry) =>
  entry.period.toLowerCase().includes("current")
);

function ExperienceCard({ exp, index, isActive, onHover, registerRef }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = exp.period.toLowerCase().includes("current");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      y: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        registerRef?.(node);
      }}
      className={`experience-card-premium ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(exp.id);
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: 0,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="timeline-connector"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      />

      <motion.div
        className="timeline-dot-1"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: index * 0.2 + 0.3,
          type: "spring",
        }}
      >
        <motion.div
          className="dot-pulse"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 0, 0.5] : 0,
          }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      <motion.div
        className="card-accent-1"
        animate={{
          height: isHovered ? "100%" : "100%",
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="experience-icon"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {exp.icon}
      </motion.div>

      <div className="experience-content">
        <div className="experience-title-row">
          <motion.h3
            className="experience-position-1"
            animate={{
              color: isHovered ? "var(--primary)" : "var(--text-primary)",
            }}
          >
            {exp.position}
          </motion.h3>
          {isCurrent && (
            <span className="experience-current-badge">Current</span>
          )}
        </div>

        <span className="experience-company">{exp.company}</span>

        <div className="experience-meta">
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{exp.period}</span>
          </div>
          <div className="meta-item">
            <MdLocationOn className="meta-icon" />
            <span>{exp.location}</span>
          </div>
        </div>

        <motion.p
          className="experience-description"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {exp.description}
        </motion.p>

        {exp.technologies.length > 0 && (
          <div className="experience-technologies">
            {exp.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="tech-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + techIndex * 0.05 + 0.4 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <motion.div
        className="view-details"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
      >
        <BsArrowRight />
      </motion.div>
    </motion.div>
  );
}

function Experience({ darkMode, toggleTheme, handleDownload }) {
  const [activeRoleId, setActiveRoleId] = useState(experienceData[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState("all");
  const cardRefs = useRef({});
  const { containerRef, showScrollHint } = useDashboardScrollHint();

  const categoryCounts = useMemo(() => {
    const counts = { all: experienceData.length };
    experienceData.forEach(({ category }) => {
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredExperience = useMemo(() => {
    if (activeCategory === "all") return experienceData;
    return experienceData.filter((entry) => entry.category === activeCategory);
  }, [activeCategory]);

  const scrollToRole = (id) => {
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveRoleId(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`experience-container ${darkMode ? "dark-theme" : ""}`}
    >
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </motion.button>

      <div className="about-header">
        <motion.div
          className="header-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Work Experience</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Experience</span>
          </div>
        </motion.div>

        <motion.div
          className="header-actions"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            type="button"
            className="action-button download-btn primary"
            onClick={handleDownload}
            whileHover={{ scale: 1.02, x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <MdDownload className="action-icon" />
            <span className="mobileSideBar button-action">Download CV</span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="section-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="section-title">
          <span className="title-accent" />
          Professional Work Experience
        </h2>
        <p className="section-subtitle">
          A track record of hands-on experience in building, maintaining, and
          improving real-world applications, collaborating with teams, and
          delivering practical solutions.
        </p>
      </motion.div>

      <motion.div
        className="experience-stats"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {EXPERIENCE_STATS.map(({ value, label, icon: Icon }) => (
          <div key={label} className="stats-card">
            <span className="stats-icon">
              <Icon aria-hidden />
            </span>
            <div className="stats-info">
              <span className="stats-value">{value}</span>
              <span className="stats-label">{label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {currentRole && (
        <motion.div
          className="experience-highlight-strip"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
        >
          <BsBriefcase aria-hidden />
          <span>
            <strong>Currently:</strong> {currentRole.position} at{" "}
            {currentRole.company}
          </span>
        </motion.div>
      )}

      <motion.div
        className="experience-filter-bar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.45 }}
      >
        {EXPERIENCE_CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`experience-filter-chip ${
              activeCategory === id ? "experience-filter-chip--active" : ""
            }`}
            onClick={() => setActiveCategory(id)}
          >
            {label}
            <span className="experience-filter-count">
              {categoryCounts[id] ?? 0}
            </span>
          </button>
        ))}
      </motion.div>

      {filteredExperience.length > 1 && (
        <motion.nav
          className="experience-jump-nav"
          aria-label="Jump to role"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
        >
          {filteredExperience.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`experience-jump-btn ${
                activeRoleId === entry.id ? "experience-jump-btn--active" : ""
              }`}
              onClick={() => scrollToRole(entry.id)}
            >
              {entry.company}
            </button>
          ))}
        </motion.nav>
      )}

      <div className="experience-timeline">
        <AnimatePresence mode="popLayout">
          {filteredExperience.length === 0 ? (
            <motion.p
              key="empty"
              className="experience-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No roles in this category yet.
            </motion.p>
          ) : (
            filteredExperience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                isActive={activeRoleId === exp.id}
                onHover={setActiveRoleId}
                registerRef={(node) => {
                  if (node) cardRefs.current[exp.id] = node;
                }}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <DashboardScrollHint show={showScrollHint} />
    </div>
  );
}

export default Experience;
