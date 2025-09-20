import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { X, UserCircle, Tractor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeMessage = () => {
  const { user, userRole } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user && userRole) {
      // Check how many times welcome message has been shown for this login session
      const welcomeKey = `welcome_count_${user.id}`;
      const welcomeCount = parseInt(sessionStorage.getItem(welcomeKey) || '0');
      
      console.log('Welcome check:', { user: user.id, count: welcomeCount }); // Debug
      
      if (welcomeCount < 2) {
        console.log('Showing welcome message, count:', welcomeCount + 1); // Debug
        // Small delay to ensure proper rendering
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
        // Increment the count
        sessionStorage.setItem(welcomeKey, (welcomeCount + 1).toString());
      }
    }
  }, [user, userRole]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !user || !userRole) {
    return null;
  }

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const isConsumer = userRole === 'consumer';

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div className={`bg-white border-l-4 ${isConsumer ? 'border-blue-500' : 'border-green-500'} rounded-lg shadow-lg p-4 max-w-sm`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isConsumer ? 'bg-blue-100' : 'bg-green-100'}`}>
              {isConsumer ? (
                <UserCircle className={`h-6 w-6 ${isConsumer ? 'text-blue-600' : 'text-green-600'}`} />
              ) : (
                <Tractor className={`h-6 w-6 ${isConsumer ? 'text-blue-600' : 'text-green-600'}`} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Welcome, {userName}! 👋
              </h3>
              <p className="text-sm text-gray-600">
                {isConsumer 
                  ? "Explore fresh organic products from local farms"
                  : "Manage your farm and connect with customers"
                }
              </p>
              <p className="text-xs text-gray-500 mt-1 capitalize">
                Signed in as {userRole}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Auto-dismiss after 5 seconds */}
        <div className={`mt-3 h-1 ${isConsumer ? 'bg-blue-100' : 'bg-green-100'} rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${isConsumer ? 'bg-blue-500' : 'bg-green-500'} rounded-full animate-shrink-width`}
            style={{ animationDuration: '5s' }}
            onAnimationEnd={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;