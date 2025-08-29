import { useQuery } from "@tanstack/react-query";
import { FeedList } from "@/components/feed/FeedList";
import { FeedCard } from "@/components/feed/FeedCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader2 } from "lucide-react";
import { mockApi } from "@/lib/mock-api";

export default function Feed() {
  const { data: feed, isLoading, error } = useQuery({
    queryKey: ["feed"],
    queryFn: () => mockApi.getFeed(),
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
        <p className="text-destructive">Failed to load feed</p>
      </div>
    );
  }

  if (!feed?.items.length) {
    return (
      <EmptyState
        title="No contributions yet"
        description="Be the first to add knowledge to the community."
        action={{ label: "Add Content", href: "/ingest" }}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Community Feed</h1>
        <p className="text-muted-foreground">
          Latest contributions from the community
        </p>
      </div>

      <FeedList>
        {feed.items.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </FeedList>
    </div>
  );
}