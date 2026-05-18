import React, { useState } from "react";
import '../styles/About.css';
import '../styles/Contacts.css';

// ICONS
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
    MdDownload,
    MdOutlineLightMode,
    MdOutlineDarkMode,
    MdOutlineEmail,
    MdOutlinePhone,
    MdOutlineLocationOn,
    MdSend,
    MdOutlinePerson,
    MdOutlineSubject,
    MdOutlineChatBubbleOutline,
    MdOutlineCheckCircle,
    MdOutlineSend,
} from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

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
                    <h1>Contacts</h1>
                    <div className="breadcrumb">
                        <span>Portfolio</span>
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
                >
                    <motion.div
                        className="contact-info"
                        variants={itemVariants}
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
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdOutlineEmail />
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
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdOutlinePhone />
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
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MdOutlineLocationOn />
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
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <FaGithub />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/oscar-poco-71528016b/"
                                className="social-icon"
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <FaLinkedin />
                            </motion.a>
                            <motion.a
                                href="https://x.com/PocoOscar"
                                className="social-icon"
                                whileHover={{ y: -8 }}
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
                            whileHover={{ scale: 1.03, originX: 0 }}
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
                                    <MdOutlineCheckCircle className="success-icon" />
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
                                        className={`form-group form-group-with-icon ${activeField === "name" ? "is-focused" : ""}`}
                                        custom={0}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <span className="form-field-icon" aria-hidden="true">
                                            <MdOutlinePerson />
                                        </span>
                                        <motion.input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField("name")}
                                            onBlur={() => setActiveField(null)}
                                        />
                                    </motion.div>

                                    <motion.div
                                        className={`form-group form-group-with-icon ${activeField === "email" ? "is-focused" : ""}`}
                                        custom={1}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <span className="form-field-icon" aria-hidden="true">
                                            <MdOutlineEmail />
                                        </span>
                                        <motion.input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField("email")}
                                            onBlur={() => setActiveField(null)}
                                        />
                                    </motion.div>

                                    <motion.div
                                        className={`form-group form-group-with-icon ${activeField === "subject" ? "is-focused" : ""}`}
                                        custom={2}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <span className="form-field-icon" aria-hidden="true">
                                            <MdOutlineSubject />
                                        </span>
                                        <motion.input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField("subject")}
                                            onBlur={() => setActiveField(null)}
                                        />
                                    </motion.div>

                                    <motion.div
                                        className={`form-group form-group-with-icon form-group-message ${activeField === "message" ? "is-focused" : ""}`}
                                        custom={3}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <span className="form-field-icon" aria-hidden="true">
                                            <MdOutlineChatBubbleOutline />
                                        </span>
                                        <motion.textarea
                                            name="message"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => setActiveField("message")}
                                            onBlur={() => setActiveField(null)}
                                        />
                                    </motion.div>

                                    <motion.button
                                        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                        type="submit"
                                        disabled={isSubmitting}
                                        custom={4}
                                        variants={formFieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ scale: 1.02 }}
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
                                                SEND MESSAGE
                                            
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