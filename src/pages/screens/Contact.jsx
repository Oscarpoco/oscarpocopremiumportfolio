import React, { useState, useEffect } from "react";
import '../styles/About.css';
import '../styles/Contacts.css';

// ICONS
import { FaSmile, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdDownload, MdInfo, MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md';

function Contacts({darkMode, toggleTheme, handleDownload}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [activeField, setActiveField] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form after success message
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }, 5000);
        }, 1500);
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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    const formFieldVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: index => ({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: index * 0.1
            }
        })
    };

    const contactItemVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: index => ({
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: index * 0.15
            }
        })
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity }
    };

    return (
        <div className={`about-container ${darkMode ? 'dark-theme' : ''}`} id="contact-wrapper">
            {/* Floating Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>

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
                        <span className="current-page">Find Me</span>
                    </div>
                </motion.div>

                <motion.div 
                    className="header-actions"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                   
                    <button className="action-button download-btn primary" onClick={handleDownload}>
                        <MdDownload className="action-icon" />
                        <span className="mobileSideBar">Download CV</span>
                    </button>

                </motion.div>
            </div>

            {/* CONTACT FORM SECTION */}
            <motion.section
                className="contact-section"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div
                    className="contact-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20
                    }}
                    whileHover={{ boxShadow: "0 15px 40px rgba(35, 99, 199, 0.15)" }}
                >
                    <motion.div
                        className="contact-info"
                        variants={itemVariants}
                        initial={{ background: "#2363C7" }}
                        animate={{
                            background: darkMode ?
                                "linear-gradient(135deg, #2363C7 0%, #1d52a8 100%)" :
                                "linear-gradient(135deg, #2363C7 0%, #3b7de4 100%)"
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, originX: 0 }}
                        >
                            Get In Touch
                        </motion.h2>
                        <motion.p variants={itemVariants}>
                            Feel free to reach out to me for any questions or opportunities!
                        </motion.p>

                        <div className="contact-details">
                            <motion.div
                                className="contact-item"
                                custom={0}
                                variants={contactItemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="icon-circle"
                                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdEmail />
                                </motion.div>
                                <div>
                                    <h3>Email</h3>
                                    <p>oscarkylepoco@email.com</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="contact-item"
                                custom={1}
                                variants={contactItemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="icon-circle"
                                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdPhone />
                                </motion.div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>+27 (66) 085-0741</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="contact-item"
                                custom={2}
                                variants={contactItemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="icon-circle"
                                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdLocationOn />
                                </motion.div>
                                <div>
                                    <h3>Location</h3>
                                    <p>Soweto, Johannesburg, RSA</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="social-links"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="https://github.com/Oscarpoco"
                                className="social-icon"
                                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <FaGithub />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/oscar-poco-71528016b/"
                                className="social-icon"
                                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <FaLinkedin />
                            </motion.a>
                            <motion.a
                                href="https://x.com/PocoOscar"
                                className="social-icon"
                                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <FaTwitter />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        variants={itemVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, originX: 0, color: "#2363C7" }}
                            className="send-message-text"
                        >
                            Send a Message
                        </motion.h2>

                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    className="success-message"
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "loop"
                                        }}
                                    >
                                        <FaSmile className="success-icon" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Message Sent Successfully!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        I'll get back to you as soon as possible.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    className="contact-form"
                                    onSubmit={handleSubmit}
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        className="form-group"
                                        custom={0}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField('name')}
                                            onBlur={() => setActiveField(null)}
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                        <motion.span
                                            className="input-focus-effect"
                                            animate={{
                                                width: activeField === 'name' ? '100%' : '0%',
                                                backgroundColor: "#2363C7"
                                            }}
                                        ></motion.span>
                                    </motion.div>

                                    <motion.div
                                        className="form-group"
                                        custom={1}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField('email')}
                                            onBlur={() => setActiveField(null)}
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                        <motion.span
                                            className="input-focus-effect"
                                            animate={{
                                                width: activeField === 'email' ? '100%' : '0%',
                                                backgroundColor: "#2363C7"
                                            }}
                                        ></motion.span>
                                    </motion.div>

                                    <motion.div
                                        className="form-group"
                                        custom={2}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField('subject')}
                                            onBlur={() => setActiveField(null)}
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                        <motion.span
                                            className="input-focus-effect"
                                            animate={{
                                                width: activeField === 'subject' ? '100%' : '0%',
                                                backgroundColor: "#2363C7"
                                            }}
                                        ></motion.span>
                                    </motion.div>

                                    <motion.div
                                        className="form-group"
                                        custom={3}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.textarea
                                            name="message"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField('message')}
                                            onBlur={() => setActiveField(null)}
                                            whileFocus={{ scale: 1.01 }}
                                        ></motion.textarea>
                                        <motion.span
                                            className="input-focus-effect"
                                            animate={{
                                                width: activeField === 'message' ? '100%' : '0%',
                                                backgroundColor: "#2363C7"
                                            }}
                                        ></motion.span>
                                    </motion.div>

                                    <motion.button
                                        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                        type="submit"
                                        disabled={isSubmitting}
                                        custom={4}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "#1d52a8",
                                            boxShadow: "0 8px 20px rgba(35, 99, 199, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isSubmitting ? (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Sending...
                                            </motion.span>
                                        ) : (
                                            <>
                                                Send Message
                                                <motion.span
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 5 }}
                                                    className="span-icon"
                                                >
                                                    <MdSend className="send-icon" />
                                                </motion.span>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.section>
        </div>
    );
}

export default Contacts;