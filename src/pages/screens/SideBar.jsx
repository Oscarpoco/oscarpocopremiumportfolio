import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import '../styles/SideBar.css'

// ICONS
import { MdDashboard, MdCode, MdWork, MdSchool } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { BsAward } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";

const navigationItems = [
    { name: "Dashboard", icon: MdDashboard },
    { name: "Skills", icon: MdCode },
    { name: "Experience", icon: MdWork },
    { name: "Education", icon: MdSchool },
    { name: "Featured", icon: AiFillStar },
    { name: "Testimonials", icon: BsAward },
    { name: "Journey", icon: GiPathDistance },
    { name: "Contact", icon: BiSolidMessageDetail },
];

function SideBar({ activeItem, setActiveItem }) {

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
            className="Parent-sidebar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="sidebar-content">

                {/* NAVIGATION LINKS */}
                <nav className="sidebar-navigation" data-tutorial="sidebar">
                    {navigationItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.name;
                        
                        return (
                            <motion.div
                                key={item.name}
                                className={`navigation-item ${isActive ? "active" : ""} ${item.desktopOnly ? "navigation-item--journey-desktop" : ""}`}
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
                                    animate={{ scale: isActive ? 1.1 : 1 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Icon className="navigation-icon" />
                                </motion.div>
                                <span className="nav-label">
                                  {item.name}
                                  <strong>.tsx</strong>
                                </span>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeIndicator"
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            exit={{ opacity: 0, scaleY: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* AVENGERS.JSX — personal powers card */}
                <div className="avengers-slot">
                <motion.div
                    className="avengers-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, type: "spring", stiffness: 120, damping: 18 }}
                >
                    <div className="avengers-card-glow" aria-hidden />
                    <div className="avengers-card-scan" aria-hidden />

                    <div className="avengers-card-header">
                        <div className="avengers-window-dots" aria-hidden>
                            <span className="avengers-dot avengers-dot--close" />
                            <span className="avengers-dot avengers-dot--min" />
                            <span className="avengers-dot avengers-dot--max" />
                        </div>
                        <span className="avengers-file-name">avengers.jsx</span>
                    </div>

                    <div className="avengers-card-body">
                        <div className="avengers-hero">
                            <motion.div
                                className="avengers-orbit"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                aria-hidden
                            />
                            <div className="avengers-hero-icon">
                                <FaLaptopCode aria-hidden />
                            </div>
                        </div>

                        <div className="avengers-meta">
                            <h3 className="avengers-title">Personal Supapowers</h3>
                            <p className="avengers-alias">
                                <strong>SOFT</strong>WARE <strong>MAN</strong>
                            </p>
                        </div>
                    </div>

                    <div className="avengers-footer">
                        <span className="avengers-footer-label">Power level</span>
                        <motion.span
                            className="avengers-footer-max"
                            animate={{ scale: [1, 1.04, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            MAX
                        </motion.span>
                    </div>
                </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default SideBar;
