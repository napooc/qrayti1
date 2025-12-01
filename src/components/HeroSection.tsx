import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Brain, Sparkles, ArrowRight, Play } from "lucide-react";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const scrollToApp = () => {
    document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 moroccan-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qrayti-coral/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-qrayti-gold/15 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-qrayti-navy/10 rounded-full blur-3xl animate-float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-qrayti-navy/10 border border-qrayti-navy/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-qrayti-coral" />
            <span className="text-sm font-medium text-foreground">
              Propulsé par l'Intelligence Artificielle
            </span>
          </motion.div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <img
              src={logo}
              alt="Qrayti"
              className="h-32 md:h-40 w-auto mx-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Votre savoir,</span>
            <br />
            <span className="text-gradient-moroccan">résumé et testé</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Transformez vos cours PDF en{" "}
            <span className="text-qrayti-coral font-semibold">quiz interactifs</span> et{" "}
            <span className="text-qrayti-navy font-semibold">résumés intelligents</span>.
            <br className="hidden md:block" />
            L'IA éducative conçue spécialement pour les{" "}
            <span className="text-qrayti-gold font-semibold">étudiants marocains</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" onClick={scrollToApp} className="group">
              <FileText className="w-5 h-5" />
              Commencer maintenant
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Play className="w-5 h-5" />
              Voir la démo
            </Button>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Upload PDF"
              description="Téléchargez vos cours en un clic"
              delay={0.6}
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="IA Marocaine"
              description="Explications en Darija et Français"
              delay={0.7}
              highlighted
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Quiz & Résumé"
              description="Générez instantanément"
              delay={0.8}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
  highlighted,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  highlighted?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-6 rounded-2xl shadow-card transition-all duration-300 ${
      highlighted
        ? "bg-gradient-navy text-primary-foreground"
        : "bg-card border border-border"
    }`}
  >
    <div
      className={`inline-flex p-3 rounded-xl mb-4 ${
        highlighted
          ? "bg-qrayti-gold/20 text-qrayti-gold"
          : "bg-qrayti-coral/10 text-qrayti-coral"
      }`}
    >
      {icon}
    </div>
    <h3 className={`font-semibold text-lg mb-2 ${highlighted ? "" : "text-foreground"}`}>
      {title}
    </h3>
    <p className={`text-sm ${highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      {description}
    </p>
  </motion.div>
);

export default HeroSection;
