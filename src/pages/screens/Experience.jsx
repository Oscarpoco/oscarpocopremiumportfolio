import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// STYLING
import "../styles/Experience.css";

// ICONS
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdLocationOn,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// DATABASE
import { experienceData } from "../Database/ExperienceData";

// Animated Experience Card with scroll reveal
function ExperienceCard({ exp, index, isActive, onHover }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      ref={ref}
      className={`experience-card-premium ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(index);
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: 0,
        transition: { duration: 0.3 },
      }}
    >
      {/* Timeline connector */}
      <motion.div
        className="timeline-connector"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      />

      {/* Timeline dot */}
      <motion.div
        className="timeline-dot-1"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3, type: "spring" }}
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

      {/* Card accent */}
      <motion.div
        className="card-accent"
        animate={{
          height: isHovered ? "100%" : "100%",
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
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

      {/* Content */}
      <div className="experience-content">
        <motion.h3
          className="experience-position-1"
          animate={{
            color: isHovered ? "var(--primary)" : "var(--text-primary)",
          }}
        >
          {exp.position}
        </motion.h3>

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

        <div className="experience-technologies">
          {exp.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
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
      </div>

      {/* View Details Arrow */}
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
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);

  return (
    <div className={`experience-container ${darkMode ? "dark-theme" : ""}`}>
      {/* Floating Theme Toggle */}
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </motion.button>

      {/* HEADER SECTION */}
      <motion.div
        ref={headerRef}
        className="skills-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-left">
          <h1 className="page-title">Work Experience</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Experience</span>
          </div>
        </div>

        <motion.div
          className="header-actions"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            className="download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.02, x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <MdDownload className="btn-icon" />
            <span className="btn-text">Download CV</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* SECTION HEADER */}
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

      {/* EXPERIENCE TIMELINE */}
      <div className="experience-timeline">
        {experienceData &&
          experienceData.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              isActive={index === activeIndex}
              onHover={setActiveIndex}
            />
          ))}
      </div>
    </div>
  );
}

export default Experience;
