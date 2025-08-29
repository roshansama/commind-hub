import { useQuery } from "@tanstack/react-query";
import { JobStatusList } from "@/components/ops/JobStatusList";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader2 } from "lucide-react";
import { mockApi } from "@/lib/mock-api";

export default function Operations() {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => mockApi.getJobs(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load operations</p>
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <EmptyState
        title="No operations yet"
        description="Agent jobs and activities will appear here."
        action={{ label: "Add Content", href: "/ingest" }}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Operations</h1>
        <p className="text-muted-foreground">
          Agent jobs and system activities
        </p>
      </div>

      <JobStatusList jobs={jobs} />
    </div>
  );
}