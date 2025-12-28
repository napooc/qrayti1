# Chapitre 3 : Conception du Système Qrayti

## Table des Matières

1. [Introduction](#introduction)
2. [Diagramme de Classes](#diagramme-de-classes)
3. [Diagrammes de Séquences](#diagrammes-de-séquences)
4. [Diagramme de Collaboration](#diagramme-de-collaboration)
5. [Diagrammes d'États-Transitions](#diagrammes-détats-transitions)
6. [Diagrammes d'Activité](#diagrammes-dactivité)
7. [Architecture Technique](#architecture-technique)
8. [Modèle de Données](#modèle-de-données)
9. [Spécifications des Composants](#spécifications-des-composants)

---

## Introduction

Ce chapitre présente la conception détaillée du système **Qrayti**, une application web intelligente destinée aux étudiants marocains. L'objectif principal est de transformer automatiquement des supports de cours au format PDF en contenus pédagogiques interactifs (Quiz et Résumés) avec des explications en **Darija** (dialecte marocain).

La conception s'appuie sur une architecture moderne combinant :
- **Frontend React** avec TypeScript pour l'interface utilisateur
- **Supabase Edge Functions** pour le traitement backend serverless
- **Intelligence Artificielle** (Google Gemini 2.5 Flash) pour la génération de contenu

---

## Diagramme de Classes

Le diagramme de classes représente la structure statique du système, illustrant les classes principales, leurs attributs, méthodes et les relations qui les unissent.

### Figure 1 : Diagramme de classes du système Qrayti

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DIAGRAMME DE CLASSES QRAYTI                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│      <<interface>>       │          │      <<interface>>       │
│       ContentData        │          │        Question          │
├──────────────────────────┤          ├──────────────────────────┤
│ + questions: Question[]  │          │ + question: string       │
│ + summary: SummarySection│          │ + options: string[]      │
│ + keyTerms: KeyTerm[]    │          │ + correctAnswer: number  │
│ + studyTips: string[]    │          │ + explanation: string    │
│ + pageCount: number      │          │ + darijaExplanation: str │
└──────────────────────────┘          └──────────────────────────┘
            │                                    │
            │ contient                           │
            ▼                                    │
┌──────────────────────────┐                     │
│      <<interface>>       │                     │
│     SummarySection       │                     │
├──────────────────────────┤                     │
│ + title: string          │                     │
│ + content: string        │                     │
│ + bulletPoints: string[] │                     │
│ + darijaExplanation: str │                     │
└──────────────────────────┘                     │
                                                 │
┌──────────────────────────┐          ┌──────────────────────────┐
│      <<interface>>       │          │    <<component>>         │
│        KeyTerm           │          │      AppSection          │
├──────────────────────────┤          ├──────────────────────────┤
│ + term: string           │          │ - pdfContent: string     │
│ + definition: string     │          │ - pageCount: number      │
│ + darijaExplanation: str │          │ - isProcessing: boolean  │
│ + example: string        │          │ - contentData: Content   │
└──────────────────────────┤          │ - activeMode: AppMode    │
                           │          │ - questionCount: number  │
                           │          ├──────────────────────────┤
                           │          │ + handleFileProcessed()  │
                           │          │ + handleModeSelect()     │
                           │          │ + handleBack()           │
                           │          │ + processContent()       │
                           │          └──────────────────────────┘
                           │                      │
                           │                      │ utilise
                           │                      ▼
┌──────────────────────────┐          ┌──────────────────────────┐
│    <<component>>         │          │    <<component>>         │
│     PDFUploader          │          │      QuizMode            │
├──────────────────────────┤          ├──────────────────────────┤
│ - isDragging: boolean    │          │ - currentQuestion: num   │
│ - isProcessing: boolean  │          │ - selectedAnswer: num    │
│ - error: string          │          │ - showExplanation: bool  │
│ - progress: number       │          │ - score: number          │
├──────────────────────────┤          │ - answeredQuestions: []  │
│ + handleDragOver()       │          ├──────────────────────────┤
│ + handleDragLeave()      │          │ + handleAnswerSelect()   │
│ + handleDrop()           │          │ + handleNextQuestion()   │
│ + extractTextFromPDF()   │          │ + handlePreviousQuestion │
│ + processFile()          │          │ + calculateScore()       │
│ + handleDemoMode()       │          └──────────────────────────┘
└──────────────────────────┘
                                      ┌──────────────────────────┐
┌──────────────────────────┐          │    <<component>>         │
│  <<edge-function>>       │          │     ResumeMode           │
│   ProcessPDFFunction     │          ├──────────────────────────┤
├──────────────────────────┤          │ - activeSection: number  │
│ - LOVABLE_API_KEY: str   │          │ - showKeyTerms: boolean  │
│ - AI_GATEWAY_URL: string │          │ - showTips: boolean      │
├──────────────────────────┤          ├──────────────────────────┤
│ + handleRequest()        │          │ + handleSectionClick()   │
│ + generateQuizPrompt()   │          │ + toggleKeyTerms()       │
│ + generateSummaryPrompt()│          │ + toggleTips()           │
│ + callAIGateway()        │          └──────────────────────────┘
│ + parseAIResponse()      │
└──────────────────────────┘

                    LÉGENDE
    ┌─────────────────────────────────┐
    │  ──────▶  Association           │
    │  ◇──────  Agrégation            │
    │  ◆──────  Composition           │
    │  - - - ▶  Dépendance            │
    └─────────────────────────────────┘
```

### Description des Classes

| Classe | Responsabilité | Attributs Clés |
|--------|----------------|----------------|
| **ContentData** | Interface de données pour le contenu généré | questions, summary, keyTerms, studyTips |
| **Question** | Modèle d'une question de quiz | question, options, correctAnswer, darijaExplanation |
| **SummarySection** | Section d'un résumé structuré | title, content, bulletPoints, darijaExplanation |
| **KeyTerm** | Terme clé avec définition | term, definition, example, darijaExplanation |
| **AppSection** | Composant orchestrateur principal | pdfContent, activeMode, contentData |
| **PDFUploader** | Gestion de l'upload et extraction PDF | isDragging, isProcessing, progress |
| **QuizMode** | Affichage et interaction quiz | currentQuestion, score, answeredQuestions |
| **ResumeMode** | Affichage du résumé structuré | activeSection, showKeyTerms |
| **ProcessPDFFunction** | Edge Function de génération IA | LOVABLE_API_KEY, AI_GATEWAY_URL |

---

## Diagrammes de Séquences

Les diagrammes de séquences illustrent les interactions chronologiques entre les différents acteurs et composants du système pour réaliser les cas d'utilisation principaux.

### Figure 2 : Diagramme de séquence - Génération et Affichage du Contenu Pédagogique (Quiz/Résumé)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│          DIAGRAMME DE SÉQUENCE : GÉNÉRATION DE CONTENU PÉDAGOGIQUE              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────┐    ┌─────────────┐    ┌───────────┐    ┌─────────────┐    ┌─────────┐
│Étudiant │    │ PDFUploader │    │AppSection │    │Edge Function│    │ Gemini  │
│  :User  │    │ :Component  │    │:Component │    │ :Supabase   │    │  :AI    │
└────┬────┘    └──────┬──────┘    └─────┬─────┘    └──────┬──────┘    └────┬────┘
     │                │                 │                 │                │
     │ 1. Sélectionner PDF              │                 │                │
     │───────────────>│                 │                 │                │
     │                │                 │                 │                │
     │                │ 2. Valider fichier               │                │
     │                │ (type, taille < 20MB)            │                │
     │                │─────────┐       │                 │                │
     │                │         │       │                 │                │
     │                │<────────┘       │                 │                │
     │                │                 │                 │                │
     │                │ 3. Extraire texte (PDF.js)       │                │
     │                │─────────┐       │                 │                │
     │                │         │       │                 │                │
     │                │<────────┘       │                 │                │
     │                │                 │                 │                │
     │                │ 4. onFileProcessed(content, pages)                │
     │                │────────────────>│                 │                │
     │                │                 │                 │                │
     │ 5. Afficher options (Quiz/Résumé, nb questions)   │                │
     │<─────────────────────────────────│                 │                │
     │                │                 │                 │                │
     │ 6. Choisir mode + paramètres     │                 │                │
     │─────────────────────────────────>│                 │                │
     │                │                 │                 │                │
     │                │                 │ 7. POST /process-pdf            │
     │                │                 │ {content, mode, questionCount}  │
     │                │                 │────────────────>│                │
     │                │                 │                 │                │
     │                │                 │                 │ 8. Construire  │
     │                │                 │                 │    prompt IA   │
     │                │                 │                 │───────┐        │
     │                │                 │                 │       │        │
     │                │                 │                 │<──────┘        │
     │                │                 │                 │                │
     │                │                 │                 │ 9. Appel API   │
     │                │                 │                 │ ai.lovable.dev │
     │                │                 │                 │───────────────>│
     │                │                 │                 │                │
     │                │                 │                 │                │ 10. Générer
     │                │                 │                 │                │     contenu
     │                │                 │                 │                │────┐
     │                │                 │                 │                │    │
     │                │                 │                 │                │<───┘
     │                │                 │                 │                │
     │                │                 │                 │ 11. JSON Response
     │                │                 │                 │ (questions/summary
     │                │                 │                 │  + Darija)     │
     │                │                 │                 │<───────────────│
     │                │                 │                 │                │
     │                │                 │ 12. Parser et valider JSON       │
     │                │                 │<────────────────│                │
     │                │                 │                 │                │
     │                │                 │ 13. setContentData()             │
     │                │                 │─────────┐       │                │
     │                │                 │         │       │                │
     │                │                 │<────────┘       │                │
     │                │                 │                 │                │
     │ 14. Afficher QuizMode ou ResumeMode               │                │
     │<─────────────────────────────────│                 │                │
     │                │                 │                 │                │
     │ 15. Interagir avec le contenu    │                 │                │
     │─────────────────────────────────>│                 │                │
     │                │                 │                 │                │
     ▼                ▼                 ▼                 ▼                ▼

```

### Figure 2.1 : Diagramme de séquence détaillé - Upload et Extraction PDF

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              DIAGRAMME DE SÉQUENCE : UPLOAD ET EXTRACTION PDF                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────┐    ┌─────────────┐    ┌───────────┐    ┌─────────────┐
│Étudiant │    │ PDFUploader │    │  PDF.js   │    │ AppSection  │
│  :User  │    │ :Component  │    │ :Library  │    │ :Component  │
└────┬────┘    └──────┬──────┘    └─────┬─────┘    └──────┬──────┘
     │                │                 │                 │
     │ 1. Glisser-déposer PDF          │                 │
     │───────────────>│                 │                 │
     │                │                 │                 │
     │                │ 2. handleDrop() │                 │
     │                │─────────┐       │                 │
     │                │         │       │                 │
     │                │<────────┘       │                 │
     │                │                 │                 │
     │                │ 3. Vérifier type MIME             │
     │                │    (application/pdf)              │
     │                │─────────┐       │                 │
     │                │         │       │                 │
     │                │<────────┘       │                 │
     │                │                 │                 │
     │                │ 4. Vérifier taille               │
     │                │    (< 20 MB)    │                 │
     │                │─────────┐       │                 │
     │                │         │       │                 │
     │                │<────────┘       │                 │
     │                │                 │                 │
     │ [Si invalide] 5. Afficher erreur │                 │
     │<───────────────│                 │                 │
     │                │                 │                 │
     │                │ 6. setIsProcessing(true)          │
     │                │─────────┐       │                 │
     │                │         │       │                 │
     │                │<────────┘       │                 │
     │                │                 │                 │
     │                │ 7. getDocument(arrayBuffer)       │
     │                │────────────────>│                 │
     │                │                 │                 │
     │                │                 │ 8. Charger PDF  │
     │                │                 │─────────┐       │
     │                │                 │         │       │
     │                │                 │<────────┘       │
     │                │                 │                 │
     │                │ 9. pdf.numPages │                 │
     │                │<────────────────│                 │
     │                │                 │                 │
     │                │                 │                 │
     │                │ ┌───────────────────────────────┐ │
     │                │ │  BOUCLE: Pour chaque page     │ │
     │                │ └───────────────────────────────┘ │
     │                │ │                 │                │
     │                │ │ 10. getPage(i) │                 │
     │                │ │───────────────>│                 │
     │                │ │                │                 │
     │                │ │ 11. getTextContent()            │
     │                │ │<───────────────│                 │
     │                │ │                │                 │
     │                │ │ 12. Concaténer texte            │
     │                │ │─────────┐      │                 │
     │                │ │         │      │                 │
     │                │ │<────────┘      │                 │
     │                │ │                │                 │
     │                │ │ 13. setProgress(%)              │
     │                │ │─────────┐      │                 │
     │                │ │         │      │                 │
     │                │ │<────────┘      │                 │
     │                │ └────────────────┘                 │
     │                │                 │                 │
     │                │ 14. Vérifier contenu              │
     │                │     (> 50 caractères)             │
     │                │─────────┐       │                 │
     │                │         │       │                 │
     │                │<────────┘       │                 │
     │                │                 │                 │
     │                │ 15. onFileProcessed(text, pages)  │
     │                │────────────────────────────────>│
     │                │                 │                 │
     │                │                 │                 │
     ▼                ▼                 ▼                 ▼
```

### Figure 2.2 : Diagramme de séquence - Génération Quiz

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMME DE SÉQUENCE : GÉNÉRATION QUIZ                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────┐    ┌───────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────┐
│Étudiant │    │AppSection │    │Edge Function│    │Lovable AI GW │    │ Gemini  │
│  :User  │    │:Component │    │ :Supabase   │    │  :Gateway    │    │  :AI    │
└────┬────┘    └─────┬─────┘    └──────┬──────┘    └──────┬───────┘    └────┬────┘
     │               │                 │                  │                 │
     │ 1. Clic "Quiz"│                 │                  │                 │
     │──────────────>│                 │                  │                 │
     │               │                 │                  │                 │
     │               │ 2. handleModeSelect('quiz')        │                 │
     │               │─────────┐       │                  │                 │
     │               │         │       │                  │                 │
     │               │<────────┘       │                  │                 │
     │               │                 │                  │                 │
     │               │ 3. setActiveMode('quiz')           │                 │
     │               │─────────┐       │                  │                 │
     │               │         │       │                  │                 │
     │               │<────────┘       │                  │                 │
     │               │                 │                  │                 │
     │               │ 4. processContent()                │                 │
     │               │─────────┐       │                  │                 │
     │               │         │       │                  │                 │
     │               │<────────┘       │                  │                 │
     │               │                 │                  │                 │
     │               │ 5. fetch('/functions/v1/process-pdf')               │
     │               │ {                │                  │                 │
     │               │   content: "...",│                  │                 │
     │               │   mode: "quiz",  │                  │                 │
     │               │   pages: 10,     │                  │                 │
     │               │   questionCount: 5                  │                 │
     │               │ }                │                  │                 │
     │               │────────────────>│                  │                 │
     │               │                 │                  │                 │
     │               │                 │ 6. Construire systemPrompt         │
     │               │                 │ "Tu es un assistant pédagogique    │
     │               │                 │  spécialisé pour les étudiants     │
     │               │                 │  marocains..."   │                 │
     │               │                 │─────────┐        │                 │
     │               │                 │         │        │                 │
     │               │                 │<────────┘        │                 │
     │               │                 │                  │                 │
     │               │                 │ 7. Construire userPrompt           │
     │               │                 │ "Génère exactement ${n} questions  │
     │               │                 │  QCM avec 4 options..."            │
     │               │                 │─────────┐        │                 │
     │               │                 │         │        │                 │
     │               │                 │<────────┘        │                 │
     │               │                 │                  │                 │
     │               │                 │ 8. POST ai.lovable.dev/chat        │
     │               │                 │ model: gemini-2.5-flash            │
     │               │                 │────────────────>│                 │
     │               │                 │                  │                 │
     │               │                 │                  │ 9. Forward to   │
     │               │                 │                  │    Google API   │
     │               │                 │                  │────────────────>│
     │               │                 │                  │                 │
     │               │                 │                  │                 │ 10. Generate
     │               │                 │                  │                 │────┐
     │               │                 │                  │                 │    │
     │               │                 │                  │                 │<───┘
     │               │                 │                  │                 │
     │               │                 │                  │ 11. JSON avec   │
     │               │                 │                  │     questions   │
     │               │                 │                  │<────────────────│
     │               │                 │                  │                 │
     │               │                 │ 12. Response     │                 │
     │               │                 │<────────────────│                 │
     │               │                 │                  │                 │
     │               │                 │ 13. Parser JSON  │                 │
     │               │                 │ Extraire questions[]               │
     │               │                 │─────────┐        │                 │
     │               │                 │         │        │                 │
     │               │                 │<────────┘        │                 │
     │               │                 │                  │                 │
     │               │ 14. {success: true, data: {...}}   │                 │
     │               │<────────────────│                  │                 │
     │               │                 │                  │                 │
     │               │ 15. setContentData(data)           │                 │
     │               │─────────┐       │                  │                 │
     │               │         │       │                  │                 │
     │               │<────────┘       │                  │                 │
     │               │                 │                  │                 │
     │ 16. Render <QuizMode />         │                  │                 │
     │<──────────────│                 │                  │                 │
     │               │                 │                  │                 │
     ▼               ▼                 ▼                  ▼                 ▼
```

---

## Diagramme de Collaboration

Les diagrammes de collaboration montrent des interactions entre objets, incluant les instances de classes et les acteurs. Ils nous permettent de représenter le contexte d'une interaction en précisant les états des objets qui interagissent. Alors que le diagramme de séquence privilégie l'aspect temporel et le cycle de vie des objets, le diagramme de collaboration privilégie l'aspect spatial, mettant en avant les objets et les liens qui les unissent.

> **Remarque** : Le diagramme de séquence privilégie l'aspect temporel (cycle de vie des objets) par contre le diagramme de collaboration privilégie l'aspect spatial (objets et liens entre eux).

Ce diagramme illustre l'organisation spatiale des composants de notre système et la manière dont ils communiquent pour réaliser l'objectif principal de l'application.

### Figure 3 : Diagramme de collaboration du système Qrayti

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
    │          │ 2: extractTextFromPDF()               │ 7: setContentData()  │
    │          │                                       │                      │
    │          ▼                                       ▼                      │
    │   ┌─────────────┐                         ┌─────────────┐              │
    │   │   PDF.js    │                         │  QuizMode   │              │
    │   │  :Library   │                         │ ResumeMode  │              │
    │   └──────┬──────┘                         │ :Component  │              │
    │          │                                └─────────────┘              │
    │          │ 3: texte extrait                                            │
    │          └──────────────────────────────────────────────────────────>  │
    │                                                                         │
    └─────────────────────────────────────────────────────────────────────────┘
                                             │
                              5: POST /process-pdf
                              {content, mode, questionCount}
                                             │
                                             ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                                                                         │
    │                    BACKEND (Supabase Edge Functions)                    │
    │                                                                         │
    │   ┌─────────────────────────────────────────────────────────────────┐  │
    │   │                     process-pdf                                  │  │
    │   │                    :EdgeFunction                                 │  │
    │   │                                                                  │  │
    │   │   • Construire prompt selon mode (quiz/resume)                  │  │
    │   │   • Inclure instructions Darija                                  │  │
    │   │   • Appeler Lovable AI Gateway                                   │  │
    │   │   • Parser et valider réponse JSON                               │  │
    │   │                                                                  │  │
    │   └──────────────────────────────┬──────────────────────────────────┘  │
    │                                  │                                      │
    │                   6: Réponse formatée (JSON)                           │
    │                                  │                                      │
    └──────────────────────────────────┼──────────────────────────────────────┘
                                       │
                        5.1: POST /chat
                        {model, messages}
                                       │
                                       ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                                                                         │
    │                      INTELLIGENCE ARTIFICIELLE                          │
    │                                                                         │
    │   ┌─────────────────────┐         ┌─────────────────────┐              │
    │   │  Lovable AI Gateway │ ──────> │ Google Gemini 2.5   │              │
    │   │  ai.lovable.dev     │  5.2    │      Flash          │              │
    │   │                     │ <────── │                     │              │
    │   └─────────────────────┘  5.3    └─────────────────────┘              │
    │                                                                         │
    │   Fonctionnalités:                                                      │
    │   • Génération de questions QCM                                         │
    │   • Création de résumés structurés                                      │
    │   • Explications en Darija marocaine                                    │
    │   • Extraction de termes clés                                           │
    │                                                                         │
    └─────────────────────────────────────────────────────────────────────────┘


                              LÉGENDE DES MESSAGES
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  1: Sélection PDF              │  5: Requête Edge Function              │
    │  2: Extraction PDF.js          │  5.1-5.3: Appels AI Gateway            │
    │  3: Texte brut retourné        │  6: Données générées (JSON)            │
    │  4: Contenu + mode choisi      │  7: Mise à jour state React            │
    │                                │  8: Affichage Quiz/Résumé              │
    └─────────────────────────────────────────────────────────────────────────┘
```

### Analyse du Diagramme de Collaboration

Nous observons dans ce diagramme une architecture interconnectée où chaque composant assume une responsabilité précise pour assurer le "Comment Faire" de notre solution :

| Interaction | Description |
|-------------|-------------|
| **Interaction Utilisateur-Interface** | Le flux débute par la sélection du PDF par l'étudiant (1) et se conclut par la visualisation du résultat (8) sur l'interface React. |
| **Délégation locale (Traitement Client)** | L'interface transmet le fichier à l'extracteur PDF.js (2) qui renvoie le texte brut (3) directement au Frontend, optimisant ainsi les ressources serveur. |
| **Orchestration Backend** | L'interface envoie ensuite le contenu et le mode choisi (4) à l'Edge Function de Supabase, qui agit comme médiateur sécurisé. |
| **Génération par IA** | Le serveur soumet le prompt spécifique incluant les instructions en Darija à Gemini 2.5 Flash (5) et reçoit en retour un objet JSON structuré (6). |
| **Restitution** | Enfin, les données formatées sont retournées à l'interface (7) pour être transformées en quiz ou résumé interactif. |

> Ce diagramme met en évidence que l'interface React (Frontend) constitue le pivot central de notre architecture, facilitant le flot de contrôle entre les outils d'extraction locaux et les services d'intelligence artificielle distants.

---

## Diagrammes d'États-Transitions

Les diagrammes d'états-transitions décrivent le comportement interne d'un objet à l'aide d'un automate à états finis. Ils présentent les séquences possibles d'états et d'actions qu'une instance peut traiter au cours de son cycle de vie en réaction à des événements discrets, tels que des signaux ou des invocations de méthodes.

Ce diagramme illustre les différents stades par lesquels passe notre application pour assurer une gestion fluide et robuste de l'expérience utilisateur.

### Figure 4 : Diagramme d'états-transitions du système Qrayti

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
                              │         IDLE          │
                              │                       │
                              │   En attente d'un     │
                              │   document PDF        │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          │ Upload PDF / Drag & Drop
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │      EXTRACTING       │◄─────────────────────┐
                              │                       │                      │
                              │   Extraction du       │                      │
                              │   texte via PDF.js    │                      │
                              │                       │                      │
                              │   [progress: 0-100%]  │                      │
                              │                       │                      │
                              └───────────┬───────────┘                      │
                                          │                                  │
                         ┌────────────────┼────────────────┐                 │
                         │                │                │                 │
                         ▼                ▼                │                 │
              [Fichier invalide]   [Extraction OK]         │                 │
                         │                │                │                 │
                         ▼                │                │                 │
              ┌─────────────────┐         │                │                 │
              │                 │         │                │                 │
              │      ERROR      │         │                │                 │
              │                 │         │                │                 │
              │  • Format non   │         │                │                 │
              │    supporté     │         │                │                 │
              │  • Fichier trop │         │                │                 │
              │    volumineux   │         │                │                 │
              │  • PDF vide     │         │                │                 │
              │                 │         │                │                 │
              └────────┬────────┘         │                │                 │
                       │                  │                │                 │
                       │ Réessayer        │                │                 │
                       └──────────────────┼────────────────┼─────────────────┘
                                          │                │
                                          ▼                │
                              ┌───────────────────────┐    │
                              │                       │    │
                              │    MODE_SELECTION     │    │
                              │                       │    │
                              │   Affichage options:  │    │
                              │   • Quiz / Résumé     │    │
                              │   • Nombre questions  │    │
                              │                       │    │
                              └───────────┬───────────┘    │
                                          │                │
                         ┌────────────────┴────────────────┐
                         │                                 │
                         ▼                                 ▼
              [Choisir Quiz]                    [Choisir Résumé]
                         │                                 │
                         ▼                                 ▼
              ┌───────────────────────┐      ┌───────────────────────┐
              │                       │      │                       │
              │   GENERATING_QUIZ     │      │  GENERATING_SUMMARY   │
              │                       │      │                       │
              │   Appel Edge Function │      │   Appel Edge Function │
              │   mode: "quiz"        │      │   mode: "resume"      │
              │                       │      │                       │
              │   [isProcessing:true] │      │   [isProcessing:true] │
              │                       │      │                       │
              └───────────┬───────────┘      └───────────┬───────────┘
                          │                              │
                          │ Succès                       │ Succès
                          ▼                              ▼
              ┌───────────────────────┐      ┌───────────────────────┐
              │                       │      │                       │
              │      QUIZ_ACTIVE      │      │    SUMMARY_ACTIVE     │
              │                       │      │                       │
              │   • Afficher question │      │   • Sections cliquab. │
              │   • 4 options         │      │   • Termes clés       │
              │   • Score en temps    │      │   • Conseils d'étude  │
              │     réel              │      │                       │
              │   • Explication       │      │   • Explication       │
              │     Darija            │      │     Darija            │
              │                       │      │                       │
              └───────────┬───────────┘      └───────────┬───────────┘
                          │                              │
                          │ Clic "Retour"                │ Clic "Retour"
                          │                              │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                              ┌───────────────────────┐
                              │                       │
                              │         IDLE          │
                              │                       │
                              │   Prêt pour un        │
                              │   nouveau document    │
                              │                       │
                              └───────────────────────┘


                                   LÉGENDE
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  ┌─────────┐                                                            │
    │  │  État   │   État du système                                          │
    │  └─────────┘                                                            │
    │                                                                         │
    │  ─────────►   Transition (déclenchée par événement)                     │
    │                                                                         │
    │  [condition]  Garde / Condition de transition                           │
    └─────────────────────────────────────────────────────────────────────────┘
```

### Analyse du Diagramme d'États-Transitions

Nous observons dans ce diagramme une machine à états logique où chaque transition répond à une action spécifique de l'utilisateur ou du système :

| État | Description |
|------|-------------|
| **Initialisation (État Idle)** | Le flux débute à l'ouverture de l'application où le système reste en attente du téléchargement d'un cours par l'étudiant. |
| **Traitement (État Extracting)** | Dès l'upload du PDF, le système passe à l'extraction textuelle via PDF.js. En cas d'erreur de format, une transition vers l'état Error est effectuée pour avertir l'étudiant. |
| **Configuration (État ModeSelection)** | Une fois le texte extrait avec succès, l'application attend que l'utilisateur choisisse ses paramètres (Quiz ou Résumé). |
| **Génération (État Generating)** | Le système sollicite l'IA Gemini 2.5 Flash. Cet état est transitoire jusqu'à la réception des données structurées contenant les explications en Darija. |
| **Apprentissage Actif (États QuizActive / SummaryActive)** | Enfin, l'objet atteint sa finalité en affichant le contenu interactif, permettant à l'étudiant de réviser avant de revenir éventuellement à l'état initial pour un nouveau document. |

> Ce diagramme met en évidence la robustesse de l'architecture de Qrayti, capable de gérer les exceptions (erreurs) et de maintenir la cohérence de l'interface tout au long du cycle de vie de la session d'apprentissage.

---

### Figure 5 : Diagramme d'état-transition de la Gestion Documentaire (Validation PDF)

Les diagrammes d'états-transitions d'UML décrivent le comportement interne d'un objet à l'aide d'un automate à états finis. Ils présentent les séquences possibles d'états et d'actions qu'une instance de classe peut traiter au cours de son cycle de vie en réaction à des événements discrets.

Ce diagramme illustre spécifiquement la logique de contrôle et de validation que nous avons mise en place pour garantir l'intégrité des supports de cours avant leur traitement par l'IA.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│           DIAGRAMME D'ÉTAT-TRANSITION : VALIDATION DU DOCUMENT PDF              │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  [Start]  │
                                    └─────┬─────┘
                                          │
                                          │ Sélection fichier
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │     FILE_SELECTED     │
                              │                       │
                              │   file.type           │
                              │   file.size           │
                              │   file.name           │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          │ Vérifier taille
                                          ▼
                         ┌────────────────┴────────────────┐
                         │                                 │
                    [size > 20MB]                    [size ≤ 20MB]
                         │                                 │
                         ▼                                 ▼
              ┌─────────────────┐              ┌───────────────────────┐
              │                 │              │                       │
              │    REJECTED     │              │      VALIDATING       │
              │                 │              │                       │
              │  error:         │              │   Vérification du     │
              │  "Fichier trop  │              │   type MIME           │
              │   volumineux    │              │                       │
              │   (max 20MB)"   │              │   application/pdf     │
              │                 │              │                       │
              └─────────────────┘              └───────────┬───────────┘
                                                          │
                                          ┌───────────────┴───────────────┐
                                          │                               │
                                   [type !== pdf]                  [type === pdf]
                                          │                               │
                                          ▼                               ▼
                              ┌─────────────────┐              ┌───────────────────────┐
                              │                 │              │                       │
                              │    REJECTED     │              │       PARSING         │
                              │                 │              │                       │
                              │  error:         │              │   Extraction texte    │
                              │  "Format non    │              │   via PDF.js          │
                              │   supporté.     │              │                       │
                              │   Veuillez      │              │   getDocument()       │
                              │   télécharger   │              │   getTextContent()    │
                              │   un fichier    │              │                       │
                              │   PDF"          │              └───────────┬───────────┘
                              │                 │                          │
                              └─────────────────┘              ┌───────────┴───────────┐
                                                               │                       │
                                                      [chars < 50]              [chars ≥ 50]
                                                               │                       │
                                                               ▼                       ▼
                                              ┌─────────────────┐      ┌───────────────────────┐
                                              │                 │      │                       │
                                              │    REJECTED     │      │    CONTENT_READY      │
                                              │                 │      │                       │
                                              │  error:         │      │   ✓ Texte extrait     │
                                              │  "Le PDF semble │      │   ✓ Pages comptées    │
                                              │   être vide ou  │      │   ✓ Prêt pour IA      │
                                              │   protégé"      │      │                       │
                                              │                 │      │   textContent: string │
                                              └─────────────────┘      │   pageCount: number   │
                                                                       │                       │
                                                                       └───────────────────────┘
                                                                                  │
                                                                                  │
                                                                                  ▼
                                                                       ┌───────────────────────┐
                                                                       │        [End]          │
                                                                       │                       │
                                                                       │   → Mode Selection    │
                                                                       └───────────────────────┘


              TABLEAU DES VALIDATIONS
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  Critère              │  Valeur Attendue     │  Message d'Erreur        │
    ├───────────────────────┼──────────────────────┼──────────────────────────┤
    │  Type MIME            │  application/pdf     │  "Format non supporté"   │
    │  Taille fichier       │  ≤ 20 MB             │  "Fichier trop volumineux│
    │  Contenu extrait      │  ≥ 50 caractères     │  "PDF vide ou protégé"   │
    └─────────────────────────────────────────────────────────────────────────┘
```

### Analyse du Diagramme de Validation PDF

Nous observons dans ce diagramme une architecture de validation rigoureuse permettant de filtrer les fichiers non conformes :

| Phase | Description |
|-------|-------------|
| **Vérification de la taille (État FileSelected)** | Le flux débute par la sélection d'un PDF. Le système effectue un premier contrôle de sécurité : si la taille est supérieure à 20Mo, l'objet bascule immédiatement vers l'état Rejected avec une notification d'erreur. |
| **Contrôle de conformité (État Validating)** | Si la taille est valide, nous procédons à l'analyse du format MIME. Un format invalide entraîne le rejet immédiat du document pour protéger la stabilité de l'application. |
| **Extraction et Analyse (État Parsing)** | Une fois le format validé, le système utilise PDF.js pour l'extraction. Si le PDF est vide ou protégé par un mot de passe (0 caractère extrait), la transition s'opère vers l'état Rejected. |
| **Disponibilité (État ContentReady)** | Ce n'est que lorsque le texte est extrait avec succès que le système atteint cet état final, signifiant que la donnée est prête à être consommée par les modules de génération (Quiz ou Résumé). |

> Ce diagramme met en évidence notre volonté d'assurer une expérience utilisateur sans faille en anticipant les erreurs techniques liées aux fichiers sources.

---

## Diagrammes d'Activité

Les diagrammes d'activités permettent de mettre l'accent sur les traitements et sont particulièrement adaptés à la modélisation du cheminement de flots de contrôle et de flots de données. Ils permettent ainsi de représenter graphiquement le comportement du système lors du déroulement de notre processus principal de transformation pédagogique.

Ce diagramme illustre la séquence logique des actions, de l'ouverture de l'application à l'achèvement de la phase de révision par l'étudiant.

### Figure 6 : Diagramme d'activité du processus de génération Qrayti

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              DIAGRAMME D'ACTIVITÉ : PROCESSUS DE GÉNÉRATION QRAYTI              │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  (Start)  │
                                    └─────┬─────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │   Lancer Application  │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │   Importer Cours PDF  │
                              │                       │
                              │   • Drag & Drop       │
                              │   • Bouton Upload     │
                              │   • Mode Démo         │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          ▼
                                    ◇─────────────◇
                                   ╱               ╲
                                  ╱   Validation    ╲
                                 ╱    du fichier?    ╲
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
              │                 │              │                       │
              │   Afficher      │              │   Extraire Texte      │
              │   Message       │              │   avec PDF.js         │
              │   d'Erreur      │              │                       │
              │                 │              │   • Page par page     │
              └────────┬────────┘              │   • Afficher progrès  │
                       │                       │                       │
                       │                       └───────────┬───────────┘
                       │                                   │
                       │                                   ▼
                       │                       ┌───────────────────────┐
                       │                       │                       │
                       │                       │   Afficher Options    │
                       │                       │   de Configuration    │
                       │                       │                       │
                       │                       │   • Mode: Quiz/Résumé │
                       │                       │   • Nb Questions      │
                       │                       │                       │
                       │                       └───────────┬───────────┘
                       │                                   │
                       │                                   ▼
                       │                             ◇─────────────◇
                       │                            ╱               ╲
                       │                           ╱   Mode choisi?  ╲
                       │                          ╱                   ╲
                       │                          ╲                   ╱
                       │                           ╲                 ╱
                       │                            ╲               ╱
                       │                             ◇─────────────◇
                       │                                   │
                       │                  ┌────────────────┴────────────────┐
                       │                  │                                 │
                       │               [QUIZ]                           [RÉSUMÉ]
                       │                  │                                 │
                       │                  ▼                                 ▼
                       │      ┌───────────────────────┐      ┌───────────────────────┐
                       │      │                       │      │                       │
                       │      │   Appeler Edge        │      │   Appeler Edge        │
                       │      │   Function            │      │   Function            │
                       │      │                       │      │                       │
                       │      │   mode: "quiz"        │      │   mode: "resume"      │
                       │      │   questionCount: n    │      │                       │
                       │      │                       │      │                       │
                       │      └───────────┬───────────┘      └───────────┬───────────┘
                       │                  │                              │
                       │                  ▼                              ▼
                       │      ┌───────────────────────┐      ┌───────────────────────┐
                       │      │                       │      │                       │
                       │      │   Générer Questions   │      │   Générer Résumé      │
                       │      │   QCM via IA Gemini   │      │   via IA Gemini       │
                       │      │                       │      │                       │
                       │      │   + Explications      │      │   + Explications      │
                       │      │     en Darija         │      │     en Darija         │
                       │      │                       │      │                       │
                       │      └───────────┬───────────┘      └───────────┬───────────┘
                       │                  │                              │
                       │                  ▼                              ▼
                       │      ┌───────────────────────┐      ┌───────────────────────┐
                       │      │                       │      │                       │
                       │      │   Afficher Quiz       │      │   Afficher Résumé     │
                       │      │   Interactif          │      │   Structuré           │
                       │      │                       │      │                       │
                       │      │   • Questions         │      │   • Sections          │
                       │      │   • Score en direct   │      │   • Termes clés       │
                       │      │   • Explications      │      │   • Conseils          │
                       │      │                       │      │                       │
                       │      └───────────┬───────────┘      └───────────┬───────────┘
                       │                  │                              │
                       │                  └──────────────┬───────────────┘
                       │                                 │
                       │                                 ▼
                       │                   ┌───────────────────────┐
                       │                   │                       │
                       │                   │   Interagir avec      │
                       │                   │   le Contenu          │
                       │                   │                       │
                       │                   │   • Répondre quiz     │
                       │                   │   • Lire résumé       │
                       │                   │   • Voir Darija       │
                       │                   │                       │
                       │                   └───────────┬───────────┘
                       │                               │
                       │                               ▼
                       │                         ◇─────────────◇
                       │                        ╱               ╲
                       │                       ╱   Nouveau       ╲
                       │                      ╱    document?      ╲
                       │                      ╲                   ╱
                       │                       ╲                 ╱
                       │                        ╲               ╱
                       │                         ◇─────────────◇
                       │                               │
                       │              ┌────────────────┴────────────────┐
                       │              │                                 │
                       │           [OUI]                              [NON]
                       │              │                                 │
                       └──────────────┤                                 ▼
                                      │                       ┌───────────────────────┐
                                      │                       │                       │
                                      │                       │   Fin de Session      │
                                      │                       │                       │
                                      │                       └───────────┬───────────┘
                                      │                                   │
                                      │                                   ▼
                                      │                            ┌───────────┐
                                      │                            │   (End)   │
                                      │                            └───────────┘
                                      │
                                      └────────────────────────────────────┐
                                                                           │
                                                                           ▼
                                                             ┌───────────────────────┐
                                                             │                       │
                                                             │   Importer Cours PDF  │
                                                             │                       │
                                                             └───────────────────────┘


                                   LÉGENDE
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  ┌─────────────┐                                                        │
    │  │   Action    │   Activité / Action                                    │
    │  └─────────────┘                                                        │
    │                                                                         │
    │       ◇                                                                 │
    │      ╱ ╲        Point de décision (condition)                           │
    │      ╲ ╱                                                                │
    │       ◇                                                                 │
    │                                                                         │
    │  ─────────►     Flux de contrôle                                        │
    │                                                                         │
    │  (Start/End)    Nœud initial / final                                    │
    └─────────────────────────────────────────────────────────────────────────┘
```

### Analyse du Diagramme d'Activité

Nous observons dans ce diagramme une organisation fluide des traitements, mettant en évidence les points de décision critiques du système :

| Phase | Description |
|-------|-------------|
| **Phase d'Initialisation et de Contrôle** | Le processus débute par le lancement de l'application et l'importation du cours au format PDF. Une structure conditionnelle ("Validation du fichier ?") assure que seuls les documents conformes passent à l'étape suivante, tandis qu'un message d'erreur est généré en cas d'invalidité. |
| **Traitement et Configuration** | Une fois le fichier validé, l'activité d'extraction est déléguée à la bibliothèque PDF.js. Le système affiche ensuite les options de configuration, permettant à l'étudiant de définir ses préférences de révision. |
| **Bifurcation des Traitements IA** | Selon le choix de l'utilisateur ("Mode choisi ?"), le flux se divise en deux branches distinctes. Le système sollicite alors l'IA Gemini 2.5 Flash pour exécuter soit le "Quiz Prompt", soit le "Summary Prompt", incluant systématiquement la génération des explications en Darija. |
| **Finalité et Persistance** | Après l'interaction pédagogique (réponse au quiz ou consultation du résumé), les deux branches se rejoignent pour permettre l'enregistrement ou l'exportation du résultat, marquant ainsi la fin de la phase de révision. |

> Ce diagramme met en évidence que, contrairement au diagramme d'états, nous insistons ici sur le flot de contrôle d'une activité à l'autre, garantissant une compréhension claire du déroulement opérationnel de la solution Qrayti.

---

### Figure 6.1 : Diagramme d'activité - Traitement Edge Function

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│            DIAGRAMME D'ACTIVITÉ : TRAITEMENT EDGE FUNCTION                      │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────┐
                                    │  (Start)  │
                                    └─────┬─────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │                       │
                              │   Recevoir Requête    │
                              │   HTTP POST           │
                              │                       │
                              │   {content, mode,     │
                              │    pages, count}      │
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          ▼
                                    ◇─────────────◇
                                   ╱               ╲
                                  ╱   Requête       ╲
                                 ╱    OPTIONS?       ╲
                                 ╲    (CORS)         ╱
                                  ╲                 ╱
                                   ╲               ╱
                                    ◇─────────────◇
                                          │
                         ┌────────────────┴────────────────┐
                         │                                 │
                      [OUI]                              [NON]
                         │                                 │
                         ▼                                 ▼
              ┌─────────────────┐              ┌───────────────────────┐
              │                 │              │                       │
              │   Retourner     │              │   Récupérer           │
              │   Headers CORS  │              │   LOVABLE_API_KEY     │
              │                 │              │                       │
              └────────┬────────┘              └───────────┬───────────┘
                       │                                   │
                       ▼                                   ▼
                ┌───────────┐                        ◇─────────────◇
                │   (End)   │                       ╱               ╲
                └───────────┘                      ╱   API Key       ╲
                                                  ╱    présente?      ╲
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
                              │                 │              │                       │
                              │   Erreur 500    │              │   Parser Body JSON    │
                              │   "API Key      │              │                       │
                              │   manquante"    │              │   content, mode,      │
                              │                 │              │   pages, questionCount│
                              └────────┬────────┘              │                       │
                                       │                       └───────────┬───────────┘
                                       ▼                                   │
                                ┌───────────┐                              ▼
                                │   (End)   │                        ◇─────────────◇
                                └───────────┘                       ╱               ╲
                                                                   ╱   mode ===      ╲
                                                                  ╱    "quiz" ?       ╲
                                                                  ╲                   ╱
                                                                   ╲                 ╱
                                                                    ╲               ╱
                                                                     ◇─────────────◇
                                                                           │
                                                          ┌────────────────┴────────────────┐
                                                          │                                 │
                                                       [OUI]                              [NON]
                                                          │                                 │
                                                          ▼                                 ▼
                                              ┌───────────────────────┐      ┌───────────────────────┐
                                              │                       │      │                       │
                                              │   Construire Prompt   │      │   Construire Prompt   │
                                              │   Quiz                │      │   Résumé              │
                                              │                       │      │                       │
                                              │   "Génère exactement  │      │   "Génère un résumé   │
                                              │   ${n} questions QCM" │      │   structuré..."       │
                                              │                       │      │                       │
                                              └───────────┬───────────┘      └───────────┬───────────┘
                                                          │                              │
                                                          └──────────────┬───────────────┘
                                                                         │
                                                                         ▼
                                                          ┌───────────────────────┐
                                                          │                       │
                                                          │   Appeler Lovable     │
                                                          │   AI Gateway          │
                                                          │                       │
                                                          │   POST ai.lovable.dev │
                                                          │   model: gemini-2.5-  │
                                                          │         flash         │
                                                          │                       │
                                                          └───────────┬───────────┘
                                                                      │
                                                                      ▼
                                                                ◇─────────────◇
                                                               ╱               ╲
                                                              ╱   Réponse       ╲
                                                             ╱    OK (200)?      ╲
                                                             ╲                   ╱
                                                              ╲                 ╱
                                                               ╲               ╱
                                                                ◇─────────────◇
                                                                      │
                                                 ┌────────────────────┴────────────────────┐
                                                 │                                         │
                                              [NON]                                      [OUI]
                                                 │                                         │
                                                 ▼                                         ▼
                                   ┌───────────────────────┐              ┌───────────────────────┐
                                   │                       │              │                       │
                                   │   Gérer Erreurs       │              │   Parser Réponse      │
                                   │                       │              │   JSON                │
                                   │   • 429: Rate Limit   │              │                       │
                                   │   • 402: No Credits   │              │   Extraire questions  │
                                   │   • 5xx: Server Error │              │   ou summary          │
                                   │                       │              │                       │
                                   └───────────┬───────────┘              └───────────┬───────────┘
                                               │                                      │
                                               │                                      ▼
                                               │                       ┌───────────────────────┐
                                               │                       │                       │
                                               │                       │   Retourner Succès    │
                                               │                       │                       │
                                               │                       │   {success: true,     │
                                               │                       │    data: {...}}       │
                                               │                       │                       │
                                               │                       └───────────┬───────────┘
                                               │                                   │
                                               └───────────────────────────────────┤
                                                                                   │
                                                                                   ▼
                                                                            ┌───────────┐
                                                                            │   (End)   │
                                                                            └───────────┘
```

---

## Architecture Technique

Cette section présente l'architecture technique complète du système Qrayti, incluant les technologies utilisées et leur configuration.

### Stack Technologique Complet

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         ARCHITECTURE TECHNIQUE QRAYTI                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  FRONTEND                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    React    │  │ TypeScript  │  │    Vite     │  │  Tailwind   │            │
│  │    18.3     │  │    5.x      │  │    5.x      │  │    CSS 3    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Framer    │  │   React     │  │  TanStack   │  │   Radix     │            │
│  │   Motion    │  │   Router    │  │   Query     │  │    UI       │            │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐                                              │
│  │  pdfjs-dist │  │   Lucide    │                                              │
│  │    4.4      │  │   Icons     │                                              │
│  └─────────────┘  └─────────────┘                                              │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  BACKEND                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                         SUPABASE (Lovable Cloud)                          │ │
│  ├───────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                           │ │
│  │  ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │  │                       Edge Functions (Deno)                         │ │ │
│  │  │                                                                     │ │ │
│  │  │   ┌─────────────────────────────────────────────────────────────┐  │ │ │
│  │  │   │                      process-pdf                            │  │ │ │
│  │  │   │                                                             │  │ │ │
│  │  │   │   • Réception des requêtes POST                            │  │ │ │
│  │  │   │   • Construction des prompts IA                            │  │ │ │
│  │  │   │   • Appel à Lovable AI Gateway                             │  │ │ │
│  │  │   │   • Parsing et validation des réponses                      │  │ │ │
│  │  │   │                                                             │  │ │ │
│  │  │   └─────────────────────────────────────────────────────────────┘  │ │ │
│  │  │                                                                     │ │ │
│  │  └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           INTELLIGENCE ARTIFICIELLE                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                       Lovable AI Gateway                                 │   │
│  │                       ai.lovable.dev                                     │   │
│  ├─────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                         │   │
│  │   • Proxy sécurisé vers les APIs IA                                     │   │
│  │   • Gestion des clés API (LOVABLE_API_KEY)                             │   │
│  │   • Support multi-modèles                                               │   │
│  │                                                                         │   │
│  └─────────────────────────────┬───────────────────────────────────────────┘   │
│                                │                                               │
│                                ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     Google Gemini 2.5 Flash                             │   │
│  ├─────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                         │   │
│  │   • Génération de questions QCM                                         │   │
│  │   • Création de résumés structurés                                      │   │
│  │   • Explications en Darija marocaine                                    │   │
│  │   • Extraction de termes clés                                           │   │
│  │                                                                         │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Configuration Tailwind CSS Personnalisée

Le système utilise une configuration Tailwind CSS étendue avec des tokens de design personnalisés :

```typescript
// tailwind.config.ts - Configuration extraite du projet

{
  theme: {
    extend: {
      colors: {
        // Couleurs principales de la marque
        "qrayti-navy": "#1a2744",      // Bleu marine profond
        "qrayti-gold": "#c4a052",      // Or doré
        "qrayti-cream": "#fdf6e3",     // Crème clair
        "qrayti-sage": "#87a878",      // Vert sauge
        
        // Tokens sémantiques
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out"
      }
    }
  }
}
```

---

## Modèle de Données

Cette section présente les structures de données utilisées dans l'application Qrayti.

### Interfaces TypeScript

```typescript
// Types principaux du système Qrayti

/**
 * Mode de l'application
 */
type AppMode = 'upload' | 'options' | 'quiz' | 'resume';

/**
 * Structure des données de contenu généré
 */
interface ContentData {
  questions?: Question[];
  summary?: SummarySection[];
  keyTerms?: KeyTerm[];
  studyTips?: string[];
  pageCount?: number;
}

/**
 * Structure d'une question de quiz
 */
interface Question {
  question: string;
  options: string[];           // 4 options de réponse
  correctAnswer: number;       // Index de la bonne réponse (0-3)
  explanation: string;         // Explication en français
  darijaExplanation: string;   // Explication en Darija marocaine
}

/**
 * Structure d'une section de résumé
 */
interface SummarySection {
  title: string;
  content: string;
  bulletPoints: string[];
  darijaExplanation: string;
}

/**
 * Structure d'un terme clé
 */
interface KeyTerm {
  term: string;
  definition: string;
  example?: string;
  darijaExplanation: string;
}

/**
 * Payload de requête vers l'Edge Function
 */
interface ProcessPDFRequest {
  content: string;             // Texte extrait du PDF
  mode: 'quiz' | 'resume';     // Mode de génération
  pages: number;               // Nombre de pages du PDF
  questionCount?: number;      // Nombre de questions (mode quiz)
}

/**
 * Payload de réponse de l'Edge Function
 */
interface ProcessPDFResponse {
  success: boolean;
  data?: ContentData;
  error?: string;
}
```

### Schéma Entité-Relation (Conceptuel)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    SCHÉMA ER CONCEPTUEL (Évolution Future)                      │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────┐         ┌─────────────────────┐
    │      ÉTUDIANT       │         │      DOCUMENT       │
    ├─────────────────────┤         ├─────────────────────┤
    │ PK id: UUID         │────┐    │ PK id: UUID         │
    │    email: VARCHAR   │    │    │ FK user_id: UUID    │◄───┐
    │    nom: VARCHAR     │    │    │    nom_fichier: VAR │    │
    │    created_at: TS   │    │    │    taille: INTEGER  │    │
    └─────────────────────┘    │    │    pages: INTEGER   │    │
                               │    │    created_at: TS   │    │
                               │    └─────────────────────┘    │
                               │              │                │
                               │              │ 1              │
                               │              │                │
                               │              │ possède        │
                               │              │                │
                               │              │ *              │
                               │              ▼                │
                               │    ┌─────────────────────┐    │
                               │    │      SESSION        │    │
                               │    ├─────────────────────┤    │
                               │    │ PK id: UUID         │    │
                               └───>│ FK user_id: UUID    │    │
                                    │ FK document_id: UUID│────┘
                                    │    mode: ENUM       │
                                    │    score: INTEGER   │
                                    │    created_at: TS   │
                                    └─────────────────────┘
                                              │
                                              │ 1
                                              │
                                              │ génère
                                              │
                                              │ *
                                              ▼
                                    ┌─────────────────────┐
                                    │      RÉSULTAT       │
                                    ├─────────────────────┤
                                    │ PK id: UUID         │
                                    │ FK session_id: UUID │
                                    │    content: JSONB   │
                                    │    created_at: TS   │
                                    └─────────────────────┘


    Note: Ce schéma représente une évolution future possible
    pour la persistance des données utilisateur.
    Actuellement, l'application fonctionne en mode stateless.
```

---

## Spécifications des Composants

### PDFUploader

| Propriété | Type | Description |
|-----------|------|-------------|
| **Props** | | |
| `onFileProcessed` | `(content: string, pages: number) => void` | Callback appelé après extraction réussie |
| **État Interne** | | |
| `isDragging` | `boolean` | Indique si un fichier est en cours de glisser |
| `isProcessing` | `boolean` | Indique si l'extraction est en cours |
| `error` | `string \| null` | Message d'erreur éventuel |
| `progress` | `number` | Progression de l'extraction (0-100) |
| **Validations** | | |
| Type MIME | `application/pdf` | Seuls les fichiers PDF sont acceptés |
| Taille max | `20 MB` | Fichiers supérieurs rejetés |
| Contenu min | `50 caractères` | PDFs vides/protégés rejetés |

### QuizMode

| Propriété | Type | Description |
|-----------|------|-------------|
| **Props** | | |
| `questions` | `Question[]` | Liste des questions générées |
| `onBack` | `() => void` | Callback pour retour à l'écran précédent |
| **État Interne** | | |
| `currentQuestion` | `number` | Index de la question actuelle |
| `selectedAnswer` | `number \| null` | Réponse sélectionnée |
| `showExplanation` | `boolean` | Afficher l'explication |
| `score` | `number` | Score cumulé |
| `answeredQuestions` | `number[]` | Questions déjà répondues |
| **Fonctionnalités** | | |
| Navigation | `Précédent / Suivant` | Parcourir les questions |
| Feedback | `Correct / Incorrect` | Indication visuelle immédiate |
| Darija | `Toggle` | Afficher explication en Darija |

### ResumeMode

| Propriété | Type | Description |
|-----------|------|-------------|
| **Props** | | |
| `summary` | `SummarySection[]` | Sections du résumé |
| `keyTerms` | `KeyTerm[]` | Termes clés extraits |
| `studyTips` | `string[]` | Conseils d'étude |
| `onBack` | `() => void` | Callback pour retour |
| **État Interne** | | |
| `activeSection` | `number` | Section actuellement étendue |
| `showKeyTerms` | `boolean` | Afficher panneau termes clés |
| `showTips` | `boolean` | Afficher conseils d'étude |
| **Fonctionnalités** | | |
| Accordion | `Clic section` | Étendre/réduire sections |
| Darija | `Toggle` | Afficher explication en Darija |
| Termes | `Sidebar` | Panneau latéral termes clés |

### Edge Function : process-pdf

| Propriété | Type | Description |
|-----------|------|-------------|
| **Entrée** | | |
| `content` | `string` | Texte extrait du PDF |
| `mode` | `'quiz' \| 'resume'` | Mode de génération |
| `pages` | `number` | Nombre de pages source |
| `questionCount` | `number` | Nombre de questions (quiz) |
| **Sortie** | | |
| `success` | `boolean` | Statut de la génération |
| `data` | `ContentData` | Contenu généré |
| `error` | `string` | Message d'erreur éventuel |
| **Configuration** | | |
| API Gateway | `ai.lovable.dev` | Endpoint Lovable AI |
| Modèle | `google/gemini-2.5-flash` | Modèle IA utilisé |
| **Codes Erreur** | | |
| `429` | Rate Limit | Trop de requêtes |
| `402` | Payment Required | Crédits insuffisants |
| `500` | Server Error | Erreur interne |

---

## Conclusion

Ce chapitre a présenté la conception détaillée du système Qrayti à travers différentes vues UML complémentaires :

1. **Vue Structurelle** : Le diagramme de classes expose l'organisation des composants et leurs responsabilités
2. **Vue Comportementale** : Les diagrammes de séquences et de collaboration illustrent les interactions dynamiques
3. **Vue États** : Les diagrammes d'états-transitions modélisent les cycles de vie des objets principaux
4. **Vue Processus** : Les diagrammes d'activité décrivent les flux de traitement

L'architecture choisie combine efficacement :
- Un **traitement côté client** pour l'extraction PDF (performance)
- Un **backend serverless** pour la génération IA (scalabilité)
- Une **IA générative** pour la création de contenu pédagogique personnalisé (valeur ajoutée)

La prochaine étape consistera à implémenter les tests et la validation du système (Chapitre 4) ainsi que le déploiement en production (Chapitre 5).

---

**Document généré automatiquement à partir de l'analyse du code source Qrayti**

*Version 1.0 - Décembre 2024*
