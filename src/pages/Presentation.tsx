import { motion } from "framer-motion";
import { BookOpen, Target, Lightbulb, CheckCircle, Users, FileText, Brain, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Presentation() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-navy text-cream py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Qrayti" className="h-8 w-8" />
            <span className="font-display text-xl font-bold">Qrayti</span>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-navy">
              Retour à l'app
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Title Slide */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="text-center py-16"
        >
          <Badge className="bg-gold/20 text-gold border-gold mb-4">Projet de Fin d'Études</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy mb-4">
            Qrayti
          </h1>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto">
            Plateforme d'Apprentissage Intelligente pour Étudiants Marocains
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-16 h-1 bg-gold rounded-full" />
            <div className="w-4 h-1 bg-coral rounded-full" />
            <div className="w-2 h-1 bg-navy rounded-full" />
          </div>
        </motion.section>

        {/* Introduction */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="bg-navy text-cream mb-4">01</Badge>
            <h2 className="font-display text-3xl font-bold text-navy mb-4">Introduction</h2>
            <p className="text-navy/70 leading-relaxed">
              Les étudiants marocains font face à un défi majeur : transformer leurs cours PDF 
              en outils d'apprentissage efficaces. <strong>Qrayti</strong> répond à ce besoin 
              avec une solution IA innovante.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-navy text-cream text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-bold">PDF</p>
              <p className="text-sm text-cream/70">Upload facile</p>
            </Card>
            <Card className="p-6 bg-gold text-navy text-center">
              <Brain className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">IA</p>
              <p className="text-sm text-navy/70">Analyse intelligente</p>
            </Card>
            <Card className="p-6 bg-coral text-cream text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">Quiz</p>
              <p className="text-sm text-cream/70">Auto-évaluation</p>
            </Card>
            <Card className="p-6 bg-cream border-2 border-navy text-navy text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-coral" />
              <p className="text-2xl font-bold">Résumé</p>
              <p className="text-sm text-navy/70">Synthèse claire</p>
            </Card>
          </motion.div>
        </motion.section>

        {/* Problématique */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-navy rounded-3xl p-8 md:p-12"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Badge className="bg-coral text-cream mb-4">02</Badge>
            <h2 className="font-display text-3xl font-bold text-cream">Problématique</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Cours denses", desc: "PDFs académiques longs et complexes" },
              { icon: Target, title: "Manque d'exercices", desc: "Pas de quiz personnalisés" },
              { icon: Users, title: "Barrière linguistique", desc: "Contenu en français, besoin de Darija" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="p-6 bg-cream/10 border-cream/20 text-center h-full">
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-gold" />
                  <h3 className="font-semibold text-cream mb-2">{item.title}</h3>
                  <p className="text-cream/70 text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Solution */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Badge className="bg-gold text-navy mb-4">03</Badge>
            <h2 className="font-display text-3xl font-bold text-navy">Notre Solution</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="p-8 bg-gradient-to-br from-gold/10 to-coral/10 border-gold/30">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-gold" />
                    <span className="font-semibold text-navy">Intelligence Artificielle</span>
                  </div>
                  <p className="text-navy/70">
                    Qrayti utilise <strong>Google Gemini 2.5</strong> pour analyser vos PDFs 
                    et générer automatiquement des quiz et résumés adaptés au contexte marocain.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-navy text-navy">React + TypeScript</Badge>
                    <Badge variant="outline" className="border-navy text-navy">Supabase Edge</Badge>
                    <Badge variant="outline" className="border-navy text-navy">Gemini AI</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-navy">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cream" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-gold" />
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                    <Brain className="w-8 h-8 text-navy" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-coral" />
                  <div className="w-16 h-16 rounded-full bg-coral flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-cream" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Use Case Diagram */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Badge className="bg-navy text-cream mb-4">04</Badge>
            <h2 className="font-display text-3xl font-bold text-navy">Diagramme de Cas d'Utilisation</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="p-8 bg-cream border-2 border-navy/20">
              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Actor */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-navy mx-auto mb-2 flex items-center justify-center">
                    <Users className="w-10 h-10 text-cream" />
                  </div>
                  <p className="font-semibold text-navy">Étudiant</p>
                </div>
                
                {/* Use Cases */}
                <div className="flex-1 max-w-md">
                  <div className="border-2 border-navy rounded-3xl p-6 space-y-4">
                    <p className="text-center font-semibold text-navy mb-4">Système Qrayti</p>
                    {[
                      { label: "UC1: Télécharger PDF", color: "bg-gold" },
                      { label: "UC2: Générer Quiz", color: "bg-coral" },
                      { label: "UC3: Générer Résumé", color: "bg-navy" }
                    ].map((uc, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-navy" />
                        <div className={`flex-1 ${uc.color} ${uc.color === 'bg-navy' ? 'text-cream' : 'text-navy'} rounded-full py-2 px-4 text-center text-sm font-medium`}>
                          {uc.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Actor */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gold mx-auto mb-2 flex items-center justify-center">
                    <Brain className="w-10 h-10 text-navy" />
                  </div>
                  <p className="font-semibold text-navy">IA Gemini</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Sequence Diagram */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-8 md:p-12"
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Badge className="bg-gold text-navy mb-4">05</Badge>
            <h2 className="font-display text-3xl font-bold text-cream">Diagramme de Séquence</h2>
            <p className="text-cream/70 mt-2">Génération de Quiz</p>
          </motion.div>
          <motion.div variants={fadeIn}>
            <div className="flex justify-between items-start gap-4 overflow-x-auto pb-4">
              {/* Lifelines */}
              {[
                { name: "Utilisateur", icon: Users, bg: "bg-cream" },
                { name: "Frontend", icon: BookOpen, bg: "bg-gold" },
                { name: "Edge Function", icon: Target, bg: "bg-coral" },
                { name: "Gemini AI", icon: Brain, bg: "bg-cream" }
              ].map((actor, i) => (
                <div key={i} className="flex flex-col items-center min-w-[100px]">
                  <div className={`w-14 h-14 ${actor.bg} rounded-lg flex items-center justify-center mb-2`}>
                    <actor.icon className="w-7 h-7 text-navy" />
                  </div>
                  <p className="text-cream text-xs font-medium text-center">{actor.name}</p>
                  <div className="w-0.5 h-48 bg-cream/30 mt-4" />
                </div>
              ))}
            </div>
            {/* Messages */}
            <div className="relative -mt-44 ml-16 space-y-8">
              {[
                { from: 0, to: 1, label: "1. Upload PDF", color: "bg-gold" },
                { from: 1, to: 2, label: "2. Invoke function", color: "bg-coral" },
                { from: 2, to: 3, label: "3. Generate quiz", color: "bg-cream" },
                { from: 3, to: 2, label: "4. JSON response", color: "bg-cream", reverse: true },
                { from: 2, to: 1, label: "5. Return data", color: "bg-coral", reverse: true },
                { from: 1, to: 0, label: "6. Display quiz", color: "bg-gold", reverse: true }
              ].map((msg, i) => (
                <div key={i} className="flex items-center gap-2" style={{ marginLeft: `${msg.from * 80}px`, width: `${Math.abs(msg.to - msg.from) * 80 + 40}px` }}>
                  <div className={`h-0.5 flex-1 ${msg.color}`} />
                  <span className={`text-xs ${msg.color === 'bg-cream' ? 'text-cream' : 'text-cream'} whitespace-nowrap px-2 py-1 rounded ${msg.color}`}>
                    {msg.label}
                  </span>
                  <div className={`w-2 h-2 ${msg.color} rotate-45`} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Class Diagram */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-8">
            <Badge className="bg-coral text-cream mb-4">06</Badge>
            <h2 className="font-display text-3xl font-bold text-navy">Diagramme de Classes</h2>
          </motion.div>
          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6">
            {/* ContentData Class */}
            <Card className="overflow-hidden border-2 border-navy">
              <div className="bg-navy text-cream p-3 text-center font-semibold">
                ContentData
              </div>
              <div className="p-4 space-y-2 text-sm border-b border-navy/20">
                <p className="text-navy/70">+ summary: SummarySection[]</p>
                <p className="text-navy/70">+ keyTerms: KeyTerm[]</p>
                <p className="text-navy/70">+ questions: Question[]</p>
              </div>
              <div className="p-4 text-sm">
                <p className="text-navy/70">+ generateFromPDF()</p>
              </div>
            </Card>

            {/* Question Class */}
            <Card className="overflow-hidden border-2 border-gold">
              <div className="bg-gold text-navy p-3 text-center font-semibold">
                Question
              </div>
              <div className="p-4 space-y-2 text-sm border-b border-gold/20">
                <p className="text-navy/70">+ id: number</p>
                <p className="text-navy/70">+ question: string</p>
                <p className="text-navy/70">+ options: string[]</p>
                <p className="text-navy/70">+ correctAnswer: number</p>
              </div>
              <div className="p-4 text-sm">
                <p className="text-navy/70">+ checkAnswer()</p>
              </div>
            </Card>

            {/* SummarySection Class */}
            <Card className="overflow-hidden border-2 border-coral">
              <div className="bg-coral text-cream p-3 text-center font-semibold">
                SummarySection
              </div>
              <div className="p-4 space-y-2 text-sm border-b border-coral/20">
                <p className="text-navy/70">+ title: string</p>
                <p className="text-navy/70">+ content: string</p>
                <p className="text-navy/70">+ keyPoints: string[]</p>
              </div>
              <div className="p-4 text-sm">
                <p className="text-navy/70">+ formatContent()</p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Conclusion */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center py-12"
        >
          <Badge className="bg-gold text-navy mb-4">07</Badge>
          <h2 className="font-display text-3xl font-bold text-navy mb-6">Conclusion</h2>
          <Card className="p-8 bg-gradient-to-br from-navy to-navy/95 text-cream max-w-2xl mx-auto">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gold" />
            <p className="text-lg leading-relaxed mb-6">
              <strong>Qrayti</strong> révolutionne l'apprentissage pour les étudiants marocains 
              en combinant IA et pédagogie adaptée. Une solution simple, efficace et accessible.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-gold text-navy">✓ Accessible</Badge>
              <Badge className="bg-coral text-cream">✓ Intelligent</Badge>
              <Badge className="bg-cream text-navy">✓ Marocain</Badge>
            </div>
          </Card>
          <div className="mt-8">
            <Link to="/">
              <Button className="bg-coral hover:bg-coral/90 text-cream">
                Découvrir Qrayti <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-cream py-6 text-center">
        <p className="text-sm text-cream/70">© 2025 Qrayti - Projet de Fin d'Études</p>
      </footer>
    </div>
  );
}
