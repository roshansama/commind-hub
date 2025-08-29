import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass-card flex items-center justify-center">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      
      {action && (
        <Button asChild className="btn-gradient">
          <Link to={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}