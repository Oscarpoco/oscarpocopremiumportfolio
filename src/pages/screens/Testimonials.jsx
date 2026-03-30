import React, { useState, useEffect } from "react";

// STYLING
import '../styles/About.css';
import '../styles/Testimonials.css';

// ICONS
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdDownload, MdInfo, MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion'; 

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
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    // Handle manual testimonial navigation
    const goToTestimonial = (index) => {
        setActiveTestimonial(index);
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
                <div 
                    className="section-header">
                    <h2 className="section-title">Client Testimonials</h2>
                </div>
                
                <motion.div 
                    className="testimonials-slider"
                    variants={itemVariants}
                >
                    <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <motion.div 
                                key={testimonial.id} 
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: index === activeTestimonial ? 1 : 0.5, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="testimonial-header">
                                    <motion.img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name} 
                                        className="testimonial-avatar"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    />
                                    <div className="testimonial-info">
                                        <h3>{testimonial.name}</h3>
                                        <p className="testimonial-role">{testimonial.role} at {testimonial.company}</p>
                                    </div>
                                </div>
                                <div className="testimonial-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.span 
                                            key={i} 
                                            className={`rating-star ${i < testimonial.rating ? 'filled' : ''}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            ★
                                        </motion.span>
                                    ))}
                                </div>
                                <motion.p 
                                    className="testimonial-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    "{testimonial.content}"
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                
                <div className="testimonial-dots">
                    {testimonials.map((_, index) => (
                        <motion.span 
                            key={index} 
                            className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                            onClick={() => goToTestimonial(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            animate={
                                activeTestimonial === index 
                                ? { scale: 1.2, backgroundColor: "#2363C7" } 
                                : { scale: 1, backgroundColor: "#e0e0e0" }
                            }
                        />
                    ))}
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
                    whileHover={{ y: -8, backgroundColor: "#2363C7", color: "#ffffff" }}
                    whileTap={{ y: 0 }}
                >
                    <FaGithub />
                </motion.a>
                <motion.a 
                    href="https://linkedin.com/in/oscar-poco-71528016b/"
                    className="social-link"
                    whileHover={{ y: -8, backgroundColor: "#2363C7", color: "#ffffff" }}
                    whileTap={{ y: 0 }}
                >
                    <FaLinkedin />
                </motion.a>
                <motion.a 
                    href="https://x.com/PocoOscar"
                    className="social-link"
                    whileHover={{ y: -8, backgroundColor: "#2363C7", color: "#ffffff" }}
                    whileTap={{ y: 0 }}
                >
                    <FaTwitter />
                </motion.a>
            </motion.div>
        </div>
    );
}

export default Testimonials;