
import React from 'react';
import Layout from '../components/Layout';
import ImageUpload from '../components/ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Zap, Shield, Brain, Sparkles } from 'lucide-react';

const ImageAnalysis = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-4">
              AI Vision Tools
            </h1>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to analyze and understand your images with incredible detail and accuracy. 
            Experience the future of image recognition today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Smart Detection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Advanced AI identifies objects, people, animals, text, and scenes with remarkable precision and accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Get detailed analysis results in seconds, powered by cutting-edge AI technology and optimized processing
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Your images are processed securely and never stored permanently on our servers. Privacy guaranteed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Section */}
        <div className="animate-fade-in">
          <ImageUpload />
        </div>
      </div>
    </Layout>
  );
};

export default ImageAnalysis;
