import { useState } from "react";
import { Copy, Check, Code, QrCode, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function SharePanel() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const fullUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const displayUrl = fullUrl.replace(/^https?:\/\//, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The waitlist link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleEmbed = () => {
    const embedCode = `<iframe src="${fullUrl}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed code copied!",
      description: "Paste this code into your website.",
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Share Your Waitlist</h3>
        <p className="text-sm text-muted-foreground">Distribute your form across channels</p>
      </div>

      {/* Link Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Public Link
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              readOnly 
              value={displayUrl}
              className="pl-10 bg-muted/50 border-border text-foreground"
            />
          </div>
          <Button 
            onClick={handleCopy}
            className="px-6 gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          QR Code
        </label>
        <div className="bg-muted/30 border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <QrCode className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <span className="text-sm text-muted-foreground">Scan to Join</span>
        </div>
      </div>

      {/* Embed Option */}
      <div className="pt-2 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={handleEmbed}
        >
          <Code className="h-4 w-4" />
          Copy Embed Code
        </Button>
      </div>
    </div>
  );
}