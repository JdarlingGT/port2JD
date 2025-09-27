import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSEO } from "@/hooks/use-seo";
import { Filter, Grid, List, Eye, ExternalLink, Palette, Image, Layout, Type, Zap } from "lucide-react";
import type { DesignProject } from "@shared/schema";
import DesignProjectModal from "@/components/DesignProjectModal";

// Define categories based on the actual data
type DesignCategory = "Logo Design" | "Branding" | "Print Design" | "Digital Graphics" | "Web Design" | "Marketing Materials";

const categories = ["All", "Logo Design", "Branding", "Print Design", "Digital Graphics", "Web Design", "Marketing Materials"];

const getCategoryIcon = (category: string) => {
  const icons = {
    "Logo Design": Palette,
    "Branding": Zap,
    "Print Design": Layout,
    "Digital Graphics": Image,
    "Web Design": Grid,
    "Marketing Materials": Type
  };
  return icons[category as keyof typeof icons] || Palette;
};

export default function CreativeDesign() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);

  useSEO({
    title: "Creative Design Portfolio - Jacob Darling | Graphic Design & Visual Identity",
    description: "Explore Jacob Darling's creative design portfolio featuring logo design, branding, print materials, and digital graphics spanning 7+ years of professional work.",
    keywords: "graphic design, logo design, branding, visual identity, print design, digital graphics, creative portfolio, design work",
    canonical: "https://jacobdarling.com/creative-design"
  });

  // Fetch all design projects
  const { data: allProjects = [], isLoading: isLoadingAll } = useQuery<DesignProject[]>({
    queryKey: ['/api/design-projects', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === "All" 
        ? '/api/design-projects'
        : `/api/design-projects?category=${encodeURIComponent(selectedCategory)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch design projects');
      }
      return response.json();
    },
    enabled: true,
  });

  // Fetch featured projects
  const { data: featuredProjects = [], isLoading: isLoadingFeatured } = useQuery<DesignProject[]>({
    queryKey: ['/api/design-projects/featured'],
    enabled: true,
  });

  const filteredProjects = allProjects;

  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="section-spacing bg-background">
        <div className="container text-center">
          <h1 className="mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Creative Design Portfolio
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Visual design work spanning logos, branding, print materials, and digital graphics. 
            Each project showcases strategic thinking combined with creative execution.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">7+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Design Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-spacing bg-card border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Featured Work</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Highlighted projects that showcase the breadth and depth of creative capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => {
              const IconComponent = getCategoryIcon(project.category);
              return (
                <div
                  key={project.id}
                  className="group bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
                  data-testid={`featured-project-${index}`}
                >
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">{project.year}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools?.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
                        >
                          {tool}
                        </span>
                      )) || <span className="text-xs text-muted-foreground">No tools specified</span>}
                    </div>

                    {/* Action Button */}
                    <button onClick={() => setSelectedProject(project)} className="w-full btn-outline group/btn" data-testid={`view-project-${index}`}>
                      <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                      View Project
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Portfolio Gallery */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="mb-2">Complete Portfolio</h2>
              <p className="text-muted-foreground">Browse all design projects by category</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-card border border-border hover:border-primary hover:bg-primary/5"
                    }`}
                    data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-card border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  data-testid="view-grid"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  data-testid="view-list"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Grid/List */}
          {filteredProjects.length > 0 ? (
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-6"
            }`}>
              {filteredProjects.map((project, index) => {
                const IconComponent = getCategoryIcon(project.category);
                
                if (viewMode === "list") {
                  return (
                    <div
                      key={project.id}
                      className="flex gap-6 bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300 group"
                      data-testid={`project-list-${index}`}
                    >
                      {/* Project Image */}
                      <div className="w-32 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-contain bg-white"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-200">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                                {project.category}
                              </span>
                              <span className="text-xs text-muted-foreground">{project.year}</span>
                            </div>
                          </div>
                          <button onClick={() => setSelectedProject(project)} className="btn-outline btn-sm" data-testid={`view-list-project-${index}`}>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tools?.map((tool, toolIndex) => (
                            <span
                              key={toolIndex}
                              className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={project.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
                    data-testid={`project-grid-${index}`}
                  >
                    {/* Project Image */}
                    <div className={`
                      aspect-video
                      bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden
                      group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300
                    `}>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">{project.year}</span>
                      </div>
                      
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tools?.slice(0, 2).map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
                          >
                            {tool}
                          </span>
                        ))}
                        {(project.tools?.length || 0) > 2 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{(project.tools?.length || 0) - 2} more
                          </span>
                        )}
                      </div>

                      <button onClick={() => setSelectedProject(project)} className="w-full btn-outline btn-sm group/btn" data-testid={`view-grid-project-${index}`}>
                        <Eye className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform duration-200" />
                        View Project
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                No projects match the selected category. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-card border-t border-border">
        <div className="container text-center">
          <h2 className="mb-6">Ready to Bring Your Vision to Life?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Let's collaborate on your next creative project. From concept to completion, 
            I bring strategic thinking and creative execution to every design challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary" data-testid="link-contact-creative">
              Start a Project
            </a>
            <a href="/case-studies" className="btn-secondary" data-testid="link-case-studies-creative">
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      <DesignProjectModal 
        project={selectedProject} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedProject(null);
          }
        }}
      />
    </div>
  );
}