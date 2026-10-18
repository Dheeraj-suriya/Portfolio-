
export const EMAIL = "dheerajsuriya5@gmail.com";
export const PHONE = "+919916137007";
export const LINKEDIN = "https://www.linkedin.com/in/dheeraj-suriya-40606b379";
export const GITHUB = "https://github.com/Dheeraj-suriya";
export const RESUME = "/Dheeraj_Suriya_Resume.pdf";

export const skills: Record<string, string[]> = {
  Programming: ["Python", "Java", "C++", "C", "JavaScript", "SQL", "HTML5", "CSS3"],
  "AI/ML": ["Machine Learning", "Deep Learning", "Generative AI", "Prompt Engineering", "RAG Fundamentals"],
  "Web Development": ["React.js", "FastAPI", "Flask", "Node.js", "REST APIs", "JWT Authentication"],
  Databases: ["MySQL", "MongoDB", "SQLite", "SQLAlchemy"],
  "Data Analysis": ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
  Tools: ["Git", "GitHub", "Hugging Face", "Anaconda", "Google Cloud", "VS Code"],
};

export const experience = [
  {
    role: "AI/ML Intern",
    org: "Pluto Academy",
    points: [
      "Applied AI/ML concepts and contributed to machine learning project development.",
    ],
  },
  {
    role: "Data Analysis Intern",
    org: "Pluto Academy",
    points: [
      "Performed data cleaning, exploratory data analysis, and visualization using Python, Pandas, NumPy, Matplotlib, and Seaborn.",
      "Analyzed datasets to identify trends and communicate insights through visualizations.",
    ],
  },
  {
    role: "Artificial Intelligence Intern",
    org: "CodeAlpha",
    points: [
      "Completed an Artificial Intelligence virtual internship.",
      "Received a completion certificate and letter of recommendation.",
    ],
  },
  {
    role: "Knowledge Associate",
    org: "GenZenius",
    points: [
      "Contribute learning resources and knowledge-sharing content.",
      "Support technology-focused learning and community knowledge-sharing initiatives.",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  cat: string;
  tech: string[];
  summary: string;
  problem: string;
  approach: string;
  features: string[];
  kind: string;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "privacyaudit",
    title: "PrivacyAudit AI — AI-Powered Privacy Policy Auditor",
    cat: "AI/ML",
    kind: "Featured · Backend application",
    github: "https://github.com/Dheeraj-suriya/Privacy-Audit-AI",
    tech: ["Python", "FastAPI", "SQLAlchemy", "JWT", "PDF Processing"],
    summary:
      "A privacy-auditing application that analyzes uploaded PDF privacy policies and identifies potential privacy concerns.",
    problem:
      "Privacy policies are long and hard to review by hand. This project explores helping a reviewer spot potential concerns faster.",
    approach:
      "A FastAPI backend with REST APIs, JWT-based authentication and SQLAlchemy persistence accepts PDF uploads, runs backend audit workflows, scores compliance and risk, and returns structured findings.",
    features: [
      "JWT-based authentication",
      "PDF uploads",
      "Audit status tracking",
      "Findings retrieval",
      "Compliance and risk scoring",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Sales Analysis",
    cat: "Data Analytics",
    kind: "Data analysis project",
    github: "https://github.com/Dheeraj-suriya/E-commerce-sales-analytics",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    summary:
      "Cleaned and analyzed e-commerce datasets to explore sales performance.",
    problem:
      "Raw sales data needs cleaning and visualization before trends become visible.",
    approach:
      "Data cleaning and preprocessing with Pandas and NumPy, followed by exploratory analysis and charts built with Matplotlib and Seaborn.",
    features: [
      "Data cleaning and preprocessing",
      "Exploratory data analysis",
      "Category-level revenue visualization",
      "Monthly sales trends",
    ],
  },
  {
    id: "parking",
    title: "Smart Parking System",
    cat: "Full Stack",
    kind: "Full-stack web app",
    github: "https://github.com/Dheeraj-suriya/smart-Praking-System",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "REST APIs"],
    summary:
      "A web application for parking-slot tracking and reservation management.",
    problem:
      "Finding and reserving parking slots needs a shared, up-to-date record.",
    approach:
      "A React.js front end talks to Express and Node.js REST APIs, with MongoDB storing parking data.",
    features: [
      "Parking-slot tracking",
      "Reservation management",
      "REST APIs",
      "Database operations",
    ],
  },
  {
    id: "chatbot",
    title: "Smart FAQ Chatbot",
    cat: "AI/ML",
    kind: "Desktop application",
    github: "https://github.com/Dheeraj-suriya/AI-Applications",
    tech: ["Python", "CustomTkinter", "SQLite", "JSON"],
    summary:
      "A desktop FAQ chatbot with an interactive GUI, fuzzy string matching, and automated responses.",
    problem:
      "Repeated questions can be answered automatically from a stored FAQ set.",
    approach:
      "A CustomTkinter interface matches user questions to stored answers with fuzzy string matching; FAQs live in SQLite and JSON.",
    features: [
      "Desktop graphical interface",
      "Fuzzy string matching",
      "Automated FAQ responses",
      "SQLite and JSON data management",
    ],
  },
];

export const certs = [
  { t: "Data Analytics Job Simulation", i: "Deloitte", c: "Data" },
  {
    t: "IBM watsonx Assistant: Virtual Assistants in the Age of Generative AI",
    i: "IBM",
    c: "AI",
  },
  {
    t: "AWS Certified Developer – Associate Course",
    i: "Infosys Springboard (course, not an official AWS credential)",
    c: "Cloud",
  },
  {
    t: "Introduction to Artificial Intelligence",
    i: "Coursera",
    c: "AI",
  },
  {
    t: "TCS iON Career Edge – Young Professional",
    i: "TCS iON",
    c: "Career",
  },
  { t: "Prompt Engineering", i: "Infosys Springboard", c: "AI" },
  { t: "Front-End Web Developer", i: "Infosys Springboard", c: "Web" },
];

export const nodes = [
  {
    id: "AI/ML",
    d: "Machine learning, deep learning, generative AI and prompt engineering.",
  },
  {
    id: "PYTHON",
    d: "Primary language across PrivacyAudit AI, data analysis and the FAQ chatbot.",
  },
  {
    id: "BACKEND APIs",
    d: "FastAPI, Flask, Node.js, REST APIs and JWT authentication.",
  },
  {
    id: "DATA ANALYTICS",
    d: "Pandas, NumPy, Matplotlib and Seaborn for cleaning, EDA and charts.",
  },
  {
    id: "WEB DEVELOPMENT",
    d: "React.js, HTML5, CSS3 and JavaScript for full-stack projects.",
  },
];

export const pipeline = [
  {
    n: "PDF document",
    d: "A signed-in user uploads a privacy policy PDF through the REST API.",
  },
  {
    n: "Document processing",
    d: "The backend processes the PDF into text the audit can work with.",
  },
  {
    n: "Audit workflow",
    d: "An audit record is created and its status can be tracked while it runs.",
  },
  {
    n: "Risk and compliance scoring",
    d: "Backend workflows score compliance and risk for potential concerns.",
  },
  {
    n: "Structured findings",
    d: "Findings are stored and retrieved through the API for privacy review.",
  },
];
