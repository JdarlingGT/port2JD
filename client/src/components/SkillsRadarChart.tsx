import { useState, memo, useMemo } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap,
  Shield,
  Activity,
  Server,
  Code,
  Database,
  Globe,
  Settings,
  Brain,
  Target
} from "lucide-react";

interface SkillCategory {
  category: string;
  icon: any;
  proficiency: number;
  color: string;
  description: string;
  relatedProjects: { name: string; href: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Performance",
    icon: Zap,
    proficiency: 95,
    color: "#3b82f6",
    description: "Site speed optimization & Core Web Vitals",
    relatedProjects: [
      { name: "Graston Technique Site", href: "/case-studies/graston-technique" },
    ]
  },
  {
    category: "Security",
    icon: Shield,
    proficiency: 90,
    color: "#10b981",
    description: "Infrastructure security & WAF implementation",
    relatedProjects: []
  },
  {
    category: "Analytics",
    icon: Activity,
    proficiency: 88,
    color: "#f59e0b",
    description: "GA4, GTM & conversion tracking",
    relatedProjects: [
      { name: "The Signal Deep Dive", href: "/deep-dives/signal" },
    ]
  },
  {
    category: "Server Admin",
    icon: Server,
    proficiency: 85,
    color: "#ef4444",
    description: "Linux, Apache, PHP & MySQL management",
    relatedProjects: []
  },
  {
    category: "Development",
    icon: Code,
    proficiency: 82,
    color: "#8b5cf6",
    description: "PHP, JavaScript & WordPress development",
    relatedProjects: [
      { name: "The War Room Deep Dive", href: "/deep-dives/war-room" },
    ]
  },
  {
    category: "Database",
    icon: Database,
    proficiency: 80,
    color: "#06b6d4",
    description: "SQL optimization & database design",
    relatedProjects: []
  },
  {
    category: "Marketing Tech",
    icon: Globe,
    proficiency: 92,
    color: "#ec4899",
    description: "CRM automation & ad platform integration",
    relatedProjects: [
      { name: "The Launchpad Deep Dive", href: "/deep-dives/launchpad" },
    ]
  },
  {
    category: "Strategy",
    icon: Brain,
    proficiency: 94,
    color: "#84cc16",
    description: "Technical marketing strategy & systems thinking",
    relatedProjects: [
      { name: "View All Case Studies", href: "/case-studies" },
    ]
  }
];

const chartConfig = {
  proficiency: {
    label: "Proficiency Level",
  },
};

interface SkillsRadarChartProps {
  animated?: boolean;
  showDetails?: boolean;
}

// Memoized chart component for better performance
const SkillsRadarChart = memo(function SkillsRadarChart({ animated = true, showDetails = true }: SkillsRadarChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(animated);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const selectedCategoryData = useMemo(() => {
    return selectedCategory 
      ? skillCategories.find(skill => skill.category === selectedCategory)
      : null;
  }, [selectedCategory]);

  // Memoize the skill category buttons to prevent re-renders
  const skillCategoryButtons = useMemo(() => {
    return skillCategories.map((skill) => {
      const IconComponent = skill.icon;
      const isSelected = selectedCategory === skill.category;
      return (
        <Button
          key={skill.category}
          variant={isSelected ? "default" : "ghost"}
          className={`
            w-full justify-start p-4 h-auto text-left
            ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}
          `}
          onClick={() => handleCategoryClick(skill.category)}
          data-testid={`skill-category-${skill.category.toLowerCase().replace(/\s+/g, '-')}`}
          role="button"
          aria-pressed={isSelected}
        >
          <div className="flex items-center gap-3 w-full">
            <div 
              className={`
                p-2 rounded-lg flex items-center justify-center
                ${isSelected ? "bg-primary-foreground/20" : ""}
              `}
              style={{ 
                backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : `${skill.color}20` 
              }}
            >
              <IconComponent 
                className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : ""}`}
                style={{ color: isSelected ? "inherit" : skill.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm truncate">
                  {skill.category}
                </p>
                <span className="text-xs font-bold">
                  {skill.proficiency}%
                </span>
              </div>
              <div className="w-full bg-background/20 rounded-full h-1.5 mb-1">
                <div 
                  className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${skill.proficiency}%`,
                    backgroundColor: isSelected ? "rgba(255,255,255,0.8)" : skill.color
                  }}
                />
              </div>
              <p className="text-xs opacity-90 leading-tight">
                {skill.description}
              </p>
            </div>
          </div>
        </Button>
      );
    });
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-to-br from-card to-muted/30 border-primary/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Skills Proficiency Radar
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of technical expertise across key domains. Click on any segment to view details.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant={isAnimated ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnimated(!isAnimated)}
              data-testid="button-toggle-animation"
            >
              <Target className="w-4 h-4 mr-2" />
              {isAnimated ? "Animated" : "Static"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Radar Chart */}
          <div className="lg:col-span-2">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[500px]"
            >
              <RadarChart
                data={skillCategories}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                aria-label="Skills Proficiency Radar Chart"
                onClick={(props) => {
                  if (props && props.activePayload && props.activePayload.length > 0) {
                    const clickedCategory = props.activePayload[0].payload.category;
                    handleCategoryClick(clickedCategory);
                  }
                }}
              >
                <PolarGrid 
                  stroke="hsl(var(--border))" 
                  strokeOpacity={0.3}
                />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ 
                    fontSize: 12, 
                    fill: "hsl(var(--muted-foreground))",
                    fontWeight: "500"
                  }}
                  className="text-xs"
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  angle={90}
                  tick={{ 
                    fontSize: 10, 
                    fill: "hsl(var(--muted-foreground))" 
                  }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                    cursor: "pointer"
                  }}
                  activeDot={{
                    r: 8,
                    fill: "hsl(var(--secondary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 3
                  }}
                  isAnimationActive={isAnimated}
                  animationDuration={1500}
                  animationBegin={0}
                />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as SkillCategory;
                      const IconComponent = data.icon;
                      return (
                        <div className="bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="p-2 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${data.color}20` }}
                            >
                              <IconComponent 
                                className="w-4 h-4" 
                                style={{ color: data.color }}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{data.category}</p>
                              <p className="text-lg font-bold" style={{ color: data.color }}>
                                {data.proficiency}%
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {data.description}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </div>

          {/* Category Details */}
          {showDetails && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Skill Categories
              </h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {skillCategoryButtons}
              </div>
            </div>
          )}
        </div>

        {/* Selected Category Detail */}
        {selectedCategory && selectedCategoryData && (
          <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border" aria-live="polite">
            {(() => {
              const categoryData = selectedCategoryData!;
              const IconComponent = categoryData.icon;
              return (
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${categoryData.color}20` }}
                  >
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: categoryData.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold">{categoryData.category}</h4>
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: categoryData.color }}
                      >
                        {categoryData.proficiency}%
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {categoryData.description}
                    </p>
                    {categoryData.relatedProjects.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <h5 className="text-sm font-semibold mb-2">Related Projects:</h5>
                        <div className="flex flex-wrap gap-2">
                          {categoryData.relatedProjects.map(project => (
                            <a 
                              key={project.name} 
                              href={project.href} 
                              className="text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                            >
                              {project.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </Card>
    </div>
  );
});

export default SkillsRadarChart;