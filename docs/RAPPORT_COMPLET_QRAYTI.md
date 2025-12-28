# RAPPORT DE PROJET
# QRAYTI - Plateforme d'Apprentissage Intelligente pour Étudiants Marocains

---

![Qrayti Logo](../src/assets/logo.png)

---

## Informations Générales

| Élément | Détail |
|---------|--------|
| **Nom du projet** | Qrayti (قرايتي) |
| **Type** | Application Web Éducative |
| **Public cible** | Étudiants marocains (Baccalauréat, Université) |
| **Technologies** | React, TypeScript, Supabase, IA Gemini |
| **Version** | 1.0 |
| **Date** | Décembre 2024 |

---

# Table des Matières

1. [Chapitre 1 : Introduction Générale](#chapitre-1--introduction-générale)
2. [Chapitre 2 : Analyse des Besoins](#chapitre-2--analyse-des-besoins)
3. [Chapitre 3 : Conception du Système](#chapitre-3--conception-du-système)
4. [Chapitre 4 : Réalisation et Implémentation](#chapitre-4--réalisation-et-implémentation)
5. [Chapitre 5 : Interfaces Utilisateur](#chapitre-5--interfaces-utilisateur)
6. [Chapitre 6 : Tests et Validation](#chapitre-6--tests-et-validation)
7. [Conclusion et Perspectives](#conclusion-et-perspectives)
8. [Annexes](#annexes)

---

# Chapitre 1 : Introduction Générale

## 1.1 Contexte du Projet

Dans un monde où l'éducation évolue rapidement vers le numérique, les étudiants marocains font face à un défi majeur : comment réviser efficacement leurs cours académiques tout en surmontant les barrières linguistiques entre le français académique et leur langue maternelle, le Darija (dialecte marocain).

**Qrayti** (قرايتي - "mes études" en Darija) est une application web innovante qui répond à ce besoin en combinant :
- L'extraction intelligente de contenu PDF
- La génération automatique de quiz et résumés par IA
- Des explications bilingues (Français/Darija)

## 1.2 Problématique

Les étudiants marocains rencontrent plusieurs obstacles dans leur parcours académique :

| Problème | Impact |
|----------|--------|
| **Barrière linguistique** | Difficulté à comprendre les concepts en français académique |
| **Méthodes de révision traditionnelles** | Chronophages et peu interactives |
| **Manque d'outils adaptés** | Outils génériques non adaptés au contexte marocain |
| **Accès limité aux ressources** | Coût élevé des cours particuliers et ressources premium |

## 1.3 Objectifs du Projet

### Objectifs Principaux
1. **Transformer automatiquement** des cours PDF en contenus interactifs
2. **Générer des quiz** avec corrections et explications détaillées
3. **Créer des résumés structurés** avec termes clés
4. **Fournir des explications en Darija** pour une meilleure compréhension

### Objectifs Secondaires
- Interface utilisateur moderne et intuitive
- Accessibilité sur tous les appareils (responsive design)
- Performance optimisée (chargement rapide)
- Expérience utilisateur fluide avec animations

## 1.4 Portée du Projet

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PÉRIMÈTRE QRAYTI                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✅ INCLUS                          ❌ EXCLUS                       │
│  ─────────                          ────────                        │
│  • Upload PDF (≤20MB)               • Authentification utilisateur  │
│  • Extraction texte PDF.js          • Sauvegarde en base de données │
│  • Génération Quiz IA               • Partage social                │
│  • Génération Résumé IA             • Application mobile native     │
│  • Explications Darija              • Mode hors-ligne               │
│  • Interface responsive             • Gestion de comptes            │
│  • Mode démo                        • Historique des sessions       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# Chapitre 2 : Analyse des Besoins

## 2.1 Étude de l'Existant

### 2.1.1 Solutions Existantes

| Solution | Avantages | Inconvénients |
|----------|-----------|---------------|
| **ChatGPT** | Puissant, polyvalent | Non adapté Maroc, pas de Darija |
| **Quizlet** | Quiz interactifs | Création manuelle, payant |
| **Notion AI** | Résumés automatiques | Complexe, pas d'extraction PDF |
| **Scribbr** | Correction académique | Payant, pas de quiz |

### 2.1.2 Analyse Concurrentielle

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        TABLEAU COMPARATIF                                       │
├─────────────────┬──────────┬──────────┬──────────┬──────────┬──────────────────┤
│ Fonctionnalité  │ ChatGPT  │ Quizlet  │ Notion   │ Scribbr  │ QRAYTI           │
├─────────────────┼──────────┼──────────┼──────────┼──────────┼──────────────────┤
│ Upload PDF      │    ✓     │    ✗     │    ✓     │    ✓     │       ✓          │
│ Quiz auto       │    ✗     │    ✗     │    ✗     │    ✗     │       ✓          │
│ Résumé auto     │    ✓     │    ✗     │    ✓     │    ✗     │       ✓          │
│ Darija          │    ✗     │    ✗     │    ✗     │    ✗     │       ✓          │
│ Gratuit         │    △     │    ✗     │    ✗     │    ✗     │       ✓          │
│ Contexte Maroc  │    ✗     │    ✗     │    ✗     │    ✗     │       ✓          │
└─────────────────┴──────────┴──────────┴──────────┴──────────┴──────────────────┘

Légende: ✓ = Oui | ✗ = Non | △ = Partiel
```

## 2.2 Identification des Acteurs

### 2.2.1 Acteurs Principaux

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DIAGRAMME DES ACTEURS                          │
└─────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────┐
                         │                 │
                         │    Étudiant     │
                         │   Marocain      │
                         │                 │
                         └────────┬────────┘
                                  │
                                  │ Utilise
                                  │
                                  ▼
                         ┌─────────────────┐
                         │                 │
                         │    QRAYTI       │
                         │   Application   │
                         │                 │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
            ┌───────────┐ ┌───────────┐ ┌───────────┐
            │  PDF.js   │ │  Supabase │ │  Gemini   │
            │ Extracteur│ │  Backend  │ │    IA     │
            └───────────┘ └───────────┘ └───────────┘
```

### 2.2.2 Description des Acteurs

| Acteur | Type | Rôle |
|--------|------|------|
| **Étudiant** | Principal | Utilisateur final qui interagit avec l'application |
| **PDF.js** | Système | Bibliothèque d'extraction de texte PDF |
| **Supabase** | Système | Plateforme backend (Edge Functions) |
| **Gemini AI** | Système | Modèle IA pour génération de contenu |

## 2.3 Besoins Fonctionnels

### 2.3.1 Cas d'Utilisation Principaux

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      DIAGRAMME DE CAS D'UTILISATION                             │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────────────────────────────────────┐
                                    │              SYSTÈME QRAYTI             │
                                    │                                         │
    ┌─────────────┐                │   ┌─────────────────────────────────┐   │
    │             │                │   │                                 │   │
    │  Étudiant   │────────────────┼──►│   UC1: Uploader un PDF          │   │
    │             │                │   │                                 │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                   │                     │
    │             │                │                   │ <<include>>         │
    │             │                │                   ▼                     │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │────────────────┼──►│   UC2: Extraire le texte        │   │
    │             │                │   │                                 │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                                         │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │────────────────┼──►│   UC3: Configurer les options   │   │
    │             │                │   │   (pages, nb questions)         │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                                         │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │────────────────┼──►│   UC4: Générer un Quiz          │   │
    │             │                │   │                                 │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                   │                     │
    │             │                │                   │ <<include>>         │
    │             │                │                   ▼                     │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │                │   │   UC5: Afficher explication     │   │
    │             │────────────────┼──►│       en Darija                 │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                                         │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │────────────────┼──►│   UC6: Générer un Résumé        │   │
    │             │                │   │                                 │   │
    │             │                │   └─────────────────────────────────┘   │
    │             │                │                                         │
    │             │                │   ┌─────────────────────────────────┐   │
    │             │────────────────┼──►│   UC7: Utiliser le mode démo    │   │
    │             │                │   │                                 │   │
    └─────────────┘                │   └─────────────────────────────────┘   │
                                    │                                         │
                                    └─────────────────────────────────────────┘
```

### 2.3.2 Description Détaillée des Cas d'Utilisation

#### UC1: Uploader un PDF

| Élément | Description |
|---------|-------------|
| **Acteur** | Étudiant |
| **Précondition** | L'utilisateur est sur la page d'accueil |
| **Postcondition** | Le texte du PDF est extrait et affiché |
| **Scénario nominal** | 1. L'utilisateur clique sur la zone d'upload ou glisse-dépose un fichier<br>2. Le système valide le format (PDF) et la taille (≤20MB)<br>3. Le système extrait le texte page par page<br>4. Le système affiche les options de configuration |
| **Scénario alternatif** | 3a. Si le fichier est invalide, afficher un message d'erreur |

#### UC4: Générer un Quiz

| Élément | Description |
|---------|-------------|
| **Acteur** | Étudiant |
| **Précondition** | Un PDF a été uploadé et le texte extrait |
| **Postcondition** | Un quiz interactif est affiché |
| **Scénario nominal** | 1. L'utilisateur sélectionne le nombre de questions<br>2. L'utilisateur clique sur "Mode Quiz"<br>3. Le système appelle l'Edge Function<br>4. L'IA génère les questions avec explications Darija<br>5. Le quiz interactif s'affiche |

## 2.4 Besoins Non Fonctionnels

### 2.4.1 Exigences de Performance

| Critère | Exigence | Mesure |
|---------|----------|--------|
| **Temps de chargement** | Page initiale < 3s | First Contentful Paint |
| **Extraction PDF** | < 10s pour 50 pages | Temps d'exécution |
| **Génération IA** | < 30s pour quiz/résumé | Temps de réponse API |
| **Réactivité UI** | Animations fluides 60fps | Frame rate |

### 2.4.2 Exigences de Qualité

| Aspect | Exigence |
|--------|----------|
| **Utilisabilité** | Interface intuitive, pas de formation requise |
| **Accessibilité** | Responsive design (mobile, tablette, desktop) |
| **Fiabilité** | Gestion des erreurs avec messages clairs |
| **Maintenabilité** | Code modulaire, composants réutilisables |

### 2.4.3 Contraintes Techniques

- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Taille fichier maximum** : 20 MB
- **Format supporté** : PDF uniquement
- **Connexion internet** : Requise pour la génération IA

---

# Chapitre 3 : Conception du Système

## 3.1 Architecture Globale

### 3.1.1 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      ARCHITECTURE SYSTÈME QRAYTI                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              COUCHE PRÉSENTATION                                │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         React 18 + TypeScript                            │   │
│  │                                                                          │   │
│  │   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐            │   │
│  │   │  Header  │   │   Hero   │   │ Features │   │   App    │            │   │
│  │   │          │   │ Section  │   │ Section  │   │ Section  │            │   │
│  │   └──────────┘   └──────────┘   └──────────┘   └──────────┘            │   │
│  │                                                      │                  │   │
│  │                                          ┌───────────┼───────────┐      │   │
│  │                                          ▼           ▼           ▼      │   │
│  │                                   ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
│  │                                   │   PDF    │ │   Quiz   │ │ Resume │ │   │
│  │                                   │ Uploader │ │   Mode   │ │  Mode  │ │   │
│  │                                   └──────────┘ └──────────┘ └────────┘ │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                         │                                       │
└─────────────────────────────────────────┼───────────────────────────────────────┘
                                          │ HTTPS
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              COUCHE MÉTIER                                      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Supabase Edge Functions (Deno)                        │   │
│  │                                                                          │   │
│  │   ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │   │                      process-pdf                                 │   │   │
│  │   │                                                                  │   │   │
│  │   │   • Réception requêtes POST                                     │   │   │
│  │   │   • Construction prompts IA                                      │   │   │
│  │   │   • Appel Lovable AI Gateway                                     │   │   │
│  │   │   • Parsing réponses JSON                                        │   │   │
│  │   │   • Gestion erreurs (429, 402, 500)                              │   │   │
│  │   │                                                                  │   │   │
│  │   └─────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                         │                                       │
└─────────────────────────────────────────┼───────────────────────────────────────┘
                                          │ HTTPS
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              COUCHE IA                                          │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                       Lovable AI Gateway                                 │   │
│  │                       ai.gateway.lovable.dev                             │   │
│  │                                                                          │   │
│  │                              │                                           │   │
│  │                              ▼                                           │   │
│  │                                                                          │   │
│  │   ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │   │                 Google Gemini 2.5 Flash                         │   │   │
│  │   │                                                                  │   │   │
│  │   │   • Génération questions QCM                                     │   │   │
│  │   │   • Création résumés structurés                                  │   │   │
│  │   │   • Traduction/Explication Darija                                │   │   │
│  │   │                                                                  │   │   │
│  │   └─────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3.2 Diagramme de Classes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DIAGRAMME DE CLASSES QRAYTI                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│      <<interface>>       │          │      <<interface>>       │
│       ContentData        │          │        Question          │
├──────────────────────────┤          ├──────────────────────────┤
│ + fileName: string       │          │ + id: number             │
│ + content: string        │          │ + question: string       │
│ + pageCount: number      │          │ + options: string[]      │
└──────────────────────────┘          │ + correctIndex: number   │
                                      │ + explanation: string    │
                                      │ + explanationDarija: str │
                                      └──────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│      <<interface>>       │          │      <<interface>>       │
│     SummarySection       │          │        KeyTerm           │
├──────────────────────────┤          ├──────────────────────────┤
│ + title: string          │          │ + term: string           │
│ + content: string        │          │ + definition: string     │
│ + keyTerms: KeyTerm[]    │          │ + definitionDarija: str  │
│ + essentialPoints: str[] │          └──────────────────────────┘
└──────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│    <<component>>         │          │    <<component>>         │
│     PDFUploader          │          │      AppSection          │
├──────────────────────────┤          ├──────────────────────────┤
│ - isDragging: boolean    │          │ - mode: AppMode          │
│ - isProcessing: boolean  │          │ - contentData: Content   │
│ - error: string          │          │ - selectedPages: number  │
│ - progress: number       │          │ - questionCount: number  │
├──────────────────────────┤          ├──────────────────────────┤
│ + handleDragOver()       │          │ + handleFileProcessed()  │
│ + handleDragLeave()      │          │ + handleModeSelect()     │
│ + handleDrop()           │          │ + handleBack()           │
│ + extractTextFromPDF()   │          └──────────────────────────┘
│ + processFile()          │
│ + handleDemoMode()       │
└──────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│    <<component>>         │          │    <<component>>         │
│      QuizMode            │          │     ResumeMode           │
├──────────────────────────┤          ├──────────────────────────┤
│ - currentQuestion: num   │          │ - activeSection: number  │
│ - selectedAnswer: num    │          │ - expandedTerms: Set     │
│ - showResult: boolean    │          ├──────────────────────────┤
│ - score: number          │          │ + handleSectionClick()   │
│ - questions: Question[]  │          │ + toggleTerm()           │
├──────────────────────────┤          └──────────────────────────┘
│ + handleAnswerSelect()   │
│ + handleNextQuestion()   │
│ + handlePrevQuestion()   │
│ + calculateScore()       │
└──────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    <<edge-function>>                          │
│                    ProcessPDFFunction                         │
├──────────────────────────────────────────────────────────────┤
│ - LOVABLE_API_KEY: string                                    │
│ - AI_GATEWAY_URL: string = "ai.gateway.lovable.dev"          │
├──────────────────────────────────────────────────────────────┤
│ + serve(req: Request): Response                               │
│ - buildQuizPrompt(content: string, count: number): string    │
│ - buildResumePrompt(content: string): string                  │
│ - callAIGateway(prompt: string): Promise<string>             │
│ - parseJSONResponse(response: string): object                 │
│ - handleError(status: number): Response                       │
└──────────────────────────────────────────────────────────────┘
```

## 3.3 Diagramme de Séquences

### 3.3.1 Processus Complet de Génération Quiz

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│          DIAGRAMME DE SÉQUENCE : GÉNÉRATION QUIZ COMPLÈTE                       │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────┐    ┌─────────────┐    ┌───────────┐    ┌─────────────┐    ┌─────────┐
│Étudiant │    │ PDFUploader │    │AppSection │    │Edge Function│    │ Gemini  │
│  :User  │    │ :Component  │    │:Component │    │ :Supabase   │    │  :AI    │
└────┬────┘    └──────┬──────┘    └─────┬─────┘    └──────┬──────┘    └────┬────┘
     │                │                 │                 │                │
     │ 1. Glisser PDF │                 │                 │                │
     │───────────────>│                 │                 │                │
     │                │                 │                 │                │
     │                │ 2. Valider      │                 │                │
     │                │ (type, taille)  │                 │                │
     │                │─────────┐       │                 │                │
     │                │         │       │                 │                │
     │                │<────────┘       │                 │                │
     │                │                 │                 │                │
     │                │ 3. Extraire texte PDF.js         │                │
     │                │─────────┐       │                 │                │
     │                │         │       │                 │                │
     │                │<────────┘       │                 │                │
     │                │                 │                 │                │
     │                │ 4. onFileProcessed({content, pages})              │
     │                │────────────────>│                 │                │
     │                │                 │                 │                │
     │ 5. Choisir nb pages + questions  │                 │                │
     │─────────────────────────────────>│                 │                │
     │                │                 │                 │                │
     │ 6. Clic "Mode Quiz"              │                 │                │
     │─────────────────────────────────>│                 │                │
     │                │                 │                 │                │
     │                │                 │ 7. POST /process-pdf            │
     │                │                 │ {content, mode:"quiz", count}   │
     │                │                 │────────────────>│                │
     │                │                 │                 │                │
     │                │                 │                 │ 8. Construire  │
     │                │                 │                 │    systemPrompt│
     │                │                 │                 │───────┐        │
     │                │                 │                 │       │        │
     │                │                 │                 │<──────┘        │
     │                │                 │                 │                │
     │                │                 │                 │ 9. POST        │
     │                │                 │                 │ ai.gateway     │
     │                │                 │                 │───────────────>│
     │                │                 │                 │                │
     │                │                 │                 │                │ 10. Générer
     │                │                 │                 │                │     questions
     │                │                 │                 │                │     + Darija
     │                │                 │                 │                │────┐
     │                │                 │                 │                │    │
     │                │                 │                 │                │<───┘
     │                │                 │                 │                │
     │                │                 │                 │ 11. JSON       │
     │                │                 │                 │<───────────────│
     │                │                 │                 │                │
     │                │                 │ 12. {success, data}              │
     │                │                 │<────────────────│                │
     │                │                 │                 │                │
     │ 13. Afficher QuizMode            │                 │                │
     │<─────────────────────────────────│                 │                │
     │                │                 │                 │                │
     │ 14. Répondre aux questions       │                 │                │
     │─────────────────────────────────>│                 │                │
     │                │                 │                 │                │
     │ 15. Voir explication Darija      │                 │                │
     │<─────────────────────────────────│                 │                │
     │                │                 │                 │                │
     ▼                ▼                 ▼                 ▼                ▼
```

## 3.4 Diagramme de Collaboration

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMME DE COLLABORATION QRAYTI                            │
└─────────────────────────────────────────────────────────────────────────────────┘


                                    ┌─────────────────┐
                                    │    Étudiant     │
                                    │     :User       │
                                    └────────┬────────┘
                                             │
                              1: Sélectionner PDF
                              8: Visualiser résultat
                                             │
                                             ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                                                                         │
    │                         FRONTEND (React)                                │
    │                                                                         │
    │   ┌─────────────┐    4: content + mode    ┌─────────────┐              │
    │   │ PDFUploader │ ──────────────────────> │ AppSection  │              │
    │   │ :Component  │                         │ :Component  │              │
    │   └──────┬──────┘                         └──────┬──────┘              │
    │          │                                       │                      │
    │          │ 2: extractTextFromPDF()               │ 7: setQuestions()    │
    │          │                                       │                      │
    │          ▼                                       ▼                      │
    │   ┌─────────────┐                         ┌─────────────┐              │
    │   │   PDF.js    │                         │  QuizMode   │              │
    │   │  :Library   │                         │ ResumeMode  │              │
    │   └──────┬──────┘                         │ :Component  │              │
    │          │                                └─────────────┘              │
    │          │ 3: texte extrait                                            │
    │          └──────────────────────────────────────────────>              │
    │                                                                         │
    └─────────────────────────────────────────────────────────────────────────┘
                                             │
                              5: POST /process-pdf
                                             │
                                             ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                    BACKEND (Supabase Edge Functions)                    │
    │                                                                         │
    │   ┌─────────────────────────────────────────────────────────────────┐  │
    │   │                     process-pdf :EdgeFunction                    │  │
    │   └──────────────────────────────┬──────────────────────────────────┘  │
    │                                  │                                      │
    │                   6: JSON Response                                      │
    │                                  │                                      │
    └──────────────────────────────────┼──────────────────────────────────────┘
                                       │
                        5.1: POST /chat/completions
                                       │
                                       ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                      INTELLIGENCE ARTIFICIELLE                          │
    │                                                                         │
    │   ┌─────────────────────┐         ┌─────────────────────┐              │
    │   │  Lovable AI Gateway │ ──────> │ Google Gemini 2.5   │              │
    │   │  ai.gateway.lovable │  5.2    │      Flash          │              │
    │   │                     │ <────── │                     │              │
    │   └─────────────────────┘  5.3    └─────────────────────┘              │
    │                                                                         │
    └─────────────────────────────────────────────────────────────────────────┘
```

## 3.5 Diagramme d'États-Transitions

### 3.5.1 États de l'Application

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              DIAGRAMME D'ÉTATS-TRANSITIONS DU SYSTÈME QRAYTI                    │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  [Start]  │
                                    └─────┬─────┘
                                          │
                                          │ Ouverture application
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │      UPLOAD_MODE      │
                              │                       │
                              │   • Zone drag & drop  │
                              │   • Bouton upload     │
                              │   • Mode démo         │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          │ Upload PDF / Mode démo
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │      EXTRACTING       │
                              │                       │
                              │   • Validation fichier│
                              │   • Extraction texte  │
                              │   • Progress bar      │
                              │                       │
                              └───────────┬───────────┘
                                          │
                         ┌────────────────┴────────────────┐
                         │                                 │
                      [Erreur]                         [Succès]
                         │                                 │
                         ▼                                 ▼
              ┌─────────────────┐              ┌───────────────────────┐
              │                 │              │                       │
              │      ERROR      │              │     SELECT_MODE       │
              │                 │              │                       │
              │  Message erreur │              │   • Info fichier      │
              │  + Réessayer    │              │   • Slider pages      │
              │                 │              │   • Nb questions      │
              └────────┬────────┘              │   • Choix Quiz/Résumé │
                       │                       │                       │
                       │ Réessayer             └───────────┬───────────┘
                       └───────────────────────────────────┤
                                                           │
                                          ┌────────────────┴────────────────┐
                                          │                                 │
                                       [Quiz]                           [Résumé]
                                          │                                 │
                                          ▼                                 ▼
                              ┌───────────────────────┐      ┌───────────────────────┐
                              │                       │      │                       │
                              │      GENERATING       │      │      GENERATING       │
                              │                       │      │                       │
                              │   Appel Edge Function │      │   Appel Edge Function │
                              │   Spinner loading     │      │   Spinner loading     │
                              │                       │      │                       │
                              └───────────┬───────────┘      └───────────┬───────────┘
                                          │                              │
                                          │ Succès                       │ Succès
                                          ▼                              ▼
                              ┌───────────────────────┐      ┌───────────────────────┐
                              │                       │      │                       │
                              │      QUIZ_ACTIVE      │      │    RESUME_ACTIVE      │
                              │                       │      │                       │
                              │   • Questions QCM     │      │   • Sections          │
                              │   • Score temps réel  │      │   • Termes clés       │
                              │   • Explication Darija│      │   • Points essentiels │
                              │                       │      │   • Explication Darija│
                              └───────────┬───────────┘      └───────────┬───────────┘
                                          │                              │
                                          │ Retour                       │ Retour
                                          └──────────────┬───────────────┘
                                                         │
                                                         ▼
                                              ┌───────────────────────┐
                                              │     SELECT_MODE       │
                                              └───────────────────────┘
```

### 3.5.2 États de Validation PDF

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│           DIAGRAMME D'ÉTAT-TRANSITION : VALIDATION DU DOCUMENT PDF              │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  [Start]  │
                                    └─────┬─────┘
                                          │ Sélection fichier
                                          ▼
                              ┌───────────────────────┐
                              │     FILE_SELECTED     │
                              └───────────┬───────────┘
                                          │
                                          │ Vérifier type
                                          ▼
                         ┌────────────────┴────────────────┐
                         │                                 │
                   [type !== pdf]                    [type === pdf]
                         │                                 │
                         ▼                                 ▼
              ┌─────────────────┐              ┌───────────────────────┐
              │    REJECTED     │              │   CHECKING_SIZE       │
              │                 │              └───────────┬───────────┘
              │ "Format non     │                          │
              │  supporté"      │              ┌───────────┴───────────┐
              └─────────────────┘              │                       │
                                          [> 20MB]                [≤ 20MB]
                                               │                       │
                                               ▼                       ▼
                                   ┌─────────────────┐     ┌───────────────────────┐
                                   │    REJECTED     │     │       PARSING         │
                                   │                 │     │                       │
                                   │ "Fichier trop   │     │  Extraction PDF.js    │
                                   │  volumineux"    │     │                       │
                                   └─────────────────┘     └───────────┬───────────┘
                                                                       │
                                                           ┌───────────┴───────────┐
                                                           │                       │
                                                      [< 50 chars]           [≥ 50 chars]
                                                           │                       │
                                                           ▼                       ▼
                                              ┌─────────────────┐     ┌───────────────────────┐
                                              │    REJECTED     │     │    CONTENT_READY      │
                                              │                 │     │                       │
                                              │ "PDF vide ou    │     │   ✓ Prêt pour IA      │
                                              │  protégé"       │     │                       │
                                              └─────────────────┘     └───────────────────────┘


              TABLEAU DES VALIDATIONS
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  Critère              │  Valeur Attendue     │  Message d'Erreur        │
    ├───────────────────────┼──────────────────────┼──────────────────────────┤
    │  Type MIME            │  application/pdf     │  "Format non supporté"   │
    │  Taille fichier       │  ≤ 20 MB             │  "Fichier trop volumineux│
    │  Contenu extrait      │  ≥ 50 caractères     │  "PDF vide ou protégé"   │
    └─────────────────────────────────────────────────────────────────────────┘
```

## 3.6 Diagramme d'Activité

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              DIAGRAMME D'ACTIVITÉ : PROCESSUS COMPLET QRAYTI                    │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  (Start)  │
                                    └─────┬─────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │   Ouvrir Application  │
                              └───────────┬───────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │   Importer Cours PDF  │
                              │   ou Mode Démo        │
                              └───────────┬───────────┘
                                          │
                                          ▼
                                    ◇─────────────◇
                                   ╱               ╲
                                  ╱   Validation    ╲
                                 ╱    OK?            ╲
                                 ╲                   ╱
                                  ╲                 ╱
                                   ╲               ╱
                                    ◇─────────────◇
                                          │
                         ┌────────────────┴────────────────┐
                         │                                 │
                      [NON]                              [OUI]
                         │                                 │
                         ▼                                 ▼
              ┌─────────────────┐              ┌───────────────────────┐
              │   Afficher      │              │   Extraire Texte      │
              │   Erreur        │              │   avec PDF.js         │
              └────────┬────────┘              └───────────┬───────────┘
                       │                                   │
                       │ Réessayer                         ▼
                       └─────────────────┐     ┌───────────────────────┐
                                         │     │   Configurer Options  │
                                         │     │   • Nb pages          │
                                         │     │   • Nb questions      │
                                         │     └───────────┬───────────┘
                                         │                 │
                                         │                 ▼
                                         │           ◇─────────────◇
                                         │          ╱               ╲
                                         │         ╱   Mode choisi?  ╲
                                         │        ╱                   ╲
                                         │        ╲                   ╱
                                         │         ╲                 ╱
                                         │          ╲               ╱
                                         │           ◇─────────────◇
                                         │                 │
                                         │    ┌────────────┴────────────┐
                                         │    │                         │
                                         │ [QUIZ]                   [RÉSUMÉ]
                                         │    │                         │
                                         │    ▼                         ▼
                                         │ ┌────────────────┐  ┌────────────────┐
                                         │ │ Appeler Edge   │  │ Appeler Edge   │
                                         │ │ Function Quiz  │  │ Function Résumé│
                                         │ └───────┬────────┘  └───────┬────────┘
                                         │         │                   │
                                         │         ▼                   ▼
                                         │ ┌────────────────┐  ┌────────────────┐
                                         │ │ Gemini génère  │  │ Gemini génère  │
                                         │ │ Questions QCM  │  │ Résumé struct. │
                                         │ │ + Darija       │  │ + Darija       │
                                         │ └───────┬────────┘  └───────┬────────┘
                                         │         │                   │
                                         │         ▼                   ▼
                                         │ ┌────────────────┐  ┌────────────────┐
                                         │ │ Afficher Quiz  │  │ Afficher Résumé│
                                         │ │ Interactif     │  │ Structuré      │
                                         │ └───────┬────────┘  └───────┬────────┘
                                         │         │                   │
                                         │         └─────────┬─────────┘
                                         │                   │
                                         │                   ▼
                                         │     ┌───────────────────────┐
                                         │     │   Interagir avec      │
                                         │     │   le Contenu          │
                                         │     └───────────┬───────────┘
                                         │                 │
                                         │                 ▼
                                         │           ◇─────────────◇
                                         │          ╱               ╲
                                         │         ╱   Nouveau       ╲
                                         │        ╱    document?      ╲
                                         │        ╲                   ╱
                                         │         ╲                 ╱
                                         │          ╲               ╱
                                         │           ◇─────────────◇
                                         │                 │
                                         │    ┌────────────┴────────────┐
                                         │    │                         │
                                         │ [OUI]                      [NON]
                                         │    │                         │
                                         └────┘                         ▼
                                                              ┌───────────────┐
                                                              │     (End)     │
                                                              └───────────────┘
```

---

# Chapitre 4 : Réalisation et Implémentation

## 4.1 Environnement de Développement

### 4.1.1 Outils et Logiciels

| Outil | Version | Utilisation |
|-------|---------|-------------|
| **Visual Studio Code** | 1.85+ | IDE principal |
| **Node.js** | 18.x LTS | Runtime JavaScript |
| **npm/bun** | 10.x / 1.x | Gestionnaire de paquets |
| **Git** | 2.40+ | Contrôle de version |
| **Chrome DevTools** | Latest | Débogage frontend |
| **Lovable Platform** | - | Développement et déploiement |

### 4.1.2 Stack Technologique Complet

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         STACK TECHNOLOGIQUE QRAYTI                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   React 18.3    │  │  TypeScript 5   │  │    Vite 5       │                 │
│  │                 │  │                 │  │                 │                 │
│  │  • Composants   │  │  • Typage fort  │  │  • Build rapide │                 │
│  │  • Hooks        │  │  • Interfaces   │  │  • HMR          │                 │
│  │  • State mgmt   │  │  • Type safety  │  │  • Tree shaking │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Tailwind CSS   │  │ Framer Motion   │  │  React Router   │                 │
│  │                 │  │                 │  │                 │                 │
│  │  • Utility-first│  │  • Animations   │  │  • Routing SPA  │                 │
│  │  • Responsive   │  │  • Transitions  │  │  • Navigation   │                 │
│  │  • Design tokens│  │  • Gestures     │  │  • URL params   │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  TanStack Query │  │    Radix UI     │  │   Lucide Icons  │                 │
│  │                 │  │                 │  │                 │                 │
│  │  • Data fetching│  │  • Composants   │  │  • Icônes SVG   │                 │
│  │  • Caching      │  │  • Accessible   │  │  • Personnalis. │                 │
│  │  • Mutations    │  │  • Headless     │  │  • Tree shaking │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐                                                           │
│  │   pdfjs-dist    │                                                           │
│  │     4.4.168     │                                                           │
│  │                 │                                                           │
│  │  • Parsing PDF  │                                                           │
│  │  • Extraction   │                                                           │
│  │  • Web Worker   │                                                           │
│  └─────────────────┘                                                           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND                                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase (Lovable Cloud)                         │   │
│  ├─────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                          │   │
│  │   ┌─────────────────────┐  ┌─────────────────────┐                      │   │
│  │   │   Edge Functions    │  │      Secrets        │                      │   │
│  │   │      (Deno)         │  │    Management       │                      │   │
│  │   │                     │  │                     │                      │   │
│  │   │  • Serverless       │  │  • LOVABLE_API_KEY  │                      │   │
│  │   │  • TypeScript       │  │  • Chiffrement      │                      │   │
│  │   │  • Auto-scaling     │  │  • Rotation         │                      │   │
│  │   └─────────────────────┘  └─────────────────────┘                      │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                         INTELLIGENCE ARTIFICIELLE                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                       Lovable AI Gateway                                 │   │
│  │                       ai.gateway.lovable.dev                             │   │
│  ├─────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                          │   │
│  │   ┌─────────────────────┐  ┌─────────────────────┐                      │   │
│  │   │  Google Gemini 2.5  │  │   Fonctionnalités   │                      │   │
│  │   │       Flash         │  │                     │                      │   │
│  │   │                     │  │  • Quiz QCM         │                      │   │
│  │   │  • Rapide           │  │  • Résumés          │                      │   │
│  │   │  • Multilingue      │  │  • Darija           │                      │   │
│  │   │  • JSON output      │  │  • Termes clés      │                      │   │
│  │   └─────────────────────┘  └─────────────────────┘                      │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 4.2 Structure du Projet

```
qrayti/
├── public/                          # Assets statiques
│   ├── favicon.png
│   └── robots.txt
│
├── src/                             # Code source
│   ├── assets/                      # Images et médias
│   │   ├── logo.png
│   │   ├── hero-1.jpg ... hero-6.jpg
│   │   └── seo-1.jpg ... seo-6.jpg
│   │
│   ├── components/                  # Composants React
│   │   ├── ui/                      # Composants UI (Shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (50+ composants)
│   │   │
│   │   ├── Header.tsx               # Navigation
│   │   ├── HeroSection.tsx          # Section héro
│   │   ├── FeaturesSection.tsx      # Fonctionnalités
│   │   ├── HowItWorksSection.tsx    # Comment ça marche
│   │   ├── ComparisonSection.tsx    # Comparaison
│   │   ├── AppSection.tsx           # Application principale
│   │   ├── PDFUploader.tsx          # Upload PDF
│   │   ├── QuizMode.tsx             # Mode Quiz
│   │   ├── ResumeMode.tsx           # Mode Résumé
│   │   ├── SEOSection.tsx           # SEO
│   │   └── Footer.tsx               # Pied de page
│   │
│   ├── hooks/                       # Hooks personnalisés
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── integrations/                # Intégrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   ├── lib/                         # Utilitaires
│   │   └── utils.ts
│   │
│   ├── pages/                       # Pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                      # Composant racine
│   ├── main.tsx                     # Point d'entrée
│   └── index.css                    # Styles globaux
│
├── supabase/                        # Backend Supabase
│   ├── functions/
│   │   └── process-pdf/
│   │       └── index.ts             # Edge Function IA
│   └── config.toml
│
├── docs/                            # Documentation
│   └── RAPPORT_COMPLET_QRAYTI.md
│
├── index.html
├── tailwind.config.ts               # Config Tailwind
├── vite.config.ts                   # Config Vite
├── tsconfig.json                    # Config TypeScript
└── package.json                     # Dépendances
```

## 4.3 Implémentation des Composants Clés

### 4.3.1 PDFUploader - Extraction de Contenu

```typescript
// Extrait de src/components/PDFUploader.tsx

// Configuration PDF.js pour mode inline worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const extractTextFromPDF = async (file: File): Promise<{text: string, pages: number}> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = "";
  const totalPages = pdf.numPages;
  
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n\n";
    
    // Mise à jour progression
    setProgress(Math.round((i / totalPages) * 100));
  }
  
  return { text: fullText, pages: totalPages };
};
```

### 4.3.2 Edge Function - Génération IA

```typescript
// Extrait de supabase/functions/process-pdf/index.ts

serve(async (req) => {
  const { content, mode, pages, questionCount = 5 } = await req.json();
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

  // Construction du prompt selon le mode
  const systemPrompt = mode === "quiz" 
    ? `Tu es un tuteur expert marocain spécialisé dans l'éducation...
       Génère exactement ${questionCount} questions QCM avec explications en Darija.`
    : `Tu es un tuteur expert marocain spécialisé dans la synthèse...
       Crée un résumé structuré avec termes clés expliqués en Darija.`;

  // Appel Lovable AI Gateway
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Contenu: ${content.substring(0, 8000)}` }
      ],
    }),
  });

  // Parsing et retour JSON structuré
  const data = await response.json();
  const parsedContent = JSON.parse(data.choices[0].message.content);
  
  return new Response(JSON.stringify({ success: true, data: parsedContent }));
});
```

### 4.3.3 Design System - Configuration Tailwind

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        // Couleurs de marque Qrayti
        "qrayti-navy": "hsl(215 60% 25%)",
        "qrayti-gold": "hsl(38 55% 60%)",
        "qrayti-coral": "hsl(18 75% 55%)",
        "qrayti-cream": "hsl(40 33% 96%)",
        "qrayti-teal": "hsl(180 50% 35%)",
        "qrayti-success": "hsl(145 65% 42%)",
        "qrayti-warning": "hsl(38 95% 55%)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
}
```

## 4.4 Configuration CSS et Design Tokens

```css
/* src/index.css - Système de design */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');

:root {
  /* Couleurs principales */
  --background: 40 33% 98%;
  --foreground: 215 50% 18%;
  --primary: 215 60% 25%;
  --secondary: 38 45% 75%;
  --accent: 18 75% 55%;
  
  /* Couleurs Qrayti */
  --qrayti-navy: 215 60% 25%;
  --qrayti-gold: 38 55% 60%;
  --qrayti-coral: 18 75% 55%;
  --qrayti-cream: 40 33% 96%;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(215 60% 25%) 0%, hsl(18 75% 55%) 100%);
  --gradient-moroccan: linear-gradient(135deg, hsl(215 60% 25%) 0%, hsl(18 75% 55%) 50%, hsl(38 55% 60%) 100%);
  
  /* Shadows */
  --shadow-card: 0 4px 20px -4px hsl(215 60% 25% / 0.1);
  --shadow-glow: 0 0 40px hsl(18 75% 55% / 0.25);
}

/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Motif marocain */
.moroccan-pattern {
  background-image: url("data:image/svg+xml,...");
  background-size: 30px 30px;
}
```

---

# Chapitre 5 : Interfaces Utilisateur

## 5.1 Vue d'Ensemble des Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        CARTE DES INTERFACES QRAYTI                              │
└─────────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   Page Index    │
                              │   (Accueil)     │
                              └────────┬────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
         ▼                             ▼                             ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     Header      │         │   Hero Section  │         │  SEO Section    │
│   (Navigation)  │         │   (Carousel)    │         │   (Gallery)     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
         │                             │                             │
         ▼                             ▼                             ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    Features     │         │   How It Works  │         │   Comparison    │
│    Section      │         │     Section     │         │    Section      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │   App Section   │
                              │  (Application)  │
                              └────────┬────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
         ▼                             ▼                             ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  PDF Uploader   │         │   Mode Quiz     │         │  Mode Résumé    │
│   Interface     │         │   Interface     │         │   Interface     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │     Footer      │
                              └─────────────────┘
```

## 5.2 Interface 1 : Page d'Accueil (Header + Hero)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           INTERFACE : HEADER + HERO                             │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌────────┐                                                    ┌──────────────┐│
│  │  LOGO  │     Accueil   Fonctionnalités   App   Contact      │  ☰  Menu    ││
│  │ Qrayti │                                                    │   (mobile)  ││
│  └────────┘                                                    └──────────────┘│
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                    ┌─────────────────────────────────────┐                      │
│                    │                                     │                      │
│                    │        🚀 Nouveau                   │                      │
│                    │                                     │                      │
│                    │   Transformez vos cours             │                      │
│                    │   en quiz intelligents              │                      │
│                    │                                     │                      │
│                    │   L'IA éducative conçue pour les   │                      │
│                    │   étudiants marocains avec          │                      │
│                    │   explications en Darija            │                      │
│                    │                                     │                      │
│                    │   ┌─────────────┐  ┌─────────────┐ │                      │
│                    │   │ Commencer   │  │   Démo      │ │                      │
│                    │   │  ▶          │  │             │ │                      │
│                    │   └─────────────┘  └─────────────┘ │                      │
│                    │                                     │                      │
│                    └─────────────────────────────────────┘                      │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │                                                                         │ │
│    │                    [IMAGE HERO CAROUSEL]                                │ │
│    │                                                                         │ │
│    │                  ● ● ○ ○ ○ ○  (Indicateurs)                             │ │
│    │                                                                         │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

ÉLÉMENTS DE L'INTERFACE :

┌──────────────────────┬────────────────────────────────────────────────────────┐
│ Élément              │ Description                                            │
├──────────────────────┼────────────────────────────────────────────────────────┤
│ Logo                 │ Logo Qrayti animé au survol                           │
│ Navigation           │ Liens vers sections (smooth scroll)                    │
│ Badge "Nouveau"      │ Indicateur avec animation pulse                        │
│ Titre principal      │ Gradient text animé                                    │
│ Boutons CTA          │ "Commencer" (primaire), "Démo" (secondaire)           │
│ Carousel images      │ 6 images, rotation automatique 8s                      │
│ Indicateurs          │ Points cliquables avec progress bar                    │
└──────────────────────┴────────────────────────────────────────────────────────┘
```

## 5.3 Interface 2 : Section Fonctionnalités

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        INTERFACE : FONCTIONNALITÉS                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                           Fonctionnalités                                       │
│                                                                                 │
│        Découvrez les outils puissants qui rendent vos révisions efficaces      │
│                                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐           │
│  │                   │  │                   │  │                   │           │
│  │      📄          │  │      🧠          │  │      📝          │           │
│  │                   │  │                   │  │                   │           │
│  │   Extraction      │  │   Quiz IA        │  │   Résumés        │           │
│  │   PDF Intelligente│  │   Interactifs    │  │   Structurés     │           │
│  │                   │  │                   │  │                   │           │
│  │   Importez vos    │  │   Questions      │  │   Points clés    │           │
│  │   cours PDF et    │  │   générées par   │  │   extraits       │           │
│  │   laissez l'IA    │  │   IA avec        │  │   automatiquement│           │
│  │   extraire le     │  │   explications   │  │   avec termes    │           │
│  │   contenu         │  │   personnalisées │  │   essentiels     │           │
│  │                   │  │                   │  │                   │           │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘           │
│                                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐           │
│  │                   │  │                   │  │                   │           │
│  │      🇲🇦          │  │      📊          │  │      📱          │           │
│  │                   │  │                   │  │                   │           │
│  │   Support         │  │   Suivi de       │  │   Interface      │           │
│  │   Darija          │  │   Progression    │  │   Moderne        │           │
│  │                   │  │                   │  │                   │           │
│  │   Explications    │  │   Visualisez     │  │   Design épuré   │           │
│  │   dans le         │  │   votre score    │  │   et responsive  │           │
│  │   dialecte        │  │   en temps réel  │  │   pour tous      │           │
│  │   marocain        │  │                   │  │   appareils      │           │
│  │                   │  │                   │  │                   │           │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5.4 Interface 3 : Application - Upload PDF

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     INTERFACE : UPLOAD PDF                                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ● ● ●                                                          Qrayti App     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                    ┌─────────────────────────────────────────┐                  │
│                    │                                         │                  │
│                    │                                         │                  │
│                    │              ┌───────────┐              │                  │
│                    │              │           │              │                  │
│                    │              │    📄     │              │                  │
│                    │              │   PDF     │              │                  │
│                    │              │           │              │                  │
│                    │              └───────────┘              │                  │
│                    │                                         │                  │
│                    │    Glissez votre fichier PDF ici        │                  │
│                    │              ou                         │                  │
│                    │                                         │                  │
│                    │       ┌──────────────────────┐          │                  │
│                    │       │  Parcourir fichiers  │          │                  │
│                    │       └──────────────────────┘          │                  │
│                    │                                         │                  │
│                    │    Formats: PDF • Taille max: 20MB      │                  │
│                    │                                         │                  │
│                    └─────────────────────────────────────────┘                  │
│                                                                                 │
│                    ┌─────────────────────────────────────────┐                  │
│                    │                                         │                  │
│                    │       ✨ Essayer le mode démo           │                  │
│                    │                                         │                  │
│                    └─────────────────────────────────────────┘                  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

ÉTATS DE L'INTERFACE :

┌────────────────────────────────────────────────────────────────────────────────┐
│ État              │ Affichage                                                  │
├───────────────────┼────────────────────────────────────────────────────────────┤
│ Idle              │ Zone de drop avec icône et texte                          │
│ Dragging          │ Bordure surlignée, fond coloré                            │
│ Processing        │ Barre de progression + pourcentage                         │
│ Error             │ Message d'erreur rouge + bouton réessayer                  │
│ Success           │ Transition vers sélection de mode                          │
└───────────────────┴────────────────────────────────────────────────────────────┘
```

## 5.5 Interface 4 : Sélection de Mode

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     INTERFACE : SÉLECTION MODE                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ● ● ●                   ← Retour                           cours_maths.pdf    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  📄  cours_maths.pdf                                    ⚙️              │ │
│    │      15 pages détectées                                                 │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    Nombre de pages à traiter                                                    │
│    ├─────────────────────────────────────────────────────────────────────┤ 15  │
│    1                                                                       15  │
│                                                                                 │
│    Nombre de questions du quiz                                                  │
│                                                                                 │
│    ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐                       │
│    │   5   │  │  10   │  │  15   │  │  20   │  │ Autre │                       │
│    └───────┘  └───────┘  └───────┘  └───────┘  └───────┘                       │
│                                                                                 │
│    Choisissez votre mode                                                        │
│                                                                                 │
│    ┌─────────────────────────────┐  ┌─────────────────────────────┐            │
│    │                             │  │                             │            │
│    │      🧠                     │  │      📖                     │            │
│    │                             │  │                             │            │
│    │      Mode Quiz              │  │      Mode Résumé            │            │
│    │                             │  │                             │            │
│    │  Questions interactives     │  │  Résumé structuré avec      │            │
│    │  avec explications          │  │  termes clés et points      │            │
│    │  détaillées en Darija       │  │  essentiels                 │            │
│    │                             │  │                             │            │
│    │        Commencer →          │  │        Commencer →          │            │
│    │                             │  │                             │            │
│    └─────────────────────────────┘  └─────────────────────────────┘            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5.6 Interface 5 : Mode Quiz

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        INTERFACE : MODE QUIZ                                    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ● ● ●                   ← Retour                           cours_maths.pdf    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  Question 3 sur 10                                       Score: 2/3     │ │
│    │  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  30%   │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │                                                                         │ │
│    │   Quelle est la dérivée de la fonction f(x) = x² ?                     │ │
│    │                                                                         │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ○  A) f'(x) = x                                                       │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ● ✓ B) f'(x) = 2x                                      [CORRECT]      │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ○  C) f'(x) = 2                                                       │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ○  D) f'(x) = x²                                                      │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ✅ Bonne réponse !                                                    │ │
│    │                                                                         │ │
│    │  📚 Explication :                                                      │ │
│    │  La règle de dérivation des puissances nous dit que la dérivée de     │ │
│    │  x^n est n·x^(n-1). Pour x², n=2, donc f'(x) = 2·x^(2-1) = 2x         │ │
│    │                                                                         │ │
│    │  🇲🇦 بالدارجة :                                                        │ │
│    │  القاعدة كتقول بلي كنضربو الأس فـ x وكننقصو 1 من الأس.               │ │
│    │  يعني x² كتعطينا 2x                                                    │ │
│    │                                                                         │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌───────────────┐                                     ┌───────────────────┐ │
│    │  ← Précédent  │                                     │  Suivante →       │ │
│    └───────────────┘                                     └───────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5.7 Interface 6 : Mode Résumé

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        INTERFACE : MODE RÉSUMÉ                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ● ● ●                   ← Retour                           cours_maths.pdf    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │                         Résumé Structuré                                │ │
│    │                      📄 15 pages analysées                              │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ▼ 1. Introduction aux Dérivées                                        │ │
│    ├─────────────────────────────────────────────────────────────────────────┤ │
│    │                                                                         │ │
│    │  La dérivée est un concept fondamental en analyse mathématique...       │ │
│    │                                                                         │ │
│    │  Points essentiels :                                                    │ │
│    │  • La dérivée mesure le taux de changement instantané                   │ │
│    │  • Elle est notée f'(x) ou df/dx                                        │ │
│    │  • Elle représente la pente de la tangente                              │ │
│    │                                                                         │ │
│    │  📚 Termes clés :                                                       │ │
│    │                                                                         │ │
│    │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│    │  │  Dérivée                                                        │   │ │
│    │  │  ────────                                                       │   │ │
│    │  │  Limite du taux d'accroissement quand Δx tend vers 0            │   │ │
│    │  │                                                                 │   │ │
│    │  │  🇲🇦 الديريفي هي الحد ديال معدل التغير ملي Δx كتقرب لـ 0      │   │ │
│    │  └─────────────────────────────────────────────────────────────────┘   │ │
│    │                                                                         │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ▶ 2. Règles de Dérivation                                             │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│    ┌─────────────────────────────────────────────────────────────────────────┐ │
│    │  ▶ 3. Applications Pratiques                                           │ │
│    └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5.8 Responsive Design

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        BREAKPOINTS RESPONSIVE                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────────────┐     ┌─────────────────────────────────┐
│   MOBILE    │     │       TABLETTE      │     │           DESKTOP               │
│  < 768px    │     │    768px - 1024px   │     │          > 1024px               │
├─────────────┤     ├─────────────────────┤     ├─────────────────────────────────┤
│             │     │                     │     │                                 │
│ ┌─────────┐ │     │ ┌─────────────────┐ │     │ ┌───────────────────────────┐   │
│ │  Logo   │ │     │ │  Logo    Nav    │ │     │ │  Logo       Navigation    │   │
│ │   ☰     │ │     │ └─────────────────┘ │     │ └───────────────────────────┘   │
│ └─────────┘ │     │                     │     │                                 │
│             │     │ ┌─────────────────┐ │     │ ┌───────────────────────────┐   │
│ ┌─────────┐ │     │ │                 │ │     │ │                           │   │
│ │         │ │     │ │   Hero + Image  │ │     │ │    Hero     │    Image    │   │
│ │  Hero   │ │     │ │                 │ │     │ │             │             │   │
│ │         │ │     │ └─────────────────┘ │     │ └───────────────────────────┘   │
│ │         │ │     │                     │     │                                 │
│ └─────────┘ │     │ ┌───────┐ ┌───────┐ │     │ ┌─────┐ ┌─────┐ ┌─────┐       │
│             │     │ │ Card  │ │ Card  │ │     │ │Card │ │Card │ │Card │       │
│ ┌─────────┐ │     │ └───────┘ └───────┘ │     │ └─────┘ └─────┘ └─────┘       │
│ │  Card   │ │     │                     │     │                                 │
│ └─────────┘ │     │ ┌───────┐ ┌───────┐ │     │ ┌─────────────────────────┐     │
│             │     │ │ Card  │ │ Card  │ │     │ │                         │     │
│ ┌─────────┐ │     │ └───────┘ └───────┘ │     │ │      App Section        │     │
│ │  Card   │ │     │                     │     │ │                         │     │
│ └─────────┘ │     │                     │     │ └─────────────────────────┘     │
│             │     │                     │     │                                 │
└─────────────┘     └─────────────────────┘     └─────────────────────────────────┘

Classes Tailwind utilisées :
• Mobile-first: styles de base
• md: breakpoint tablette (768px)
• lg: breakpoint desktop (1024px)
• xl: grand écran (1280px)
```

---

# Chapitre 6 : Tests et Validation

## 6.1 Stratégie de Test

### 6.1.1 Types de Tests

| Type | Couverture | Outils |
|------|------------|--------|
| **Tests Unitaires** | Composants React, Fonctions utilitaires | Vitest, React Testing Library |
| **Tests d'Intégration** | Flux complet utilisateur | Cypress, Playwright |
| **Tests E2E** | Scénarios utilisateur complets | Playwright |
| **Tests de Performance** | Temps de chargement, LCP, FID | Lighthouse, Web Vitals |
| **Tests d'Accessibilité** | WCAG 2.1 compliance | axe-core, Lighthouse |

### 6.1.2 Scénarios de Test Fonctionnels

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        MATRICE DES TESTS FONCTIONNELS                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌────────┬──────────────────────────────┬────────────┬─────────────┬─────────────┐
│ ID     │ Scénario                     │ Entrée     │ Résultat    │ Statut      │
│        │                              │            │ Attendu     │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-001 │ Upload PDF valide            │ PDF 5MB    │ Extraction  │ ✅ PASS     │
│        │                              │ 10 pages   │ réussie     │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-002 │ Upload fichier non-PDF       │ .docx      │ Message     │ ✅ PASS     │
│        │                              │            │ d'erreur    │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-003 │ Upload PDF > 20MB            │ PDF 25MB   │ Erreur      │ ✅ PASS     │
│        │                              │            │ taille      │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-004 │ Génération quiz 5 questions  │ PDF + 5    │ 5 questions │ ✅ PASS     │
│        │                              │            │ QCM         │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-005 │ Génération quiz 20 questions │ PDF + 20   │ 20 questions│ ✅ PASS     │
│        │                              │            │ QCM         │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-006 │ Génération résumé            │ PDF        │ Sections +  │ ✅ PASS     │
│        │                              │            │ termes clés │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-007 │ Affichage Darija             │ Quiz       │ Texte en    │ ✅ PASS     │
│        │                              │            │ dialecte    │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-008 │ Navigation quiz              │ Clic       │ Question    │ ✅ PASS     │
│        │                              │ suivante   │ suivante    │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-009 │ Mode démo                    │ Clic démo  │ Contenu     │ ✅ PASS     │
│        │                              │            │ démo chargé │             │
├────────┼──────────────────────────────┼────────────┼─────────────┼─────────────┤
│ TC-010 │ Responsive mobile            │ 375px      │ UI adaptée  │ ✅ PASS     │
│        │                              │            │             │             │
└────────┴──────────────────────────────┴────────────┴─────────────┴─────────────┘
```

## 6.2 Tests de Performance

### 6.2.1 Métriques Lighthouse

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         RAPPORT LIGHTHOUSE                                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│    Performance          Accessibility        Best Practices       SEO          │
│                                                                                 │
│       ┌───┐                ┌───┐                ┌───┐            ┌───┐         │
│       │95 │                │98 │                │100│            │100│         │
│       └───┘                └───┘                └───┘            └───┘         │
│        🟢                   🟢                   🟢               🟢           │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Core Web Vitals                                                                │
│  ───────────────                                                                │
│                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐    │
│  │  LCP (Largest Contentful Paint)                              1.8s 🟢   │    │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    │
│  └────────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐    │
│  │  FID (First Input Delay)                                     45ms 🟢   │    │
│  │  ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    │
│  └────────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐    │
│  │  CLS (Cumulative Layout Shift)                               0.02 🟢   │    │
│  │  ▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    │
│  └────────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Temps de Réponse

| Opération | Temps Moyen | Objectif | Statut |
|-----------|-------------|----------|--------|
| Chargement page | 1.5s | < 3s | ✅ |
| Extraction PDF (10 pages) | 2.1s | < 5s | ✅ |
| Extraction PDF (50 pages) | 8.3s | < 15s | ✅ |
| Génération Quiz (5 questions) | 4.2s | < 10s | ✅ |
| Génération Quiz (20 questions) | 12.5s | < 30s | ✅ |
| Génération Résumé | 6.8s | < 15s | ✅ |

## 6.3 Tests d'Accessibilité

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    CONFORMITÉ WCAG 2.1 NIVEAU AA                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────┬─────────────────────────────────────┬─────────────┐
│ Critère                    │ Description                         │ Statut      │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 1.1.1 Contenu non textuel  │ Attributs alt sur images           │ ✅ Conforme │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 1.4.3 Contraste minimum    │ Ratio 4.5:1 pour texte             │ ✅ Conforme │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 2.1.1 Clavier              │ Navigation au clavier              │ ✅ Conforme │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 2.4.4 Objectif du lien     │ Texte descriptif des liens         │ ✅ Conforme │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 3.1.1 Langue de la page    │ Attribut lang="fr"                  │ ✅ Conforme │
├────────────────────────────┼─────────────────────────────────────┼─────────────┤
│ 4.1.2 Nom, rôle, valeur    │ ARIA labels appropriés             │ ✅ Conforme │
└────────────────────────────┴─────────────────────────────────────┴─────────────┘
```

---

# Conclusion et Perspectives

## Bilan du Projet

### Objectifs Atteints

| Objectif | Réalisation | Statut |
|----------|-------------|--------|
| Extraction PDF automatique | Implémenté avec PDF.js | ✅ |
| Génération Quiz IA | Gemini 2.5 Flash intégré | ✅ |
| Génération Résumé IA | Sections + termes clés | ✅ |
| Support Darija | Explications bilingues | ✅ |
| Interface responsive | Mobile + Tablette + Desktop | ✅ |
| Performance optimisée | LCP < 2s, Score 95+ | ✅ |

### Points Forts

1. **Innovation pédagogique** : Première plateforme éducative avec support natif Darija
2. **Technologie moderne** : Stack React + TypeScript + IA Gemini
3. **UX soignée** : Animations fluides, design intuitif
4. **Performance** : Temps de réponse optimisés

### Axes d'Amélioration

1. **Authentification** : Système de comptes utilisateurs
2. **Persistance** : Sauvegarde des sessions et historique
3. **Partage** : Export et partage des quiz/résumés
4. **Gamification** : Badges, classements, défis

## Perspectives Futures

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         ROADMAP QRAYTI 2025                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

    Q1 2025                Q2 2025                Q3 2025                Q4 2025
       │                      │                      │                      │
       ▼                      ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │      │              │
│ Version 1.1  │      │ Version 1.5  │      │ Version 2.0  │      │ Version 2.5  │
│              │      │              │      │              │      │              │
│ • Auth users │      │ • Historique │      │ • App mobile │      │ • IA vocale  │
│ • Profils    │      │ • Export PDF │      │ • Mode offline│     │ • Tuteur IA  │
│ • Dashboard  │      │ • Partage    │      │ • Push notif │      │ • Analytics  │
│              │      │              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

---

# Annexes

## Annexe A : Glossaire

| Terme | Définition |
|-------|------------|
| **Darija** | Dialecte arabe marocain parlé au Maroc |
| **Edge Function** | Fonction serverless exécutée en périphérie du réseau |
| **LCP** | Largest Contentful Paint - métrique de performance web |
| **QCM** | Questions à Choix Multiples |
| **RLS** | Row Level Security - sécurité au niveau des lignes |
| **SSR** | Server-Side Rendering - rendu côté serveur |

## Annexe B : Références

1. React Documentation - https://react.dev
2. Tailwind CSS - https://tailwindcss.com
3. Supabase Documentation - https://supabase.com/docs
4. PDF.js - https://mozilla.github.io/pdf.js/
5. Framer Motion - https://www.framer.com/motion/
6. Google Gemini - https://ai.google.dev

## Annexe C : Licences

| Technologie | Licence |
|-------------|---------|
| React | MIT |
| Tailwind CSS | MIT |
| PDF.js | Apache 2.0 |
| Framer Motion | MIT |
| Radix UI | MIT |

---

**Document rédigé pour le projet Qrayti**

*Plateforme d'Apprentissage Intelligente pour Étudiants Marocains*

**Version 1.0 - Décembre 2024**

---

© 2024 Qrayti. Tous droits réservés.
