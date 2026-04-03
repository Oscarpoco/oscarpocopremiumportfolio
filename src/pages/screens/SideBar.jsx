import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import '../styles/SideBar.css'

// ICONS
import { MdDashboard, MdCode, MdWork, MdSchool } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { BsAward } from "react-icons/bs";

const navigationItems = [
    { name: "Dashboard", icon: MdDashboard, color: "#2363C7" },
    { name: "Skills", icon: MdCode, color: "#10b981" },
    { name: "Experience", icon: MdWork, color: "#8b5cf6" },
    { name: "Education", icon: MdSchool, color: "#f59e0b" },
    { name: "Featured", icon: AiFillStar, color: "#ef4444" },
    { name: "Testimonials", icon: BsAward, color: "#06b6d4" },
    { name: "Contact", icon: BiSolidMessageDetail, color: "#ec4899" },
];

function SideBar({ activeItem, setActiveItem, darkMode }) {

    const handleNavClick = (itemName) => {
        setActiveItem(itemName);
    };

    const containerVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <motion.div 
            className={`Parent-sidebar ${darkMode ? 'dark-mode' : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="sidebar-content">

                {/* NAVIGATION LINKS */}
                <nav className="sidebar-navigation">
                    {navigationItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.name;
                        
                        return (
                            <motion.div
                                key={item.name}
                                className={`navigation-item ${isActive ? "active" : ""}`}
                                onClick={() => handleNavClick(item.name)}
                                variants={itemVariants}
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div 
                                    className="nav-icon-wrapper"
                                    style={{ 
                                        background: 'transparent',
                                      
                                    }}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Icon 
                                        className="navigation-icon" 
                                        style={{ color: isActive ? item.color : 'inherit' }}
                                    />
                                </motion.div>
                                <span className="nav-label">{item.name}<strong style={{color: isActive ? item.color : 'inherit'}}>.tsx</strong></span>
                                
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeIndicator"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            style={{ backgroundColor: isActive ? item.color : 'inherit' }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* PORTFOLIO STATS */}
                <motion.div 
                    className="portfolio-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="stats-heading">PERSONAL SUPAPOWERS</h3>
                    <div className="stats-item">
                        <div className="stats-icon-container">
                            <FaLaptopCode className="stats-icon" />
                        </div>
                        <div className="stats-info">
                            <span className="stats-label">AVENGERS.JSX</span>
                            <div className="stats-progress-bar">
                                <motion.div 
                                    className="stats-progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <div className="stats-details">
                                <span className="stats-text"><strong>HULK </strong>WARE <strong>MAN</strong></span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ backgroundColor: "", cursor: "pointer", padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}
                            onClick={() =>
                              window.open("https://oscar-oldsite.vercel.app/", "_blank")
                            }
                          >
                            <span className="current-section-label" style={{ color: "green" }}>
                              VIEW THE OLD SITE
                            </span>
                          </motion.div>

                </motion.div>
            </div>
        </motion.div>
    )
}

export default SideBar;
