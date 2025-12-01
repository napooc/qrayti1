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
} from "lucide-react";

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

const mockSummary: SummarySection[] = [
  {
    title: "Introduction au Droit Civil Marocain",
    content:
      "Le droit civil marocain est principalement régi par le Dahir des Obligations et Contrats (DOC) de 1913. Ce code fondamental définit les règles essentielles qui gouvernent les relations juridiques entre les personnes privées. Il couvre notamment les contrats, les obligations, et la responsabilité civile.",
    keyTerms: [
      {
        term: "DOC (Dahir des Obligations et Contrats)",
        definition:
          "Texte législatif fondamental du droit civil marocain promulgué en 1913",
        definitionDarija:
          "القانون اللي كيحكم العقود والالتزامات فالمغرب من 1913",
      },
      {
        term: "Autonomie de la volonté",
        definition:
          "Principe permettant aux parties de déterminer librement le contenu de leurs contrats",
        definitionDarija:
          "يعني الناس حرين يكتبو فالعقد شنو بغاو مادام ماخالفوش القانون",
      },
      {
        term: "Bonne foi",
        definition:
          "Obligation d'honnêteté et de loyauté dans l'exécution des contrats",
        definitionDarija: "خاصك تكون صادق ومخلص ملي كتدير عقد مع شي واحد",
      },
    ],
    essentialPoints: [
      "Le DOC est le texte fondateur du droit des obligations au Maroc",
      "Trois principes fondamentaux: liberté contractuelle, autonomie de la volonté, bonne foi",
      "S'applique à toutes les obligations sauf celles régies par des textes spéciaux",
    ],
  },
  {
    title: "Les Sources des Obligations",
    content:
      "En droit marocain, les obligations peuvent naître de plusieurs sources distinctes. Le contrat reste la source principale, représentant l'accord de deux ou plusieurs volontés. Les autres sources incluent le quasi-contrat, le délit, le quasi-délit, et la loi elle-même.",
    keyTerms: [
      {
        term: "Contrat (العقد)",
        definition:
          "Accord de deux ou plusieurs volontés en vue de créer des effets de droit",
        definitionDarija: "اتفاق بين جوج ولا كثر من الناس باش يديرو شي حاجة قانونية",
      },
      {
        term: "Quasi-contrat",
        definition:
          "Fait licite et volontaire créant une obligation sans accord préalable",
        definitionDarija:
          "شي فعل قانوني اللي كيخلق التزام بلا ما يكون عقد من قبل",
      },
      {
        term: "Délit civil",
        definition: "Acte illicite intentionnel causant un dommage à autrui",
        definitionDarija: "شي فعل غير قانوني عمداني اللي كيضر شي واحد آخر",
      },
    ],
    essentialPoints: [
      "5 sources des obligations: contrat, quasi-contrat, délit, quasi-délit, loi",
      "Le contrat est la source principale et la plus courante",
      "Le contrat nécessite une offre et une acceptation",
    ],
  },
  {
    title: "La Formation du Contrat",
    content:
      "Pour qu'un contrat soit valablement formé en droit marocain, quatre conditions essentielles doivent être réunies: le consentement des parties, la capacité juridique, un objet certain et licite, et une cause licite. L'absence d'une de ces conditions peut entraîner la nullité du contrat.",
    keyTerms: [
      {
        term: "Consentement",
        definition: "Accord libre et éclairé des parties sur les termes du contrat",
        definitionDarija: "موافقة حرة وواضحة على شروط العقد",
      },
      {
        term: "Capacité juridique",
        definition:
          "Aptitude d'une personne à être titulaire de droits et à les exercer",
        definitionDarija: "تكون بالغ وعاقل وتقدر تدير عقود قانونية",
      },
      {
        term: "Objet du contrat",
        definition:
          "Ce sur quoi porte l'engagement des parties (bien, service, etc.)",
        definitionDarija: "شنو اللي غادي يدار فالعقد: بيع، خدمة، إلخ",
      },
      {
        term: "Cause licite",
        definition:
          "Raison juridiquement acceptable pour laquelle le contrat est conclu",
        definitionDarija: "السبب القانوني علاش درتي العقد",
      },
    ],
    essentialPoints: [
      "4 conditions de validité: consentement, capacité, objet, cause",
      "Toutes les conditions doivent être présentes simultanément",
      "Un vice dans l'une des conditions peut annuler le contrat",
    ],
  },
];

const ResumeMode = ({ content, pages }: ResumeModeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<SummarySection[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  useEffect(() => {
    // Simulate AI generating summary
    const timer = setTimeout(() => {
      setSummary(mockSummary);
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [content, pages]);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
            L'IA structure et synthétise votre contenu
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
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4" />
          Exporter PDF
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

                {/* Essential Points */}
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
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Generate Quiz CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-gradient-navy text-primary-foreground text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Prêt à tester vos connaissances?</h3>
        <p className="text-primary-foreground/80 mb-4">
          Générez un quiz basé sur ce résumé pour consolider votre apprentissage
        </p>
        <Button variant="gold" size="lg">
          Générer un quiz
        </Button>
      </motion.div>
    </div>
  );
};

export default ResumeMode;
