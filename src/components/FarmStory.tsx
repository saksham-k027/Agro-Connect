
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const FarmStory = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80"
              alt="Our Farm Story"
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 hidden md:block">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-4xl font-bold text-farm-green-dark">15+</p>
                <p className="text-gray-600">Years of Farming</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-farm-green-dark">Our Farm Story</h2>
            <p className="text-lg text-gray-700">
              AgroConnect began as an initiative in 2025 to solve the challenges farmers face in traditional marketplaces — low profits, exploitation by intermediaries, and limited access to buyers. What started as a student-driven idea has grown into a digital platform that directly connects farmers and consumers through technology.
            </p>
            <p className="text-lg text-gray-700">
              We collaborate with farmers, buyers, and stakeholders who share our vision of transparency, sustainability, and fair trade. Every feature of our platform is carefully designed to ensure trust, quality, and ease of use for both farmers and consumers.
            </p>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-farm-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>100% Organic</span>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-farm-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>Sustainable Farming</span>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-farm-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>GMO Free</span>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-farm-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>Family Owned</span>
              </div>
            </div>
            <Link to="/about">
              <Button className="bg-farm-green hover:bg-farm-green-dark text-white rounded-full px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-farm-green/30 hover:scale-105">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmStory;
