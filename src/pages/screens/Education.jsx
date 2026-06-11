import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// STYLING
import "../styles/About.css";
import "../styles/Education.css";

// ICONS
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdAccessTime,
  MdLocationOn,
  MdVerified,
  MdSchool,
  MdCategory,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaAward, FaGraduationCap } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// DATABASE
import {
  educationData,
  certificateData,
  EDUCATION_FILTERS,
  CERTIFICATE_CATEGORIES,
} from "../Database/EducationProjects";

const totalCourses = educationData.reduce(
  (sum, entry) => sum + entry.courses.length,
  0
);

const uniqueIssuers = new Set(certificateData.map((cert) => cert.issuer)).size;

const EDUCATION_STATS = [
  {
    value: String(educationData.length),
    label: "Qualifications",
    icon: FaGraduationCap,
  },
  {
    value: String(certificateData.length),
    label: "Certifications",
    icon: FaAward,
  },
  {
    value: String(totalCourses),
    label: "Key courses",
    icon: MdSchool,
  },
  {
    value: String(uniqueIssuers),
    label: "Issuing bodies",
    icon: MdCategory,
  },
];

const currentQualification = educationData.find(
  (entry) => entry.status === "in-progress"
);

function EducationCard({ edu, index, isActive, onHover }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const isInProgress = edu.status === "in-progress";

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
        onHover(edu.id);
      }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="edu-card-accent"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
      />

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

      <div className="edu-card-content">
        <div className="edu-card-header">
          <div className="edu-title-row">
            <motion.h3
              className="edu-degree"
              animate={{
                color: isHovered ? "var(--primary)" : "var(--text-primary)",
              }}
            >
              {edu.degree}
            </motion.h3>
            {isInProgress && (
              <span className="education-status-badge">In progress</span>
            )}
          </div>
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
            {edu.courses.map((course) => (
              <motion.span
                key={course}
                className="course-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        scale: 1.02,
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
            transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
          >
            <MdVerified />
            <span>Verified</span>
          </motion.div>
        </div>
      </div>

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
  const [activeEduId, setActiveEduId] = useState(educationData[0]?.id ?? null);
  const [eduFilter, setEduFilter] = useState("all");
  const [certCategory, setCertCategory] = useState("all");

  const eduFilterCounts = useMemo(() => {
    const counts = { all: educationData.length };
    educationData.forEach(({ status }) => {
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  }, []);

  const certCategoryCounts = useMemo(() => {
    const counts = { all: certificateData.length };
    certificateData.forEach(({ category }) => {
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredEducation = useMemo(() => {
    if (eduFilter === "all") return educationData;
    return educationData.filter((entry) => entry.status === eduFilter);
  }, [eduFilter]);

  const filteredCertificates = useMemo(() => {
    if (certCategory === "all") return certificateData;
    return certificateData.filter((cert) => cert.category === certCategory);
  }, [certCategory]);

  return (
    <div className={`education-container ${darkMode ? "dark-theme" : ""}`}>
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
          <h1>Education</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Education</span>
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
          Education & Qualifications
        </h2>
        <p className="section-subtitle">
          Academic background and formal education that built my foundation in
          technology and problem-solving.
        </p>
      </motion.div>

      <motion.div
        className="education-stats"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {EDUCATION_STATS.map(({ value, label, icon: Icon }) => (
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

      {currentQualification && (
        <motion.div
          className="education-highlight-strip"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
        >
          <FaGraduationCap aria-hidden />
          <span>
            <strong>Studying now:</strong> {currentQualification.degree} at{" "}
            {currentQualification.institution}
          </span>
        </motion.div>
      )}

      <motion.div
        className="education-filter-bar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.45 }}
      >
        {EDUCATION_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`education-filter-chip ${
              eduFilter === id ? "education-filter-chip--active" : ""
            }`}
            onClick={() => setEduFilter(id)}
          >
            {label}
            <span className="education-filter-count">
              {eduFilterCounts[id] ?? 0}
            </span>
          </button>
        ))}
      </motion.div>

      <div className="education-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredEducation.length === 0 ? (
            <motion.p
              key="edu-empty"
              className="education-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No qualifications in this category.
            </motion.p>
          ) : (
            filteredEducation.map((edu, index) => (
              <EducationCard
                key={edu.id}
                edu={edu}
                index={index}
                isActive={activeEduId === edu.id}
                onHover={setActiveEduId}
              />
            ))
          )}
        </AnimatePresence>
      </div>

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
          Industry-recognized certifications validating my technical expertise
          across development, cloud, and security.
        </p>
      </motion.div>

      <motion.div
        className="education-filter-bar cert-filter-bar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.45 }}
      >
        {CERTIFICATE_CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`education-filter-chip ${
              certCategory === id ? "education-filter-chip--active" : ""
            }`}
            onClick={() => setCertCategory(id)}
          >
            {label}
            <span className="education-filter-count">
              {certCategoryCounts[id] ?? 0}
            </span>
          </button>
        ))}
      </motion.div>

      <div className="certificates-grid-premium">
        <AnimatePresence mode="popLayout">
          {filteredCertificates.length === 0 ? (
            <motion.p
              key="cert-empty"
              className="education-empty education-empty--wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No certificates in this category.
            </motion.p>
          ) : (
            filteredCertificates.map((cert, index) => (
              <CertificateCard key={cert.id} cert={cert} index={index} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Education;
