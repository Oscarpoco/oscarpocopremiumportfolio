import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// STYLINGS
import '../styles/Profile.css';
import oscar from '../../../assets/user.png'

// DATA
import { educationData } from "../../Database/EducationProjects";
import { experienceData } from "../../Database/ExperienceData";

// Icons
import { FaTimes, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaDownload, FaMapMarkerAlt } from "react-icons/fa";

function Profile({ onClose, handleDownload }) {
  const [activeTab, setActiveTab] = useState("about");

  // Skills data
  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "CSS", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "UI/UX", level: 70 }
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Child animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // DOWNLOAD FUNCTION

  return (
    <motion.div
      className="profile-parent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="profile-components">
        <div className="Profile-header">
          <motion.button
            className="close-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <FaTimes size={20} />
          </motion.button>
        </div>

        <motion.div
          className="Profile-info"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="Profile-avatar" variants={itemVariants}>
            <img src={oscar} alt="Oscar Poco" />
          </motion.div>

          <motion.h1 variants={itemVariants}>Oscar Kyle Poco</motion.h1>
          <motion.h2 variants={itemVariants}>Frontend Developer</motion.h2>

          <motion.div className="Profile-location" variants={itemVariants}>
            <FaMapMarkerAlt size={16} />
            <span>Johannesburg, RSA</span>
          </motion.div>

          <motion.div className="contact-buttons" variants={itemVariants}>
            <motion.a
              href="mailto:oscarkylepoco@gmail.com"
              className="Contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope size={16} />
            </motion.a>
            <motion.a
              href="tel:+27660850741"
              className="Contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone size={16} />
            </motion.a>
            <motion.a
              href="https://github.com/Oscarpoco"
              target="_blank"
              rel="noopener noreferrer"
              className="Contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/oscar-poco-71528016b/"
              target="_blank"
              rel="noopener noreferrer"
              className="Contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={16} />
            </motion.a>
          </motion.div>

          <motion.button
            className="download-cv"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
          >
            <FaDownload size={16} />
            <span>Download CV</span>
          </motion.button>
        </motion.div>

        <div className="Profile-tabs">
          <motion.button
            className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            About
          </motion.button>
          <motion.button
            className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Skills
          </motion.button>
          <motion.button
            className={`tab-btn ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => setActiveTab("experience")}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Experience
          </motion.button>
        </div>

        <div className="tab-content">
          {activeTab === "about" && (
            <motion.div
              className="about-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>About Me</h3>
              <p className="about-me-text">
                Passionate developer with a knack for creating elegant, responsive and user-friendly
                web applications. Specialized in React.js ecosystem with 1+ years of professional
                experience building scalable solutions for various industries.
              </p>

              <h3>Education</h3>
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution}</p>
                  <span>{edu.period}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              className="skills-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Technical Skills</h3>
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              className="experience-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Work Experience</h3>
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  className="experience-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="timeline-dot"></div>
                  <h4>{exp.position}</h4>
                  <p>{exp.company}</p>
                  <span>{exp.period}</span>
                  <p>{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="bottom-blur" />

        </div>
      </div>
    </motion.div>
  );
}

export default Profile;