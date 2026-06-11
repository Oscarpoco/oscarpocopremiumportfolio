import {
  MdSchool,
  MdWork,
  MdEngineering,
  MdHealthAndSafety,
  MdCode,
  MdPhoneInTalk,
  MdFactory,
} from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";

/** Chronological order (by start year) */
const journeyStepsUnsorted = [
  {
    id: "high-school",
    title: "N'wanati High School",
    role: "National Senior Certificate",
    year: "2014 – 2018",
    note: "Mathematics & Physical Science — the foundation.",
    details:
      "Completed matric with Mathematics and Physical Science, building analytical thinking and discipline before any formal tech training. That STEM base still shapes how I break down problems, reason about systems, and learn new stacks quickly.",
    type: "education",
    status: "completed",
    colorToken: "warning",
    icon: MdSchool,
  },
  {
    id: "sw-gauteng",
    title: "South West Gauteng College",
    role: "Mechanical Engineering",
    year: "2019",
    note: "I didn't finish this course — but it pushed me to pivot.",
    details:
      "Enrolled in Mechanical Engineering NATED studies. I left the programme before qualifying — not a failure story, but a turning point: I realised my energy belonged in software, not the workshop floor. The engineering mindset (structure, precision, iteration) carried straight into how I write code today.",
    type: "education",
    status: "failed",
    colorToken: "danger",
    icon: MdEngineering,
  },
  {
    id: "plp-scholarship",
    title: "Power Learn Project",
    role: "Web Developer — Scholarship",
    year: "2023",
    note: "HTML, CSS & React — my first real dev bootcamp.",
    details:
      "Selected for PLP's intensive web development scholarship. Daily sprints through HTML, CSS, JavaScript, and React — first exposure to component thinking, Git workflows, and shipping small projects under deadline. This is where I went from curious tinkerer to someone who could build and deploy a real front end.",
    type: "education",
    status: "completed",
    colorToken: "primary-light",
    icon: MdCode,
  },
  {
    id: "jozi-ihlomile",
    title: "City of Joburg — EPWP",
    role: "Jozi Ihlomile Educator",
    year: "2023 – 2024",
    note: "Door-to-door community health education in Lawley.",
    details:
      "Employed on the EPWP Jozi Ihlomile programme, educating households in Lawley on health and wellness door to door. Built communication, empathy, and explaining complex ideas simply — skills that show up every day when I mentor learners, run demos, or write user-facing copy for products.",
    type: "experience",
    status: "completed",
    colorToken: "secondary",
    icon: MdHealthAndSafety,
  },
  {
    id: "plp-data",
    title: "Power Learn Project",
    role: "Data Collector",
    year: "2024",
    note: "Alumni feedback calls across South Africa.",
    details:
      "Returned to PLP as a data collector, conducting structured alumni outreach and feedback calls nationwide. Logged outcomes, spotted patterns in graduate journeys, and helped the organisation improve programme quality — early practice in listening, documenting, and turning conversations into actionable insight.",
    type: "experience",
    status: "completed",
    colorToken: "primary-light",
    icon: MdPhoneInTalk,
  },
  {
    id: "codetribe",
    title: "Mlab CodeTribe Academy",
    role: "Junior React Developer",
    year: "2024 – 2025",
    note: "React, React Native, Node & MongoDB in production.",
    details:
      "Immersive academy and placement building production apps with React, React Native, Node.js, and MongoDB. Worked in teams on real briefs: API design, state management, mobile builds, and code review. This period cemented full-stack habits and the confidence to own features end to end.",
    type: "experience",
    status: "completed",
    colorToken: "success",
    icon: MdCode,
  },
  {
    id: "wwise",
    title: "World Wide Industrial Systems",
    role: "Software Dev Facilitator & Developer",
    year: "2025 – Present",
    note: "NQF5 learnership facilitation + building software.",
    details:
      "Facilitating NQF Level 5 software development learnerships while building and maintaining applications for the organisation. Split time between mentoring cohorts (HTML, CSS, JavaScript, React, Git) and delivering internal tools — combining teaching, delivery, and stakeholder communication in one role.",
    type: "experience",
    status: "current",
    colorToken: "secondary",
    icon: MdFactory,
  },
  {
    id: "rosebank",
    title: "Rosebank International University",
    role: "Diploma — Application Development",
    year: "2026 – Present",
    note: "Formalising everything I've learned on the road.",
    details:
      "Pursuing a Diploma in Application Development to formalise years of self-directed and bootcamp learning. Modules align with industry standards in software design, databases, and engineering practice — backing practical portfolio work with accredited structure and theory.",
    type: "education",
    status: "current",
    colorToken: "primary",
    icon: HiOutlineAcademicCap,
  },
];

const startYearFrom = (year) => {
  const m = String(year).match(/\d{4}/);
  return m ? Number(m[0]) : 0;
};

export const journeySteps = [...journeyStepsUnsorted].sort(
  (a, b) => startYearFrom(a.year) - startYearFrom(b.year)
);

export const STEP_COLOR_TOKENS = {
  warning: "var(--accent-warning)",
  danger: "var(--accent-danger)",
  primary: "var(--primary)",
  "primary-light": "var(--primary-light)",
  success: "var(--accent-success)",
  secondary: "var(--secondary-color)",
};

export function getStepColor(step) {
  return STEP_COLOR_TOKENS[step.colorToken] || "var(--primary)";
}
