import { Layers, BusFront, TrendingUp, ChevronDown, Download, Video } from "lucide-react";
import { useState } from "react";
import { useSEO, createPersonSchema, createBreadcrumbSchema } from "@/hooks/use-seo";

interface TimelineNode {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  year?: string;
}

const timelineNodes: TimelineNode[] = [
  {
    id: "launchpad",
    title: "The Launchpad",
    subtitle: "My First Marketing Position",
    content: "Learned to stretch budgets, design visuals, and prove ROI when few believed marketing was measurable.",
    year: "Early Career"
  },
  {
    id: "pike-medical", 
    title: "Pike Medical Consultants",
    subtitle: "Healthcare Meets Hustle",
    content: "Built PrimaryCare Indy & UrgentCare Indy sites. Ran Google Ads driving thousands of patient visits. Designed logos, outdoor banners, and seasonal email campaigns. Blended brand, web, and patient acquisition into one machine.",
    year: "Agency Experience"
  },
  {
    id: "graston-technique",
    title: "Graston Technique®", 
    subtitle: "National Transformation",
    content: "Architected a full-stack marketing system: 400+ CRM automations, AI-powered support reducing tickets by 70%, \"Buy Now, Choose Later\" checkout lifting conversions 40%. Mastered strategy + systems at scale.",
    year: "Enterprise Role"
  },
  {
    id: "current-portfolio",
    title: "Current Portfolio",
    subtitle: "Marketing Strategist & Systems Architect", 
    content: "Specializing in bridging brand storytelling with technical execution. From AI and automation to SEO and design, I turn abstract goals into revenue-focused ecosystems.",
    year: "Present"
  }
];

export default function About() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    if (expandedNode === nodeId) {
      setExpandedNode(null);
    } else {
      setExpandedNode(nodeId);
    }
  };

  useSEO({
    title: "About - Jacob Darling | Marketing Strategist & Systems Architect",
    description: "Learn about Jacob Darling's unique background combining marketing strategy with technical systems architecture. 8+ years of experience building automation systems and growth strategies.",
    keywords: "marketing strategist, systems architect, about jacob darling, marketing automation expert, technical marketing",
    canonical: "https://jacobdarling.com/about",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        createPersonSchema(),
        createBreadcrumbSchema([
          { name: "Home", url: "https://jacobdarling.com" },
          { name: "About", url: "https://jacobdarling.com/about" }
        ])
      ]
    }
  });

  return (
    <section className="py-16 bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            About Me
          </h1>
          
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <p className="text-lg text-foreground mb-6 leading-relaxed">
                  Great marketing ideas often break at the handoff—the critical point where a creative vision meets 
                  the complex reality of technical execution. My career has been built to solve this problem.
                </p>
                <p className="text-lg text-foreground mb-6 leading-relaxed">
                  I'm Jacob Darling, a marketing leader who operates as both a brand strategist and a systems architect. 
                  On one side, I direct bold rebrands, craft compelling narratives, and launch creative campaigns. 
                  On the other, I design and build the underlying technical infrastructure—the CRM logic, automation workflows, 
                  and web architecture—that makes those campaigns scalable, measurable, and sustainable.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  This hybrid approach allows me to create deeply integrated solutions that don't just look good, 
                  but function brilliantly. Whether I'm relaunching a national brand or building a custom GPT-powered tool, 
                  I thrive on turning abstract goals into powerful, revenue-focused marketing engines.
                </p>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center lg:items-end">
                <div className="w-48 h-64 bg-muted rounded-lg border border-border flex items-center justify-center mb-4">
                  <img src="/path/to/your/professional-headshot.jpg" alt="Jacob Darling Headshot" className="w-full h-full object-cover rounded-lg"/>
                </div>
                <a href="/path/to/your/resume.pdf" download className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <Download className="-ml-1 mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Intro Video Section */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">A Quick Introduction</h2>
            <div className="aspect-w-16 aspect-h-9 bg-muted rounded-lg border border-border flex items-center justify-center">
              {/* Placeholder for video embed */}
              <div className="text-center text-muted-foreground">
                <Video className="w-12 h-12 mx-auto mb-2" />
                <p>Intro video coming soon!</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">My Philosophy</h2>
            
            <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary rounded-lg p-6 mb-8">
              <div className="absolute top-4 left-4 text-primary/30 text-6xl font-serif">"</div>
              <blockquote className="text-xl text-foreground font-medium italic ml-8 relative z-10">
                Strategy without architecture is a daydream; architecture without strategy is a machine with no purpose.
              </blockquote>
              <div className="absolute bottom-4 right-4 text-primary/30 text-6xl font-serif rotate-180">"</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Build for the System</h3>
                <p className="text-sm text-muted-foreground">
                  Every component works in concert with the whole for scalability and seamless experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BusFront className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Translate Complexity</h3>
                <p className="text-sm text-muted-foreground">
                  Bridge the gap between creative vision and technical implementation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Measure & Automate</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on KPIs that drive growth while automating repetitive tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Career Timeline */}
          <div className="bg-card border border-border rounded-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Career Journey</h2>
            
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              {timelineNodes.map((node, index) => (
                <div 
                  key={node.id} 
                  className="relative mb-8 last:mb-0"
                  data-testid={`timeline-node-${node.id}`}
                >
                  <div className="absolute left-6 w-4 h-4 bg-primary border-4 border-background rounded-full shadow-lg z-10"></div>
                  
                  <div className="absolute left-12 -top-1 text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                    {node.year}
                  </div>
                  
                  <div className="ml-20">
                    <button
                      onClick={() => toggleNode(node.id)}
                      className={`
                        w-full text-left p-6 rounded-lg border transition-all duration-300 ease-out
                        hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50
                        ${expandedNode === node.id 
                          ? 'bg-primary/5 border-primary/20 shadow-lg' 
                          : 'bg-background border-border hover:border-primary/30'
                        }
                      `}
                      data-testid={`timeline-button-${node.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {node.title}
                          </h3>
                          <p className="text-sm text-primary font-medium">
                            {node.subtitle}
                          </p>
                        </div>
                        <ChevronDown 
                          className={`
                            w-5 h-5 text-muted-foreground transition-transform duration-300
                            ${expandedNode === node.id ? 'rotate-180' : ''}
                          `}
                        />
                      </div>
                      
                      <div 
                        className={`
                          overflow-hidden transition-all duration-500 ease-out
                          ${expandedNode === node.id 
                            ? 'max-h-40 opacity-100 mt-4' 
                            : 'max-h-0 opacity-0'
                          }
                        `}
                        data-testid={`timeline-content-${node.id}`}
                        style={{
                          display: expandedNode === node.id ? 'block' : 'none'
                        }}
                      >
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-foreground leading-relaxed">
                            {node.content}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
