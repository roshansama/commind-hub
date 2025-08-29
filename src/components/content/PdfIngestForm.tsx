import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { mockApi } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

interface PdfIngestFormProps {
  onSuccess?: () => void;
}

export function PdfIngestForm({ onSuccess }: PdfIngestFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles[0];
    
    if (pdfFile.size > 20 * 1024 * 1024) { // 20MB limit
      toast({
        title: "File too large",
        description: "Please select a PDF file smaller than 20MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(pdfFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: isUploading || submitted,
  });

  const handleUpload = async () => {
    if (!file || isUploading || submitted) return;

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await mockApi.ingestPdf(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: "Success!",
        description: `Uploaded! Extracting text & generating embeddings. (${result.pages} pages)`,
      });

      setSubmitted(true);
      
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
      
    } catch (error) {
      clearInterval(progressInterval);
      toast({
        title: "Upload failed",
        description: "Failed to upload PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center">
          <Check className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">PDF Uploaded Successfully!</h3>
        <p className="text-muted-foreground">Extracting text and generating embeddings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200",
          "hover:border-accent hover:bg-accent/5",
          isDragActive && "border-accent bg-accent/10",
          isUploading && "cursor-not-allowed opacity-50",
          file ? "border-accent bg-accent/5" : "border-border"
        )}
      >
        <input {...getInputProps()} />
        
        {!file ? (
          <>
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-primary mb-2">
              {isDragActive ? "Drop your PDF here" : "Upload PDF"}
            </h3>
            <p className="text-muted-foreground">
              Drag & drop a PDF file here, or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum file size: 20MB
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-accent" />
            <div className="text-left">
              <p className="font-medium text-primary">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            {!isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="focus-ring"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Uploading...</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Upload Button */}
      {file && !submitted && (
        <Button 
          onClick={handleUpload}
          disabled={isUploading}
          className="btn-gradient w-full h-12"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            "Upload PDF"
          )}
        </Button>
      )}
    </div>
  );
}