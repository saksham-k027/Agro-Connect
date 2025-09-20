import React from 'react';
import { Sprout } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-lg animate-pulse">
            <Sprout className="h-8 w-8 animate-bounce" />
          </div>
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">AgroConnect</h2>
          <p className="text-sm text-muted-foreground">Loading fresh content...</p>
        </div>
        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;