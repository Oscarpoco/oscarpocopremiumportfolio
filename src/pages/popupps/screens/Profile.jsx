import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUniversity,
  FaMedal,
  FaCertificate,
  FaCar,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaCode,
} from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { HiCode } from "react-icons/hi";
import { RiTeamLine } from "react-icons/ri";
import { IoMdTrophy } from "react-icons/io";
import {
  FiMonitor,
  FiSmartphone,
  FiGrid,
  FiEdit2,
  FiSettings,
  FiLayers,
  FiCoffee,
  FiPenTool,
  FiDatabase,
} from "react-icons/fi";

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
const experienceData = [
  {
    id: 1,
    company: "Mlab CodeTribe Academy",
    position: "Junior React Developer",
    period: "Jul 2024 – Mar 2025",
    location: "Soweto, JHB",
    description:
      "Developed responsive web applications with React, Node.js, Express, MongoDB & Firebase, as well as mobile applications using React Native and Expo.",
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
    ],
    icon: <HiCode />,
  },
  {
    id: 2,
    company: "City of Joburg – EPWP",
    position: "Jozi Ihlomile Educator",
    period: "Jan 2023 – Jun 2024",
    location: "Lawley 2, JHB",
    description:
      "Door-to-door community educator covering HIV/AIDS, TB, STDs, substance abuse, and social support referrals in priority wards across Johannesburg.",
    technologies: [],
    icon: <BsBriefcase />,
  },
  {
    id: 3,
    company: "Power Learn Project Academy",
    position: "Data Collector",
    period: "Apr 2024 – May 2024",
    location: "Remote",
    description:
      "Reached out to South African PLP alumni to gather qualitative feedback on their learning experience and programme outcomes.",
    technologies: [],
    icon: <RiTeamLine />,
  },
  {
    id: 4,
    company: "Power Learn Project Academy",
    position: "Web Developer – Scholarship",
    period: "Jan 2023 – May 2023",
    location: "Virtually",
    description:
      "Built a functional and visually appealing website using HTML, CSS & JavaScript as part of a fully funded scholarship programme.",
    technologies: ["HTML/CSS", "JavaScript", "React"],
    icon: <IoMdTrophy />,
  },
];

const skillsData = [
  {
    id: 1,
    title: "UI/UX Design",
    icon: <FiMonitor />,
    desc: "User-centered interfaces & exceptional experiences.",
  },
  {
    id: 2,
    title: "App Design",
    icon: <FiSmartphone />,
    desc: "Beautiful application interfaces that boost engagement.",
  },
  {
    id: 3,
    title: "Website Design",
    icon: <FiGrid />,
    desc: "Responsive layouts that work across all screen sizes.",
  },
  {
    id: 4,
    title: "UI Design",
    icon: <FiEdit2 />,
    desc: "Aesthetic, functional UI components & systems.",
  },
  {
    id: 5,
    title: "Design System",
    icon: <FiSettings />,
    desc: "Cohesive component libraries for product consistency.",
  },
  {
    id: 6,
    title: "Wireframing",
    icon: <FiLayers />,
    desc: "Structural blueprints before a single line of code.",
  },
  {
    id: 7,
    title: "Brand Identity",
    icon: <FiCoffee />,
    desc: "Visual identity systems that resonate with audiences.",
  },
  {
    id: 8,
    title: "Poster Design",
    icon: <FiPenTool />,
    desc: "Visually compelling communication assets.",
  },
  {
    id: 9,
    title: "Web App Design",
    icon: <FiDatabase />,
    desc: "Dynamic, interactive responsive web applications.",
  },
  {
    id: 10,
    title: "Scrum Master",
    icon: <FiMonitor />,
    desc: "Agile facilitation & team impediment removal.",
  },
  {
    id: 11,
    title: "Entrepreneurship",
    icon: <FiCoffee />,
    desc: "Identifying opportunities & building new ventures.",
  },
];

const educationData = [
  {
    id: 1,
    degree: "Diploma in Accounting Science",
    institution: "University of South Africa (UNISA)",
    period: "2024 – Current",
    description:
      "Financial accounting, auditing, taxation & business law — building analytical and ethical foundations for a professional accounting career.",
    courses: [
      "Financial Accounting",
      "Management Accounting",
      "Auditing Theory",
      "SA Tax Law",
      "Corporate Governance",
    ],
    icon: <FaGraduationCap />,
  },
  {
    id: 2,
    degree: "National Senior Certificate",
    institution: "N'wanati High School",
    period: "2014 – 2018",
    description:
      "Strong emphasis on Mathematics & Physical Science. Led peer tutoring groups and participated in science fairs.",
    courses: ["Mathematics", "Physical Science", "English FAL", "Geography"],
    icon: <FaUniversity />,
  },
];

const certificateData = [
  {
    id: 1,
    title: "React Course NQF 5",
    issuer: "CodeTribe",
    date: "April 2025",
    icon: <FaLaptopCode />,
  },
  {
    id: 2,
    title: "Web Development",
    issuer: "PLP Academy",
    date: "December 2023",
    icon: <FaCode />,
  },
  {
    id: 3,
    title: "National Senior Certificate",
    issuer: "Umalusi",
    date: "December 2018",
    icon: <FaMedal />,
  },
  {
    id: 4,
    title: "Digital Literacy Productivity",
    issuer: "Microsoft",
    date: "June 2022",
    icon: <FaCertificate />,
  },
  {
    id: 5,
    title: "Basic HAST Training",
    issuer: "ANOVA Health Institute",
    date: "January 2022",
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 6,
    title: "Software Development",
    issuer: "Microsoft & LinkedIn",
    date: "December 2022",
    icon: <FaLaptopCode />,
  },
  {
    id: 7,
    title: "Code 10 C1 Driving Licence",
    issuer: "SA Licensing Department",
    date: "April 2024",
    icon: <FaCar />,
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
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
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
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      style={style}
    >
      {children}
    </motion.section>
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

// Floating Glass Navigation
const FloatingNav = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 24,
        left: "32%",
        transform: "translate(-50%, -50%)",
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
        <motion.button
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
        </motion.button>
      ))}
    </motion.nav>
  );
};

const EyebrowLabel = ({ children, color = T.blue }) => (
  <motion.p
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
  </motion.p>
);

const BigTitle = ({ children, size = "clamp(64px, 13vw, 148px)" }) => (
  <motion.h2
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
  </motion.h2>
);

const IconBtn = ({ href, icon, label, light = false }) => (
  <motion.a
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
  </motion.a>
);

const Pill = ({ children }) => (
  <motion.span
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
  </motion.span>
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

/* ─────────────────────────────────────────────
   MAIN PROFILE COMPONENT
───────────────────────────────────────────── */
const Profile = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map((s) => s.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: T.bg,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 1000,
        fontFamily: T.body,
        color: T.ink,
      }}
    >
      <FloatingNav activeSection={activeSection} />

      {/* ── CLOSE BUTTON ── */}
      <motion.button
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
      </motion.button>

      {/* ── OSCAR SIGNATURE ── */}
      <motion.div
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
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <span
          style={{
            fontWeight: "300",
            fontSize: "28px",
          }}
        >
          {"{"} PRO ? 'OSCAR' : NULL {" }"}
        </span>
      </motion.div>

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
            Intermediate Software Developer | Facilitator · Johannesburg, South
            Africa
          </EyebrowLabel>

          <motion.h1
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
          </motion.h1>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              borderTop: `2px solid ${T.border}`,
              marginTop: 48,
              paddingTop: 32,
            }}
          >
            <div>
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
          </motion.div>
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
            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div
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
            </motion.div>
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
              <motion.div
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
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          04  EXPERIENCE
      ════════════════════════════════ */}
      <AnimatedSection
        id="experience"
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
          <EyebrowLabel>04 / Work History</EyebrowLabel>
          <BigTitle size="clamp(46px, 10vw, 130px)">EXPERIENCE</BigTitle>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {experienceData.map((exp) => (
              <motion.div
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
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
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
                    }}
                  >
                    {exp.icon}
                  </div>
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
                      marginBottom: exp.technologies.length ? 20 : 0,
                    }}
                  >
                    {exp.description}
                  </p>
                  {exp.technologies.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        position: "relative",
                      }}
                    >
                      {exp.technologies.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          05  EDUCATION + CERTS
      ════════════════════════════════ */}
      <AnimatedSection
        id="education"
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
          <EyebrowLabel>05 / Academic</EyebrowLabel>
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
              <motion.div
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
                    marginBottom: 18,
                  }}
                >
                  {edu.period}
                </p>
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
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp}>
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
                <motion.div
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
                  <CornerBorders opacity={0.3} size={15} />
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: 64 }}>
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
                <motion.span
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
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
          06  CONTACT
      ════════════════════════════════ */}
      <AnimatedSection
        id="contact"
        style={{
          background: T.ink,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TechGrid />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "88px 56px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EyebrowLabel color={T.blue}>06 / Let's Connect</EyebrowLabel>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: T.body,
              fontSize: "clamp(52px, 12vw, 148px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              margin: 0,
              lineHeight: 0.88,
              color: T.white,
              textTransform: "uppercase",
            }}
          >
            CONTACT
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: T.body,
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 21px)",
              lineHeight: 1.65,
              fontWeight: 500,
              color: "#aaa",
              maxWidth: 540,
              marginTop: 40,
              marginBottom: 0,
            }}
          >
            "Great things happen when talented people choose to collaborate —
            let's build something worth remembering."
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "48px 64px",
              alignItems: "end",
              borderTop: `1px solid #333`,
              marginTop: 48,
              paddingTop: 48,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
                <motion.a
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
                </motion.a>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                alignItems: "flex-end",
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
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: `1.5px solid #333`,
              borderRadius: 0,
              padding: "10px 22px",
              marginTop: 44,
              fontFamily: T.body,
              fontSize: 13,
              fontWeight: 600,
              color: "#999",
              background: "rgba(255, 255, 255, 0.03)",
              position: "relative",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "0",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
              }}
            />
            <CornerBorders />
            Available for new opportunities
          </motion.div>

          <div
            style={{
              borderTop: `1px solid #222`,
              marginTop: 56,
              padding: "28px 0",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              fontFamily: T.mono,
              fontSize: 10,
              color: "#555",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>© 2026 Oscar Kyle Poco</span>
            <span>Built with React & Framer Motion</span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Profile;
