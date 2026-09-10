export type ProjectStatus = "complete" | "in-progress" | "TODO";
export type ProjectAccent = "blue" | "orange" | "lime" | "purple";

export interface Project {
  number: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  technologies: string[];
  problem: string;
  technicalChallenge: string;
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  status: ProjectStatus;
  featured: boolean;
  accent: ProjectAccent;
}

const todo = "TODO — add verified details";

export const projects: Project[] = [
  {
    number: "01",
    title: "CodeCraftedAI Website Platform",
    category: "WEB PLATFORM",
    year: "TODO",
    shortDescription: "A full-stack website platform built around reusable interfaces and connected services.",
    fullDescription: "Developed reusable React components and integrated frontend applications with backend services and external APIs.",
    role: "Full Stack Developer",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript", "REST APIs"],
    problem: "TODO — add the verified product problem.",
    technicalChallenge: "Building maintainable, responsive workflows across frontend components and backend services.",
    githubUrl: "TODO",
    status: "complete",
    featured: true,
    accent: "blue"
  },
  {
    number: "02",
    title: "Algorooms Analytics Dashboard",
    category: "ANALYTICS / DASHBOARD",
    year: "TODO",
    shortDescription: "An interactive dashboard for visualizing and managing structured business data.",
    fullDescription: "Developed reusable dashboard components and integrated REST APIs for dynamic data-driven views.",
    role: "Full Stack Developer",
    technologies: ["React.js", "REST APIs", "Dashboard architecture", "Data visualization"],
    problem: "TODO — add the verified business problem.",
    technicalChallenge: "Designing a modular, responsive dashboard architecture for maintainable data-driven views.",
    githubUrl: "https://github.com/Prvzalm/Algorooms-Dashboard",
    status: "complete",
    featured: true,
    accent: "purple"
  },
  {
    number: "03",
    title: "Realtime Whiteboard",
    category: "COLLABORATION",
    year: "TODO",
    shortDescription: "Real-time collaborative whiteboard application.",
    fullDescription: todo,
    role: todo,
    technologies: [todo],
    problem: todo,
    technicalChallenge: todo,
    githubUrl: "https://github.com/Prvzalm/realtime-whiteboard",
    status: "TODO",
    featured: false,
    accent: "orange"
  },
  {
    number: "04",
    title: "LMS System",
    category: "EDUCATION",
    year: "TODO",
    shortDescription: "Learning management system.",
    fullDescription: todo,
    role: todo,
    technologies: [todo],
    problem: todo,
    technicalChallenge: todo,
    githubUrl: "https://github.com/Prvzalm/LMS_system",
    status: "TODO",
    featured: false,
    accent: "lime"
  },
  {
    number: "05",
    title: "Main Website",
    category: "PERSONAL / MAIN WEB PROJECT",
    year: "TODO",
    shortDescription: "Personal / main web project.",
    fullDescription: todo,
    role: todo,
    technologies: [todo],
    problem: todo,
    technicalChallenge: todo,
    githubUrl: "https://github.com/Prvzalm/MainWebSite",
    status: "TODO",
    featured: false,
    accent: "purple"
  },
  ...["Copartner.in", "Telegram Gatekeeper Bot", "Strategy Builder", "Resume Analyzer", "AdminPoster", "Animachi"].map(
    (title, index): Project => ({
      number: String(index + 6).padStart(2, "0"),
      title,
      category: "EXPERIMENT / PROJECT",
      year: "TODO",
      shortDescription: todo,
      fullDescription: todo,
      role: todo,
      technologies: [todo],
      problem: todo,
      technicalChallenge: todo,
      githubUrl: "TODO",
      status: "TODO",
      featured: false,
      accent: ["blue", "orange", "lime", "purple"][index % 4] as ProjectAccent
    })
  )
];

export const featuredProjects = projects.filter((project) => project.featured);
export const experiments = projects.filter((project) => !project.featured);
