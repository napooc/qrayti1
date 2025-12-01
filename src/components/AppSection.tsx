import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Brain,
  BookOpen,
  Sparkles,
  ArrowRight,
  Settings,
  ChevronDown,
} from "lucide-react";
import PDFUploader from "./PDFUploader";
import QuizMode from "./QuizMode";
import ResumeMode from "./ResumeMode";

export type AppMode = "upload" | "select" | "quiz" | "resume";
export type ContentData = {
  fileName: string;
  content: string;
  pageCount: number;
};

const AppSection = () => {
  const [mode, setMode] = useState<AppMode>("upload");
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [selectedPages, setSelectedPages] = useState<number>(5);

  const handleFileProcessed = (data: ContentData) => {
    setContentData(data);
    setMode("select");
  };

  const handleModeSelect = (selectedMode: "quiz" | "resume") => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    if (mode === "quiz" || mode === "resume") {
      setMode("select");
    } else if (mode === "select") {
      setMode("upload");
      setContentData(null);
    }
  };

  return (
    <section id="app-section" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qrayti-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-qrayti-navy/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-qrayti-navy/10 text-qrayti-navy font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Commencez maintenant
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Transformez vos{" "}
            <span className="text-gradient-accent">cours</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Uploadez votre PDF et laissez l'IA faire le reste
          </p>
        </motion.div>

        {/* App Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden">
            {/* App Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-qrayti-warning" />
                <div className="w-3 h-3 rounded-full bg-qrayti-success" />
              </div>
              {mode !== "upload" && (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  ← Retour
                </Button>
              )}
              <div className="text-sm text-muted-foreground">
                {contentData?.fileName || "Qrayti App"}
              </div>
            </div>

            {/* App Content */}
            <div className="p-6 md:p-10 min-h-[500px]">
              <AnimatePresence mode="wait">
                {mode === "upload" && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PDFUploader onFileProcessed={handleFileProcessed} />
                  </motion.div>
                )}

                {mode === "select" && contentData && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ModeSelector
                      contentData={contentData}
                      selectedPages={selectedPages}
                      setSelectedPages={setSelectedPages}
                      onModeSelect={handleModeSelect}
                    />
                  </motion.div>
                )}

                {mode === "quiz" && contentData && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuizMode content={contentData.content} pages={selectedPages} />
                  </motion.div>
                )}

                {mode === "resume" && contentData && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResumeMode content={contentData.content} pages={selectedPages} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ModeSelector = ({
  contentData,
  selectedPages,
  setSelectedPages,
  onModeSelect,
}: {
  contentData: ContentData;
  selectedPages: number;
  setSelectedPages: (pages: number) => void;
  onModeSelect: (mode: "quiz" | "resume") => void;
}) => {
  return (
    <div className="space-y-8">
      {/* File Info */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
        <div className="w-12 h-12 rounded-xl bg-qrayti-coral/10 flex items-center justify-center">
          <FileText className="w-6 h-6 text-qrayti-coral" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{contentData.fileName}</p>
          <p className="text-sm text-muted-foreground">
            {contentData.pageCount} pages détectées
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Page Selection */}
      <div className="space-y-4">
        <label className="block font-medium text-foreground">
          Nombre de pages à traiter
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={contentData.pageCount}
            value={selectedPages}
            onChange={(e) => setSelectedPages(Number(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-qrayti-coral"
          />
          <span className="w-16 text-center font-semibold text-qrayti-navy bg-muted px-3 py-2 rounded-lg">
            {selectedPages}
          </span>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="space-y-4">
        <p className="font-medium text-foreground">Choisissez votre mode</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect("quiz")}
            className="p-6 rounded-2xl bg-gradient-navy text-primary-foreground text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-qrayti-gold/20 flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-qrayti-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mode Quiz</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Questions interactives avec explications détaillées en Darija
            </p>
            <div className="flex items-center gap-2 text-qrayti-gold font-medium">
              Commencer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect("resume")}
            className="p-6 rounded-2xl bg-gradient-gold text-foreground text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-qrayti-navy/10 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-qrayti-navy" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mode Résumé</h3>
            <p className="text-sm text-foreground/80 mb-4">
              Résumé structuré avec termes clés et points essentiels
            </p>
            <div className="flex items-center gap-2 text-qrayti-navy font-medium">
              Commencer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AppSection;
