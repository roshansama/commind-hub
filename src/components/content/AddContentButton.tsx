import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IngestModal } from "./IngestModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function AddContentButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        className={cn(
          "btn-gradient shadow-glow focus-ring",
          isMobile 
            ? "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full p-0"
            : "fixed top-20 right-6 z-40 rounded-2xl px-4 py-2"
        )}
      >
        <Plus className={cn("h-5 w-5", !isMobile && "mr-2")} />
        {!isMobile && <span>Add Content</span>}
      </Button>

      <IngestModal 
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}