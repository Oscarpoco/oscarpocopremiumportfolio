
import { FaGraduationCap, FaUniversity, FaMedal, FaCertificate, FaCar, FaLaptopCode, FaChalkboardTeacher, FaCode  } from 'react-icons/fa';



export const educationData = [
    {
        id: 1,
        degree: "Diploma in Accounting Science",
        institution: "University of South Africa (UNISA)",
        period: "2024 - Current",
        location: "South Africa",
        description: "Focused on financial accounting, auditing, taxation, and business law. This program prepares students for a professional career in accounting with strong analytical and ethical foundations.",
        courses: [
            "Financial Accounting Principles",
            "Management Accounting",
            "Auditing Theory and Practice",
            "South African Tax Law",
            "Corporate Governance"
        ],
        icon: <FaGraduationCap />
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
        icon: <FaUniversity />
    }
];


export const certificateData = [
        {
            id: 1,
            title: "React Course NQF 5",
            issuer: "CodeTribe",
            date: "April 2025",
            icon: <FaLaptopCode  />,
            color: "#FF9900"
        },
        {
            id: 2,
            title: "Web Development",
            issuer: "PLP Academy",
            date: "December 2023",
            icon: <FaCode  />,
            color: "#4285F4"
        },
        {
            id: 3,
            title: "National Senior Certificate",
            issuer: "Umalusi",
            date: "December 2018",
            icon: <FaMedal />,
            color: "#0078D4"
        },
        {
            id: 4,
            title: "Digital Literacy Productivity",
            issuer: "Microsoft",
            date: "June 2022",
            icon: <FaCertificate  />,
            color: "#FF6F00"
        },
        {
            id: 5,
            title: "Basic Hast Training",
            issuer: "ANOVA Health Institute",
            date: "January 2022",
            icon: <FaChalkboardTeacher  />,
            color: "#01B3E3"
        },
        {
            id: 6,
            title: "Software Development",
            issuer: "Microsoft An LinkedIn",
            date: "December 2022",
            icon: <FaLaptopCode  />,
            color: "#2A73CC"
        },
        {
            id: 7,
            title: "Code 10 C1 Driving License",
            issuer: "South African Licensing Department",
            date: "April 2024",
            icon: <FaCar />,
            color: "#4CAF50"
        }
    ];