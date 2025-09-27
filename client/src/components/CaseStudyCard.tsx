import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Eye } from "lucide-react";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  subtitle: string;
  logo: string;
  bullets: string[];
  category: string;
  onQuickView: () => void;
}

export default function CaseStudyCard({ slug, title, subtitle, logo, bullets, category, onQuickView }: CaseStudyCardProps) {
  return (
    <Card 
      className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl p-6 flex flex-col justify-between h-full bg-background border-border"
      data-testid={`case-study-card-${slug}`}
    >
      <CardHeader className="flex flex-col items-center text-center pb-4">
        <div className="mb-4 h-16 flex items-center justify-center">
          {logo.includes('placeholder') ? (
            <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">{title.charAt(0)}</span>
            </div>
          ) : (
            <img 
              src={logo} 
              alt={`${title} logo`} 
              className="max-h-16 max-w-32 object-contain"
              data-testid={`logo-${slug}`}
            />
          )}
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {subtitle}
        </p>
        <div className="mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {category}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {bullets.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4 flex gap-2">
        <Button 
          asChild 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          data-testid={`button-view-case-study-${slug}`}
        >
          <Link href={`/case-studies/${slug}`}>
            Full Details
          </Link>
        </Button>
        <Button 
          variant="outline"
          className="px-3"
          onClick={onQuickView}
          data-testid={`button-quick-view-${slug}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}