import { 
  User, 
  Lightbulb, 
  Briefcase,
  Building2,
  Users,
  Target,
  Palette,
  Shield,
  Layout,
  Image,
  BarChart3,
  Code,
  Settings,
  Monitor,
  Play,
  Server,
  Rocket,
  TrendingUp,
  BookOpen,
  Mail
} from "lucide-react";

export interface NavigationItem {
  name: string;
  description: string;
  icon: any;
  href: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export interface MegaMenuContent {
  sections: NavigationSection[];
}

// Separate the mega menu data for better performance and maintainability
export const megaMenuContent: Record<string, MegaMenuContent> = {
  "About": {
    sections: [
      {
        title: "Overview",
        items: [
          { name: "My Story", description: "Marketing strategist & systems architect", icon: User, href: "/about" },
          { name: "Philosophy", description: "Strategy meets architecture", icon: Lightbulb, href: "/about" },
          { name: "Experience", description: "8+ years in marketing & tech", icon: Briefcase, href: "/about" }
        ]
      }
    ]
  },
  "Case Studies": {
    sections: [
      {
        title: "Featured Projects",
        items: [
          { name: "Graston Technique", description: "Healthcare training transformation", icon: Building2, href: "/case-studies/graston-technique" },
          { name: "Black Letter Legal", description: "Logo design & brand identity", icon: Users, href: "/case-studies/black-letter-legal" },
          { name: "Gomez Craft Barbecue", description: "Restaurant brand & digital presence", icon: Target, href: "/case-studies/gomez-craft-barbecue" }
        ]
      }
    ]
  },
  "Creative Design": {
    sections: [
      {
        title: "Design Categories",
        items: [
          { name: "Logo Design", description: "Custom logos & brand marks", icon: Palette, href: "/creative-design#logos" },
          { name: "Brand Identity", description: "Complete visual systems", icon: Shield, href: "/creative-design#branding" },
          { name: "Print Materials", description: "Business cards & collateral", icon: Layout, href: "/creative-design#print" },
          { name: "Digital Graphics", description: "Web & social media assets", icon: Image, href: "/creative-design#digital" }
        ]
      }
    ]
  },
  "Skills": {
    sections: [
      {
        title: "Core Marketing",
        items: [
          { name: "Strategy", description: "Data-driven marketing strategy", icon: Target, href: "/skills#strategy" },
          { name: "Analytics", description: "Performance measurement", icon: BarChart3, href: "/skills#analytics" },
          { name: "Content", description: "Creative content marketing", icon: Lightbulb, href: "/skills#content" }
        ]
      },
      {
        title: "Technical Skills",
        items: [
          { name: "Web Development", description: "React, TypeScript, Node.js", icon: Code, href: "/skills#development" },
          { name: "Automation", description: "CRM & workflow automation", icon: Settings, href: "/skills#automation" },
          { name: "Dashboards", description: "Custom analytics interfaces", icon: Monitor, href: "/skills#dashboards" }
        ]
      }
    ]
  },
  "Process": {
    sections: [
      {
        title: "My 4-Phase Workflow",
        items: [
          { name: "Discovery & Audit", description: "Understanding your business", icon: Target, href: "/process#discovery" },
          { name: "Strategy & Architecture", description: "Planning the solution", icon: Lightbulb, href: "/process#strategy" },
          { name: "Build & Integration", description: "Creating & implementing", icon: Code, href: "/process#build" },
          { name: "Optimization & Growth", description: "Measuring & improving", icon: BarChart3, href: "/process#optimization" }
        ]
      }
    ]
  },
  "Demos": {
    sections: [
      {
        title: "Interactive Showcases",
        items: [
          { name: "Automation Workflow", description: "Live marketing automation demo", icon: Play, href: "/demos#automation" },
          { name: "Analytics Dashboard", description: "Real-time data visualization", icon: Monitor, href: "/demos#dashboard" },
          { name: "CRM Interface", description: "Custom contact management", icon: Users, href: "/demos#crm" }
        ]
      }
    ]
  },
  "Deep Dives": {
    sections: [
      {
        title: "Project Stories",
        items: [
          { name: "The War Room", description: "Full-stack performance overhaul", icon: Server, href: "/deep-dives/war-room" },
          { name: "The Launchpad", description: "Automated membership funnel", icon: Rocket, href: "/deep-dives/launchpad" },
          { name: "The Signal", description: "Analytics & attribution overhaul", icon: TrendingUp, href: "/deep-dives/signal" },
          { name: "All Stories", description: "View complete collection", icon: BookOpen, href: "/deep-dives" }
        ]
      }
    ]
  },
  "Contact": {
    sections: [
      {
        title: "Get In Touch",
        items: [
          { name: "Send Message", description: "Contact form & inquiries", icon: Mail, href: "/contact" },
          { name: "Schedule Call", description: "Book a consultation", icon: Users, href: "/contact" },
          { name: "View Resume", description: "Download my experience", icon: Briefcase, href: "/path/to/your/resume.pdf" }
        ]
      }
    ]
  }
};