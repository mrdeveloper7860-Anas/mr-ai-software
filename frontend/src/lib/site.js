import {
  Code2, BrainCircuit, Workflow, Cloud, Smartphone, RefreshCcw,
  GraduationCap, HeartPulse, ShoppingCart, Building2, Landmark, Bot,
  Target, PenTool, Hammer, FlaskConical, Rocket,
  Lightbulb, Puzzle, Cpu, ShieldCheck, TrendingUp, Handshake,
  FileText, ScanText, BarChart3, MessageSquare, Phone, Mic, Search, Zap, FileSpreadsheet,
} from "lucide-react";

export const COMPANY = {
  legal: "MR AI Software Technologies Private Limited",
  brand: "MR AI",
  tagline: "Building the Future with Artificial Intelligence & Software Innovation",
  tagline2: "Technology That Simplifies. AI That Works.",
  email: "mrdeveloper7860@gmail.com",
  phone: "+91 84178 61398",
  phoneHref: "tel:+918417861398",
  location: "Mahoba, Uttar Pradesh, India",
  mission: "To simplify real-world work through intelligent software, automation and artificial intelligence.",
  vision: "To build accessible, secure, intelligent and practical technology that makes everyday work simpler and more efficient.",
};

export const NAV_LINKS = [
  { label: "Solutions", to: "/solutions", testid: "nav-link-solutions" },
  { label: "AI & Automation", to: "/ai-automation", testid: "nav-link-ai-automation" },
  { label: "Products", to: "/products", testid: "nav-link-products" },
  { label: "Portfolio", to: "/portfolio", testid: "nav-link-portfolio" },
  { label: "About", to: "/about", testid: "nav-link-about" },
  { label: "Contact", to: "/contact", testid: "nav-link-contact" },
];

export const PRINCIPLES = [
  { num: "01", title: "Simplicity", desc: "Software that feels obvious to use — designed around real workflows, not technical jargon." },
  { num: "02", title: "Security", desc: "Security-focused development and privacy-conscious architecture from the first commit." },
  { num: "03", title: "Scalability", desc: "Systems engineered to grow — from a single office to organizations across the country." },
  { num: "04", title: "Intelligence", desc: "Practical AI applied where it genuinely saves time, reduces errors and assists people." },
];

export const SOLUTIONS = [
  { num: "01", slug: "custom-software", title: "Custom Software", desc: "Business software designed around your actual workflow.", icon: Code2,
    detail: "Off-the-shelf tools force your team to adapt to them. We build the opposite — software shaped around how your organization already works: billing, records, approvals, reporting and day-to-day operations, delivered as clean, maintainable systems." },
  { num: "02", slug: "ai-solutions", title: "AI Solutions", desc: "Practical artificial intelligence for automation, assistance and intelligent workflows.", icon: BrainCircuit,
    detail: "From AI assistants that answer staff questions to document intelligence that reads and organizes paperwork, we apply AI where it produces measurable relief — not demos that never leave the lab." },
  { num: "03", slug: "business-automation", title: "Business Automation", desc: "Reduce repetitive manual work by connecting people, processes and systems.", icon: Workflow,
    detail: "Reminders, follow-ups, data entry, report generation and approvals consume hours every week. We map these repetitive loops and automate them end-to-end — including WhatsApp and messaging workflows your customers already use." },
  { num: "04", slug: "cloud-solutions", title: "Cloud Solutions", desc: "Modern cloud-ready applications and scalable infrastructure.", icon: Cloud,
    detail: "We design applications to run reliably in the cloud — accessible from anywhere, backed up, and able to scale as usage grows, without your team managing servers." },
  { num: "05", slug: "web-mobile", title: "Web & Mobile", desc: "Modern, responsive and user-friendly digital experiences.", icon: Smartphone,
    detail: "Fast, responsive websites and mobile applications that represent your organization professionally — from customer-facing portals to internal dashboards, built with modern tooling." },
  { num: "06", slug: "digital-transformation", title: "Digital Transformation", desc: "Move from paper-based and disconnected processes to efficient digital systems.", icon: RefreshCcw,
    detail: "Registers, spreadsheets and WhatsApp threads hold many organizations together. We help move those processes into structured digital systems — gradually, without disrupting daily work." },
];

export const AI_CAPABILITIES = [
  { icon: Bot, label: "AI Assistants" },
  { icon: Zap, label: "AI Automation" },
  { icon: FileText, label: "Document Intelligence" },
  { icon: ScanText, label: "OCR" },
  { icon: FileSpreadsheet, label: "AI Reports" },
  { icon: MessageSquare, label: "Chatbots" },
  { icon: Phone, label: "WhatsApp Automation" },
  { icon: Mic, label: "Voice Interfaces" },
  { icon: Search, label: "Intelligent Search" },
  { icon: Workflow, label: "Workflow Automation" },
];

export const PRODUCTS = [
  { name: "MR EduTech", slug: "edutech", desc: "School & College Management", icon: GraduationCap, status: "In Development",
    detail: "Admissions, attendance, fees, examinations and parent communication in one campus platform." },
  { name: "MR HealthTech", slug: "healthtech", desc: "Hospital & Clinic Management", icon: HeartPulse, status: "In Development",
    detail: "Appointments, patient records, billing and pharmacy workflows for clinics and hospitals." },
  { name: "MR Commerce", slug: "commerce", desc: "Retail, Billing & Inventory", icon: ShoppingCart, status: "Coming Soon",
    detail: "Point-of-sale billing, stock tracking and supplier management for retail businesses." },
  { name: "MR Office", slug: "office", desc: "HR, Payroll & Attendance", icon: Building2, status: "Coming Soon",
    detail: "Employee records, attendance, leave and payroll processing for growing offices." },
  { name: "MR Property", slug: "property", desc: "Real Estate & Property Management", icon: Landmark, status: "Coming Soon",
    detail: "Plot, project and customer management with payment schedules for real estate teams." },
  { name: "MR AI Assistant", slug: "ai-assistant", desc: "AI-powered business assistance", icon: Bot, status: "In Development",
    detail: "A context-aware assistant that answers questions and automates routine business tasks." },
];

export const FLAGSHIP_FEATURES = [
  "Student Management", "Fee Management", "Transactions", "Receipts", "Expenses",
  "Dashboard", "Reports", "Search & Filtering", "Role-Based Access",
];

export const WHY_MR_AI = [
  { icon: Lightbulb, title: "Problem-First Thinking", desc: "We start with your operational problem, not with a technology we want to sell." },
  { icon: Puzzle, title: "Custom-Built Solutions", desc: "Software shaped around your workflow — not generic templates your team must fight." },
  { icon: Cpu, title: "AI-Ready Architecture", desc: "Systems designed so practical AI capabilities can be added as your needs evolve." },
  { icon: ShieldCheck, title: "Secure Development", desc: "Security-focused development practices and privacy-conscious architecture by default." },
  { icon: TrendingUp, title: "Scalable Technology", desc: "Built to serve a single office today and an entire organization tomorrow." },
  { icon: Handshake, title: "Long-Term Support", desc: "We stay after launch — maintaining, improving and evolving what we build together." },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand the business problem.", icon: Target },
  { num: "02", title: "Design", desc: "Plan the product and user experience.", icon: PenTool },
  { num: "03", title: "Build", desc: "Develop the software and technology.", icon: Hammer },
  { num: "04", title: "Test", desc: "Test usability, performance and reliability.", icon: FlaskConical },
  { num: "05", title: "Launch & Improve", desc: "Deploy, monitor and continuously improve.", icon: Rocket },
];

export const FOUNDERS = [
  { name: "Mohd Anas Siddiqui", initials: "MAS" },
  { name: "Nafis Mohammad", initials: "NM" },
  { name: "Sultan Ahmad", initials: "SA" },
  { name: "Mohammad Azhad", initials: "MA" },
];

export const PORTFOLIO = [
  { name: "Fee Management System", label: "DEMO", desc: "Digital fee collection, receipts, expenses and reporting for educational institutions.", tags: ["React", "FastAPI", "Dashboards"] },
  { name: "Real Estate Planner", label: "UI CONCEPT", desc: "Plot layouts, payment schedules and customer tracking for property developers.", tags: ["Maps UI", "Scheduling", "ERP"] },
  { name: "Business Management Software", label: "UI CONCEPT", desc: "Unified billing, inventory and staff management for multi-branch businesses.", tags: ["Billing", "Inventory", "Roles"] },
  { name: "Custom Web Applications", label: "UI CONCEPT", desc: "Responsive client portals and internal tools built around specific workflows.", tags: ["Responsive", "Portals", "APIs"] },
  { name: "AI Automation Concepts", label: "UI CONCEPT", desc: "Explorations in document intelligence, chat assistants and automated reporting.", tags: ["AI", "OCR", "Chat"] },
];

export const SERVICE_OPTIONS = [
  "Custom Software", "AI Solution", "Web Development", "Mobile Application",
  "Business Automation", "Cloud Solutions", "Digital Transformation", "Other",
];

export const SOCIALS = ["LinkedIn", "Instagram", "Facebook", "YouTube", "GitHub"];
