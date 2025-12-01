import { motion } from "framer-motion";
import {
  Upload,
  Zap,
  Languages,
  Brain,
  Target,
  Trophy,
  Clock,
  Repeat,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload en un clic",
    description:
      "Téléchargez n'importe quel PDF de cours. Notre IA analyse et comprend le contenu instantanément.",
    color: "coral",
  },
  {
    icon: Zap,
    title: "Génération instantanée",
    description:
      "Quiz et résumés générés en quelques secondes. Plus besoin d'attendre ou d'écrire des prompts complexes.",
    color: "gold",
  },
  {
    icon: Languages,
    title: "Explications en Darija",
    description:
      "Notre killer feature: les concepts complexes en français académique expliqués simplement en Darija marocain.",
    color: "navy",
  },
  {
    icon: Brain,
    title: "IA adaptée au Maroc",
    description:
      "Alignée sur le curriculum marocain: Bac, FSJES, médecine, droit. Pas une IA générique.",
    color: "coral",
  },
  {
    icon: Target,
    title: "Feedback détaillé",
    description:
      "Pour chaque mauvaise réponse: l'explication du pourquoi c'est faux et la bonne réponse avec contexte.",
    color: "gold",
  },
  {
    icon: Repeat,
    title: "Révision espacée",
    description:
      "Qrayti mémorise vos erreurs et vous les représente au bon moment pour une rétention maximale.",
    color: "navy",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description:
      "Classements, badges et streaks pour rester motivé. Devenez 'Night Owl' ou 'Fast Learner'!",
    color: "coral",
  },
  {
    icon: Clock,
    title: "Contrôle précis",
    description:
      "Choisissez combien de pages ou lignes résumer. Définissez le nombre et la difficulté des questions.",
    color: "gold",
  },
];

const colorClasses = {
  coral: {
    bg: "bg-qrayti-coral/10",
    text: "text-qrayti-coral",
    border: "border-qrayti-coral/20",
  },
  gold: {
    bg: "bg-qrayti-gold/10",
    text: "text-qrayti-gold",
    border: "border-qrayti-gold/20",
  },
  navy: {
    bg: "bg-qrayti-navy/10",
    text: "text-qrayti-navy",
    border: "border-qrayti-navy/20",
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-qrayti-navy/10 text-qrayti-navy font-medium text-sm mb-6">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Tout ce qu'il faut pour{" "}
            <span className="text-gradient-accent">réussir</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Qrayti n'est pas un simple chatbot. C'est un tuteur IA complet conçu pour
            l'étudiant marocain moderne.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-card border ${colors.border} shadow-card hover:shadow-lg transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl ${colors.bg} ${colors.text} mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
