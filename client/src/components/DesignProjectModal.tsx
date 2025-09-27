import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { DesignProject } from "@shared/schema";

interface DesignProjectModalProps {
  project: DesignProject | null;
  onOpenChange: (open: boolean) => void;
}

export default function DesignProjectModal({ project, onOpenChange }: DesignProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">{project.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {project.category} ({project.year})
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-contain bg-white" />
          </div>
          <p className="text-foreground mb-4">{project.description}</p>
          {project.tools && project.tools.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Tools Used:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, index) => (
                  <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
