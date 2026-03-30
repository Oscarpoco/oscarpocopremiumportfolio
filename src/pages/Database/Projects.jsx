//  PROJECTS
import mobile from '../../assets/background-one.jpg'
 
export const projects = {
        featured: [
            {
                id: 1,
                title: "Hotel Application",
                description: "A fully responsive Hotel Application with advanced filtering, user authentication, and payment integration. Built with React, Node.js, and Firebase.",
                image: mobile,
                technologies: ["React", "Stripe", "Firebase", "CSS"],
                github: "https://github.com/Oscarpoco/hotel-application",
                liveLink: "https://hotel-application-beta.vercel.app",
                status: "completed",
                featured: true,
                completionDate: "October 2024"
            },
            {
                id: 2,
                title: "Hotel CMS Application",
                description: "Hotel Content Managment System to manage users, bookings , reviews and accomodation",
                image: mobile,
                technologies: ["React", "Firebase", "CSS"],
                github: "https://github.com/Oscarpoco/hotel-management-system",
                liveLink: "https://hotel-management-system-iota.vercel.app/",
                status: "completed",
                featured: true,
                completionDate: "October 2024"
            },
            {
                id: 3,
                title: "Employees Management System",
                description: "Employee Management , manages current employees and old employees , add new new employees and delete employees",
                image: mobile,
                technologies: ["React", "CSS", "Local Storage"],
                github: "https://github.com/Oscarpoco/gamefusion",
                liveLink: "https://gamefusion-eight.vercel.app/",
                status: "completed",
                featured: true,
                completionDate: "In Progress"
            }
        ],
        current: [
            {
                id: 4,
                title: "AI-Powered Task Manager",
                description: "Smart task management application that uses machine learning to prioritize tasks based on user behavior and deadlines. Features include voice commands and natural language processing.",
                image: mobile,
                technologies: ["React", "Python", "TensorFlow", "Django"],
                github: "https://github.com/username/ai-task-manager",
                liveLink: "https://ai-tasks.example.com",
                status: "current",
                featured: true,
                completionDate: "In Progress"
            },
            {
                id: 5,
                title: "Virtual Reality Tour App",
                description: "An immersive VR tour application allowing users to explore historical landmarks with interactive elements and educational content.",
                image: mobile,
                technologies: ["Three.js", "WebXR", "React", "Firebase"],
                github: "https://github.com/username/vr-tour",
                liveLink: "https://vr-tour.example.com",
                status: "current",
                featured: true,
                completionDate: "In Progress"
            },
            {
                id: 6,
                title: "Climate Change Analytics Dashboard",
                description: "Real-time analytics dashboard visualizing climate data from various sources with predictive modeling capabilities.",
                image: mobile,
                technologies: ["D3.js", "React", "Python", "AWS"],
                github: "https://github.com/username/climate-dashboard",
                liveLink: null,
                status: "current",
                featured: false,
                completionDate: "In Progress"
            }
        ],
        completed: [
            {
                id: 7,
                title: "E-Commerce Platform",
                description: "A fully responsive e-commerce platform with advanced filtering, user authentication, and payment integration. Built with React, Node.js, and MongoDB.",
                image: mobile,
                technologies: ["React", "Node.js", "MongoDB", "Express"],
                github: "https://github.com/username/e-commerce",
                liveLink: "https://e-commerce-example.com",
                status: "completed",
                featured: true,
                completionDate: "March 2025"
            },
            {
                id: 8,
                title: "Blockchain Voting System",
                description: "Secure and transparent voting system built on blockchain technology. Features include identity verification and real-time results.",
                image: mobile,
                technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
                github: "https://github.com/username/blockchain-voting",
                liveLink: "https://blockchain-vote.example.com",
                status: "completed",
                featured: false,
                completionDate: "January 2025"
            },
            {
                id: 9,
                title: "Health & Fitness Tracking App",
                description: "Comprehensive health tracking application with workout plans, nutrition tracking, and progress visualization.",
                image: mobile,
                technologies: ["React Native", "Firebase", "Node.js"],
                github: "https://github.com/username/fitness-app",
                liveLink: "https://fitness-app.example.com",
                status: "completed",
                featured: false,
                completionDate: "November 2024"
            }
        ]
    };
