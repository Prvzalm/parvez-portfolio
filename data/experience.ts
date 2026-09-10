export interface Experience {
  year: string;
  company: string;
  role: string;
  date: string;
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
  projectAssociations?: string[];
}

export const experience: Experience[] = [
  {
    year: "2025",
    company: "VLink",
    role: "Senior Developer",
    date: "DEC 2025 — PRESENT",
    responsibilities: [
      "Designed backend architecture and Node.js services for document processing, data extraction, web scraping and application workflows",
      "Built PDF/DOCX processing pipelines with AI-based extraction for unstructured documents",
      "Developed data scraping and transformation workflows using Node.js and npm libraries",
      "Implemented authentication, authorization and RBAC with user, role and permission management"
    ],
    technologies: ["Node.js", "pdf-parse", "pdfjsLib", "Mammoth", "npm"]
  },
  {
    year: "2023",
    company: "HailGro",
    role: "Full Stack Developer",
    date: "NOV 2023 — NOV 2025",
    responsibilities: [
      "Built and deployed the production-grade copartner.in platform",
      "Designed RESTful APIs for role-based dashboards and automation workflows",
      "Implemented Razorpay and PhonePe payment integrations with webhook verification",
      "Developed responsive frontend interfaces and reusable components"
    ],
    technologies: ["React", "Node.js", "REST APIs", "Razorpay", "PhonePe"]
  },
  {
    year: "2022",
    company: "Zestify",
    role: "Full Stack Developer",
    date: "APR 2022 — NOV 2023",
    responsibilities: [
      "Built and maintained Node.js and Express.js backend services",
      "Designed RESTful APIs with pagination, structured errors and frontend integration",
      "Implemented JWT authentication and role-based access control for admin and internal systems"
    ],
    technologies: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC"]
  }
];
