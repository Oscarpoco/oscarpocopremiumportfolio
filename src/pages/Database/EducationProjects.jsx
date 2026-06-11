
import { FaGraduationCap, FaUniversity, FaMedal, FaCertificate, FaCar, FaLaptopCode, FaChalkboardTeacher, FaCode, FaCloud  } from 'react-icons/fa';



export const educationData = [
    {
        id: 1,
        degree: "Diploma in Information Technology in Application Development",
        institution: "Rosebank International University College",
        period: "2026 - Current",
        location: "South Africa",
        description: "Comprehensive program focusing on software development, programming, systems analysis, and database management. Prepares students to design, develop, and implement IT applications and solutions for real-world problems.",
        courses: [
            "Software Development Fundamentals",
            "Application Programming",
            "Systems Analysis and Design",
            "Database Management Systems",
            "Web Development",
            "Information Systems Security"
        ],
        icon: <FaGraduationCap />,
        status: "in-progress",
    },
    {
        id: 2,
        degree: "National Senior Certificate",
        institution: "N'wanati High School",
        period: "2014 - 2018",
        location: "Limpopo, South Africa",
        description: "Completed with a strong emphasis on Mathematics and Physical Sciences. Participated in science fairs, led peer tutoring groups, and achieved better results in multiple subjects.",
        courses: [
            "Mathematics",
            "Physical Science",
            "English FAL",
            "Geography",
        ],
        icon: <FaUniversity />,
        status: "completed",
    }
];

export const EDUCATION_FILTERS = [
    { id: "all", label: "All qualifications" },
    { id: "in-progress", label: "In progress" },
    { id: "completed", label: "Completed" },
];

export const CERTIFICATE_CATEGORIES = [
    { id: "all", label: "All certificates" },
    { id: "development", label: "Development" },
    { id: "cloud", label: "Cloud" },
    { id: "security", label: "Security" },
    { id: "professional", label: "Professional" },
    { id: "other", label: "Other" },
];


export const certificateData = [
        {
            id: 1,
            title: "React Course",
            issuer: "CodeTribe",
            date: "April 2025",
            icon: <FaLaptopCode  />,
            color: "#FF9900",
            category: "development",
        },
        {
            id: 2,
            title: "Web Development",
            issuer: "PLP Academy",
            date: "December 2023",
            icon: <FaCode  />,
            color: "#4285F4",
            category: "development",
        },
        {
            id: 3,
            title: "National Senior Certificate",
            issuer: "Umalusi",
            date: "December 2018",
            icon: <FaMedal />,
            color: "#0078D4",
            category: "other",
        },
        {
            id: 4,
            title: "Digital Literacy Productivity",
            issuer: "Microsoft",
            date: "June 2022",
            icon: <FaCertificate  />,
            color: "#FF6F00",
            category: "professional",
        },
        {
            id: 5,
            title: "Basic Hast Training",
            issuer: "ANOVA Health Institute",
            date: "January 2022",
            icon: <FaChalkboardTeacher  />,
            color: "#01B3E3",
            category: "other",
        },
        {
            id: 6,
            title: "Software Development",
            issuer: "Microsoft An LinkedIn",
            date: "December 2022",
            icon: <FaLaptopCode  />,
            color: "#2A73CC",
            category: "development",
        },
        {
            id: 7,
            title: "Code 10 C1 Driving License",
            issuer: "South African Licensing Department",
            date: "April 2024",
            icon: <FaCar />,
            color: "#4CAF50",
            category: "other",
        },
        {
            id: 8,
            title: "Oracle Cloud Infrastructure",
            issuer: "Oracle",
            date: "2025",
            icon: <FaCloud  />,
            color: "#2A73CC",
            category: "cloud",
        },
        {
            id: 9,
            title: "ISO 27001:2022",
            issuer: "World Wide Industrial Systems & Engineers",
            date: "2025",
            icon: <FaCertificate  />,
            color: "#0078D4",
            category: "security",
        },
        {
            id: 10,
            title: "SDP Assessor",
            issuer: "Thuso Training",
            date: "October 2025",
            icon: <FaChalkboardTeacher  />,
            color: "#01B3E3",
            category: "professional",
        }
    ];