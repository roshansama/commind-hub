import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { mockApi } from "@/lib/mock-api";

const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type UrlFormData = z.infer<typeof urlSchema>;

interface UrlIngestFormProps {
  onSuccess?: () => void;
}

export function UrlIngestForm({ onSuccess }: UrlIngestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: UrlFormData) => {
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);
    try {
      const result = await mockApi.ingestUrl(data.url);
      
      toast({
        title: "Success!",
        description: "We're processing and indexing this article.",
      });

      setSubmitted(true);
      form.reset();
      
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't fetch that URL. It may be paywalled. Try PDF upload.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center">
          <Check className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">URL Added Successfully!</h3>
        <p className="text-muted-foreground">Processing and indexing the content...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Website URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="https://example.com/article"
                    className="pl-10 h-12 focus-ring"
                    disabled={isSubmitting}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-gradient w-full h-12"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Processing URL...
            </>
          ) : (
            "Add URL"
          )}
        </Button>
      </form>
    </Form>
  );
}