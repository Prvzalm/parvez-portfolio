export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Frontend", items: ["React.js", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Component-driven architecture"] },
  { label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "MongoDB", "MySQL", "JWT authentication", "RBAC", "Database indexing", "Query optimization"] },
  { label: "Infrastructure", items: ["AWS", "Nginx", "S3", "EC2", "Docker", "Vercel", "Render", "Git", "GitHub", "Postman", "Webhooks"] },
  { label: "Data & AI", items: ["PDF/DOCX parsing", "pdf-parse", "pdfjsLib", "Mammoth", "AI-based data extraction", "Web scraping", "Data transformation"] }
];

export const buildSteps = ["Understand", "Design", "Build", "Break", "Improve", "Ship"];
