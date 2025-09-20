import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bot, Sparkles, X, Leaf, Heart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage?: string;
  productDescription?: string;
  category?: string;
}

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({
  isOpen,
  onClose,
  productName,
  productImage,
  productDescription,
  category
}) => {
  const [aiInfo, setAiInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedInfo, setHasLoadedInfo] = useState(false);
  const { toast } = useToast();

  const fetchAIInfo = async () => {
    if (hasLoadedInfo || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          prompt: `Provide detailed information about ${productName} as a ${category?.toLowerCase() || 'agricultural product'}. Include: 
          1) Nutritional benefits and health properties
          2) Growing conditions and farming requirements  
          3) Culinary uses and preparation tips
          4) Storage and freshness tips
          5) Interesting facts or varieties
          Be informative, engaging, and focus on practical information for consumers. Format with clear sections.`
        }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      setAiInfo(data?.reply || "Information not available at the moment.");
      setHasLoadedInfo(true);

    } catch (error) {
      console.error('Error fetching AI info:', error);
      toast({
        title: "Failed to load information",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
      setAiInfo("Sorry, I couldn't load the information right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !hasLoadedInfo) {
      // Add a small delay for better UX
      const timer = setTimeout(() => {
        fetchAIInfo();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Reset state when modal closes
    setTimeout(() => {
      setAiInfo('');
      setHasLoadedInfo(false);
    }, 300);
  };

  const formatAIResponse = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      // Check if line is a numbered section
      const isNumberedSection = /^\d+\)/.test(trimmedLine);
      
      if (isNumberedSection) {
        const sectionTitle = trimmedLine.replace(/^\d+\)\s*/, '');
        return (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-primary mb-2 flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              {sectionTitle}
            </h4>
          </div>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="text-gray-700 mb-3 leading-relaxed pl-6">
            {trimmedLine}
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900 pr-8">
                  AI Information: {productName}
                </DialogTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {category || 'Product'}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Powered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image and Basic Info */}
          {productImage && (
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <img 
                src={productImage} 
                alt={productName}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{productName}</h3>
                {productDescription && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {productDescription}
                  </p>
                )}
                <div className="flex items-center mt-2 space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Premium Quality</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                Detailed Information
              </h3>
              {hasLoadedInfo && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8 space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-gray-600">Loading detailed information...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {aiInfo ? formatAIResponse(aiInfo) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Click to load AI-powered information</p>
                    <Button 
                      onClick={fetchAIInfo}
                      className="mt-3"
                      variant="outline"
                    >
                      Load Information
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Facts */}
          {hasLoadedInfo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">Health Benefits</p>
                <p className="text-xs text-blue-700 mt-1">Rich in nutrients</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">100% Organic</p>
                <p className="text-xs text-green-700 mt-1">Sustainably grown</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-900">Premium Quality</p>
                <p className="text-xs text-orange-700 mt-1">Farm fresh</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductInfoModal;