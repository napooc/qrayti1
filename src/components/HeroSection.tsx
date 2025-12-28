import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Brain, Sparkles, ArrowRight, Play, Zap, Target, BookOpen } from "lucide-react";
import logo from "@/assets/logo.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import { useState, useEffect, useCallback } from "react";

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

const typingTexts = [
  "Quiz interactifs générés par IA",
  "Résumés intelligents en secondes",
  "Explications en Darija et Français",
  "Apprentissage personnalisé",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroImages.length).fill(false));

  // Preload all images for fast transitions
  useEffect(() => {
    heroImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      img.src = src;
    });
  }, []);

  // Image carousel - changes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentTextIndex]);

  const scrollToApp = () => {
    document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Background Image Carousel - All images preloaded */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1 
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
          >
            <img
              src={image}
              alt={`Étudiants marocains utilisant Qrayti - ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </motion.div>
        ))}
        {/* Overlay gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-qrayti-coral/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-qrayti-gold/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-qrayti-navy/15 rounded-full blur-3xl"
        />
      </div>

      {/* Image Carousel Indicators - Enhanced */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentImageIndex 
                ? "bg-qrayti-coral w-10 h-3 shadow-lg shadow-qrayti-coral/50" 
                : "bg-foreground/40 hover:bg-foreground/60 w-3 h-3"
            }`}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar for current image */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-48">
        <motion.div
          key={currentImageIndex}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-0.5 bg-gradient-to-r from-qrayti-coral to-qrayti-gold origin-left rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-qrayti-coral/20 to-qrayti-gold/20 border border-qrayti-coral/30 mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-qrayti-coral" />
            </motion.div>
            <span className="text-sm font-semibold text-foreground">
              Propulsé par l'Intelligence Artificielle
            </span>
            <Zap className="w-4 h-4 text-qrayti-gold" />
          </motion.div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <motion.img
              src={logo}
              alt="Qrayti - Plateforme d'apprentissage IA pour étudiants marocains"
              className="h-36 md:h-44 w-auto mx-auto drop-shadow-2xl"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Votre savoir,</span>
            <br />
            <span className="text-gradient-moroccan">résumé et testé</span>
          </motion.h1>

          {/* Typing Animation Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-20 md:h-16 flex items-center justify-center mb-8"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-qrayti-coral font-semibold">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1 h-8 bg-qrayti-coral ml-1 align-middle"
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Transformez vos cours PDF en quiz interactifs et résumés intelligents.
            <br className="hidden md:block" />
            L'IA éducative conçue spécialement pour les{" "}
            <span className="text-qrayti-gold font-semibold">étudiants marocains</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="xl" onClick={scrollToApp} className="group shadow-glow">
                <FileText className="w-5 h-5" />
                Commencer maintenant
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="heroOutline" size="xl" className="backdrop-blur-sm">
                <Play className="w-5 h-5" />
                Voir la démo
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Upload PDF"
              description="Téléchargez vos cours en un clic"
              delay={0.7}
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="IA Marocaine"
              description="Explications en Darija et Français"
              delay={0.8}
              highlighted
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Quiz & Résumé"
              description="Générez instantanément"
              delay={0.9}
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <StatCard number="10K+" label="Étudiants" icon={<Target className="w-5 h-5" />} />
            <StatCard number="50K+" label="Quiz générés" icon={<Zap className="w-5 h-5" />} />
            <StatCard number="100K+" label="PDFs traités" icon={<FileText className="w-5 h-5" />} />
            <StatCard number="98%" label="Satisfaction" icon={<BookOpen className="w-5 h-5" />} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
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
    whileHover={{ y: -8, scale: 1.03 }}
    className={`p-6 rounded-2xl shadow-card transition-all duration-300 backdrop-blur-md ${
      highlighted
        ? "bg-gradient-navy text-primary-foreground border border-qrayti-gold/30"
        : "bg-card/80 border border-border"
    }`}
  >
    <motion.div
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex p-3 rounded-xl mb-4 ${
        highlighted
          ? "bg-qrayti-gold/20 text-qrayti-gold"
          : "bg-qrayti-coral/10 text-qrayti-coral"
      }`}
    >
      {icon}
    </motion.div>
    <h3 className={`font-semibold text-lg mb-2 ${highlighted ? "" : "text-foreground"}`}>
      {title}
    </h3>
    <p className={`text-sm ${highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      {description}
    </p>
  </motion.div>
);

const StatCard = ({ 
  number, 
  label, 
  icon 
}: { 
  number: string; 
  label: string; 
  icon: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
  >
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="text-qrayti-coral">{icon}</span>
      <motion.span 
        className="text-3xl md:text-4xl font-bold text-gradient-moroccan"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {number}
      </motion.span>
    </div>
    <p className="text-sm text-muted-foreground font-medium">{label}</p>
  </motion.div>
);

export default HeroSection;
