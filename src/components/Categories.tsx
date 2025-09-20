import React from 'react';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categoryList } from '@/data/categories';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Star, Sparkles, TrendingUp, Award } from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${categoryName.toLowerCase()}`);
  };

  return (
    <section id="categories" className="py-32 bg-gradient-to-br from-farm-green/5 via-farm-accent-yellow/5 to-farm-green/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-farm-green to-farm-accent-yellow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-farm-accent-red to-farm-green rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-farm-accent-yellow to-farm-accent-red rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-24 space-y-8">
          <div className="relative inline-block">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-farm-green/30 to-farm-accent-yellow/20 mb-8 animate-float shadow-2xl">
              <Leaf className="h-12 w-12 text-farm-green animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-farm-accent-yellow animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-farm-accent-red animate-bounce"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-farm-green via-farm-green-dark to-farm-accent-yellow bg-clip-text text-transparent animate-gradient leading-tight">
            Shop by Category
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Explore our carefully curated selection of fresh, organic produce organized by category. 
            Each category features the <span className="text-farm-green font-bold">finest seasonal offerings</span> from our trusted local farmers.
          </p>
          
          {/* Stats Section */}
          <div className="flex justify-center items-center space-x-12 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-farm-green to-farm-green-dark mb-3 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-farm-green-dark">8</p>
              <p className="text-sm text-gray-600 font-medium">Categories</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-farm-accent-yellow to-farm-accent-red mb-3 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-farm-green-dark">200+</p>
              <p className="text-sm text-gray-600 font-medium">Products</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-farm-accent-red to-farm-green mb-3 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-farm-green-dark">100%</p>
              <p className="text-sm text-gray-600 font-medium">Organic</p>
            </div>
          </div>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-20">
          {categoryList.map((category, index) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl hover:shadow-3xl transition-all duration-700 hover:scale-110 cursor-pointer animate-fade-in rounded-full relative"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleCategoryClick(category.name)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Glowing border effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-farm-green via-farm-accent-yellow to-farm-accent-red opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm`}></div>
              
              <div className="relative h-96 overflow-hidden rounded-full">
                {/* Image with overlay gradient */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-farm-green/80 transition-all duration-700"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-farm-accent-yellow fill-current animate-pulse" />
                    <span className="text-lg font-bold text-farm-green-dark">{category.count}</span>
                  </div>
                </div>

                {/* Floating sparkles */}
                <div className={`absolute top-12 left-12 transition-all duration-700 ${hoveredCategory === category.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <Sparkles className="h-6 w-6 text-farm-accent-yellow animate-spin" />
                </div>
                <div className={`absolute bottom-12 right-12 transition-all duration-700 ${hoveredCategory === category.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ animationDelay: '0.3s' }}>
                  <Sparkles className="h-4 w-4 text-farm-accent-red animate-bounce" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <CardContent className="text-white p-0 space-y-6">
                    {/* Category name with enhanced styling */}
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-white group-hover:text-farm-accent-yellow transition-all duration-500 transform group-hover:scale-105">
                        {category.name}
                      </h3>
                      <div className="w-16 h-1.5 bg-farm-green rounded-full transition-all duration-700 group-hover:w-32 group-hover:bg-gradient-to-r group-hover:from-farm-accent-yellow group-hover:to-farm-accent-red"></div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/90 text-base leading-relaxed line-clamp-2 transition-all duration-500 group-hover:text-white font-medium">
                      {category.description}
                    </p>
                    
                    {/* Enhanced button */}
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white/25 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-farm-green-dark rounded-full py-8 font-bold text-lg transition-all duration-700 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-gradient-to-r group-hover:from-farm-accent-yellow group-hover:to-farm-accent-red"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Explore {category.name}</span>
                        <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-125" />
                      </span>
                    </Button>
                  </CardContent>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-farm-green/30 via-farm-accent-yellow/20 to-farm-accent-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center space-y-8 p-16 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg rounded-full border-2 border-farm-green/20 shadow-3xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-farm-green/5 via-farm-accent-yellow/5 to-farm-accent-red/5 rounded-full"></div>
            
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-farm-green via-farm-green-dark to-farm-accent-yellow flex items-center justify-center shadow-2xl animate-float">
              <Leaf className="h-10 w-10 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-farm-green to-farm-accent-yellow opacity-50 animate-ping"></div>
            </div>
            
            <div className="text-center space-y-4 relative z-10">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-farm-green-dark via-farm-green to-farm-accent-yellow bg-clip-text text-transparent animate-gradient">
                Discover All Categories
              </h3>
              <p className="text-xl text-gray-700 max-w-lg font-medium leading-relaxed">
                Browse our complete selection of <span className="text-farm-green font-bold">farm-fresh produce</span> and artisanal goods
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/shop')}
              className="relative bg-gradient-to-r from-farm-green via-farm-green-dark to-farm-accent-yellow hover:from-farm-accent-yellow hover:via-farm-green hover:to-farm-accent-red text-white rounded-full px-16 py-8 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-125 group overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-farm-accent-yellow via-farm-accent-red to-farm-green opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <span className="relative flex items-center space-x-4">
                <span>View All Categories</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-3 group-hover:scale-125" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;