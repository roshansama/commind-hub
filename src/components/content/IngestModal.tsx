import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlIngestForm } from "./UrlIngestForm";
import { PdfIngestForm } from "./PdfIngestForm";

interface IngestModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function IngestModal({ trigger, open, onOpenChange }: IngestModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const modalOpen = isControlled ? open : internalOpen;
  const setModalOpen = isControlled ? onOpenChange : setInternalOpen;

  const content = (
    <DialogContent className="glass-card max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl text-primary">Add Content</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="url" className="focus-ring">Public URL</TabsTrigger>
          <TabsTrigger value="pdf" className="focus-ring">Upload PDF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="mt-6">
          <UrlIngestForm onSuccess={() => setModalOpen(false)} />
        </TabsContent>
        
        <TabsContent value="pdf" className="mt-6">
          <PdfIngestForm onSuccess={() => setModalOpen(false)} />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        {content}
      </Dialog>
    );
  }

  // When used on the /ingest page without trigger
  return content;
}