import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useAnimation, AnimatePresence, useReducedMotion } from "framer-motion";

// STYLING
import "../styles/About.css";
import "../styles/Skills.css";

// ICONS
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdCode,
  MdCloud,
  MdHub,
  MdSecurity,
  MdShield,
  MdCategory,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";

// DATABASE
import { skillsData, SKILL_CATEGORIES } from "../Database/SkillsData";

const LEARNING_NOW = [
  { label: "Cloud", icon: MdCloud },
  { label: "Networking", icon: MdHub },
  { label: "Pentest", icon: MdSecurity },
  { label: "Cybersecurity", icon: MdShield },
];

const SKILL_STATS = [
  {
    value: String(skillsData.length),
    label: "Core competencies",
    icon: MdCode,
  },
  {
    value: String(
      new Set(skillsData.map((skill) => skill.category)).size
    ),
    label: "Skill domains",
    icon: MdCategory,
  },
  {
    value: "3+",
    label: "Years in production",
    icon: FaStar,
  },
  {
    value: String(LEARNING_NOW.length),
    label: "Areas leveling up",
    icon: BsLightningChargeFill,
  },
];

function AnimatedSkillCard({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.2 },
    },
  };

  const categoryLabel =
    SKILL_CATEGORIES.find((item) => item.id === skill.category)?.label ||
    skill.category;

  return (
    <motion.div
      layout
      ref={ref}
      className={`skill-card-premium ${isHovered ? "hovered" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="accent-line"
        initial={{ height: "30px" }}
        animate={{ height: isHovered ? "60px" : "30px" }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="card-glow"
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="skill-card-content">
        <span className="skill-category-pill">{categoryLabel}</span>

        <motion.div
          className="skill-icon-wrapper"
          animate={{
            rotate: isHovered ? 10 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.icon}
        </motion.div>
        <h3 className="skill-title">{skill.title}</h3>

        <div className="skill-info">
          <p className="skill-description">{skill.description}</p>
        </div>

        <motion.a
          href={skill.link}
          className="skill-link"
          target="_blank"
          rel="noopener noreferrer"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>Learn more</span>
          <FaArrowRight className="arrow-icon" />
        </motion.a>
      </div>
    </motion.div>
  );
}

function Skills({ darkMode, toggleTheme, handleDownload }) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts = { all: skillsData.length };
    skillsData.forEach((skill) => {
      counts[skill.category] = (counts[skill.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skillsData;
    return skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className={`skills-container ${darkMode ? "dark-theme" : ""}`}>
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
          <h1>Technical Skills</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Skills</span>
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
          Professional Skillset
        </h2>
        <p className="section-subtitle">
          A comprehensive toolkit of technologies and frameworks I use to build
          modern, scalable applications.
        </p>
      </motion.div>

      <motion.div
        className="skills-stats"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {SKILL_STATS.map(({ value, label, icon: Icon }) => (
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

      <motion.div
        className="skills-learning-strip"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45 }}
      >
        <div className="skills-learning-copy">
          <BsLightningChargeFill aria-hidden />
          <span>
            <strong>Leveling up now:</strong> cloud, networking, pentest &amp;
            security fundamentals
          </span>
        </div>
        <div className="skills-learning-tags">
          {LEARNING_NOW.map(({ label, icon: Icon }) => (
            <span key={label} className="skills-learning-tag">
              <Icon aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="skills-filter-bar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.45 }}
      >
        {SKILL_CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`skills-filter-chip ${
              activeCategory === id ? "skills-filter-chip--active" : ""
            }`}
            onClick={() => setActiveCategory(id)}
          >
            {label}
            <span className="skills-filter-count">
              {categoryCounts[id] || 0}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.div className="skills-grid" layout={!reduceMotion}>
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <AnimatedSkillCard
              key={skill.id}
              skill={skill}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSkills.length === 0 && (
        <p className="skills-empty-state">No skills in this category yet.</p>
      )}
    </div>
  );
}

export default Skills;
