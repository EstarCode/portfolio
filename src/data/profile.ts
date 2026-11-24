import type { Profile } from "../types";

export const profile: Profile = {
  name: "Abraham Tiruneh",
  title: "Full-Stack Developer",
  headline: "Full-Stack & Systems Developer",
  availability: "Available for projects & full-time roles",
  bio: "Building production-grade web and mobile applications, distributed backend systems, and AI-integrated platforms.",

  photos: [
    "/assets/photos/photo1.jpg",
    "/assets/photos/photo2.jpg",
  ],
  avatarUrl: "/assets/photos/photo1.jpg",

  location: "Addis Ababa, Ethiopia",
  email: "abraham.tiruneh7@gmail.com",
  phone: "+251924276862",

  socials: {
    email: "abraham.tiruneh7@gmail.com",
    linkedin: "https://linkedin.com/in/abraham-tiruneh",
    telegram: "https://t.me/kokpic",
    whatsapp: "https://wa.me/251924276862",
    github: "https://github.com/EstarCode",
    phone: "+251924276862",
  },

  background: {
    headline: "About",
    paragraphs: [
      "I grew up in Ethiopia with a deep curiosity about how things work — systems, structures, and ideas. Long before I wrote my first line of code, I was asking how technology could lift communities and push what is possible.",
      "Earning a place at Haddis Alemayehu Special Boarding School was the turning point of my early years. Competing alongside Ethiopia's sharpest students built intellectual discipline and a foundation in mathematics, physics, and computational thinking.",
      "Today I am a third-year Software Engineering student at Addis Ababa Science and Technology University — founding Finkison AI to broaden access to quality education, building EthioFarm under INSA's Cyber Talent Track to protect smallholder farmers, and conducting aerospace research at SSGI.",
      "My focus is the intersection of artificial intelligence, scalable infrastructure, and aerospace — building systems that empower the next generation across Africa.",
    ],
  },

  projects: [
    {
      name: "Finkison AI",
      category: "AI EdTech",
      icon: "ai",
      summary: "Learning and school management platform for Ethiopian secondary schools (Grades 9–12), integrating Gemini AI tutoring, interactive STEM simulations, and administrative portals.",
      tags: ["React 18", "TypeScript", "Django REST", "PostgreSQL", "Gemini AI", "Redis", "PWA"],
      highlights: [
        "Four role-based portals (Students, Teachers, Admins, Parents) with JWT authentication and granular permissions.",
        "AI-assisted tutoring and localized curriculum content generation using the Google Gemini API.",
        "Interactive virtual STEM laboratory simulations for physics, chemistry, and biology concepts.",
        "Offline-first progressive web app with trilingual interface (English, Amharic, Afaan Oromoo).",
      ],
      links: [
        { label: "Live Platform", href: "https://finkison-hazel.vercel.app/" },
      ],
    },
    {
      name: "EthioFarm",
      category: "Agricultural Tech",
      icon: "agriculture",
      summary: "Multi-hazard agricultural intelligence platform providing satellite monitoring, IoT soil telemetry, and early warning alerts for Ethiopian smallholder farmers across all 15 regions.",
      tags: ["Flutter", "Node.js", "PostgreSQL", "PostGIS", "Gemini Vision", "Cloudflare Workers", "Supabase"],
      highlights: [
        "Algorithmic hazard scoring: precipitation indices for drought, flood risk modeling, and locust swarm tracking.",
        "Instant crop disease diagnosis from mobile photos powered by Gemini Vision and computer vision models.",
        "Multi-channel broadcast delivery across USSD (*212#), SMS, push notifications, and web dashboards.",
        "Offline-first Flutter mobile application with local caching for low-connectivity rural field environments.",
      ],
      links: [
        { label: "Download App", href: "https://drive.google.com/file/d/1y71KTIHfFaIaEqArmZm9yI5O4IOSx0Ys/view?usp=sharing" },
      ],
    },
    {
      name: "BetimesPDF",
      category: "Document Intelligence",
      icon: "document",
      summary: "Intelligent document processing platform featuring semantic search, automated structured data extraction, and cross-document contextual retrieval.",
      tags: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "OpenAI"],
      highlights: [
        "Semantic PDF search and passage retrieval powered by dense vector embeddings.",
        "Automated data extraction pipeline with customizable field schemas and structured export.",
        "Multi-tenant workspace architecture with organization-level access controls and audit logging.",
      ],
      links: [
        { label: "Live App", href: "https://betimes-ashen.vercel.app/" },
      ],
    },
    {
      name: "EthioSpace",
      category: "Aerospace Observatory",
      icon: "space",
      summary: "Interactive 3D astrophysics and space observatory platform providing real-time satellite orbital tracking, astronomical simulations, and educational space science data.",
      tags: ["React", "Three.js", "TypeScript", "Django Channels", "WebSocket", "NASA APIs"],
      highlights: [
        "Interactive 3D celestial body rendering and real-time orbital trajectory simulations using Three.js.",
        "Real-time event streaming and observational data distribution via WebSockets and Django Channels.",
        "Offline-capable PWA with local asset caching for continuous access in low-bandwidth environments.",
        "Curated astronomical datasets and educational modules tailored for Ethiopian students and researchers.",
      ],
      links: [
        { label: "Live Observatory", href: "https://ethio-space.vercel.app/" },
      ],
    },
  ],

  experience: [
    {
      role: "Team Leader & Lead Software Architect",
      org: "INSA — Cyber Talent Development Track",
      period: "Jul 2024 – Present",
      location: "Addis Ababa, Ethiopia",
      points: [
        "Lead software engineering and architectural initiatives under Ethiopia's national Cyber Talent Development Track.",
        "Architected and implemented EthioFarm end-to-end, including mobile application, backend microservices, and telemetry pipelines.",
        "Standardized API contracts, relational schemas, and asynchronous communication patterns across project teams.",
      ],
    },
    {
      role: "Space Systems Researcher & Project Fellow",
      org: "SSGI — EthioSpace Kids Club",
      period: "Jul 2024 – Present",
      location: "Ethiopian Science Museum, Addis Ababa",
      points: [
        "Conduct research and practical projects in rocketry, UAV systems, GIS, and observational astronomy.",
        "Presented aerospace engineering prototypes at STRIDE Expo (Ethiopian Science Museum) for the Ministry of Innovation and Technology.",
        "Collaborated with the Future African Space Explorers STEM Academy (FASESA) on payload analysis and space science outreach.",
      ],
    },
  ],

  skills: {
    "Frontend": ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    "Backend": ["Node.js", "Python", "Django", "PostgreSQL", "Redis", "REST / GraphQL"],
    "Mobile & DevOps": ["Flutter", "Docker", "GitHub Actions", "Cloudflare Workers", "Linux"],
    "AI & Data": ["Google Gemini API", "OpenAI", "PostGIS", "Vector Embeddings", "Supabase"],
  },

  education: [
    {
      school: "Addis Ababa Science and Technology University",
      degree: "B.S. in Software Engineering",
      period: "Sep 2023 – Jun 2027",
      details: "Third-year student focused on software architecture, distributed systems, and modern web engineering.",
    },
    {
      school: "Haddis Alemayehu Special Boarding School",
      degree: "Secondary Education",
      period: "Completed",
      details: "Competitive STEM-focused boarding school that shaped rigorous analytical thinking and a foundation in mathematics and science.",
    },
  ],

  certificates: [
    {
      title: "EthioFarm Smart Farming System",
      issuer: "Space Science and Geospatial Institute (SSGI)",
      date: "August 2026",
      image: "/assets/certificates/cert_ssgi_ethiofarm.jpg",
    },
    {
      title: "ESSLCE — National Examination",
      issuer: "Ministry of Education • 90.33% average • 542 / 600",
      date: "November 2024",
      image: "/assets/certificates/cert_esslce.jpg",
      verifyUrl: "https://verify.eaes.et/ZN56527562024HR",
    },
    {
      title: "Computer Networks",
      issuer: "Huawei ICT Academy",
      date: "April 2026",
      image: "/assets/certificates/cert_huawei_networks.jpg",
    },
    {
      title: "Django Backend Track",
      issuer: "Google Developer Groups AASTU",
      date: "April 2026",
      image: "/assets/certificates/cert_gdg_django.jpg",
    },
    {
      title: "Ethio Space Summer Programme",
      issuer: "Space Science and Geospatial Institute (SSGI)",
      date: "August 2025",
      image: "/assets/certificates/cert_ssgi_space_program.jpg",
    },
  ],
};
