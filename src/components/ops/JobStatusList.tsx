import { formatDistanceToNow } from "date-fns";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  RefreshCw,
  Database,
  Brain,
  Search,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/mock-api";

interface JobStatusListProps {
  jobs: Job[];
}

const agentIcons = {
  ingestion: FileText,
  embedding: Brain, 
  feed: Database,
  qa: Search,
};

const statusIcons = {
  queued: Clock,
  running: Loader2,
  succeeded: CheckCircle,
  failed: XCircle,
};

const statusColors = {
  queued: "text-muted-foreground",
  running: "text-accent",
  succeeded: "text-green-600",
  failed: "text-destructive",
};

export function JobStatusList({ jobs }: JobStatusListProps) {
  const handleRetry = (jobId: string) => {
    console.log("Retry job:", jobId);
    // Handle retry logic (frontend-only for demo)
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const AgentIcon = agentIcons[job.agent];
        const StatusIcon = statusIcons[job.status];
        const isRunning = job.status === "running";
        
        return (
          <div key={job.id} className="glass-card-hover p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                  <AgentIcon className="h-5 w-5 text-accent-foreground" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-primary capitalize">
                      {job.agent} Agent
                    </h3>
                    
                    <Badge 
                      variant={job.status === "succeeded" ? "default" : "secondary"}
                      className={cn("capitalize", statusColors[job.status])}
                    >
                      <StatusIcon className={cn(
                        "h-3 w-3 mr-1",
                        isRunning && "animate-spin"
                      )} />
                      {job.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Started {formatDistanceToNow(new Date(job.startedAt), { addSuffix: true })}
                    </span>
                    
                    {job.durationMs && (
                      <span>
                        Duration: {(job.durationMs / 1000).toFixed(1)}s
                      </span>
                    )}
                  </div>
                  
                  {job.error && (
                    <p className="text-sm text-destructive mt-1">
                      Error: {job.error}
                    </p>
                  )}
                </div>
              </div>

              {job.status === "failed" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRetry(job.id)}
                  className="focus-ring"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}