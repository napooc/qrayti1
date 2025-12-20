import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, mode, pages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing PDF in ${mode} mode for ${pages} pages`);

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "quiz") {
      systemPrompt = `Tu es un tuteur expert marocain spécialisé dans l'éducation. Tu génères des quiz basés sur le contenu académique français, avec des explications en Darija marocaine pour aider les étudiants marocains à mieux comprendre.

IMPORTANT: Tu dois TOUJOURS répondre en JSON valide avec exactement cette structure:
{
  "questions": [
    {
      "id": 1,
      "question": "La question en français",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Explication en français simple",
      "explanationDarija": "Explication en Darija marocaine (شرح بالدارجة)"
    }
  ]
}

Règles:
- Génère exactement 5 questions à choix multiples
- Chaque question a 4 options
- correctIndex est l'index de la bonne réponse (0-3)
- L'explication doit être claire et pédagogique
- L'explication en Darija doit utiliser le dialecte marocain avec des expressions locales
- Les questions doivent tester la compréhension, pas la mémorisation`;

      userPrompt = `Basé sur ce contenu académique, génère 5 questions de quiz avec des explications en français et en Darija:

${content.substring(0, 8000)}`;
    } else if (mode === "resume") {
      systemPrompt = `Tu es un tuteur expert marocain spécialisé dans la synthèse de contenu académique. Tu crées des résumés structurés avec des termes clés expliqués en Darija marocaine.

IMPORTANT: Tu dois TOUJOURS répondre en JSON valide avec exactement cette structure:
{
  "sections": [
    {
      "title": "Titre de la section",
      "content": "Contenu résumé en français clair",
      "keyTerms": [
        {
          "term": "Terme technique",
          "definition": "Définition en français",
          "definitionDarija": "Définition en Darija marocaine (الشرح بالدارجة)"
        }
      ],
      "essentialPoints": ["Point essentiel 1", "Point essentiel 2"]
    }
  ]
}

Règles:
- Crée 3-4 sections logiques
- Chaque section contient 2-4 termes clés
- Chaque section contient 3-5 points essentiels
- Les définitions en Darija doivent être naturelles et utiliser le dialecte marocain
- Simplifie les concepts complexes sans perdre la précision académique`;

      userPrompt = `Crée un résumé structuré de ce contenu académique avec des termes clés et leurs explications en Darija:

${content.substring(0, 8000)}`;
    }

    console.log("Calling Lovable AI Gateway...");

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
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits AI épuisés. Veuillez recharger votre compte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");
    
    const aiContent = data.choices?.[0]?.message?.content;
    
    if (!aiContent) {
      throw new Error("No content in AI response");
    }

    // Try to parse the JSON from the AI response
    let parsedContent;
    try {
      // Extract JSON from the response (in case there's markdown formatting)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw AI content:", aiContent);
      throw new Error("Failed to parse AI response as JSON");
    }

    console.log("Successfully processed content");

    return new Response(JSON.stringify({ 
      success: true, 
      data: parsedContent,
      mode 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in process-pdf function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Une erreur est survenue" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
