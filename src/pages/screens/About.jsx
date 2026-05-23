import React, {useState, useEffect, memo} from "react";

// STYLING
import "../styles/About.css";
import oscar from "../../assets/background-one.jpg";
import qrcode from "../../assets/qrcode.jfif";

// ICONS
import {FaGithub, FaLinkedin, FaTwitter, FaArrowRight} from "react-icons/fa";
import {
    MdDownload,
    MdOutlineLightMode,
    MdOutlineDarkMode,
    MdCode,
    MdWork,
    MdSchool,
    MdUpdate,
    MdLayers,
} from "react-icons/md";
import {
    SiNodedotjs,
    SiDotnet,
    SiPython,
    SiOpenjdk,
} from "react-icons/si";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import {IoIosArrowForward} from "react-icons/io";
import {AiFillStar} from "react-icons/ai";
import {motion, useReducedMotion} from "framer-motion";
import {scrollIn, scrollInFade} from "./aboutAnimations";

// DATABASE
import {featuredProjects} from "../Database/AboutData";
import {experienceData} from "../Database/ExperienceData";


const STACK_SKILLS = [
    { name: "JavaScript", Icon: TbBrandJavascript, outline: true },
    { name: "TypeScript", Icon: TbBrandTypescript, outline: true },
    { name: "Node.js", Icon: SiNodedotjs },
    { name: ".NET", Icon: SiDotnet },
    { name: "Python", Icon: SiPython },
    { name: "Java", Icon: SiOpenjdk },
];

const portfolioStats = [
    {
        id: 1,
        title: "PROJECTS",
        navigateTo: "Featured",
        icon: <AiFillStar className="folder-icon"/>,
        count: "3+",
        color: "#ef4444",
        gradient: "#ef4444",
        description: "View my featured projects"
    }, {
        id: 2,
        title: "EXPERIENCE",
        navigateTo: "Experience",
        icon: <MdWork className="folder-icon"/>,
        count: "3+",
        subtitle: "Years",
        color: "#8b5cf6",
        gradient: "#8b5cf6",
        description: "See my work history"
    }, {
        id: 3,
        title: "SKILLS",
        navigateTo: "Skills",
        icon: <MdCode className="folder-icon"/>,
        count: "8+",
        color: "#10b981",
        gradient: "#10b981",
        description: "Explore my tech stack"
    }, {
        id: 4,
        title: "CERTIFICATIONS",
        navigateTo: "Education",
        icon: <MdSchool className="folder-icon"/>,
        count: "5+",
        subtitle: "Certs",
        color: "#f59e0b",
        gradient: "#f59e0b",
        description: "View my certifications"
    },
];

function About({darkMode, toggleTheme, handleDownload, navigateToSection, particles = "none"}) {
    const reduceMotion = useReducedMotion();
    const [commitDate, setCommitDate] = useState(null);
    const [scrollRoot, setScrollRoot] = useState(null);

    useEffect(() => {
        setScrollRoot(document.querySelector(".Child-dashboard"));
    }, []);

    useEffect(() => {
        fetch("https://api.github.com/repos/Oscarpoco/oscarpocopremiumportfolio/commits?per_page=1").then(res => res.json()).then(data => {
            if (data && data.length > 0) {
                setCommitDate(data[0].commit.committer.date);
            }
        });
    }, []);

    // Handle card click - navigate to section
    const handleCardClick = (section) => {
        if (navigateToSection) {
            navigateToSection(section);
        }
    };

    const profileBinaryCount = 18;
    const binaryActive = particles && particles !== "none";

    return (
        <div className={
            `about-container ${
                darkMode ? "dark-theme" : ""
            }`
        }>
            {/* Floating Theme Toggle */}
            <button type="button" className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>

            {/* HEADER SECTION */}
            <div className="about-header">
                <motion.div className="header-left" {...scrollIn(reduceMotion, 0, 16, scrollRoot)}>
                    <h1>My Portfolio</h1>
                    <div className="breadcrumb">
                        <span>Dashboard</span>
                        <IoIosArrowForward className="breadcrumb-icon"/>
                        <span className="current-page">Overview</span>
                    </div>
                </motion.div>

                <motion.div className="header-actions" {...scrollIn(reduceMotion, 0.06, 16, scrollRoot)}>
                    <button
                        type="button"
                        className="action-button download-btn primary"
                        onClick={handleDownload}
                    >
                        <MdDownload className="action-icon"/>
                        <span className="mobileSideBar button-action">Download CV</span>
                    </button>
                </motion.div>
            </div>

            {/* PROFILE SECTION */}
            <motion.div className="profile-section" {...scrollIn(reduceMotion, 0, 24, scrollRoot)}>
                <div className="profile-content">
                    <div className="profile-top">
                    <motion.div className="profile-image-container" {...scrollIn(reduceMotion, 0.05, 28, scrollRoot)}>
                        <div className="profile-image-stack">
                            <div className="profile-image">
                                <img
                                    src={oscar}
                                    alt="Oscar Kyle Poco"
                                    className="avatar-image"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            {binaryActive && (
                                <motion.div
                                    className={`profile-binary profile-binary--${particles}`}
                                    aria-hidden
                                    {...scrollInFade(reduceMotion, 0.1, scrollRoot)}
                                >
                                    {Array.from({ length: profileBinaryCount }, (_, i) => (
                                        <span
                                            key={i}
                                            className="profile-binary-bit"
                                            style={{
                                                left: `${4 + (i * 92) / profileBinaryCount}%`,
                                                animationDelay: `${(i % 12) * 0.1}s`,
                                                animationDuration: `${1.15 + (i % 5) * 0.18}s`,
                                            }}
                                        >
                                            {(i + Math.floor(i / 2)) % 2 === 0 ? "1" : "0"}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                            <h1 className="floating-header-1 about-floating-label">
                                Hello There!
                                <br/>
                                Image Still
                                <br/>
                                Loading...
                            </h1>
                            <div className="social-links">
                            <a href="https://github.com/Oscarpoco" className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaGithub/>
                            </a>
                            <a href="https://linkedin.com/in/oscar-poco-71528016b/" className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin/>
                            </a>
                            <a href="https://x.com/PocoOscar" className="social-link" target="_blank" rel="noopener noreferrer">
                                <FaTwitter/>
                            </a>
                        </div>
                        </div>
                    </motion.div>
                    <motion.div className="profile-info" {...scrollIn(reduceMotion, 0.08, 24, scrollRoot)}>
                        <div className="name-badge">
                            <h1 className="profile-name">Oscar Kyle Poco</h1>
                            <span className="status-badge">
                                Open For Opportunities | Hire
                            </span>
                        </div>
                        <h2 className="profile-title">
                            Software Developer | Learnership Facilitator
                        </h2>
                        <p className="profile-description">
                            I am a Software Developer and Learnership Facilitator with 3+ years of experience across {experienceData.length} professional roles in Full Stack Development. I currently work at WWISE as a Software Development Facilitator. My background combines hands-on development of web and mobile apps with a passion for teaching and upskilling others.
                        </p>
                    </motion.div>
                    </div>

                    <motion.div
                        className="profile-meta-block"
                        {...scrollIn(reduceMotion, 0.1, 24, scrollRoot)}
                    >
                        <div className="portfolio-update-card">
                            
                            <div className="portfolio-update-text">
                                <span className="portfolio-update-label">Last updated: </span>
                                <time
                                    className="portfolio-update-date"
                                    dateTime={commitDate || undefined}
                                >
                                    {commitDate
                                        ? new Date(commitDate).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "Loading…"}
                                </time>
                                <span className="portfolio-update-label">This is real time update from my GitHub repository.</span>
                            </div>
                        </div>

                        <div className="profile-stack-section">
                            
                            <div className="skills-container-1">
                                {STACK_SKILLS.map(({ name, Icon, outline }) => (
                                    <span key={name} className="skill-tag">
                                        <Icon
                                            className={
                                                outline
                                                    ? "skill-tag-icon skill-tag-icon--outline"
                                                    : "skill-tag-icon"
                                            }
                                            aria-hidden
                                        />
                                        <span className="skill-tag-label">{name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div className="qrcode" {...scrollIn(reduceMotion, 0.1, 24, scrollRoot)}>
                    <img src={qrcode}
                        alt="qrcode"
                        className="qrcode-image"/>
                    <h3 className="scan-tag">SCAN TO DOWNLOAD RESUME</h3>
                </motion.div>
            </motion.div>

            {/* QUICK ACCESS SECTION - CLICKABLE CARDS */}
            <motion.div className="quick-access-section" {...scrollIn(reduceMotion, 0, 24, scrollRoot)}>
                <motion.div className="section-header" {...scrollIn(reduceMotion, 0.05, 18, scrollRoot)}>
                    <h2>QUICK ACCESS</h2>
                    <p className="section-subtitle">Click a card to navigate</p>
                </motion.div>

                <div className="folders-container">
                    {
                    portfolioStats.map((stat, index) => (
                        <motion.div
                            className="folder-card"
                            key={stat.id}
                            role="button"
                            tabIndex={0}
                            {...scrollIn(reduceMotion, 0.04 + index * 0.05, 20, scrollRoot)}
                            onClick={() => handleCardClick(stat.navigateTo)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleCardClick(stat.navigateTo);
                                }
                            }}
                        >
                            <div className="folder-header">
                                <div className="folder-title">
                                    {
                                    stat.title
                                }</div>
                                <div className="folder-icon-container">{stat.icon}</div>
                            </div>
                            <div className="folder-count">
                                <span className="count-number">{stat.count}</span>
                                {
                                stat.subtitle && (
                                    <span className="count-subtitle">
                                        {
                                        stat.subtitle
                                    }</span>
                                )
                            } </div>
                            <p className="folder-description">
                                {
                                stat.description
                            }</p>
                        </motion.div>
                    ))
                } </div>
            </motion.div>

            {/* PROJECTS SECTION */}
            <motion.div className="section-header" {...scrollIn(reduceMotion, 0, 18, scrollRoot)}>
                <h2>THESE PROJECTS BELOW IS WHERE MY JOURNEY BEGAN. BUILDING SMALL PROJECTS NOT KNOWING THAT 1 DAY I WILL BE THE BEST SOFTWARE DEV EVER EXISTED IN MY FAMILY. DATE: 31 JUNE 2024</h2>
            </motion.div>
            <motion.div className="projects-section" {...scrollIn(reduceMotion, 0.05, 24, scrollRoot)}>

                <div className="projects-table">
                    <div className="projects-table-header">
                        <div className="table-column name-column">NAME</div>
                        <div className="table-column owner-column">CATEGORY</div>
                        <div className="table-column modified-column">LAST MODIFIED</div>
                        <div className="table-column size-column" id="type-column">
                            TYPE
                        </div>
                        <div className="table-column actions-column">ACTIONS</div>
                    </div>

                    <div className="projects-table-body">
                        {
                        featuredProjects.map((project, index) => (
                            <motion.div
                                className="project-row"
                                key={project.id}
                                {...scrollIn(reduceMotion, 0.04 + index * 0.04, 16, scrollRoot)}
                            >
                                <div className="table-column name-column">
                                    <div className="project-name">
                                        <img
                                            src={project.icon}
                                            alt={project.name}
                                            className="project-icon"
                                            loading="lazy"
                                        />
                                        <span>{
                                            project.name
                                        }</span>
                                    </div>
                                </div>
                                <div className="table-column owner-column">
                                    {
                                    project.category
                                } </div>
                                <div className="table-column modified-column">
                                    {
                                    project.lastModified
                                } </div>
                                <div className="table-column size-column">
                                    <span className="project-type">
                                        {
                                        project.type
                                    }</span>
                                </div>
                                <div className="table-column actions-column">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-project-btn"
                                    >
                                        View
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    } </div>
                </div>

                {/* View All Projects CTA */}
                <motion.div className="view-all-projects" {...scrollIn(reduceMotion, 0.08, 18, scrollRoot)}>
                    <button
                        type="button"
                        className="view-all-btn"
                        onClick={() => handleCardClick("Featured")}
                    >
                        <span>View All Projects</span>
                        <FaArrowRight/>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default memo(About);
