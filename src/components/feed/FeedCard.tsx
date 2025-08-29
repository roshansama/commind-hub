import { formatDistanceToNow } from "date-fns";
import { ExternalLink, FileText, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingWidget } from "./RatingWidget";
import type { FeedItem } from "@/lib/mock-api";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  const handleRating = async (rating: number) => {
    // Handle rating logic
    console.log("Rating:", rating, "for item:", item.id);
  };

  return (
    <div className="glass-card-hover p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.contributor.avatarUrl} />
            <AvatarFallback className="gradient-accent text-accent-foreground text-xs">
              {item.contributor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.contributor.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <Badge variant={item.sourceType === "url" ? "default" : "secondary"} className="text-xs">
          {item.sourceType.toUpperCase()}
        </Badge>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-primary mb-2 line-clamp-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RatingWidget 
            currentRating={item.rating || 0}
            onRate={handleRating}
          />
          {item.rating && (
            <span className="text-xs text-muted-foreground">
              {item.rating.toFixed(1)}
            </span>
          )}
        </div>
        
        {item.url && (
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="focus-ring text-xs"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Open
            </a>
          </Button>
        )}
        
        {item.sourceType === "pdf" && (
          <Button variant="ghost" size="sm" className="focus-ring text-xs">
            <FileText className="h-3 w-3 mr-1" />
            View PDF
          </Button>
        )}
      </div>
    </div>
  );
}