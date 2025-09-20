
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Facebook, Mail, Camera, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import RoleSelection from "@/components/RoleSelection";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import DummyCredentials from "@/components/DummyCredentials";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema;

type FormData = z.infer<typeof loginSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [pendingAuth, setPendingAuth] = useState(false);
  const { user, userRole, signIn, signUp, setUserRole } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        // Check if it's a real user (not dummy) and needs role selection
        const isDummyUser = localStorage.getItem('dummyUser');
        if (!isDummyUser) {
          setPendingAuth(true);
          setShowRoleSelection(true);
        }
      } else {
        await signUp(data.email, data.password);
        setEmailSent(true);
        // After successful signup, show role selection
        setPendingAuth(true);
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signInWithGoogle() {
    setSocialLoading("google");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setSocialLoading(null);
    }
  }

  async function signInWithFacebook() {
    setSocialLoading("facebook");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    } finally {
      setSocialLoading(null);
    }
  }

  // Handle role selection after authentication
  const handleRoleSelect = async (role: 'farmer' | 'consumer') => {
    await setUserRole(role);
    setShowRoleSelection(false);
    setPendingAuth(false);
    
    // Redirect based on role
    setTimeout(() => {
      if (role === 'farmer') {
        window.location.href = '/farmer-dashboard';
      } else {
        window.location.href = '/';
      }
    }, 500);
  };

  // Show role selection for new users or users without role
  if (showRoleSelection || (user && !userRole && !localStorage.getItem('dummyUser'))) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Redirect authenticated users with roles
  if (user && userRole && !pendingAuth) {
    if (userRole === 'farmer') {
      return <Navigate to="/farmer-dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-md px-4 py-24">
        <div className="bg-card rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {isLogin
              ? "Sign in to access AI Vision Tools and more"
              : "Join AgroConnect and get fresh products delivered to your doorstep"}
          </p>

          {/* Feature highlight */}
          <div className="mb-6 p-4 bg-farm-green/5 border border-farm-green/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-farm-green/10 p-2 rounded-lg">
                <Eye className="h-5 w-5 text-farm-green" />
              </div>
              <div>
                <h3 className="font-semibold text-farm-green-dark">AI Vision Tools</h3>
                <p className="text-sm text-gray-600">Upload images and get AI-powered analysis</p>
              </div>
            </div>
            <Link to="/image-analysis" className="inline-flex items-center text-sm text-farm-green hover:text-farm-green-dark mt-2">
              <Camera className="h-4 w-4 mr-1" />
              Try without signing in →
            </Link>
          </div>

          {emailSent && (
            <Alert className="mb-6 border-farm-green/20">
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Account created! Check your email to verify your account, or sign in directly if email confirmation is disabled.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 mb-6">
            <Button 
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
              onClick={signInWithGoogle}
              disabled={!!socialLoading}
            >
              {socialLoading === "google" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <Button 
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
              onClick={signInWithFacebook}
              disabled={!!socialLoading}
            >
              {socialLoading === "facebook" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Facebook className="h-5 w-5 text-blue-600" />
              )}
              Continue with Facebook
            </Button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@example.com" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>

          {/* Email troubleshooting note */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Email not working?</strong> You may need to configure email settings in Supabase or disable email confirmation for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
