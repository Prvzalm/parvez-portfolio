export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  siteUrl: string;
  email: string;
  location: string;
  resumeUrl: string;
  githubUrl: string;
  linkedInUrl: string;
}

export const site: SiteConfig = {
  name: "Parvez Alam",
  title: "Full-Stack Developer",
  description: "Parvez Alam builds modern web products, full-stack systems and useful digital experiences.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "TODO",
  email: "prvzalm69@gmail.com",
  location: "TODO",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com/Prvzalm",
  linkedInUrl: "https://www.linkedin.com/in/parvez013"
};
