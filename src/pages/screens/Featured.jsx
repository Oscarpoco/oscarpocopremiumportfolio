import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaStar, FaFilter } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode, MdCalendarToday, MdCode, MdRocketLaunch, MdCheck, MdClose } from "react-icons/md";
import { BsGridFill, BsListUl, BsGrid3X3Gap } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

// PROJECT DATA
import { projects } from "../Database/Projects";

// STYLES
import "../styles/Featured.css";

function Featured({ darkMode, toggleTheme }) {
    const [activeTab, setActiveTab] = useState("featured");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState("carousel"); // carousel, grid
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTech, setSelectedTech] = useState([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const headerRef = useRef(null);

    // Get current projects based on active tab
    const getCurrentProjects = useCallback(() => {
        let projectList = [];
        switch (activeTab) {
            case "featured":
                projectList = projects.featured || [];
                break;
            case "current":
                projectList = projects.current || [];
                break;
            case "completed":
                projectList = projects.completed || [];
                break;
            default:
                projectList = projects.featured || [];
        }

        // Filter by selected tech if any
        if (selectedTech.length > 0) {
            projectList = projectList.filter(project =>
                project.technologies.some(tech => selectedTech.includes(tech))
            );
        }

        return projectList;
    }, [activeTab, selectedTech]);

    const currentProjects = getCurrentProjects();

    // Get all unique technologies
    const getAllTechnologies = () => {
        const allTech = new Set();
        Object.values(projects).forEach(category => {
            category.forEach(project => {
                project.technologies.forEach(tech => allTech.add(tech));
            });
        });
        return Array.from(allTech).sort();
    };

    // Auto-slide effect
    useEffect(() => {
        if (!isAutoPlaying || viewMode !== "carousel" || currentProjects.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % currentProjects.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, viewMode, currentProjects.length]);

    // Reset index when tab changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeTab, selectedTech]);

    // Navigation handlers
    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => (prev - 1 + currentProjects.length) % currentProjects.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => (prev + 1) % currentProjects.length);
    };

    const toggleTech = (tech) => {
        setSelectedTech(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev, tech]
        );
    };

    const clearFilters = () => {
        setSelectedTech([]);
    };

    // Tab data
    const tabs = [
        { id: "featured", label: "Featured", icon: <FaStar /> },
        { id: "current", label: "In Progress", icon: <MdRocketLaunch /> },
        { id: "completed", label: "Completed", icon: <MdCheck /> }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3
            }
        })
    };

    return (
        <motion.div
            className={`featured-container ${darkMode ? "dark-theme" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Theme Toggle */}
            <motion.button
                className="theme-toggle"
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
            >
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </motion.button>

            {/* Header Section */}
            <motion.div
                ref={headerRef}
                className="skills-header"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="header-content">
                    <h1 className="featured-title">My Projects</h1>
                    <div className="breadcrumb">
                        <span>Portfolio</span>
                        <IoIosArrowForward className="breadcrumb-icon" />
                        <span className="current">Projects</span>
                    </div>
                </div>

                <div className="header-actions">
                    {/* View Mode Toggle */}
                    <div className="view-toggle">
                        <motion.button
                            className={`view-btn ${viewMode === "carousel" ? "active" : ""}`}
                            onClick={() => setViewMode("carousel")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <BsListUl />
                        </motion.button>
                        <motion.button
                            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <BsGrid3X3Gap />
                        </motion.button>
                    </div>

                    {/* Filter Button */}
                    <motion.button
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
                </div>
            </motion.div>

            {/* Filter Panel */}
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
                            <h3>Filter by Technology</h3>
                            {selectedTech.length > 0 && (
                                <motion.button
                                    className="clear-filters"
                                    onClick={clearFilters}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MdClose /> Clear All
                                </motion.button>
                            )}
                        </div>
                        <div className="filter-chips">
                            {getAllTechnologies().map((tech, index) => (
                                <motion.button
                                    key={tech}
                                    className={`tech-chip ${selectedTech.includes(tech) ? "selected" : ""}`}
                                    onClick={() => toggleTech(tech)}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tech}
                                    {selectedTech.includes(tech) && <MdCheck className="check-icon" />}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Tabs */}
            <motion.div
                className="project-tabs"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {tabs.map((tab, index) => (
                    <motion.button
                        key={tab.id}
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
                        <span className="tab-count">
                            {activeTab === tab.id ? currentProjects.length : 
                                tab.id === "featured" ? projects.featured?.length || 0 :
                                tab.id === "current" ? projects.current?.length || 0 :
                                projects.completed?.length || 0
                            }
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* No Results */}
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
                        className="clear-btn"
                        onClick={clearFilters}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear Filters
                    </motion.button>
                </motion.div>
            )}

            {/* Carousel View */}
            {viewMode === "carousel" && currentProjects.length > 0 && (
                <div className="project-showcase">
                    <div className="project-carousel">
                        <motion.button
                            className="nav-btn prev"
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={currentProjects.length <= 1}
                        >
                            <FaChevronLeft />
                        </motion.button>

                        <div className="carousel-window">
                            <AnimatePresence mode="wait" custom={1}>
                                <motion.div
                                    key={currentIndex}
                                    className="project-card"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={1}
                                >
                                    {currentProjects[currentIndex] && (
                                        <ProjectCardLarge
                                            project={currentProjects[currentIndex]}
                                            darkMode={darkMode}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress bar */}
                            {isAutoPlaying && currentProjects.length > 1 && (
                                <motion.div
                                    className="progress-bar"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                    key={`progress-${currentIndex}`}
                                />
                            )}
                        </div>

                        <motion.button
                            className="nav-btn next"
                            onClick={handleNext}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={currentProjects.length <= 1}
                        >
                            <FaChevronRight />
                        </motion.button>
                    </div>

                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {currentProjects.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`indicator ${index === currentIndex ? "active" : ""}`}
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

            {/* Grid View */}
            {viewMode === "grid" && currentProjects.length > 0 && (
                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {currentProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            custom={index}
                        >
                            <ProjectCardGrid project={project} darkMode={darkMode} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Stats Section */}
            <motion.div
                className="stats-section"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <motion.div
                    className="stat-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="stat-icon featured-icon">
                        <FaStar />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{projects.featured?.length || 0}</span>
                        <span className="stat-label">Featured</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="stat-icon progress-icon">
                        <MdRocketLaunch />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{projects.current?.length || 0}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="stat-icon completed-icon">
                        <MdCheck />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{projects.completed?.length || 0}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="stat-icon tech-icon">
                        <MdCode />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{getAllTechnologies().length}</span>
                        <span className="stat-label">Technologies</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Large Project Card Component (for carousel)
function ProjectCardLarge({ project, darkMode }) {
 

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
                            {project.status === "completed" ? <MdCheck /> : <MdRocketLaunch />}
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
                    {project.liveLink && (
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
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

// Grid Project Card Component
function ProjectCardGrid({ project, darkMode }) {
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
