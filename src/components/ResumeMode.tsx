import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Key,
  Lightbulb,
  Copy,
  Check,
  Download,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ResumeModeProps {
  content: string;
  pages: number;
}

interface SummarySection {
  title: string;
  content: string;
  keyTerms: { term: string; definition: string; definitionDarija: string }[];
  essentialPoints: string[];
}

const ResumeMode = ({ content, pages }: ResumeModeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummarySection[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const { toast } = useToast();

  useEffect(() => {
    const generateSummary = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Generating summary from content...");
        const { data, error: fnError } = await supabase.functions.invoke('process-pdf', {
          body: { content, mode: 'resume', pages }
        });

        if (fnError) {
          console.error("Function error:", fnError);
          throw fnError;
        }

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.success && data.data?.sections) {
          console.log("Summary generated successfully:", data.data.sections);
          setSummary(data.data.sections);
          // Expand all sections by default
          setExpandedSections(data.data.sections.map((_: SummarySection, i: number) => i));
        } else {
          throw new Error("Format de réponse invalide");
        }
      } catch (err) {
        console.error("Error generating summary:", err);
        const errorMessage = err instanceof Error ? err.message : "Erreur lors de la génération du résumé";
        setError(errorMessage);
        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [content, pages, toast]);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Copié!",
      description: "Le texte a été copié dans le presse-papiers",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleExportAll = () => {
    const fullText = summary
      .map(s => `# ${s.title}\n\n${s.content}\n\n## Termes clés\n${s.keyTerms.map(t => `- **${t.term}**: ${t.definition}\n  🇲🇦 ${t.definitionDarija}`).join('\n')}\n\n## Points essentiels\n${s.essentialPoints.map(p => `• ${p}`).join('\n')}`)
      .join('\n\n---\n\n');
    handleCopy(fullText, -1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center"
        >
          <BookOpen className="w-10 h-10 text-foreground" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-foreground">
            Création du résumé...
          </p>
          <p className="text-muted-foreground">
            L'IA structure et synthétise votre contenu avec explications en Darija
          </p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-qrayti-gold"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-foreground">
            Erreur de génération
          </p>
          <p className="text-muted-foreground max-w-md">
            {error}
          </p>
        </div>
        <Button onClick={handleRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-qrayti-navy">{summary.length}</p>
            <p className="text-xs text-muted-foreground">Sections</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-qrayti-coral">
              {summary.reduce((acc, s) => acc + s.keyTerms.length, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Termes clés</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-qrayti-gold">
              {summary.reduce((acc, s) => acc + s.essentialPoints.length, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Points essentiels</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportAll}>
          <Copy className="w-4 h-4" />
          Copier tout
        </Button>
      </div>

      {/* Summary Sections */}
      <div className="space-y-4">
        {summary.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(index)}
              className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-navy flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {section.title}
                </h3>
              </div>
              {expandedSections.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.includes(index) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-5 space-y-6"
              >
                {/* Main Content */}
                <div className="relative p-4 rounded-xl bg-muted/30 border border-border">
                  <p className="text-foreground leading-relaxed pr-10">
                    {section.content}
                  </p>
                  <button
                    onClick={() => handleCopy(section.content, index)}
                    className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-qrayti-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Key Terms */}
                {section.keyTerms && section.keyTerms.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Key className="w-5 h-5 text-qrayti-coral" />
                      <h4 className="font-semibold text-foreground">Termes clés</h4>
                    </div>
                    <div className="space-y-3">
                      {section.keyTerms.map((term, termIndex) => (
                        <div
                          key={termIndex}
                          className="p-4 rounded-xl bg-qrayti-coral/5 border border-qrayti-coral/20"
                        >
                          <p className="font-semibold text-qrayti-coral mb-1">
                            {term.term}
                          </p>
                          <p className="text-sm text-foreground mb-2">
                            {term.definition}
                          </p>
                          <div className="flex items-start gap-2 pt-2 border-t border-qrayti-coral/10">
                            <span className="text-xs">🇲🇦</span>
                            <p className="text-sm text-muted-foreground" dir="auto">
                              {term.definitionDarija}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Essential Points */}
                {section.essentialPoints && section.essentialPoints.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-qrayti-gold" />
                      <h4 className="font-semibold text-foreground">
                        Points essentiels
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {section.essentialPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-qrayti-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-qrayti-gold" />
                          </div>
                          <span className="text-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResumeMode;
