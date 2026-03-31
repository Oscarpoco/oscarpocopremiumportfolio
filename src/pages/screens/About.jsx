import React, { useState, useEffect } from "react";

// STYLING
import '../styles/About.css';
import oscar from '../../assets/background-one.jpg'
import qrcode from '../../assets/qrcode.jfif'

// ICONS
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { MdDownload, MdOutlineLightMode, MdOutlineDarkMode, MdCode, MdWork, MdSchool } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillStar } from "react-icons/ai";
import { BsAward } from "react-icons/bs";
import { BiSolidMessageDetail } from "react-icons/bi";
import { motion } from 'framer-motion';

// DATABASE
import { featuredProjects } from "../Database/AboutData";

// Navigation cards data with click handlers
const portfolioStats = [
    {
        id: 1,
        title: "PROJECTS",
        navigateTo: "Featured",
        icon: <AiFillStar className="folder-icon" />,
        count: "3+",
        color: "#ef4444",
        gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
        description: "View my featured projects"
    },
    {
        id: 2,
        title: "EXPERIENCE",
        navigateTo: "Experience",
        icon: <MdWork className="folder-icon" />,
        count: "3+",
        subtitle: "Years",
        color: "#8b5cf6",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
        description: "See my work history"
    },
    {
        id: 3,
        title: "SKILLS",
        navigateTo: "Skills",
        icon: <MdCode className="folder-icon" />,
        count: "20+",
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        description: "Explore my tech stack"
    },
    {
        id: 4,
        title: "CERTIFICATIONS",
        navigateTo: "Education",
        icon: <MdSchool className="folder-icon" />,
        count: "12+",
        subtitle: "Certs",
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
        description: "View my certifications"
    }
];

function About({ darkMode, toggleTheme, handleDownload, navigateToSection }) {
    const [activeTab, setActiveTab] = useState('featured');
    const [hoveredCard, setHoveredCard] = useState(null);

    // Handle card click - navigate to section
    const handleCardClick = (section) => {
        if (navigateToSection) {
            navigateToSection(section);
        }
    };

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

    return (
        <div className={`about-container ${darkMode ? 'dark-theme' : ''}`}>
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
            <div className="about-header">
                <motion.div
                    className="header-left"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>My Portfolio</h1>
                    <div className="breadcrumb">
                        <span>Dashboard</span>
                        <IoIosArrowForward className="breadcrumb-icon" />
                        <span className="current-page">Overview</span>
                    </div>
                </motion.div>

                <motion.div
                    className="header-actions"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.button 
                        className="action-button download-btn primary" 
                        onClick={handleDownload}
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <MdDownload className="action-icon" />
                        <span className="mobileSideBar">Download CV</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* PROFILE SECTION */}
            <motion.div
                className="profile-section"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="profile-content">
                    <motion.div
                        className="profile-image-container"
                        variants={itemVariants}
                    >
                        <div className="profile-image">
                            <img
                                src={oscar}
                                alt="Oscar Kyle Poco"
                                className="avatar-image"
                            />
                            <motion.div 
                                className="profile-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                            >
                                <span>3+</span>
                            </motion.div>
                        </div>
                        <div className="social-links">
                            <motion.a
                                href="https://github.com/Oscarpoco"
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/oscar-poco-71528016b/"
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaLinkedin />
                            </motion.a>
                            <motion.a
                                href="https://x.com/PocoOscar"
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTwitter />
                            </motion.a>
                        </div>
                    </motion.div>
                    <motion.div
                        className="profile-info"
                        variants={itemVariants}
                    >
                        <div className="name-badge">
                            <h1 className="profile-name">Oscar Kyle Poco</h1>
                            <motion.span 
                                className="status-badge"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                Open For Opportunities | Hire
                            </motion.span>
                        </div>
                        <h2 className="profile-title">React Developer</h2>
                        <p className="profile-description">
                            Passionate developer with a knack for creating elegant, responsive and user-friendly
                            web applications. Specialized in React.js ecosystem with 3+ years of professional
                            experience building scalable solutions for various industries.
                        </p>
                        <div className="profile-update-row">
                            <p className="portfolio-update-date">
                                Last updated: 28 March 2026
                            </p>
                            <div className="skills-container-1">
                                {['React.js', 'TypeScript', 'Node.js', 'Redux', 'React Native', 'UI/UX'].map((skill, index) => (
                                    <motion.span 
                                    key={skill}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                        </div>
                        <div className="profile-stats">
                            {[
                                { value: '100%', label: 'Client Satisfaction' },
                                { value: '3+', label: 'Projects Completed' },
                                { value: '3+', label: 'Years of Experience' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="Stat-item"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="Stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="qrcode"
                    variants={itemVariants}
                >
                    <img src={qrcode} alt="qrcode" className="qrcode-image" />
                    <motion.h3 className="scan-tag">SCAN TO DOWNLOAD RESUME</motion.h3>
                </motion.div>
            </motion.div>

            {/* QUICK ACCESS SECTION - CLICKABLE CARDS */}
            <motion.div
                className="quick-access-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="section-header">
                    <h2>QUICK ACCESS</h2>
                    <p className="section-subtitle">Click a card to navigate</p>
                </div>

                <div className="folders-container">
                    {portfolioStats.map((stat, index) => (
                        <motion.div
                            className={`folder-card ${hoveredCard === stat.id ? 'hovered' : ''}`}
                            key={stat.id}
                            // style={{ background: stat.gradient }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCardClick(stat.navigateTo)}
                            onHoverStart={() => setHoveredCard(stat.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                        >
                            <div className="folder-header">
                                <div className="folder-title">{stat.title}</div>
                                <motion.div
                                    className="folder-icon-container"
                                    animate={{ rotate: hoveredCard === stat.id ? 15 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {stat.icon}
                                </motion.div>
                            </div>
                            <div className="folder-count">
                                <motion.span
                                    className="count-number"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (0.1 * index), duration: 0.5 }}
                                >
                                    {stat.count}
                                </motion.span>
                                {stat.subtitle && <span className="count-subtitle">{stat.subtitle}</span>}
                            </div>
                            <p className="folder-description">{stat.description}</p>
                            
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* PROJECTS SECTION */}
            <motion.div
                className="projects-section"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <div className="projects-tabs">
                    <button
                        className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
                        onClick={() => setActiveTab('featured')}
                    >
                        Featured Projects
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'recent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('recent')}
                    >
                        Recent Work
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Projects
                    </button>
                </div>

                <div className="projects-table">
                    <div className="projects-table-header">
                        <div className="table-column name-column">NAME</div>
                        <div className="table-column owner-column">CATEGORY</div>
                        <div className="table-column modified-column">LAST MODIFIED</div>
                        <div className="table-column size-column" id="type-column">TYPE</div>
                        <div className="table-column actions-column">ACTIONS</div>
                    </div>

                    <motion.div
                        className="projects-table-body"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                className="project-row"
                                key={project.id}
                                variants={itemVariants}
                                custom={index}
                                whileHover={{
                                    scale: 1.01,
                                    x: 5,
                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(35, 99, 199, 0.03)',
                                }}
                            >
                                <div className="table-column name-column">
                                    <div className="project-name">
                                        <motion.img
                                            src={project.icon}
                                            alt={project.name}
                                            className="project-icon"
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        />
                                        <span>{project.name}</span>
                                    </div>
                                </div>
                                <div className="table-column owner-column">{project.category}</div>
                                <div className="table-column modified-column">{project.lastModified}</div>
                                <div className="table-column size-column">
                                    <span className="project-type">{project.type}</span>
                                </div>
                                <div className="table-column actions-column">
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-project-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View
                                    </motion.a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* View All Projects CTA */}
                <motion.div 
                    className="view-all-projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button 
                        className="view-all-btn"
                        onClick={() => handleCardClick('Featured')}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>View All Projects</span>
                        <FaArrowRight />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default About;
