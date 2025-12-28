import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOSection from "@/components/SEOSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ComparisonSection from "@/components/ComparisonSection";
import AppSection from "@/components/AppSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Qrayti - Plateforme d'Apprentissage IA pour Étudiants Marocains | Quiz & Résumés PDF</title>
        <meta name="description" content="Transformez vos cours PDF en quiz interactifs et résumés intelligents avec Qrayti. L'IA éducative conçue pour les étudiants marocains. Support Darija et Français." />
        <meta name="keywords" content="Qrayti, apprentissage IA, quiz PDF, résumé automatique, étudiants marocains, révision, baccalauréat, université Maroc, darija, intelligence artificielle éducation" />
        <link rel="canonical" href="https://qrayti.ma" />
        <meta property="og:title" content="Qrayti - L'IA qui transforme vos cours en quiz et résumés" />
        <meta property="og:description" content="Plateforme d'apprentissage intelligente pour étudiants marocains. Générez des quiz et résumés à partir de vos PDF en secondes." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_MA" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Qrayti",
            "description": "Plateforme d'apprentissage IA pour étudiants marocains",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "MAD"
            },
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "student"
            }
          })}
        </script>
      </Helmet>
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <SEOSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ComparisonSection />
        <AppSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
