import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader2 } from "lucide-react";
import { mockApi } from "@/lib/mock-api";

export default function Profile() {
  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => mockApi.getUser(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <EmptyState
        title="User not found"
        description="The user profile you're looking for doesn't exist."
        action={{ label: "Back to Feed", href: "/" }}
      />
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <ProfileCard user={user} />
    </div>
  );
}