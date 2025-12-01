import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentData } from "./AppSection";

interface PDFUploaderProps {
  onFileProcessed: (data: ContentData) => void;
}

const PDFUploader = ({ onFileProcessed }: PDFUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.includes("pdf") && !file.type.includes("document")) {
        throw new Error("Veuillez télécharger un fichier PDF");
      }

      // Simulate PDF processing (in real app, this would call an AI API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock content extraction
      const mockContent = `
        Chapitre 1: Introduction au Droit Civil Marocain
        
        Le droit civil marocain est régi par le Dahir des Obligations et Contrats (DOC) promulgué en 1913.
        Ce code définit les règles fondamentales régissant les relations entre les personnes privées.
        
        Les principes fondamentaux:
        1. La liberté contractuelle
        2. L'autonomie de la volonté
        3. La bonne foi dans l'exécution des contrats
        
        Le DOC s'applique à toutes les obligations conventionnelles et légales, 
        sauf celles qui sont régies par des textes spéciaux.
        
        Section 1: Les sources des obligations
        Les obligations peuvent naître de plusieurs sources:
        - Le contrat (العقد)
        - Le quasi-contrat
        - Le délit
        - Le quasi-délit
        - La loi
        
        Le contrat reste la source principale des obligations en droit marocain.
        Il est défini comme l'accord de deux ou plusieurs volontés en vue de créer des effets de droit.
      `;

      const data: ContentData = {
        fileName: file.name,
        content: mockContent,
        pageCount: Math.floor(Math.random() * 20) + 5,
      };

      onFileProcessed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Demo mode with sample content
  const handleDemoMode = () => {
    const demoData: ContentData = {
      fileName: "Cours_Droit_Civil_Marocain.pdf",
      content: `
        Chapitre 1: Introduction au Droit Civil Marocain
        
        Le droit civil marocain est régi par le Dahir des Obligations et Contrats (DOC) promulgué en 1913.
        Ce code définit les règles fondamentales régissant les relations entre les personnes privées.
        
        Les principes fondamentaux:
        1. La liberté contractuelle - الحرية التعاقدية
        2. L'autonomie de la volonté - استقلالية الإرادة
        3. La bonne foi dans l'exécution des contrats - حسن النية
        
        Le DOC s'applique à toutes les obligations conventionnelles et légales, 
        sauf celles qui sont régies par des textes spéciaux.
        
        Section 1: Les sources des obligations
        Les obligations peuvent naître de plusieurs sources:
        - Le contrat (العقد)
        - Le quasi-contrat
        - Le délit
        - Le quasi-délit
        - La loi
        
        Le contrat reste la source principale des obligations en droit marocain.
        Il est défini comme l'accord de deux ou plusieurs volontés en vue de créer des effets de droit.
        
        Section 2: La formation du contrat
        Pour qu'un contrat soit valablement formé, il faut réunir plusieurs conditions:
        - Le consentement des parties
        - La capacité juridique
        - Un objet certain et licite
        - Une cause licite
      `,
      pageCount: 12,
    };
    onFileProcessed(demoData);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        animate={{
          borderColor: isDragging ? "hsl(var(--qrayti-coral))" : "hsl(var(--border))",
          backgroundColor: isDragging
            ? "hsl(var(--qrayti-coral) / 0.05)"
            : "hsl(var(--muted) / 0.3)",
        }}
        className="relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Loader2 className="w-16 h-16 mx-auto text-qrayti-coral animate-spin" />
            <p className="text-lg font-medium text-foreground">
              Analyse du document en cours...
            </p>
            <p className="text-sm text-muted-foreground">
              Notre IA lit et comprend votre contenu
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-qrayti-coral/10 flex items-center justify-center"
            >
              <Upload className="w-10 h-10 text-qrayti-coral" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isDragging
                ? "Déposez votre fichier ici"
                : "Glissez-déposez votre PDF"}
            </h3>
            <p className="text-muted-foreground mb-4">
              ou cliquez pour sélectionner un fichier
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>PDF, DOC, DOCX • Max 50MB</span>
            </div>
          </>
        )}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      {/* Demo Button */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Pas de PDF sous la main?
        </p>
        <Button variant="outline" onClick={handleDemoMode} disabled={isProcessing}>
          <CheckCircle className="w-4 h-4" />
          Essayer avec un exemple
        </Button>
      </div>
    </div>
  );
};

export default PDFUploader;
