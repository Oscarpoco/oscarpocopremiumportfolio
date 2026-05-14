import React, { useState, useEffect, useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaArrowRight,
  FaArrowLeft,
  FaHome,
  FaUser,
  FaBriefcase,
  FaProjectDiagram,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import { experienceData } from "../../Database/ExperienceData";
import { educationData, certificateData } from "../../Database/EducationProjects";
import { skillsData } from "../../Database/SkillsData";

// Import your project images
import mati from '../../../assets/mati.png';
import spana from '../../../assets/spana.png';
import findem from '../../../assets/findem.png';
import stable from '../../../assets/stable.png';

/* ─────────────────────────────────────────────
   GOOGLE FONTS
───────────────────────────────────────────── */
if (
  typeof document !== "undefined" &&
  !document.getElementById("okp-profile-fonts")
) {
  const link = document.createElement("link");
  link.id = "okp-profile-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;600;700&display=swap";
  document.head.appendChild(link);
}

/* ─────────────────────────────────────────────
   DESIGN TOKENS - WHITE THEME
───────────────────────────────────────────── */
const T = {
  bg: "#ffffff",
  bgAlt: "#f8f9fc",
  white: "#ffffff",
  ink: "#000000",
  muted: "#5a6b8a",
  blue: "#0066ff",
  accent: "#0f0f23",
  card: "#ffffff",
  border: "#e0e6f0",
  body: "'Poppins', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projectsData = [
  {
    id: 1,
    name: "Mati",
    image: mati,
    description: "A comprehensive project showcasing modern web development"
  },
  {
    id: 2,
    name: "Spana",
    image: spana,
    description: "Innovative solutions for digital experiences"
  },
  {
    id: 3,
    name: "FindEm",
    image: findem,
    description: "Advanced search and discovery platform"
  },
  {
    id: 4,
    name: "Stable",
    image: stable,
    description: "Robust and reliable web application"
  },
];

const interests = [
  "#webdesign",
  "#frontend",
  "#uiux",
  "#react",
  "#creativecoding",
  "#animation",
  "#devlife",
  "#opensource",
];

const navSections = [
  { id: "hero", label: "Home", icon: <FaHome /> },
  { id: "about", label: "About", icon: <FaUser /> },
  { id: "skills", label: "Skills", icon: <FiSettings /> },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
  { id: "experience", label: "Experience", icon: <FaBriefcase /> },
  { id: "education", label: "Education", icon: <FaGraduationCap /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope /> },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
const useScrollFadeIn = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  return { ref, isInView };
};

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

// Animated section wrapper with useInView
const AnimatedSection = ({ children, id, style = {} }) => {
  const { ref, isInView } = useScrollFadeIn();

  return (
    <Motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      style={style}
    >
      {children}
    </Motion.section>
  );
};

// Corner borders for cards
const CornerBorders = ({
  color = T.blue,
  size = 20,
  thickness = 2,
  opacity = 1,
}) => (
  <>
    {/* Top Left */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderTop: `${thickness}px solid ${color}`,
        borderLeft: `${thickness}px solid ${color}`,
        opacity,
      }}
    />
    {/* Top Right */}
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: size,
        height: size,
        borderTop: `${thickness}px solid ${color}`,
        borderRight: `${thickness}px solid ${color}`,
        opacity,
      }}
    />
    {/* Bottom Left */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: size,
        height: size,
        borderBottom: `${thickness}px solid ${color}`,
        borderLeft: `${thickness}px solid ${color}`,
        opacity,
      }}
    />
    {/* Bottom Right */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: size,
        height: size,
        borderBottom: `${thickness}px solid ${color}`,
        borderRight: `${thickness}px solid ${color}`,
        opacity,
      }}
    />
  </>
);

// Floating Glass Navigation (Desktop)
const FloatingNav = ({ activeSection, scrollContainerRef }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!el) return;
    const handleNavScroll = () => setScrolled(el.scrollTop > 100);
    handleNavScroll();
    el.addEventListener("scroll", handleNavScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleNavScroll);
  }, [scrollContainerRef]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: scrolled
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        padding: "12px 24px",
        display: "flex",
        gap: 8,
        alignItems: "center",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0, 102, 255, 0.08)"
          : "0 4px 16px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <CornerBorders />
      {navSections.map((section) => (
        <Motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background:
              activeSection === section.id ? "transparent" : "transparent",
            color: activeSection === section.id ? T.ink : T.ink,
            border: "none",
            borderRadius: 30,
            padding: "10px 20px",
            fontFamily: T.mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {section.label}
        </Motion.button>
      ))}
    </Motion.nav>
  );
};

const EyebrowLabel = ({ children, color = T.blue }) => (
  <Motion.p
    variants={fadeUp}
    style={{
      fontFamily: T.mono,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: color,
      margin: "0 0 14px",
      borderLeft: `3px solid ${color}`,
      paddingLeft: 12,
    }}
  >
    {"> "}
    {children}
  </Motion.p>
);

const BigTitle = ({ children, size = "clamp(64px, 13vw, 148px)" }) => (
  <Motion.h2
    variants={fadeUp}
    style={{
      fontFamily: T.body,
      fontSize: size,
      fontWeight: 900,
      letterSpacing: "-2px",
      margin: "0 0 56px",
      lineHeight: 0.88,
      textTransform: "uppercase",
      color: T.ink,
      position: "relative",
    }}
  >
    <span
      style={{
        position: "absolute",
        left: 0,
        top: -8,
        width: 40,
        height: 40,
        border: `2px solid ${T.blue}`,
        borderRight: "none",
        borderBottom: "none",
      }}
    />
    {children}
  </Motion.h2>
);

const IconBtn = ({ href, icon, label, light = false }) => (
  <Motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    title={label}
    whileHover={{
      background: T.blue,
      color: T.white,
      borderColor: T.blue,
      y: -4,
      boxShadow: `0 8px 24px rgba(0, 102, 255, 0.25)`,
    }}
    whileTap={{ scale: 0.92 }}
    style={{
      width: 46,
      height: 46,
      borderRadius: "50%",
      border: `2px solid ${light ? "rgba(255, 255, 255, 0.3)" : T.border}`,
      background: light ? "rgba(255, 255, 255, 0.1)" : T.white,
      backdropFilter: light ? "blur(10px)" : "none",
      color: light ? T.white : T.ink,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 17,
      textDecoration: "none",
      transition: "all 0.3s ease",
      flexShrink: 0,
    }}
  >
    {icon}
  </Motion.a>
);

const Pill = ({ children }) => (
  <Motion.span
    whileHover={{
      background: T.blue,
      color: T.white,
      borderColor: T.blue,
      scale: 1.05,
    }}
    style={{
      display: "inline-block",
      padding: "7px 14px",
      borderRadius: 0,
      border: `1px solid ${T.border}`,
      background: T.white,
      fontFamily: T.mono,
      fontSize: 11,
      fontWeight: 600,
      color: T.muted,
      transition: "all 0.3s ease",
      textTransform: "lowercase",
      position: "relative",
    }}
  >
    <CornerBorders thickness={0.7} size={7} />
    {children}
  </Motion.span>
);

// Tech grid background
const TechGrid = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
      linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px)
    `,
      backgroundSize: "50px 50px",
      pointerEvents: "none",
    }}
  />
);

// Projects Carousel Component
const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const scrollToProject = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth / projectsData.length;
      container.scrollTo({
        left: scrollWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % projectsData.length;
    scrollToProject(nextIndex);
  };

  const prevProject = () => {
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    scrollToProject(prevIndex);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          gap: 24,
          marginBottom: 40,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {projectsData.map((project) => (
          <Motion.div
            key={project.id}
            variants={fadeUp}
            style={{
              minWidth: "100%",
              scrollSnapAlign: "start",
              position: "relative",
              background: "transparent",
              padding: 0,
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Project Image */}
            <div
              style={{
                width: "100%",
                height: "600px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Motion.button
          onClick={prevProject}
          whileHover={{
            background: T.blue,
            color: T.white,
            borderColor: T.blue,
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `2px solid ${T.border}`,
            background: T.white,
            color: T.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FaArrowLeft />
        </Motion.button>

        {/* Dots Indicator */}
        <div style={{ display: "flex", gap: 10 }}>
          {projectsData.map((_, index) => (
            <Motion.button
              key={index}
              onClick={() => scrollToProject(index)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: currentIndex === index ? 32 : 10,
                height: 10,
                borderRadius: 5,
                border: "none",
                background: currentIndex === index ? T.blue : T.border,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <Motion.button
          onClick={nextProject}
          whileHover={{
            background: T.blue,
            color: T.white,
            borderColor: T.blue,
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `2px solid ${T.border}`,
            background: T.white,
            color: T.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FaArrowRight />
        </Motion.button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Scroll helpers (overlay scrolls this div, not window)
───────────────────────────────────────────── */
function getOffsetTopWithin(el, container) {
  if (!el || !container || !container.contains(el)) return 0;
  let top = 0;
  let n = el;
  while (n && n !== container) {
    top += n.offsetTop;
    n = n.offsetParent;
  }
  if (n === container) return top;
  const cr = container.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return er.top - cr.top + container.scrollTop;
}

/* ─────────────────────────────────────────────
   MAIN PROFILE COMPONENT
───────────────────────────────────────────── */
const Profile = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const mid =
        container.scrollTop + Math.min(container.clientHeight * 0.35, 200);
      const sectionIds = navSections.map((s) => s.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const sectionTop = getOffsetTopWithin(el, container);
        if (mid >= sectionTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: T.bg,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 1000,
        fontFamily: T.body,
        color: T.ink,
        paddingBottom: "0",
      }}
    >
      <FloatingNav activeSection={activeSection} scrollContainerRef={scrollContainerRef} />

      {/* ── CLOSE BUTTON ── */}
      <Motion.button
        onClick={onClose}
        whileHover={{
          background: T.blue,
          color: T.white,
          rotate: 90,
          boxShadow: `0 0 30px rgba(0, 102, 255, 0.3)`,
        }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 1001,
          background: T.white,
          color: T.ink,
          border: `2px solid ${T.border}`,
          width: 60,
          height: 60,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          transition: "all 0.3s ease",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
        }}
      >
        <FaTimes />
      </Motion.button>

      {/* ── OSCAR SIGNATURE ── */}
      <Motion.div
        whileHover={{
          letterSpacing: "0.3em",
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 1001,
          color: T.ink,
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "0.2em",
          transition: "all 0.3s ease",
          background: "transparent",
        }}
      >
        <span
          style={{
            fontWeight: "300",
            fontSize: "28px",
          }}
        >
          OSCAR POCO
        </span>
      </Motion.div>

      {/* ════════════════════════════════
          01  HERO
      ════════════════════════════════ */}
      <AnimatedSection
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 56px 64px",
          borderBottom: `2px solid ${T.border}`,
          position: "relative",
          overflow: "hidden",
          background: T.bg,
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>
            Intermediate Software Developer | Facilitator · Johannesburg, South Africa
          </EyebrowLabel>

          <Motion.h1
            variants={fadeUp}
            style={{
              fontFamily: T.body,
              fontSize: "clamp(76px, 17vw, 200px)",
              fontWeight: 900,
              letterSpacing: "-3px",
              color: T.ink,
              margin: 0,
              textTransform: "uppercase",
              lineHeight: 0.88,
              textAlign: "center",
            }}
          >
            PORT<span style={{ color: T.blue }}></span>FOLIO
          </Motion.h1>

          <Motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              borderTop: `2px solid ${T.border}`,
              marginTop: 48,
              paddingTop: 32,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: T.blue,
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                $ fullName
              </p>
              <h2
                style={{
                  fontFamily: T.body,
                  fontSize: "clamp(26px, 4vw, 70px)",
                  fontWeight: 900,
                  margin: 0,
                  letterSpacing: "-1px",
                  color: T.ink,
                }}
              >
                OSCAR KYLE POCO
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 8,
                  marginTop: 12,
                  fontSize: 14,
                  color: T.muted,
                }}
              >
                <FaMapMarkerAlt size={13} style={{ color: T.blue }} />
                <span style={{ marginTop: 5 }}>Johannesburg, South Africa</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <IconBtn
                href="mailto:oscarkylepoco@gmail.com"
                icon={<FaEnvelope />}
                label="Email"
              />
              <IconBtn
                href="tel:+27660850741"
                icon={<FaPhone />}
                label="Phone"
              />
              <IconBtn
                href="https://github.com/Oscarpoco"
                icon={<FaGithub />}
                label="GitHub"
              />
              <IconBtn
                href="https://linkedin.com/in/oscar-poco-71528016b/"
                icon={<FaLinkedin />}
                label="LinkedIn"
              />
            </div>
          </Motion.div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          02  ABOUT
      ════════════════════════════════ */}
      <AnimatedSection
        id="about"
        style={{
          padding: "200px 56px 56px 56px",
          borderBottom: `2px solid ${T.border}`,
          background: T.bgAlt,
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>02 / About Me</EyebrowLabel>
          <BigTitle>ABOUT</BigTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 72px",
              alignItems: "start",
            }}
          >
            <Motion.div variants={fadeUp}>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.85,
                  color: "#333",
                  marginBottom: 24,
                  fontWeight: 500,
                }}
              >
                I'm a self-driven Software Developer and UI/UX designer from
                Johannesburg, passionate about building digital products that
                look good{" "}
                <em style={{ color: T.blue, fontStyle: "normal" }}>and</em> work
                beautifully. I turn complex problems into clean, accessible
                interfaces.
              </p>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.85,
                  color: "#333",
                  fontWeight: 500,
                }}
              >
                Currently sharpening my skills at World Wide Industrial Systems
                & Engineers as a Skills Facilitator (SDP) and Software Developer
                while studying Accounting Science at UNISA — because I believe
                great developers understand both code{" "}
                <em style={{ color: T.blue, fontStyle: "normal" }}>and</em>{" "}
                business.
              </p>
            </Motion.div>

            <Motion.div
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              <div
                style={{
                  padding: "24px",
                  background: T.white,
                  position: "relative",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                }}
              >
                <CornerBorders />
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: 17,
                    lineHeight: 1.65,
                    fontWeight: 600,
                    color: T.ink,
                    margin: "0 0 14px",
                  }}
                >
                  "The best interface is the one the user never has to think
                  about."
                </p>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: T.blue,
                  }}
                >
                  {"// Design mantra"}
                </span>
              </div>
            </Motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          03  SKILLS
      ════════════════════════════════ */}
      <AnimatedSection
        id="skills"
        style={{
          padding: "200px 56px 56px 56px",
          borderBottom: `2px solid ${T.border}`,
          background: T.bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>03 / Capabilities</EyebrowLabel>
          <BigTitle>SKILLS</BigTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(236px, 1fr))",
              gap: 16,
            }}
          >
            {skillsData.map((skill) => (
              <Motion.div
                key={skill.id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 102, 255, 0.12)",
                }}
                style={{
                  background: T.white,
                  padding: "28px 24px",
                  transition: "all 0.3s ease",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <CornerBorders opacity={0.4} />
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: T.blue,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 18,
                    borderRadius: "50%",
                  }}
                >
                  {skill.icon}
                </div>
                <h3
                  style={{
                    fontFamily: T.body,
                    fontSize: 16,
                    fontWeight: 700,
                    margin: "0 0 10px",
                    color: T.ink,
                  }}
                >
                  {skill.title}
                </h3>
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: T.muted,
                    margin: 0,
                  }}
                >
                  {skill.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          04  PROJECTS
      ════════════════════════════════ */}
      <AnimatedSection
        id="projects"
        style={{
          padding: "200px 56px 56px 56px",
          borderBottom: `2px solid ${T.border}`,
          background: T.bgAlt,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>04 / Featured Work</EyebrowLabel>
          <BigTitle>PROJECTS</BigTitle>

          <ProjectsCarousel />
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          05  EXPERIENCE
      ════════════════════════════════ */}
      <AnimatedSection
        id="experience"
        style={{
          padding: "200px 56px 56px 56px",
          borderBottom: `2px solid ${T.border}`,
          background: T.bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>05 / Work History</EyebrowLabel>
          <BigTitle size="clamp(46px, 10vw, 130px)">EXPERIENCE</BigTitle>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {experienceData.map((exp) => (
              <Motion.div
                key={exp.id}
                variants={fadeUp}
                whileHover={{ x: 8 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  gap: "0 52px",
                  borderTop: `2px solid ${T.border}`,
                  padding: "44px 0",
                  alignItems: "start",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: T.blue,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  >
                    {exp.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div
                      style={{
                        display: "inline-block",
                        borderRadius: 0,
                        fontFamily: T.mono,
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: T.blue,
                        background: "transparent",
                      }}
                    >
                      <CornerBorders />
                      {exp.period}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: T.muted,
                      }}
                    >
                      <FaMapMarkerAlt size={11} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: T.body,
                      fontSize: 26,
                      fontWeight: 800,
                      margin: "0 0 6px",
                      letterSpacing: "-0.5px",
                      color: T.ink,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: T.blue,
                      marginBottom: 16,
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontFamily: T.body,
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: "#444",
                      marginBottom: (exp.technologies?.length ?? 0) ? 20 : 0,
                    }}
                  >
                    {exp.description}
                  </p>
                  {(exp.technologies?.length ?? 0) > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        position: "relative",
                      }}
                    >
                      {exp.technologies.map((t) => (
                        <Pill key={`${exp.id}-${t}`}>{t}</Pill>
                      ))}
                    </div>
                  )}
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          06  EDUCATION + CERTS
      ════════════════════════════════ */}
      <AnimatedSection
        id="education"
        style={{
          padding: "200px 56px 56px 56px",
          borderBottom: `2px solid ${T.border}`,
          background: T.bgAlt,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel>06 / Academic</EyebrowLabel>
          <BigTitle size="clamp(50px, 11vw, 136px)">EDUCATION</BigTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 64,
            }}
          >
            {educationData.map((edu) => (
              <Motion.div
                key={edu.id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 102, 255, 0.12)",
                }}
                style={{
                  padding: "40px 36px",
                  background: T.white,
                  transition: "all 0.3s ease",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <CornerBorders />
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: T.blue,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 24,
                    borderRadius: "50%",
                  }}
                >
                  {edu.icon}
                </div>
                <h3
                  style={{
                    fontFamily: T.body,
                    fontSize: 21,
                    fontWeight: 800,
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                    color: T.ink,
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: T.blue,
                    marginBottom: 6,
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.blue,
                    letterSpacing: "0.12em",
                    marginBottom: edu.location ? 8 : 18,
                  }}
                >
                  {edu.period}
                </p>
                {edu.location && (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: T.body,
                      fontSize: 13,
                      color: T.muted,
                      margin: "0 0 18px",
                    }}
                  >
                    <FaMapMarkerAlt size={12} style={{ color: T.blue, flexShrink: 0 }} />
                    {edu.location}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: "#555",
                    marginBottom: 20,
                  }}
                >
                  {edu.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {edu.courses.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              </Motion.div>
            ))}
          </div>

          <Motion.div variants={fadeUp}>
            <p
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: T.ink,
                marginBottom: 24,
                borderLeft: `3px solid ${T.blue}`,
                paddingLeft: 12,
              }}
            >
              {"> Certifications & Licences"}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(218px, 1fr))",
                gap: 16,
              }}
            >
              {certificateData.map((cert) => (
                <Motion.div
                  key={cert.id}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                    background: T.white,
                    boxShadow: "0 10px 25px rgba(0, 102, 255, 0.08)",
                  }}
                  style={{
                    padding: "24px 22px",
                    background: T.bgAlt,
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    position: "relative",
                  }}
                >
                  <CornerBorders opacity={0.1} size={"100%"} thickness={.7} />
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      background: T.blue,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      borderRadius: "50%",
                    }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: T.body,
                        fontSize: 15,
                        fontWeight: 700,
                        margin: "0 0 4px",
                        lineHeight: 1.3,
                        color: T.ink,
                      }}
                    >
                      {cert.title}
                    </p>
                    <p
                      style={{
                        fontFamily: T.mono,
                        fontSize: 11,
                        color: T.blue,
                        margin: "0 0 4px",
                      }}
                    >
                      {cert.issuer}
                    </p>
                    <p
                      style={{
                        fontFamily: T.mono,
                        fontSize: 10,
                        fontWeight: 700,
                        color: T.blue,
                        letterSpacing: "0.1em",
                        margin: 0,
                      }}
                    >
                      {cert.date}
                    </p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          <Motion.div variants={fadeUp} style={{ marginTop: 64 }}>
            <p
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: T.ink,
                marginBottom: 20,
                borderLeft: `3px solid ${T.blue}`,
                paddingLeft: 12,
              }}
            >
              {"> Interests & Passions"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {interests.map((tag) => (
                <Motion.span
                  key={tag}
                  whileHover={{
                    background: T.blue,
                    color: T.white,
                    borderColor: T.blue,
                    scale: 1.05,
                  }}
                  style={{
                    display: "inline-block",
                    padding: "9px 20px",
                    borderRadius: 0,
                    border: `1px solid ${T.border}`,
                    background: T.white,
                    fontFamily: T.mono,
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.ink,
                    transition: "all 0.3s ease",
                  }}
                >
                  {tag}
                </Motion.span>
              ))}
            </div>
          </Motion.div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          07  CONTACT
      ════════════════════════════════ */}
      <AnimatedSection
        id="contact"
        style={{
          background: T.ink,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "88px 56px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Motion.p
            variants={fadeUp}
            style={{
              fontFamily: T.body,
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 21px)",
              lineHeight: 1.65,
              fontWeight: 500,
              color: "#aaa",
              marginTop: 40,
              marginBottom: 0,
              textAlign: 'center'
            }}
          >
            "Great things happen when talented people choose to collaborate —
            let's build something worth remembering."
          </Motion.p>

          <Motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px 64px",
              alignItems: "end",
              borderTop: `1px solid #333`,
              marginTop: 48,
              paddingTop: 48,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 18, justifyContent: 'center', alignItems: 'center' }}>
              {[
                {
                  icon: <FaEnvelope />,
                  text: "oscarkylepoco@gmail.com",
                  href: "mailto:oscarkylepoco@gmail.com",
                },
                {
                  icon: <FaPhone />,
                  text: "+27 660 850 741",
                  href: "tel:+27660850741",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  text: "Johannesburg, South Africa",
                  href: "#",
                },
              ].map((c) => (
                <Motion.a
                  key={c.text}
                  href={c.href}
                  whileHover={{ x: 8, color: T.blue }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    color: "#888",
                    textDecoration: "none",
                    fontFamily: T.body,
                    fontSize: 17,
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1.5px solid #2a2a2a",
                      flexShrink: 0,
                      background: "rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: T.blue,
                    }}
                  >
                    {c.icon}
                  </span>
                  {c.text}
                </Motion.a>
              ))}
            </div>
          </Motion.div>

          <div
            style={{
              borderTop: `1px solid #222`,
              marginTop: 56,
              marginBottom: 156,
              padding: "28px 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
              fontFamily: T.mono,
              fontSize: 10,
              color: "#555",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              position: "relative",
            }}
          >
            <span>© {new Date().getFullYear()} Oscar Kyle Poco</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#555",
                  margin: 0,
                }}
              >
                find me online
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <IconBtn
                  href="https://github.com/Oscarpoco"
                  icon={<FaGithub />}
                  label="GitHub"
                  light
                />
                <IconBtn
                  href="https://linkedin.com/in/oscar-poco-71528016b/"
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  light
                />
                <IconBtn
                  href="mailto:oscarkylepoco@gmail.com"
                  icon={<FaEnvelope />}
                  label="Email"
                  light
                />
              </div>
            </div>
            <span>Built with love and passion</span>

            {/* NAME */}
            <Motion.h2
              variants={fadeUp}
              style={{
                fontFamily: T.body,
                fontSize: "clamp(52px, 12vw, 248px)",
                fontWeight: 900,
                letterSpacing: "-2px",
                margin: 0,
                lineHeight: 0.88,
                color: T.white + "10",
                textTransform: "uppercase",
                position: "absolute",
                bottom: "-170%",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              OSCAR POCO
            </Motion.h2>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Profile;