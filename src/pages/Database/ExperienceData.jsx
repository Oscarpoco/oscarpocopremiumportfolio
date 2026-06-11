
import { BsBriefcase } from 'react-icons/bs';
import { HiCode } from 'react-icons/hi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdTrophy } from 'react-icons/io';

export const experienceData = [
        {
            id: 0,
            company: "World Wide Industrial Systems & Engineers",
            position: "Software Development Facilitator & Software Developer",
            period: "Jun 2025 - Current",
            location: "Upington, Northern Cape, South Africa",
            description: "Facilitated an NQF5 Software Development Learnership by delivering comprehensive instruction in software fundamentals, workplace readiness, and project-based learning. Guided learners through coding, debugging, teamwork practices, and assessment preparations. Responsible for classroom management, curriculum delivery, learner mentorship, and progress tracking in accordance with SAQA standards.",
            technologies: ["Curriculum Delivery", "Mentoring", "Assessment Preparation", "NQF5 SD Learnership", "Facilitation", "Software Fundamentals", "Workplace Readiness", "Project-based Learning"],
            icon: <HiCode />,
            category: "facilitation",
        },
   
        {
            id: 1,
            company: "Mlab CodeTribe Academy",
            position: "Junior React Developer",
            period: "Jul 2024 - Mar 2025",
            location: "Soweto, JHB",
            description: "Developed responsive web applications utilizing React, Node.js, Express, MongoDB, and Firebase, as well as mobile applications with React Native, Expo, Node.js, Express, MongoDB, and Firebase.",
            technologies: ["React", "TypeScript", "REST", "Redux", "React Native", "Node", "Express", "JavaScript", "MongoDB", "Firebase"],
            icon: <HiCode />,
            category: "development",
        },
        {
            id: 2,
            company: "City of Joburg - EPWP",
            position: "Jozi Ihlomile Educator",
            period: "Jan 2023 - Jun 2024",
            location: "Lawley 2, JHB",
            description: "Door to Door Educator Primary Function: - To Educate members of the community during door to door education campaigns in priority wards, about HIV & AIDS, TB, STD, Substance abuse, Sigma and other health, Social matters and to refer those in need to relevant local services for poverty relief, social support and health care according to their needs",
            technologies: [],
            icon: <BsBriefcase />,
            category: "community",
        },
        {
            id: 3,
            company: "Power Learn Project Academy",
            position: "Data Collector",
            period: "Apr 2024 - May 2024",
            location: "Remote Location",
            description: "Calling all the Power Learn Project Academy Alumni from South Africa, asking for feedback from them about the Power Learn Project experience.",
            technologies: [],
            icon: <RiTeamLine />,
            category: "research",
        },
        {
            id: 4,
            company: "Power Learn Project Academy",
            position: "Web Developer - Scholarship",
            period: "Jan 2023 - May 2023",
            location: "Virtually",
            description: "Developed a functional and visually appealing website utilizing HTML and CSS, thereby enhancing my front-end development skills.  ",
            technologies: ["HTML/CSS", "JavaScript", "React"],
            icon: <IoMdTrophy />,
            category: "development",
        }
    ];

export const EXPERIENCE_CATEGORIES = [
    { id: "all", label: "All roles" },
    { id: "development", label: "Development" },
    { id: "facilitation", label: "Facilitation" },
    { id: "community", label: "Community" },
    { id: "research", label: "Research" },
];