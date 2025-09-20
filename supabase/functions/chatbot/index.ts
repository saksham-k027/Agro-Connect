import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// OpenRouter API key - in production, this should be set as an environment variable
const OPENROUTER_API_KEY = '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';

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
    console.log('=== CHATBOT FUNCTION START ===');
    
    let API_KEY = OPENROUTER_API_KEY;
    
    console.log('API_KEY found:', !!API_KEY);
    
    if (!API_KEY) {
      console.error('No API key found in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured. Please check your OpenRouter API key.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { prompt } = await req.json();
    if (!prompt) {
      console.error('No prompt provided');
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Processing chatbot request with prompt: "${prompt}"`);

    // Determine which API to use based on available keys
    let response;
    let apiUrl;
    let model;
    let headers: any;

    // Use OpenRouter API
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    model = 'microsoft/wizardlm-2-8x22b';
    headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://agroconnect.lovable.app',
      'X-Title': 'AgroConnect AI Assistant',
    };

    console.log('Using API URL:', apiUrl);
    console.log('Using model:', model);

    response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are AgroBot, a friendly agricultural assistant for AgroConnect marketplace. Help users with farming questions, product information, and cooking tips. Keep responses concise and helpful.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      }),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return new Response(
        JSON.stringify({ 
          error: `API error: ${response.status} ${response.statusText}`,
          details: errorData
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const chatResult = await response.json();
    const reply = chatResult.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    console.log('Chatbot response successful');
    console.log('Response length:', reply.length);

    return new Response(
      JSON.stringify({ 
        reply: reply
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chatbot function:', error.message);
    console.error('Error stack:', error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process chat request',
        stack: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});