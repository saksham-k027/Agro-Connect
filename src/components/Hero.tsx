
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-farm-green-light/20 to-white pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-green-dark leading-tight">
              Farm Fresh <br/>
              <span className="text-farm-accent-yellow">Organic Produce</span><br/>
              Delivered to You
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Farm to table, sustainably grown fresh produce from local farms. 
              Support local farmers and enjoy the freshest seasonal offerings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button className="bg-farm-green hover:bg-farm-green-dark text-white rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-farm-green/30 hover:scale-105">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green/10 rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <img 
              src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&q=80" 
              alt="Fresh farm produce" 
              className="w-full object-cover h-[500px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="text-white">
                <p className="font-medium text-farm-accent-yellow">Limited Time</p>
                <h3 className="text-2xl font-bold">20% Off First Order</h3>
                <p>Use code: FARM20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
