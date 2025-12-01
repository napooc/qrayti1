import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Loader2,
  Trophy,
  Lightbulb,
  RefreshCw,
  Brain,
} from "lucide-react";

interface QuizModeProps {
  content: string;
  pages: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationDarija: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Quel est le texte fondamental qui régit le droit civil au Maroc?",
    options: [
      "Le Code Civil Français",
      "Le Dahir des Obligations et Contrats (DOC)",
      "La Constitution Marocaine",
      "Le Code de Commerce",
    ],
    correctIndex: 1,
    explanation:
      "Le Dahir des Obligations et Contrats (DOC), promulgué en 1913, est le texte fondamental qui régit le droit civil au Maroc. Il définit les règles fondamentales des relations entre personnes privées.",
    explanationDarija:
      "الـ DOC هو القانون اللي كيحكم العلاقات بين الناس فالمغرب. تدار من 1913 وكيشمل كلشي على العقود والالتزامات.",
  },
  {
    id: 2,
    question:
      "Lequel de ces éléments n'est PAS une source des obligations en droit marocain?",
    options: ["Le contrat", "La coutume", "Le quasi-délit", "La loi"],
    correctIndex: 1,
    explanation:
      "La coutume n'est pas listée comme source directe des obligations dans le DOC. Les sources sont: le contrat, le quasi-contrat, le délit, le quasi-délit et la loi.",
    explanationDarija:
      "العادة ماشي مصدر من مصادر الالتزامات فالـ DOC. المصادر الرئيسية هي: العقد، شبه العقد، الجريمة، شبه الجريمة، والقانون.",
  },
  {
    id: 3,
    question:
      "Qu'est-ce que le principe de 'l'autonomie de la volonté' signifie en droit des contrats?",
    options: [
      "L'État peut annuler tout contrat",
      "Les parties sont libres de déterminer le contenu de leur contrat",
      "Un contrat doit être écrit pour être valide",
      "Seuls les avocats peuvent rédiger des contrats",
    ],
    correctIndex: 1,
    explanation:
      "L'autonomie de la volonté est un principe fondamental qui permet aux parties de déterminer librement le contenu et les conditions de leur contrat, dans les limites de la loi et de l'ordre public.",
    explanationDarija:
      "استقلالية الإرادة كتعني أن الناس حرين يكتبو فالعقد ديالهم شنو بغاو، مادام ما خالفوش القانون. يعني أنت وصاحبك تقدرو تتفقو على اللي بغيتو.",
  },
  {
    id: 4,
    question:
      "Pour qu'un contrat soit valablement formé, combien de conditions essentielles faut-il réunir?",
    options: ["2 conditions", "3 conditions", "4 conditions", "5 conditions"],
    correctIndex: 2,
    explanation:
      "Pour qu'un contrat soit valide, il faut 4 conditions: le consentement des parties, la capacité juridique, un objet certain et licite, et une cause licite.",
    explanationDarija:
      "باش العقد يكون صحيح خاصك 4 شروط: الموافقة، الأهلية (يعني تكون بالغ وعاقل)، موضوع واضح ومشروع، وسبب مشروع.",
  },
  {
    id: 5,
    question:
      "Comment définit-on le contrat en droit marocain?",
    options: [
      "Un document écrit signé par un notaire",
      "Un accord de deux ou plusieurs volontés en vue de créer des effets de droit",
      "Une obligation imposée par l'État",
      "Un engagement unilatéral d'une personne",
    ],
    correctIndex: 1,
    explanation:
      "Le contrat est défini comme l'accord de deux ou plusieurs volontés en vue de créer des effets de droit. C'est la rencontre d'une offre et d'une acceptation.",
    explanationDarija:
      "العقد هو الاتفاق بين جوج ولا كثر من الناس باش يديرو شي حاجة قانونية. مثلا: أنا وأنت نتفقو أنا نبيعك الدار وأنت تخلصني.",
  },
];

const QuizMode = ({ content, pages }: QuizModeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  useEffect(() => {
    // Simulate AI generating questions
    const timer = setTimeout(() => {
      setQuestions(mockQuestions);
      setAnswers(new Array(mockQuestions.length).fill(null));
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [content, pages]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);

    if (index === questions[currentIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-2xl bg-gradient-navy flex items-center justify-center"
        >
          <Brain className="w-10 h-10 text-qrayti-gold" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-foreground">
            Génération du quiz...
          </p>
          <p className="text-muted-foreground">
            L'IA analyse votre contenu et crée des questions pertinentes
          </p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-qrayti-coral"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-accent flex items-center justify-center"
        >
          <Trophy className="w-12 h-12 text-accent-foreground" />
        </motion.div>

        <div>
          <h3 className="text-3xl font-display font-bold text-foreground mb-2">
            Quiz Terminé!
          </h3>
          <p className="text-muted-foreground">Voici vos résultats</p>
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 max-w-sm mx-auto">
          <div className="text-5xl font-bold text-gradient-moroccan mb-2">
            {score}/{questions.length}
          </div>
          <p className="text-lg text-muted-foreground">{percentage}% de réussite</p>
          <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full ${
                percentage >= 70
                  ? "bg-qrayti-success"
                  : percentage >= 50
                  ? "bg-qrayti-warning"
                  : "bg-destructive"
              }`}
            />
          </div>
        </div>

        <div className="space-y-4">
          {percentage >= 70 && (
            <p className="text-qrayti-success font-medium">
              🎉 Excellent travail! Vous maîtrisez bien ce sujet.
            </p>
          )}
          {percentage >= 50 && percentage < 70 && (
            <p className="text-qrayti-warning font-medium">
              📚 Bon effort! Continuez à réviser pour vous améliorer.
            </p>
          )}
          {percentage < 50 && (
            <p className="text-destructive font-medium">
              💪 Ne vous découragez pas! Révisez le résumé et réessayez.
            </p>
          )}
        </div>

        <Button variant="hero" size="lg" onClick={handleRestart}>
          <RefreshCw className="w-5 h-5" />
          Recommencer le quiz
        </Button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentIndex + 1}/{questions.length}
        </span>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < currentIndex
                  ? answers[i] === questions[i].correctIndex
                    ? "bg-qrayti-success"
                    : "bg-destructive"
                  : i === currentIndex
                  ? "bg-qrayti-coral"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-qrayti-success">
          Score: {score}
        </span>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-foreground leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;

            let bgClass = "bg-muted/50 hover:bg-muted border-border";
            if (showExplanation) {
              if (isCorrectOption) {
                bgClass = "bg-qrayti-success/10 border-qrayti-success";
              } else if (isSelected && !isCorrectOption) {
                bgClass = "bg-destructive/10 border-destructive";
              }
            } else if (isSelected) {
              bgClass = "bg-qrayti-coral/10 border-qrayti-coral";
            }

            return (
              <motion.button
                key={index}
                whileHover={!showExplanation ? { scale: 1.01 } : {}}
                whileTap={!showExplanation ? { scale: 0.99 } : {}}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${
                  showExplanation ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                  {showExplanation && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-qrayti-success" />
                  )}
                  {showExplanation && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4"
            >
              {/* Result Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isCorrect
                    ? "bg-qrayti-success/10 text-qrayti-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Bonne réponse!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span className="font-semibold">Mauvaise réponse</span>
                  </>
                )}
              </div>

              {/* French Explanation */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-qrayti-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Explication</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Darija Explanation */}
              <div className="p-4 rounded-xl bg-qrayti-navy/5 border border-qrayti-navy/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-qrayti-coral/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🇲🇦</span>
                  </div>
                  <div>
                    <p className="font-medium text-qrayti-coral mb-1">
                      بالدارجة / En Darija
                    </p>
                    <p className="text-sm text-foreground leading-relaxed" dir="auto">
                      {currentQuestion.explanationDarija}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4">
                <Button variant="hero" onClick={handleNext} className="w-full">
                  {currentIndex < questions.length - 1 ? (
                    <>
                      Question suivante
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Voir les résultats
                      <Trophy className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuizMode;
