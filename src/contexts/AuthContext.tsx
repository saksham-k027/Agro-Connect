
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { validateDummyCredentials } from "@/data/dummyUsers";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: 'farmer' | 'consumer' | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: 'farmer' | 'consumer') => Promise<void>;
  getUserOrders: () => Promise<any[]>;
  createOrder: (orderData: any) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRoleState] = useState<'farmer' | 'consumer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing dummy session first
    const savedUser = localStorage.getItem('dummyUser');
    const savedRole = localStorage.getItem('userRole');
    
    if (savedUser && savedRole) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setUserRoleState(savedRole as 'farmer' | 'consumer');
        setSession({
          user: parsedUser,
          access_token: 'dummy_token',
          refresh_token: 'dummy_refresh',
          expires_in: 3600,
          expires_at: Date.now() + 3600000,
          token_type: 'bearer'
        } as Session);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('dummyUser');
        localStorage.removeItem('userRole');
      }
    }
    
    // Check for existing real user role
    if (savedRole && !savedUser) {
      setUserRoleState(savedRole as 'farmer' | 'consumer');
    }

    // Set up auth state listener for real Supabase auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        // Only handle real Supabase sessions, not dummy ones
        if (!localStorage.getItem('dummyUser')) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Restore user role for real users
          if (session?.user && event === 'SIGNED_IN') {
            const existingRole = localStorage.getItem('userRole');
            if (existingRole && !localStorage.getItem('dummyUser')) {
              setUserRoleState(existingRole as 'farmer' | 'consumer');
            }
            
            toast({
              title: "Signed in successfully",
              description: "Welcome back to AgroConnect!",
            });
          }
          
          if (event === 'SIGNED_OUT') {
            if (session === null && user !== null) {
              toast({
                title: "Signed out successfully",
                description: "You have been signed out.",
              });
            }
            
            localStorage.removeItem("cart");
            localStorage.removeItem("favorites");
          }
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing Supabase session
    if (!savedUser) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });
    }

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      if (error) throw error;
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // First check if it's a dummy user
      const dummyUser = validateDummyCredentials(email, password);
      
      if (dummyUser) {
        // Handle dummy authentication
        const mockUser = {
          id: `dummy_${dummyUser.role}_${Date.now()}`,
          email: dummyUser.email,
          user_metadata: { name: dummyUser.name },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          role: 'authenticated',
          confirmation_sent_at: null,
          confirmed_at: new Date().toISOString(),
          email_change_sent_at: null,
          new_email: null,
          invited_at: null,
          action_link: null,
          email_change: null,
          email_change_confirm_status: 0,
          banned_until: null,
          new_phone: null,
          phone: null,
          phone_confirmed_at: null,
          phone_change: null,
          phone_change_token: null,
          phone_change_sent_at: null,
          recovery_sent_at: null,
          new_email_change_sent_at: null,
          email_change_token_new: null,
          email_change_token_current: null,
          is_anonymous: false
        } as User;
        
        const mockSession = {
          user: mockUser,
          access_token: 'dummy_token',
          refresh_token: 'dummy_refresh',
          expires_in: 3600,
          expires_at: Date.now() + 3600000,
          token_type: 'bearer'
        } as Session;
        
        // Set the session and user
        setSession(mockSession);
        setUser(mockUser);
        setUserRoleState(dummyUser.role);
        
        // Store user and role in localStorage for persistence
        localStorage.setItem('userRole', dummyUser.role);
        localStorage.setItem('dummyUser', JSON.stringify(mockUser));
        
        console.log('Dummy user login successful:', dummyUser); // Debug log
        toast({
          title: "Signed in successfully",
          description: `Welcome back, ${dummyUser.name}! (${dummyUser.role})`,
        });
        
        // Redirect based on role (removed delay for smoother experience)
        setTimeout(() => {
          if (dummyUser.role === 'farmer') {
            window.location.href = '/farmer-dashboard';
          } else {
            window.location.href = '/';
          }
        }, 500);
        
        return;
      }
      
      // If not a dummy user, try regular Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Check if it's a dummy user
      const isDummyUser = localStorage.getItem('dummyUser');
      
      if (isDummyUser) {
        // Handle dummy user sign out
        const currentUser = JSON.parse(isDummyUser);
        
        localStorage.removeItem('dummyUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem("cart");
        localStorage.removeItem("favorites");
        
        // Clear welcome message count for next login
        sessionStorage.removeItem(`welcome_count_${currentUser.id}`);
        
        setSession(null);
        setUser(null);
        setUserRoleState(null);
        
        toast({
          title: "Signed out successfully",
          description: "You have been signed out.",
        });
      } else {
        // Handle real Supabase sign out
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        setSession(null);
        setUser(null);
        setUserRoleState(null);
        
        localStorage.removeItem("cart");
        localStorage.removeItem("favorites");
        localStorage.removeItem("userRole");
      }
      
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get user's orders
  const getUserOrders = async () => {
    if (!user) return [];
    
    try {
      // Get orders from localStorage for demo purposes
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const userOrders = existingOrders.filter((order: any) => order.userId === user.id);
      
      // Sort by creation date (newest first)
      return userOrders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error: any) {
      toast({
        title: "Error fetching orders",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  // Function to create a new order
  const createOrder = async (orderData: any) => {
    if (!user) return null;
    
    try {
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      // Store order in localStorage for demo purposes
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const newOrder = {
        id: orderId,
        userId: user.id,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };
      
      existingOrders.push(newOrder);
      localStorage.setItem('userOrders', JSON.stringify(existingOrders));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return orderId;
    } catch (error: any) {
      console.error("Order creation error:", error);
      return null;
    }
  };

  // Function to set user role
  const setUserRole = async (role: 'farmer' | 'consumer') => {
    try {
      setUserRoleState(role);
      // Store role in localStorage for persistence
      localStorage.setItem('userRole', role);
      
      toast({
        title: "Role updated",
        description: `You are now registered as a ${role}`,
      });
    } catch (error: any) {
      toast({
        title: "Error setting role",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      userRole,
      isLoading, 
      signUp, 
      signIn, 
      signOut, 
      setUserRole,
      getUserOrders, 
      createOrder 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
