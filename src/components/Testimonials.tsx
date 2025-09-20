
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, Star, Users, Award, Sprout, Heart, MessageCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Chef",
    location: "San Francisco, CA",
    rating: 5,
    text: "AgroConnect has completely transformed my cooking! The organic vegetables are incredibly fresh, and I can taste the difference in every dish. My family loves the variety and quality.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Verified Buyer",
    orderCount: 47,
    verified: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Restaurant Owner",
    location: "Austin, TX",
    rating: 5,
    text: "As a chef, I'm extremely picky about ingredients. AgroConnect consistently delivers restaurant-quality produce. Their farm-to-table approach aligns perfectly with our sustainability values.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Business Customer",
    orderCount: 124,
    verified: true
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Nutritionist",
    location: "Seattle, WA",
    rating: 5,
    text: "I recommend AgroConnect to all my clients. The nutrient density and freshness of their produce is unmatched. Plus, knowing exactly where my food comes from gives me peace of mind.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Health Professional",
    orderCount: 89,
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Organic Farmer",
    location: "Portland, OR",
    rating: 5,
    text: "Even as a farmer myself, I'm impressed with AgroConnect's quality standards. They truly support sustainable agriculture and make healthy eating accessible to everyone.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Industry Expert",
    orderCount: 76,
    verified: true
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Wellness Coach",
    location: "Denver, CO",
    rating: 5,
    text: "The convenience and quality combination is unbeatable. Fresh, organic produce delivered to my door saves me time while ensuring my family eats the best. Customer service is exceptional too!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Loyal Customer",
    orderCount: 156,
    verified: true
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Food Blogger",
    location: "Nashville, TN",
    rating: 5,
    text: "I've featured AgroConnect in multiple articles. Their commitment to quality, transparency, and supporting local farmers makes them stand out in the crowded market.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
    badge: "Influencer",
    orderCount: 203,
    verified: true
  }
];

const stats = [
  { icon: Users, label: "Happy Customers", value: "50K+", color: "text-blue-600" },
  { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-yellow-500" },
  { icon: Award, label: "Awards Won", value: "12", color: "text-purple-600" },
  { icon: Sprout, label: "Partner Farms", value: "200+", color: "text-primary" }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Modern background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--primary)/0.05)_0%,transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <MessageCircle className="w-4 h-4" />
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real stories from real customers who've experienced the AgroConnect difference
          </p>
        </div>

        {/* Stats Grid - More modern layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:bg-card transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials - Modern card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-700 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <CardContent className="p-8 space-y-6">
                {/* Header with rating and badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {testimonial.badge}
                  </Badge>
                </div>

                {/* Quote with modern styling */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-8 w-8 text-primary/20" />
                  <blockquote className="text-foreground/80 leading-relaxed pl-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>

                {/* Customer info with modern layout */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {testimonial.orderCount} orders
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-border/50 p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-50"></div>
            <div className="relative space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Join Our Community</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Ready to Experience{" "}
                  <span className="text-primary">AgroConnect Quality?</span>
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                  Join thousands of satisfied customers who've made the switch to fresh, 
                  organic produce delivered straight from local farms.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">4.9/5</span>
                <span>•</span>
                <span>50,000+ happy customers</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  size="lg"
                  className="flex-1 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/shop'}
                >
                  Start Shopping
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-full font-semibold border-2 transition-all duration-300"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
