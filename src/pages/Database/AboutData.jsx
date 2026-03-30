
// ICONS
import { FaFolderOpen, FaCalendarAlt, FaSmile } from 'react-icons/fa';

export const portfolioStats = [
        {
            id: 1,
            title: "PROJECTS",
            icon: <FaFolderOpen className="folder-icon" />,
            count: "3+",
            color: "#2363C7", // Blue
            gradient: "linear-gradient(135deg, #2363C7, #4285F4)",
            users: [
                "https://i.pravatar.cc/150?img=1",
                "https://i.pravatar.cc/150?img=2",
                "https://i.pravatar.cc/150?img=3",
                "https://i.pravatar.cc/150?img=4"
            ]
        },
        {
            id: 2,
            title: "EXPERIENCE",
            icon: <FaCalendarAlt className="folder-icon" />,
            count: "1+",
            subtitle: "Years",
            color: "#1FA463", 
            gradient: "linear-gradient(135deg, #1FA463, #27AE60)",
            users: [
                "https://i.pravatar.cc/150?img=5",
                "https://i.pravatar.cc/150?img=6",
                "https://i.pravatar.cc/150?img=7"
            ]
        },
        {
            id: 3,
            title: "HAPPY CLIENTS",
            icon: <FaSmile className="folder-icon" />,
            count: "10+",
            color: "#E74C3C", // Red
            gradient: "linear-gradient(135deg, #E74C3C, #FF7675)",
            users: [
                "https://i.pravatar.cc/150?img=8",
                "https://i.pravatar.cc/150?img=9",
                "https://i.pravatar.cc/150?img=10",
                "https://i.pravatar.cc/150?img=11"
            ]
        }
    ];


export const featuredProjects = [
        {
            id: 1,
            name: "Hotel Application",
            category: "Web Development",
            icon: "https://img.icons8.com/fluency/48/000000/online-store.png",
            lastModified: "Apr 12, 2025",
            type: "React.js", 
            link: "https://hotel-application-beta.vercel.app"
        },
        {
            id: 2,
            name: "Restaurant Reservation CMS",
            category: "Mobile App",
            icon: "https://img.icons8.com/fluency/48/000000/todo-list.png",
            lastModified: "Mar 28, 2025",
            type: "React Native",
            link: "https://github.com/mLab-alscar-projects"
        },
        {
            id: 3,
            name: "Hotel CMS Application",
            category: "Web Development",
            icon: "https://img.icons8.com/fluency/48/000000/web-design.png",
            lastModified: "Apr 18, 2025",
            type: "React.js",
            link: "https://hotel-management-system-iota.vercel.app/"
        }
    ];