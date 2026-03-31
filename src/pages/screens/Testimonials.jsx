import React, { useState, useEffect } from "react";

// STYLING
import '../styles/About.css';
import '../styles/Testimonials.css';

// ICONS
import { FaGithub, FaLinkedin, FaTwitter, FaChevronLeft, FaChevronRight, FaBriefcase, FaClock, FaBuilding } from 'react-icons/fa';
import { MdDownload, MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion'; 

// DATABASE 
import { testimonials } from "../Database/TestimonialsData";

function Testimonials({darkMode, toggleTheme, handleDownload}) {

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    // Scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 7000);
        
        return () => clearInterval(interval);
    }, []);

    // Navigation handlers
    const goToTestimonial = (index) => {
        setActiveTestimonial(index);
    };

    const goToNext = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const goToPrev = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const cardVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className={`about-container ${darkMode ? 'dark-theme' : ''}`} id="testimonials-wrapper">
            {/* Floating Theme Toggle */}
            <motion.button 
                className="theme-toggle" 
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </motion.button>

            {/* HEADER SECTION */}
            <div className={`about-header ${isScrolled ? 'scrolled' : ''}`}>
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
                        <span className="current-page">What They Say</span>
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
                        whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
                        onClick={handleDownload}
                    >
                        <MdDownload className="action-icon" />
                        <span className="mobileSideBar">Download CV</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* TESTIMONIALS SECTION */}
            <motion.div 
                className="testimonials-section"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="section-header">
                    <h2 className="section-title">Client Testimonials</h2>
                </div>
                
                <motion.div 
                    className="testimonials-slider"
                    variants={itemVariants}
                >
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeTestimonial}
                            className="testimonial-card"
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <div className="quote-icon">"</div>
                            
                            <div className="testimonial-header">
                                <div className="testimonial-info">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {testimonials[activeTestimonial].name}
                                    </motion.h3>
                                    <motion.p 
                                        className="testimonial-role"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {testimonials[activeTestimonial].role}
                                    </motion.p>
                                    <motion.div 
                                        className="testimonial-company"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <FaBuilding className="company-icon" />
                                        {testimonials[activeTestimonial].company}
                                    </motion.div>
                                </div>
                            </div>

                            <motion.div 
                                className="testimonial-rating"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.span 
                                        key={i} 
                                        className={`rating-star ${i < testimonials[activeTestimonial].rating ? 'filled' : ''}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + (i * 0.05) }}
                                    >
                                        ★
                                    </motion.span>
                                ))}
                            </motion.div>

                            <motion.p 
                                className="testimonial-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                "{testimonials[activeTestimonial].content}"
                            </motion.p>

                            <motion.div 
                                className="project-details"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="detail-item">
                                    <span className="detail-label">
                                        <FaBriefcase style={{ marginRight: '0.5rem' }} />
                                        Project
                                    </span>
                                    <span className="detail-value">
                                        {testimonials[activeTestimonial].project}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">
                                        <FaClock style={{ marginRight: '0.5rem' }} />
                                        Duration
                                    </span>
                                    <span className="detail-value">
                                        {testimonials[activeTestimonial].duration}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">Technologies</span>
                                    <div className="tech-tags">
                                        {testimonials[activeTestimonial].technologies.map((tech, index) => (
                                            <motion.span 
                                                key={index} 
                                                className="tech-tag"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.8 + (index * 0.1) }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                
                {/* Navigation Controls */}
                <div className="testimonial-navigation">
                    <motion.button 
                        className="nav-button"
                        onClick={goToPrev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={activeTestimonial === 0}
                    >
                        <FaChevronLeft />
                    </motion.button>

                    <div className="testimonial-progress">
                        <div className="testimonial-dots">
                            {testimonials.map((_, index) => (
                                <motion.span 
                                    key={index} 
                                    className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                                    onClick={() => goToTestimonial(index)}
                                    whileHover={{ scale: 1.3 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={
                                        activeTestimonial === index 
                                        ? { scale: 1.3 } 
                                        : { scale: 1 }
                                    }
                                />
                            ))}
                        </div>
                        <span className="progress-text">
                            {activeTestimonial + 1} / {testimonials.length}
                        </span>
                    </div>

                    <motion.button 
                        className="nav-button"
                        onClick={goToNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={activeTestimonial === testimonials.length - 1}
                    >
                        <FaChevronRight />
                    </motion.button>
                </div>
            </motion.div>

            {/* CALL TO ACTION */}
            <motion.div 
                className="testimonial-cta"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
            >
                <h3>Ready to work together?</h3>
                <p>Let's create something amazing</p>
                <motion.a 
                    href="mailto:oscarkylepoco@gmail.com"
                    className="cta-button"
                    whileHover={{ y: -8, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
                >
                    Get In Touch
                </motion.a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
                className="social-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                <motion.a 
                    href="https://github.com/Oscarpoco"
                    className="social-link"
                    whileHover={{ y: -8, rotate: 5 }}
                    whileTap={{ y: 0 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </motion.a>
                <motion.a 
                    href="https://linkedin.com/in/oscar-poco-71528016b/"
                    className="social-link"
                    whileHover={{ y: -8, rotate: 5 }}
                    whileTap={{ y: 0 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin />
                </motion.a>
                <motion.a 
                    href="https://x.com/PocoOscar"
                    className="social-link"
                    whileHover={{ y: -8, rotate: 5 }}
                    whileTap={{ y: 0 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter />
                </motion.a>
            </motion.div>
        </div>
    );
}

export default Testimonials;