import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaFilter,
} from "react-icons/fa";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdCalendarToday,
  MdCode,
  MdRocketLaunch,
  MdCheck,
  MdClose,
  MdDownload,
} from "react-icons/md";
import { BsListUl, BsGrid3X3Gap } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

// PROJECT DATA
import { projects } from "../Database/Projects";

// STYLES
import "../styles/About.css";
import "../styles/Featured.css";

const AUTOPLAY_MS = 6000;

const allProjects = [
  ...(projects.featured || []),
  ...(projects.current || []),
  ...(projects.completed || []),
];

const spotlightProject =
  projects.current?.[0] || projects.featured?.[0] || null;

const PROJECT_STATS = [
  {
    value: String(projects.featured?.length || 0),
    label: "Featured",
    icon: FaStar,
    className: "featured-icon",
  },
  {
    value: String(projects.current?.length || 0),
    label: "In progress",
    icon: MdRocketLaunch,
    className: "progress-icon",
  },
  {
    value: String(projects.completed?.length || 0),
    label: "Completed",
    icon: MdCheck,
    className: "completed-icon",
  },
  {
    value: String(
      new Set(allProjects.flatMap((project) => project.technologies)).size
    ),
    label: "Technologies",
    icon: MdCode,
    className: "tech-icon",
  },
];

function getProjectsForTab(tabId) {
  switch (tabId) {
    case "featured":
      return projects.featured || [];
    case "current":
      return projects.current || [];
    case "completed":
      return projects.completed || [];
    default:
      return projects.featured || [];
  }
}

function filterByTech(projectList, selectedTech) {
  if (selectedTech.length === 0) return projectList;
  return projectList.filter((project) =>
    project.technologies.some((tech) => selectedTech.includes(tech))
  );
}

function Featured({ darkMode, toggleTheme, handleDownload }) {
  const [activeTab, setActiveTab] = useState("featured");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const allTechnologies = useMemo(
    () =>
      Array.from(
        new Set(allProjects.flatMap((project) => project.technologies))
      ).sort(),
    []
  );

  const currentProjects = useMemo(
    () => filterByTech(getProjectsForTab(activeTab), selectedTech),
    [activeTab, selectedTech]
  );

  const tabCounts = useMemo(
    () => ({
      featured: filterByTech(projects.featured || [], selectedTech).length,
      current: filterByTech(projects.current || [], selectedTech).length,
      completed: filterByTech(projects.completed || [], selectedTech).length,
    }),
    [selectedTech]
  );

  useEffect(() => {
    if (
      !isAutoPlaying ||
      viewMode !== "carousel" ||
      currentProjects.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentProjects.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode, currentProjects.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab, selectedTech]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + currentProjects.length) % currentProjects.length
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % currentProjects.length);
  };

  const toggleTech = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedTech([]);
  };

  const tabs = [
    { id: "featured", label: "Featured", icon: <FaStar /> },
    { id: "current", label: "In Progress", icon: <MdRocketLaunch /> },
    { id: "completed", label: "Completed", icon: <MdCheck /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className={`featured-container ${darkMode ? "dark-theme" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </motion.button>

      <motion.div
        className="about-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="header-left">
          <h1>Featured</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Featured</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="view-toggle">
            <motion.button
              type="button"
              className={`view-btn ${viewMode === "carousel" ? "active" : ""}`}
              onClick={() => setViewMode("carousel")}
              aria-label="Carousel view"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsListUl />
            </motion.button>
            <motion.button
              type="button"
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsGrid3X3Gap />
            </motion.button>
          </div>

          <motion.button
            type="button"
            className={`filter-btn ${filterOpen ? "active" : ""}`}
            onClick={() => setFilterOpen(!filterOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter />
            <span>Filter</span>
            {selectedTech.length > 0 && (
              <span className="filter-count">{selectedTech.length}</span>
            )}
          </motion.button>

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
        </div>
      </motion.div>

      <motion.div
        className="section-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h2 className="section-title">
          <span className="title-accent" />
          Featured Projects
        </h2>
        <p className="section-subtitle">
          Mobile and web products I have built, shipped, or am actively developing
          — from career platforms to on-demand service apps.
        </p>
      </motion.div>

      <motion.div
        className="featured-stats"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
      >
        {PROJECT_STATS.map(({ value, label, icon: Icon, className }) => (
          <div key={label} className="stats-card">
            <span className={`stats-icon ${className}`}>
              <Icon aria-hidden />
            </span>
            <div className="stats-info">
              <span className="stats-value">{value}</span>
              <span className="stats-label">{label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {spotlightProject && (
        <motion.div
          className="featured-highlight-strip"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <MdRocketLaunch aria-hidden />
          <span>
            <strong>Building now:</strong> {spotlightProject.title}
            {spotlightProject.completionDate
              ? ` · ${spotlightProject.completionDate}`
              : ""}
          </span>
        </motion.div>
      )}

      <AnimatePresence>
        {filterOpen && (
          <motion.div
            className="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-header">
              <h3>
                Filter by technology
                {selectedTech.length > 0 && (
                  <span className="filter-active-note">
                    · {currentProjects.length} match
                    {currentProjects.length === 1 ? "" : "es"}
                  </span>
                )}
              </h3>
              {selectedTech.length > 0 && (
                <motion.button
                  type="button"
                  className="clear-filters"
                  onClick={clearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdClose /> Clear all
                </motion.button>
              )}
            </div>
            <div className="filter-chips">
              {allTechnologies.map((tech, index) => (
                <motion.button
                  key={tech}
                  type="button"
                  className={`tech-chip ${selectedTech.includes(tech) ? "selected" : ""}`}
                  onClick={() => toggleTech(tech)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                  {selectedTech.includes(tech) && (
                    <MdCheck className="check-icon" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="project-tabs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            type="button"
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            <span className="tab-count">{tabCounts[tab.id]}</span>
          </motion.button>
        ))}
      </motion.div>

      {currentProjects.length === 0 && (
        <motion.div
          className="no-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MdCode className="no-results-icon" />
          <h3>No projects found</h3>
          <p>Try adjusting your filters or switch to a different tab.</p>
          <motion.button
            type="button"
            className="clear-btn"
            onClick={clearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear filters
          </motion.button>
        </motion.div>
      )}

      {viewMode === "carousel" && currentProjects.length > 0 && (
        <div className="project-showcase">
          <div className="project-carousel">
            <motion.button
              type="button"
              className="nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous project"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentProjects.length <= 1}
            >
              <FaChevronLeft />
            </motion.button>

            <div className="carousel-window">
              <AnimatePresence mode="wait" custom={1}>
                <motion.div
                  key={currentProjects[currentIndex]?.id ?? currentIndex}
                  className="project-card"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={1}
                >
                  {currentProjects[currentIndex] && (
                    <ProjectCardLarge project={currentProjects[currentIndex]} />
                  )}
                </motion.div>
              </AnimatePresence>

              {isAutoPlaying && currentProjects.length > 1 && (
                <motion.div
                  className="progress-bar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                  key={`progress-${currentProjects[currentIndex]?.id}-${currentIndex}`}
                />
              )}
            </div>

            <motion.button
              type="button"
              className="nav-btn next"
              onClick={handleNext}
              aria-label="Next project"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentProjects.length <= 1}
            >
              <FaChevronRight />
            </motion.button>
          </div>

          <div className="carousel-indicators">
            {currentProjects.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                className={`indicator ${index === currentIndex ? "active" : ""}`}
                aria-label={`Go to ${project.title}`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}

      {viewMode === "grid" && currentProjects.length > 0 && (
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants} custom={index}>
              <ProjectCardGrid project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function ProjectCardLarge({ project }) {
  return (
    <motion.div
      className="project-card-large"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-image-section">
        <motion.img
          src={project.image}
          alt={project.title}
          className="project-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="image-overlay">
          {project.featured && (
            <motion.span
              className="featured-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaStar /> Featured
            </motion.span>
          )}
        </div>
      </div>

      <div className="card-content-section">
        <div className="card-header">
          <motion.h2
            className="project-title"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h2>
          <div className="project-meta">
            <span className={`status-badge ${project.status}`}>
              {project.status === "completed" ? (
                <MdCheck />
              ) : (
                <MdRocketLaunch />
              )}
              {project.status === "completed" ? "Completed" : "In Progress"}
            </span>
            <span className="date-badge">
              <MdCalendarToday />
              {project.completionDate}
            </span>
          </div>
        </div>

        <motion.p
          className="project-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="tech-stack"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {project.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="card-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {project.github ? (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn github-btn"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> View Code
            </motion.a>
          ) : (
            <span className="action-btn action-btn--disabled">
              <FaGithub /> Code coming soon
            </span>
          )}
          {project.liveLink ? (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn live-btn"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
          ) : (
            <span className="action-btn action-btn--disabled live-btn--muted">
              <FaExternalLinkAlt /> Demo coming soon
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectCardGrid({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card-grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid-image-container">
        <motion.img
          src={project.image}
          alt={project.title}
          className="grid-image"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="grid-overlay"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay-btn"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub />
            </motion.a>
          )}

          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay-btn"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <FaExternalLinkAlt />
            </motion.a>
          )}
        </motion.div>
        {project.featured && (
          <span className="grid-featured-badge">
            <FaStar />
          </span>
        )}
      </div>

      <div className="grid-content">
        <h3 className="grid-title">{project.title}</h3>
        <p className="grid-description">{project.description}</p>
        <div className="grid-tech">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="grid-tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="grid-tech-more">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="grid-footer">
          <span className={`grid-status ${project.status}`}>
            {project.status === "completed" ? "Completed" : "In Progress"}
          </span>
          <span className="grid-date">{project.completionDate}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Featured;
