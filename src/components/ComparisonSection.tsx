import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  {
    feature: "Input",
    chatgpt: "Requires complex prompting",
    qrayti: "One-click PDF upload",
    qraytiWins: true,
  },
  {
    feature: "Language",
    chatgpt: "Standard French/English",
    qrayti: "French explained in Darija",
    qraytiWins: true,
  },
  {
    feature: "Experience",
    chatgpt: "Passive Reading (Chat)",
    qrayti: "Active Recall (Quizzes)",
    qraytiWins: true,
  },
  {
    feature: "Retention",
    chatgpt: "No memory of past mistakes",
    qrayti: "Spaced Repetition System",
    qraytiWins: true,
  },
  {
    feature: "Focus",
    chatgpt: "Distracting (can ask anything)",
    qrayti: "Focused purely on Education",
    qraytiWins: true,
  },
  {
    feature: "Curriculum",
    chatgpt: "Generic global content",
    qrayti: "Aligned with Moroccan system",
    qraytiWins: true,
  },
];

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-qrayti-coral/10 text-qrayti-coral font-medium text-sm mb-6">
            Pourquoi Qrayti
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            ChatGPT vs{" "}
            <span className="text-gradient-moroccan">Qrayti</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            "L'innovation n'est pas le modèle IA lui-même; c'est son application à un
            besoin local spécifique."
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-muted/50 p-4 md:p-6 border-b border-border">
              <div className="font-semibold text-foreground">Feature</div>
              <div className="font-semibold text-muted-foreground text-center">
                ChatGPT
                <span className="block text-xs font-normal mt-1">Generic AI</span>
              </div>
              <div className="font-semibold text-qrayti-coral text-center">
                Qrayti
                <span className="block text-xs font-normal mt-1 text-qrayti-gold">
                  Your AI Tutor
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`grid grid-cols-3 p-4 md:p-6 ${
                  index < comparisonData.length - 1 ? "border-b border-border" : ""
                } hover:bg-muted/20 transition-colors`}
              >
                <div className="font-medium text-foreground flex items-center">
                  {row.feature}
                </div>
                <div className="text-muted-foreground text-center text-sm flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 hidden md:block" />
                  <span>{row.chatgpt}</span>
                </div>
                <div className="text-foreground text-center text-sm flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-qrayti-success flex-shrink-0 hidden md:block" />
                  <span className="font-medium">{row.qrayti}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-qrayti-gold/30 font-display">
              "
            </div>
            <p className="text-xl md:text-2xl font-display italic text-foreground leading-relaxed pt-8">
              ChatGPT is a tool for everyone;{" "}
              <span className="text-qrayti-coral font-semibold">
                Qrayti is a tutor for Morocco.
              </span>
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
