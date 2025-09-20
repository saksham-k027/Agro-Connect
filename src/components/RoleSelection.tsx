import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tractor, ShoppingCart, BarChart3, CheckCircle } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'farmer' | 'consumer') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'consumer' | null>(null);

  const handleRoleSelection = (role: 'farmer' | 'consumer') => {
    setSelectedRole(role);
    setTimeout(() => {
      onRoleSelect(role);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Welcome to AgroConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Consumer Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedRole === 'consumer' ? 'ring-2 ring-primary shadow-xl scale-105' : ''
            }`}
            onClick={() => handleRoleSelection('consumer')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">I'm a Consumer</CardTitle>
              <p className="text-muted-foreground">
                I want to buy fresh, organic produce directly from farmers
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Browse fresh organic products</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Direct connection with farmers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Quality guaranteed products</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Convenient home delivery</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleSelection('consumer');
                }}
              >
                Continue as Consumer
              </Button>
            </CardContent>
          </Card>

          {/* Farmer Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedRole === 'farmer' ? 'ring-2 ring-primary shadow-xl scale-105' : ''
            }`}
            onClick={() => handleRoleSelection('farmer')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Tractor className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">I'm a Farmer</CardTitle>
              <p className="text-muted-foreground">
                I want to sell my crops directly to consumers and manage my farm business
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Manage crop listings & inventory</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">AI-powered quality grading</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Sales analytics & insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Dynamic pricing tools</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleSelection('farmer');
                }}
              >
                Continue as Farmer
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>You can change your role anytime in your profile settings</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;