import { motion } from "framer-motion";
import { Upload, Sparkles, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Uploadez votre PDF",
    description:
      "Glissez-déposez votre cours, polycopié ou examen. Formats PDF, Word et images supportés.",
    color: "coral",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "L'IA analyse le contenu",
    description:
      "Notre IA lit, comprend et structure le contenu selon le contexte académique marocain.",
    color: "gold",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Quiz ou Résumé?",
    description:
      "Choisissez votre mode d'apprentissage: quiz interactif ou résumé structuré avec termes clés.",
    color: "navy",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Apprenez et progressez",
    description:
      "Recevez des feedbacks détaillés, suivez vos progrès et revoyez vos erreurs automatiquement.",
    color: "coral",
  },
];

const colorClasses = {
  coral: {
    bg: "bg-qrayti-coral",
    light: "bg-qrayti-coral/10",
    text: "text-qrayti-coral",
  },
  gold: {
    bg: "bg-qrayti-gold",
    light: "bg-qrayti-gold/10",
    text: "text-qrayti-gold",
  },
  navy: {
    bg: "bg-qrayti-navy",
    light: "bg-qrayti-navy/10",
    text: "text-qrayti-navy",
  },
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 moroccan-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-qrayti-gold/10 text-qrayti-gold font-medium text-sm mb-6">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Simple comme{" "}
            <span className="text-gradient-hero">1-2-3-4</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pas de prompts complexes. Pas de configuration. Juste vos cours transformés en
            outils d'apprentissage.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-qrayti-coral via-qrayti-gold to-qrayti-navy hidden md:block" />

            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-card p-8 rounded-3xl shadow-card border border-border"
                    >
                      <span
                        className={`inline-block text-5xl font-display font-bold ${colors.text} opacity-30 mb-4`}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold mb-4 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center shadow-lg z-10`}
                  >
                    <step.icon className="w-8 h-8 text-card" />
                  </motion.div>

                  {/* Empty space for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
