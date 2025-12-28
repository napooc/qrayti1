import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  Clock, 
  Award,
  Users,
  BookOpen,
  CheckCircle
} from "lucide-react";
import seo1 from "@/assets/seo-1.jpg";
import seo2 from "@/assets/seo-2.jpg";
import seo3 from "@/assets/seo-3.jpg";
import seo4 from "@/assets/seo-4.jpg";
import seo5 from "@/assets/seo-5.jpg";
import seo6 from "@/assets/seo-6.jpg";

const images = [
  { src: seo1, alt: "Quiz interactif sur tablette - Qrayti plateforme éducative" },
  { src: seo2, alt: "Intelligence artificielle neurale pour l'apprentissage" },
  { src: seo3, alt: "Résumé automatique de cours PDF" },
  { src: seo4, alt: "Étudiante marocaine utilisant Qrayti" },
  { src: seo5, alt: "Transformation de documents PDF en connaissances" },
  { src: seo6, alt: "Interface quiz avec choix multiples" },
];

const benefits = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Intelligence Artificielle Avancée",
    description: "Notre IA analyse vos cours et génère du contenu pédagogique personnalisé adapté au système éducatif marocain.",
    color: "coral",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Support Multilingue",
    description: "Apprenez en Français, Arabe ou Darija. Notre plateforme s'adapte à votre langue préférée.",
    color: "navy",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Génération Instantanée",
    description: "Obtenez des quiz et résumés en quelques secondes. Plus besoin de passer des heures à préparer vos révisions.",
    color: "gold",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Confidentialité Garantie",
    description: "Vos documents restent privés et sécurisés. Nous ne stockons pas vos PDFs après traitement.",
    color: "coral",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Gain de Temps",
    description: "Économisez jusqu'à 80% du temps de révision grâce à nos résumés intelligents et quiz ciblés.",
    color: "navy",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Résultats Prouvés",
    description: "Les étudiants utilisant Qrayti améliorent leurs notes de 30% en moyenne.",
    color: "gold",
  },
];

const colorClasses = {
  coral: {
    bg: "bg-qrayti-coral/10",
    text: "text-qrayti-coral",
    border: "border-qrayti-coral/30",
  },
  navy: {
    bg: "bg-qrayti-navy/10",
    text: "text-qrayti-navy dark:text-blue-400",
    border: "border-qrayti-navy/30",
  },
  gold: {
    bg: "bg-qrayti-gold/10",
    text: "text-qrayti-gold",
    border: "border-qrayti-gold/30",
  },
};

const SEOSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-qrayti-coral/10 border border-qrayti-coral/30 mb-6">
            <GraduationCap className="w-5 h-5 text-qrayti-coral" />
            <span className="text-sm font-semibold text-qrayti-coral">Pourquoi Qrayti?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">La plateforme </span>
            <span className="text-gradient-moroccan">d'apprentissage</span>
            <br />
            <span className="text-foreground">préférée des étudiants</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez pourquoi des milliers d'étudiants marocains font confiance à Qrayti 
            pour transformer leur façon d'apprendre et réussir leurs examens.
          </p>
        </motion.div>

        {/* Image Gallery - Masonry Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`relative overflow-hidden rounded-2xl shadow-card ${
                index === 1 || index === 4 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-foreground font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-8 rounded-3xl bg-card border ${colorClasses[benefit.color as keyof typeof colorClasses].border} shadow-card hover:shadow-glow transition-all duration-300`}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-4 rounded-2xl ${colorClasses[benefit.color as keyof typeof colorClasses].bg} ${colorClasses[benefit.color as keyof typeof colorClasses].text} mb-6`}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-navy opacity-95" />
          <div className="relative z-10 p-12 md:p-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-qrayti-gold/20 mb-8"
            >
              <Users className="w-10 h-10 text-qrayti-gold" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Rejoignez la communauté Qrayti
            </h3>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Des milliers d'étudiants de toutes les universités marocaines utilisent déjà Qrayti 
              pour améliorer leurs résultats académiques.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <TrustStat icon={<BookOpen className="w-6 h-6" />} value="15+" label="Universités" />
              <TrustStat icon={<Users className="w-6 h-6" />} value="10K+" label="Étudiants actifs" />
              <TrustStat icon={<CheckCircle className="w-6 h-6" />} value="500K+" label="Questions générées" />
              <TrustStat icon={<Award className="w-6 h-6" />} value="4.9/5" label="Note moyenne" />
            </div>
          </div>
        </motion.div>

        {/* SEO Rich Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 prose prose-lg dark:prose-invert max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            Qrayti : L'avenir de l'éducation au Maroc
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Pour les étudiants universitaires</h3>
              <p>
                Que vous soyez en médecine, droit, économie ou ingénierie, Qrayti comprend 
                la structure de vos cours et génère des quiz adaptés à votre niveau d'études. 
                Notre intelligence artificielle a été entraînée sur des milliers de documents 
                académiques marocains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Pour les lycéens</h3>
              <p>
                Préparez votre baccalauréat avec confiance. Qrayti transforme vos manuels 
                et cours en fiches de révision et quiz pratiques. Maîtrisez les concepts clés 
                et entraînez-vous efficacement pour les examens nationaux.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustStat = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm"
  >
    <div className="flex items-center justify-center gap-2 mb-2 text-qrayti-gold">
      {icon}
    </div>
    <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{value}</div>
    <div className="text-sm text-primary-foreground/70">{label}</div>
  </motion.div>
);

export default SEOSection;
