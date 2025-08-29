import { ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { SearchAnswer } from "@/lib/mock-api";

interface CitationListProps {
  citations: SearchAnswer["citations"];
}

export function CitationList({ citations }: CitationListProps) {
  return (
    <div className="space-y-3">
      {citations.map((citation, index) => (
        <div 
          key={citation.documentId} 
          className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">
                {index + 1}
              </span>
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-primary text-sm mb-1">
                {citation.title}
              </h4>
              
              {citation.contributor && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs">
                      {citation.contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{citation.contributor.name}</span>
                </div>
              )}
            </div>
          </div>

          {citation.url && (
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="focus-ring"
            >
              <a 
                href={citation.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open source</span>
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}