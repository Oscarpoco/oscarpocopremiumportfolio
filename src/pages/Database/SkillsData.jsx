import {
    FiCode,
    FiServer,
    FiDatabase,
    FiSmartphone,
    FiLayers,
    FiCloud,
    FiShield,
    FiBookOpen,
    FiUsers,
    FiBarChart2,
} from 'react-icons/fi';
import { SiPython, SiOpenjdk } from 'react-icons/si';

export const skillsData = [
    {
        id: 1,
        title: "React & TypeScript",
        icon: <FiCode />,
        description:
            "Building responsive web interfaces with React, TypeScript, and modern state patterns (including Redux), aligned with production-grade front-end workflows.",
        link: "https://react.dev/",
    },
    {
        id: 2,
        title: "Node.js & REST APIs",
        icon: <FiServer />,
        description:
            "Developing server-side logic with Node.js and Express, designing RESTful APIs, and connecting clients to robust back-end services.",
        link: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
    },
    {
        id: 3,
        title: "MongoDB & Firebase",
        icon: <FiDatabase />,
        description:
            "Modeling and querying data with MongoDB, and integrating Firebase for auth, realtime features, and serverless backends in full-stack apps.",
        link: "https://www.mongodb.com/resources/products/fundamentals/overview",
    },
    {
        id: 4,
        title: "React Native & Mobile",
        icon: <FiSmartphone />,
        description:
            "Shipping cross-platform mobile experiences with React Native and Expo alongside shared JavaScript tooling and APIs.",
        link: "https://reactnative.dev/",
    },
    {
        id: 5,
        title: "Systems Analysis & Architecture",
        icon: <FiLayers />,
        description:
            "Analyzing requirements, structuring solutions, and applying systems design thinking learned through formal IT application development study.",
        link: "https://www.ibm.com/topics/systems-analysis",
    },
    {
        id: 6,
        title: "Cloud & Deployments",
        icon: <FiCloud />,
        description:
            "Applying cloud fundamentals and deployment-minded practices anchored by Oracle Cloud Infrastructure and modern hosted services.",
        link: "https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm",
    },
    {
        id: 7,
        title: "Security & Compliance",
        icon: <FiShield />,
        description:
            "Grounding development in information systems security concepts and awareness of standards such as ISO 27001 alongside secure coding habits.",
        link: "https://www.iso.org/standard/27001",
    },
    {
        id: 8,
        title: "Technical Training & Assessment",
        icon: <FiBookOpen />,
        description:
            "Facilitating NQF-aligned software development learnerships, mentoring learners through projects and assessments, and supporting workplace readiness outcomes.",
        link: "https://www.saqa.org.za/",
    },
    {
        id: 9,
        title: "Agile Collaboration",
        icon: <FiUsers />,
        description:
            "Working in iterative, team-based delivery with emphasis on collaboration, backlog-driven progress, and clear communication across stakeholders.",
        link: "https://www.agilealliance.org/agile101/",
    },
    {
        id: 10,
        title: "Python",
        icon: <SiPython />,
        description:
            "Writing clear, maintainable Python for scripting, APIs, automation, and data workflows that complement broader application delivery.",
        link: "https://www.python.org/",
    },
    {
        id: 11,
        title: "Java",
        icon: <SiOpenjdk />,
        description:
            "Applying object-oriented design and JVM-based development for robust backends, portability, and integration with enterprise-style systems.",
        link: "https://docs.oracle.com/en/java/",
    },
    {
        id: 12,
        title: "Power BI & Data Analysis",
        icon: <FiBarChart2 />,
        description:
            "Building interactive dashboards and reports in Power BI, shaping metrics and visuals so stakeholders can explore trends and support decisions.",
        link: "https://powerbi.microsoft.com/",
    },
];
