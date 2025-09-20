
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Eye, Camera, CheckCircle, Sparkles, Cpu, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageAnalysisResult {
  analysis: string;
  error?: string;
}

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset analysis when new image is selected
    setAnalysisResult(null);
  };

  // Progress simulation with smoother animation
  useEffect(() => {
    if (isAnalyzing) {
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 8 + 2;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const analyzeImage = useCallback(async () => {
    // Prevent double-click and multiple simultaneous requests
    if (!selectedImage || isAnalyzing) {
      if (!selectedImage) {
        toast({
          title: "No image selected",
          description: "Please select an image to analyze.",
          variant: "destructive"
        });
      }
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    try {
      console.log("Sending image for AI Vision analysis...");
      
      const { data, error } = await supabase.functions.invoke<ImageAnalysisResult>('analyze-image', {
        body: {
          image: selectedImage,
          prompt: "Analyze this agricultural image briefly: 1) Crop type, 2) Health status, 3) Growth stage, 4) Visible issues, 5) Recommendations. Be concise."
        }
      });

      console.log("Supabase function response:", { data, error });

      // Handle both success and fallback cases
      if (error) {
        console.error("Supabase function error:", error);
        setAnalysisProgress(100);
        setTimeout(() => {
          setAnalysisResult(`Demo Analysis Results:

1) Crop Type: Image analysis requires API configuration
2) Health Status: Unable to assess without AI vision setup
3) Growth Stage: Analysis not available in demo mode
4) Visible Issues: Demo mode - configure OpenRouter API key
5) Recommendations: Set up API key in Supabase for full functionality

This is a demonstration. For real AI analysis, configure your OpenRouter API key in Supabase Edge Functions.`);
          
          toast({
            title: "Demo analysis complete",
            description: "Configure OpenRouter API key for real AI analysis.",
          });
        }, 800);
        return;
      }
      
      // Complete progress
      setAnalysisProgress(100);
      
      // Handle successful response
      setTimeout(() => {
        if (data?.analysis && typeof data.analysis === 'string' && data.analysis.trim().length > 0) {
          setAnalysisResult(data.analysis.trim());
          toast({
            title: "Analysis complete",
            description: "Image has been successfully analyzed with AI vision.",
          });
        } else {
          // Fallback if no analysis in response
          setAnalysisResult(`Demo Analysis Results:

1) Crop Type: Unable to determine - API configuration needed
2) Health Status: Requires OpenRouter API key setup
3) Growth Stage: Analysis pending API configuration
4) Visible Issues: Demo mode active
5) Recommendations: Configure OpenRouter API key in Supabase for detailed analysis

This is a demonstration response. For real AI-powered image analysis, please set up your OpenRouter API key.`);
          
          toast({
            title: "Demo analysis shown",
            description: "Set up OpenRouter API key for real AI analysis.",
          });
        }
      }, 800);
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisProgress(0);
      
      // Provide user-friendly error message
      setTimeout(() => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setAnalysisResult(`Demo Analysis Results:

1) Crop Type: Unable to determine due to connection error
2) Health Status: Analysis failed - please try again
3) Growth Stage: Unable to assess at this time
4) Visible Issues: Connection error occurred (${errorMessage})
5) Recommendations: Check your internet connection and try again

This is a demo response due to a connection error. For real AI analysis, ensure your OpenRouter API key is properly configured.`);
        
        toast({
          title: "Analysis failed",
          description: `There was an error analyzing the image: ${errorMessage}`,
          variant: "destructive"
        });
      }, 500);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 800);
    }
  }, [selectedImage, isAnalyzing, toast]);

  // Debounced click handler to prevent rapid clicking
  const handleAnalyzeClick = useCallback(() => {
    if (isAnalyzing) return;
    analyzeImage();
  }, [analyzeImage, isAnalyzing]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Upload Section - Blended with page */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
          <ImageIcon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Upload Your Image</h3>
        <p className="text-muted-foreground">
          Drag and drop or click to select an image for AI analysis
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer group bg-background/50 backdrop-blur-sm ${
          isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg' 
            : 'border-muted-foreground/25 hover:border-primary hover:bg-background/80 hover:shadow-md'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
            isDragOver ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
          }`}>
            <Upload className="h-10 w-10" />
          </div>
          
          <div>
            <p className="text-lg font-medium mb-1">
              {isDragOver ? 'Drop your image here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, GIF, WebP • Maximum 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview and Analysis */}
      {selectedImage && (
        <div className="space-y-8 animate-fade-in">
          {/* Image Preview - Seamlessly integrated */}
          <div className="aspect-video bg-background/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg">
            <img 
              src={selectedImage} 
              alt="Selected preview" 
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Analysis Progress - Blended */}
          {isAnalyzing && (
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/20 animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="relative">
                    <Cpu className="h-8 w-8 text-primary animate-pulse" />
                    <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-ping" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">AI Analysis in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Processing your image with advanced AI vision...
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {analysisProgress < 100 ? 'Analyzing...' : 'Complete!'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(analysisProgress)}%
                    </span>
                  </div>
                  <Progress 
                    value={analysisProgress} 
                    className="h-2 transition-all duration-500"
                  />
                  {analysisProgress === 100 && (
                    <div className="flex items-center justify-center text-primary animate-bounce">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Analysis Complete!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button - Blended style */}
          <Button 
            onClick={handleAnalyzeClick} 
            className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl ${
              isAnalyzing ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02]'
            }`}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Analyzing with AI Vision...
              </>
            ) : (
              <>
                <Eye className="mr-3 h-6 w-6" />
                Analyze Image with AI
              </>
            )}
          </Button>
        </div>
      )}

      {/* Analysis Results - Seamlessly integrated */}
      {analysisResult && (
        <div className="p-8 rounded-xl bg-background/30 backdrop-blur-sm border border-border/20 shadow-lg animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Analysis Results</h3>
            <p className="text-muted-foreground">
              AI-powered insights about your image
            </p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 p-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              {analysisResult.replace(/\*/g, '').trim().split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;
                
                // Check if line starts with a number followed by )
                const isNumberedPoint = /^\d+\)/.test(trimmedLine);
                
                if (isNumberedPoint) {
                  return (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-background/50 border border-border/50 transition-all duration-300 hover:bg-background/70 hover:border-primary/20">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {trimmedLine.match(/^\d+/)?.[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {trimmedLine.replace(/^\d+\)\s*/, '')}
                        </p>
                      </div>
                    </div>
                  );
                } else if (trimmedLine.length > 0) {
                  return (
                    <div key={index} className="ml-8 text-muted-foreground">
                      {trimmedLine}
                    </div>
                  );
                }
                return null;
              }).filter(Boolean)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
