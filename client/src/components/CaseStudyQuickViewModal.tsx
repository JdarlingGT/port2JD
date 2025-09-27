import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Define a type for the case study data that the modal will receive
interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  logo: string;
  bullets: string[];
  category: string;
}

interface CaseStudyQuickViewModalProps {
  caseStudy: CaseStudy | null;
  onOpenChange: (open: boolean) => void;
}

export default function CaseStudyQuickViewModal({ caseStudy, onOpenChange }: CaseStudyQuickViewModalProps) {
  if (!caseStudy) return null;

  return (
    <Dialog open={!!caseStudy} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <img src={caseStudy.logo} alt={`${caseStudy.title} Logo`} className="h-12 w-12 object-contain rounded-md bg-white p-1 border" />
            <div>
              <DialogTitle className="text-2xl font-bold">{caseStudy.title}</DialogTitle>
              <DialogDescription>{caseStudy.subtitle}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <ul className="space-y-2 list-disc list-inside text-foreground">
            {caseStudy.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
          <Button asChild className="mt-6 w-full">
            <a href={`/case-studies/${caseStudy.slug}`}>
              View Full Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
