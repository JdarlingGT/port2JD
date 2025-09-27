import { useSEO, createBreadcrumbSchema } from "@/hooks/use-seo";
import { useState, useMemo } from "react";
import CaseStudyCard from "@/components/CaseStudyCard";
import caseStudiesData from "@/data/caseStudies.json";
import CaseStudyQuickViewModal from "@/components/CaseStudyQuickViewModal";

type FilterCategory = "All" | "Healthcare" | "B2B" | "Consumer";

// Import the JSON data and transform it for our needs
const caseStudies = caseStudiesData;

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);

  // Filter case studies based on active filter
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === "All") {
      return caseStudies;
    }
    return caseStudies.filter(study => 
      study.filterCategories.includes(activeFilter)
    );
  }, [activeFilter]);

  const filterCategories: FilterCategory[] = ["All", "Healthcare", "B2B", "Consumer"];

  useSEO({
    title: "Selected Works - Jacob Darling | Marketing Case Studies",
    description: "Explore detailed case studies showcasing marketing automation, CRM development, and growth strategies for healthcare, legal, and restaurant clients with measurable results.",
    keywords: "marketing case studies, automation projects, CRM development, healthcare marketing, legal marketing, restaurant marketing",
    canonical: "https://jacobdarling.com/case-studies",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Marketing Case Studies",
      "description": "Portfolio of marketing automation and systems architecture projects",
      "breadcrumb": createBreadcrumbSchema([
        { name: "Home", url: "https://jacobdarling.com" },
        { name: "Case Studies", url: "https://jacobdarling.com/case-studies" }
      ])
    }
  });

  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="section-spacing bg-background">
        <div className="container text-center">
          <h1 className="mb-6">Selected Works</h1>
          <p className="text-lg max-w-3xl mx-auto mb-12">
            Deep dives into transformative projects that showcase the power of strategic marketing 
            combined with technical excellence
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out
                  ${activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105 font-bold'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105'
                  }
                `}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({category === "All" ? caseStudies.length : caseStudies.filter(s => s.filterCategories.includes(category)).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.slug}
                className="animate-fade-in opacity-0"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
                data-testid={`case-study-${caseStudy.slug}`}
              >
                <CaseStudyCard
                  slug={caseStudy.slug}
                  title={caseStudy.title}
                  subtitle={caseStudy.subtitle}
                  logo={caseStudy.logo}
                  bullets={caseStudy.bullets}
                  category={caseStudy.category}
                  onQuickView={() => setSelectedCaseStudy(caseStudy)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-card border-t border-border">
        <div className="container text-center">
          <h2 className="mb-6">Ready to Transform Your Marketing?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Let's discuss how strategic marketing combined with technical excellence 
            can drive measurable results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Start Your Project
            </a>
            <a href="/demos" className="btn-secondary">
              View Live Demos
            </a>
          </div>
        </div>
      </section>

      <CaseStudyQuickViewModal 
        caseStudy={selectedCaseStudy} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedCaseStudy(null);
          }
        }}
      />
    </div>
  );
}
