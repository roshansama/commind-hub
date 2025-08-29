import { IngestModal } from "@/components/content/IngestModal";

export default function Ingest() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Add Content</h1>
        <p className="text-muted-foreground">
          Contribute to the community knowledge base by adding URLs or uploading PDFs
        </p>
      </div>

      <div className="glass-card p-8">
        <IngestModal trigger={null} />
      </div>
    </div>
  );
}