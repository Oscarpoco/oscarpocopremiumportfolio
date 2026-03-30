import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// STYLING
import '../styles/Dashboard.css'

// COMPONENTS
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import Contacts from "./Contact";
import Error404 from "./Error404";


function Dashboard({ activeItem, isAuthenticated, darkMode, toggleTheme, handleDownload, navigateToSection }) {

    const pageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.4
    };

    const renderContent = () => {
        const props = {
            toggleTheme,
            darkMode,
            handleDownload,
            navigateToSection,
            isAuthenticated
        };

        switch (activeItem) {
            case "Dashboard":
                return <About key="dashboard" {...props} />;
            case "Skills":
                return <Skills key="skills" {...props} />;
            case "Experience":
                return <Experience key="experience" {...props} />;
            case "Education":
                return <Education key="education" {...props} />;
            case "Featured":
                return <Featured key="featured" {...props} />;
            case "Testimonials":
                return <Testimonials key="testimonials" {...props} />;
            case "Contact":
                return <Contacts key="contact" {...props} />;
            default:
                return <Error404 key="error" />;
        }
    };

    return (
        <div className={`Parent-dashboard ${darkMode ? 'dark-mode' : ''}`}>
            <div className="Child-dashboard">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeItem}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="dashboard-content-wrapper"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Dashboard;
