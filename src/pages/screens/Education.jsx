import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// STYLING
import "../styles/Education.css";

// ICONS
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdAccessTime,
  MdLocationOn,
  MdVerified,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaAward, FaCertificate } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// DATABASE
import { educationData, certificateData } from "../Database/EducationProjects";

// Animated Education Card
function EducationCard({ edu, index, isActive, onHover }) {
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
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`education-card-premium ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(index);
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 },
      }}
    >
      {/* Card accent */}
      <motion.div
        className="edu-card-accent"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
      />

      {/* Icon */}
      <motion.div
        className="edu-card-icon"
        animate={{
          rotate: isHovered ? 10 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {edu.icon}
      </motion.div>

      {/* Content */}
      <div className="edu-card-content">
        <div className="edu-card-header">
          <motion.h3
            className="edu-degree"
            animate={{
              color: isHovered ? "var(--primary)" : "var(--text-primary)",
            }}
          >
            {edu.degree}
          </motion.h3>
          <span className="edu-institution">{edu.institution}</span>
        </div>

        <div className="edu-meta">
          <div className="edu-meta-item">
            <MdAccessTime className="edu-meta-icon" />
            <span>{edu.period}</span>
          </div>
          <div className="edu-meta-item">
            <MdLocationOn className="edu-meta-icon" />
            <span>{edu.location}</span>
          </div>
        </div>

        <p className="edu-description">{edu.description}</p>

        <div className="edu-courses">
          <h4 className="courses-heading">Key Courses</h4>
          <div className="courses-tags">
            {edu.courses.map((course, i) => (
              <motion.span
                key={i}
                className="course-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      <motion.div
        className="edu-arrow"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
      >
        <BsArrowRight />
      </motion.div>
    </motion.div>
  );
}

// Animated Certificate Card
function CertificateCard({ cert, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`cert-card-premium ${isHovered ? "hovered" : ""}`}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="cert-icon-wrapper"
        style={{
          background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`,
          color: cert.color,
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {cert.icon}
      </motion.div>

      <div className="cert-content">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        <div className="cert-footer">
          <span className="cert-date">{cert.date}</span>
          <motion.div
            className="verified-badge"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
          >
            <MdVerified />
            <span>Verified</span>
          </motion.div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="cert-glow"
        style={{ background: cert.color }}
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.5 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function Education({ darkMode, toggleTheme, handleDownload }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);

  return (
    <div className={`education-container ${darkMode ? "dark-theme" : ""}`}>
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
          <h1 className="page-title">Certifications</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Certificates</span>
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
      {/* EDUCATION SECTION */}
      <motion.div
        className="section-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="section-title">
          <span className="title-accent" />
          Education & Qualifications
        </h2>
        <p className="section-subtitle">
          Academic background and formal education that built my foundation.
        </p>
      </motion.div>

      <div className="education-cards-grid">
        {educationData &&
          educationData.map((edu, index) => (
            <EducationCard
              key={edu.id}
              edu={edu}
              index={index}
              isActive={index === activeIndex}
              onHover={setActiveIndex}
            />
          ))}
      </div>

      {/* CERTIFICATES SECTION */}
      <motion.div
        className="section-intro certificates-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="section-title">
          <span className="title-accent" />
          Professional Certifications
        </h2>
        <p className="section-subtitle">
          Industry-recognized certifications validating my technical expertise.
        </p>
      </motion.div>

      <div className="certificates-grid-premium">
        {certificateData &&
          certificateData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
      </div>
    </div>
  );
}

export default Education;
