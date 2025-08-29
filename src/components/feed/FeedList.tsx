import { ReactNode } from "react";

interface FeedListProps {
  children: ReactNode;
}

export function FeedList({ children }: FeedListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}