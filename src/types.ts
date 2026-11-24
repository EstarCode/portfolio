export interface Link {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  category?: string;
  summary: string;
  tags: string[];
  image?: string;
  icon?: "space" | "agriculture" | "document" | "ai";
  highlights?: string[];
  links?: Link[];
}

export interface Job {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  details?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  image: string; // e.g. "/cert1.svg" or "/cert1.jpg" in public/
  verifyUrl?: string;
}

export interface SocialChannels {
  email: string;
  linkedin?: string;
  telegram?: string;
  whatsapp?: string;
  github?: string;
  phone?: string;
}

export interface BackgroundInfo {
  headline?: string;
  paragraphs: string[];
}

export interface Profile {
  name: string;
  title: string;
  headline?: string;
  bio: string;
  photos: string[];
  avatarUrl?: string;
  location: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  availability?: string;
  stackTitle?: string;
  socials: SocialChannels;
  background?: BackgroundInfo;
  projects: Project[];
  experience: Job[];
  skills: Record<string, string[]>;
  education: Education[];
  certificates?: Certificate[];
}
