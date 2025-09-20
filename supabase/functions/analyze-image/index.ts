const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenRouter API key - in production, this should be set as an environment variable
const OPENROUTER_API_KEY = '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';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== IMAGE ANALYSIS FUNCTION START ===');
    
    console.log('OPENROUTER_API_KEY exists:', !!OPENROUTER_API_KEY);
    
    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({ 
          analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine without AI vision (demo mode)
2) Health Status: Requires OpenRouter API key for assessment
3) Growth Stage: Analysis pending API configuration
4) Visible Issues: Demo mode - no real analysis performed
5) Recommendations: Configure OpenRouter API key in Supabase Edge Functions secrets

This is a demonstration response. To get real AI-powered image analysis, please set up your OpenRouter API key in the Supabase dashboard under Edge Functions secrets.`
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { image, prompt } = await req.json();
    if (!image) {
      console.error('No image data provided');
      throw new Error('Image data is required');
    }

    const analysisPrompt = prompt || "Analyze this agricultural image briefly: 1) Crop type, 2) Health status, 3) Growth stage, 4) Visible issues, 5) Recommendations. Be concise.";
    console.log(`Analyzing image with OpenRouter Vision using prompt: "${analysisPrompt}"`);

    // Call OpenRouter API with vision model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://agroconnect.lovable.app',
        'X-Title': 'AgroConnect Image Analysis',
      },
      body: JSON.stringify({
        model: 'google/gemini-pro-vision',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: analysisPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      }),
    });

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { error: 'Failed to parse error response', status: response.status };
      }
      
      console.error('OpenRouter API error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Return a fallback response instead of throwing an error
      return new Response(
        JSON.stringify({ 
          analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine - API error (${response.status})
2) Health Status: Requires AI vision analysis
3) Growth Stage: Analysis pending due to API issue
4) Visible Issues: API connection problem
5) Recommendations: Check OpenRouter API key and model availability

Note: This is a demo response due to API error. Please verify your OpenRouter API key configuration in Supabase Edge Functions secrets.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let analysisResult;
    try {
      analysisResult = await response.json();
      console.log('OpenRouter API response:', JSON.stringify(analysisResult, null, 2));
    } catch (parseError) {
      console.error('Failed to parse API response:', parseError);
      return new Response(
        JSON.stringify({ 
          analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine - response parsing failed
2) Health Status: Analysis data corrupted
3) Growth Stage: Unable to assess - invalid response format
4) Visible Issues: Response parsing error
5) Recommendations: Check API endpoint and response format

This is a demo response due to response parsing error. Please verify your OpenRouter API configuration.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle different response formats
    let analysis = null;
    
    if (analysisResult.choices && analysisResult.choices.length > 0) {
      analysis = analysisResult.choices[0]?.message?.content;
    } else if (analysisResult.content) {
      analysis = analysisResult.content;
    } else if (analysisResult.text) {
      analysis = analysisResult.text;
    } else if (analysisResult.response) {
      analysis = analysisResult.response;
    }
    
    if (!analysis || typeof analysis !== 'string' || analysis.trim().length === 0) {
      console.error('No valid analysis content in response:', analysisResult);
      return new Response(
        JSON.stringify({ 
          analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine - API response format issue
2) Health Status: Analysis data not available in expected format
3) Growth Stage: Unable to assess - response parsing failed
4) Visible Issues: API response structure unexpected
5) Recommendations: Check OpenRouter API configuration and model availability

This is a demo response due to API response parsing issue. Please verify your OpenRouter API key and model access.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Clean and validate the analysis text
    const cleanedAnalysis = analysis.trim();
    
    if (cleanedAnalysis.length < 10) {
      console.error('Analysis too short:', cleanedAnalysis);
      return new Response(
        JSON.stringify({ 
          analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine - analysis too brief
2) Health Status: Insufficient analysis data
3) Growth Stage: Unable to assess - minimal response
4) Visible Issues: Analysis incomplete
5) Recommendations: Try with a different image or check API configuration

This is a demo response due to insufficient analysis data. Please verify your OpenRouter API configuration.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('OpenRouter Vision analysis successful');
    console.log('Analysis length:', cleanedAnalysis.length);

    return new Response(
      JSON.stringify({ 
        analysis: cleanedAnalysis
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    console.error('Error stack:', error.stack);
    
    // Return a user-friendly fallback response
    return new Response(
      JSON.stringify({ 
        analysis: `Demo Analysis Results:

1) Crop Type: Unable to determine due to processing error
2) Health Status: Analysis failed - please try again
3) Growth Stage: Unable to assess at this time
4) Visible Issues: Processing error occurred
5) Recommendations: Check your internet connection and try again

This is a demonstration response due to a processing error. For real AI-powered image analysis, please ensure your OpenRouter API key is properly configured in Supabase Edge Functions.`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});