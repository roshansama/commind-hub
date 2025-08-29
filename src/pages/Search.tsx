import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "@/components/search/SearchForm";
import { AnswerPanel } from "@/components/search/AnswerPanel";
import { EmptyState } from "@/components/ui/empty-state";
import { mockApi } from "@/lib/mock-api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { data: answer, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => mockApi.getAnswer(query),
    enabled: !!query,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Search & Q&A</h1>
        <p className="text-muted-foreground">
          Ask questions and get answers from the community knowledge base
        </p>
      </div>

      <div className="space-y-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {hasSearched && query && (
          <AnswerPanel 
            answer={answer} 
            isLoading={isLoading} 
            query={query}
          />
        )}

        {!hasSearched && (
          <EmptyState
            title="Ready to search"
            description="Enter your question above or use the floating search bar to get started."
            action={{ label: "Browse Feed", href: "/" }}
          />
        )}
      </div>
    </div>
  );
}