import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, MessageCircle, ExternalLink } from "lucide-react";
import { CitationList } from "./CitationList";
import type { SearchAnswer } from "@/lib/mock-api";

interface AnswerPanelProps {
  answer?: SearchAnswer;
  isLoading: boolean;
  query: string;
}

export function AnswerPanel({ answer, isLoading, query }: AnswerPanelProps) {
  if (isLoading) {
    return (
      <div className="glass-card p-8 text-center animate-scale-in">
        <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-4" />
        <p className="text-muted-foreground">Searching the knowledge base...</p>
      </div>
    );
  }

  if (!answer) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">No results found. Try a different question.</p>
      </div>
    );
  }

  const isLowConfidence = answer.confidence < 0.6;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Answer */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Answer</h2>
          <Badge 
            variant={isLowConfidence ? "destructive" : "default"}
            className="font-mono text-xs"
          >
            {Math.round(answer.confidence * 100)}% confidence
          </Badge>
        </div>
        
        <p className="text-foreground leading-relaxed mb-4">
          {answer.answer}
        </p>

        {isLowConfidence && (
          <div className="border-l-4 border-accent pl-4 py-2 bg-accent/5 rounded-r-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Low confidence result.</strong> Results are light. Ask the community?
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="focus-ring">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
          
          {isLowConfidence && (
            <Button variant="outline" size="sm" className="focus-ring">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Community
            </Button>
          )}
        </div>
      </div>

      {/* Citations */}
      {answer.citations.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Sources</h3>
          <CitationList citations={answer.citations} />
        </div>
      )}
    </div>
  );
}