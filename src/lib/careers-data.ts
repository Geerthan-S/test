import {
  Building2,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Award,
  BookOpen,
  Briefcase,
  CalendarCheck,
  TrendingUp,
  MapPin,
  Clock,
  CircleDollarSign,
  FileCheck,
  ShieldAlert,
  Users,
  Compass,
} from "lucide-react";

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatarLetter: string;
  tenure: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: any;
}

export interface ValueProp {
  title: string;
  icon: any;
  description: string;
  microinteraction: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon: any;
}

export const valueProps: ValueProp[] = [
  {
    title: "Work on Landmark Projects",
    icon: Building2,
    description: "Get direct site execution exposure on large-scale industrial projects for Fortune 500 multinationals and leading infrastructure clients.",
    microinteraction: "Scale animation on hover & subtle maroon border glow.",
  },
  {
    title: "Learn from Experts",
    icon: GraduationCap,
    description: "Be mentored directly by veteran project directors, ISO auditors, and chartered engineers with decades of tier-1 infrastructure experience.",
    microinteraction: "Shift up translation and text color transition.",
  },
  {
    title: "Fast-Track Career Growth",
    icon: TrendingUp,
    description: "We bypass rigid corporate bureaucracies. Performance-driven appraisals mean clear merit-based promotions and leadership roles.",
    microinteraction: "Arrow lift micro-animation on title hover.",
  },
  {
    title: "Cross-Functional Exposure",
    icon: Compass,
    description: "Expand your capabilities. Move fluidly between site engineering, quantity surveying, planning, QA/QC, and safety audits.",
    microinteraction: "Icon rotation effect on card hover.",
  },
  {
    title: "Safety-First Culture",
    icon: HardHat,
    description: "Your safety is our top operational metric. We maintain absolute compliance with international EHS guidelines and zero-incident standards.",
    microinteraction: "Pulse highlight on card edge.",
  },
  {
    title: "Technical Ownership & Accountability",
    icon: HeartHandshake,
    description: "We empower you with complete field execution rights. Manage site resources, authorize technical details, and own deliverables.",
    microinteraction: "Inner shadow reveal on card hover.",
  },
];

export const benefits: Benefit[] = [
  {
    title: "Competitive Compensation",
    description: "Top-of-market salary packages with annual performance bonuses and project completion rewards.",
    icon: CircleDollarSign,
  },
  {
    title: "Professional Training",
    description: "Regular technical training in advanced surveying, project scheduling, and safety protocols.",
    icon: BookOpen,
  },
  {
    title: "Structured Mentorship",
    description: "One-on-one professional guidance from senior project managers and executive leadership.",
    icon: Users,
  },
  {
    title: "Clear Career Progression",
    description: "A transparent performance matrices framework defining your path from graduate trainee to project head.",
    icon: Award,
  },
  {
    title: "Safe Working Environment",
    description: "Comprehensive health insurance, personal protective equipment (PPE), and EHS compliance on all sites.",
    icon: FileCheck,
  },
  {
    title: "Merit Recognition",
    description: "Monthly awards, peer recognition programs, and cash bonuses for exceptional site execution.",
    icon: CalendarCheck,
  },
  {
    title: "Hands-on Site Exposure",
    description: "Get real field exposure working with total stations, advanced concrete labs, and heavy earthmoving machinery.",
    icon: Briefcase,
  },
  {
    title: "Long-Term Opportunities",
    description: "Continuous professional association with a stable order book of multi-year contracts.",
    icon: TrendingUp,
  },
];

export const jobOpenings: JobOpening[] = [
  {
    id: "project-manager-industrial",
    title: "Project Manager – Industrial Civil",
    department: "Project Management",
    experience: "8+ Years",
    location: "Chennai",
    type: "Full-Time",
    skills: ["Project Scheduling", "Client Management", "Subcontractor Coordination", "Billing & Cost Control", "EHS Compliance"],
  },
  {
    id: "planning-engineer",
    title: "Planning Engineer",
    department: "Engineering",
    experience: "3-5 Years",
    location: "Bengaluru",
    type: "Full-Time",
    skills: ["Primavera P6", "MS Project (MSP)", "Progress Reports", "Delay Analysis", "Resource Allocation"],
  },
  {
    id: "qa-qc-engineer",
    title: "QA/QC Engineer",
    department: "QA/QC",
    experience: "3-5 Years",
    location: "Site-based",
    type: "Full-Time",
    skills: ["Concrete Testing", "NDT Testing", "Method Statements", "Quality Documentation", "ISO Audits"],
  },
  {
    id: "safety-officer",
    title: "Safety Officer",
    department: "Safety",
    experience: "2-5 Years",
    location: "Site-based",
    type: "Full-Time",
    skills: ["NEBOSH IGC", "EHS Audits", "Toolbox Talks", "Incident Investigation", "Risk Assessment"],
  },
  {
    id: "site-engineer",
    title: "Site Engineer – Civil",
    department: "Engineering",
    experience: "0-2 Years",
    location: "Chennai",
    type: "Full-Time",
    skills: ["Site Supervision", "Drawing Interpretation", "Labor Management", "Quantity Measurement", "Quality Checks"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Ramanathan K.",
    role: "Project Manager (Industrial Civil)",
    text: "At Dockside, execution is backed by real engineering freedom. I led the Whirlpool India works program containing over 20 repeat scopes. The ownership given to technical leaders here is unmatched in the industry.",
    avatarLetter: "R",
    tenure: "4 Years at Dockside",
  },
  {
    id: "testimonial-2",
    name: "Priya Sharma",
    role: "Planning Engineer",
    text: "Working with Dockside’s scheduling team allowed me to integrate Primavera P6 with direct site milestones. The cross-functional exposure here accelerated my planning and cost control skills dramatically.",
    avatarLetter: "P",
    tenure: "3 Years at Dockside",
  },
  {
    id: "testimonial-3",
    name: "Arun Kumar",
    role: "Site QA/QC Engineer",
    text: "Quality checking at Dockside is not a checkbox process. We run advanced testing labs right on site. Learning from senior ISO auditors has elevated my QA standards to a world-class level.",
    avatarLetter: "A",
    tenure: "2 Years at Dockside",
  },
  {
    id: "testimonial-4",
    name: "Suresh Pillai",
    role: "Senior Safety Coordinator",
    text: "Safety isn't a poster here; it's a mandatory workflow. The management empowers safety officers to halt execution if guidelines aren't met. That’s a level of commitment you rarely see.",
    avatarLetter: "S",
    tenure: "5 Years at Dockside",
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    title: "Application Submission",
    description: "Submit your updated resume via our portal or direct email along with key project references.",
    icon: Briefcase,
  },
  {
    step: "02",
    title: "Initial HR Screening",
    description: "A conversation to review your core qualifications, location preferences, and career expectations.",
    icon: Users,
  },
  {
    step: "03",
    title: "Technical Discussion",
    description: "A panel interview with our Project Directors to discuss your technical expertise and site experiences.",
    icon: HardHat,
  },
  {
    step: "04",
    title: "Offer & Verification",
    description: "Upon selection, we perform reference checks and extend a competitive remuneration package proposal.",
    icon: Award,
  },
  {
    step: "05",
    title: "Onboarding & Induction",
    description: "Join the team, undergo ISO guidelines training, and receive site EHS safety induction.",
    icon: CalendarCheck,
  },
];
