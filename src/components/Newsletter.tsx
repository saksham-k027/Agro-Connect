
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Gift, 
  Truck, 
  Clock, 
  Percent, 
  Bell,
  CheckCircle,
  Sparkles,
  Leaf,
  Users
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const benefits = [
    { icon: Percent, text: "15% off your first order", color: "text-green-600" },
    { icon: Bell, text: "Early access to new products", color: "text-blue-600" },
    { icon: Gift, text: "Exclusive member-only deals", color: "text-purple-600" },
    { icon: Truck, text: "Free delivery updates", color: "text-orange-600" },
    { icon: Leaf, text: "Seasonal harvest guides", color: "text-farm-green" },
    { icon: Users, text: "Community recipes & tips", color: "text-pink-600" }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Successfully subscribed! 🎉",
        description: "Check your email for your 15% discount code.",
      });
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-24 bg-gradient-to-br from-farm-green via-farm-green-dark to-farm-green relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-farm-accent-yellow rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-12 text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 animate-bounce">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-farm-green-dark">
                Welcome to the AgroConnect Family! 🌱
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Thank you for subscribing! Your 15% discount code has been sent to your email. 
                Get ready for fresh updates, exclusive deals, and the best farm-to-table experience.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  <Gift className="h-4 w-4 mr-2" />
                  15% OFF Code Sent
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                  <Mail className="h-4 w-4 mr-2" />
                  Newsletter Active
                </Badge>
              </div>

              <Button 
                className="bg-gradient-to-r from-farm-green to-farm-green-dark hover:from-farm-green-dark hover:to-farm-green text-white rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/shop'}
              >
                Start Shopping with Your Discount
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-farm-green via-farm-green-dark to-farm-green relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-farm-accent-yellow rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-farm-accent-orange rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4 animate-pulse">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Stay Fresh with Our
                <span className="block bg-gradient-to-r from-farm-accent-yellow to-white bg-clip-text text-transparent">
                  Newsletter
                </span>
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Join our community of food lovers and get the freshest updates on seasonal produce, 
                exclusive deals, and farm-to-table inspiration delivered straight to your inbox.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/70">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-sm text-white/70">Updates</div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-farm-green/10 mb-4">
                    <Gift className="h-8 w-8 text-farm-green" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-farm-green-dark">
                    Get 15% Off Your First Order
                  </h3>
                  
                  <p className="text-gray-600">
                    Subscribe to our newsletter and receive an exclusive discount code plus weekly fresh updates.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 px-4 border-2 border-gray-200 focus:border-farm-green rounded-xl text-lg"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-farm-green to-farm-green-dark hover:from-farm-green-dark hover:to-farm-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Get My 15% Discount
                      </div>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By subscribing, you agree to receive marketing emails from AgroConnect. 
                    You can unsubscribe at any time. View our{' '}
                    <a href="/privacy" className="text-farm-green hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                {/* Social proof */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-farm-green to-farm-green-dark border-2 border-white"></div>
                      ))}
                    </div>
                    <span>Join 50,000+ happy subscribers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
