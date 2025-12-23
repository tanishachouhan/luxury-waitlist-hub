import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-architecture.jpg";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(data: AuthFormData) {
    setIsLoading(true);
    try {
      if (activeTab === "signup") {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account already exists",
              description: "Please sign in instead.",
              variant: "destructive",
            });
            setActiveTab("login");
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Account created!",
            description: "You can now sign in.",
          });
          setActiveTab("login");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        navigate("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={heroImage} 
          alt="Modern architecture" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        {/* Dark navy overlay 90% opacity */}
        <div className="absolute inset-0 bg-[#101828]/90" />
        
        {/* Logo centered */}
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="flex items-center gap-3">
            <Building2 className="h-10 w-10 text-white" />
            <span className="font-heading text-3xl font-semibold text-white tracking-wider uppercase">
              EstateCRM
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <Building2 className="h-8 w-8 text-[#101828]" />
            <span className="font-heading text-2xl font-semibold text-[#101828] tracking-wider uppercase">
              EstateCRM
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#101828] mb-2">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "login" 
                ? "Sign in to manage your leads" 
                : "Get started with EstateCRM"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-none border border-border bg-transparent">
              <TabsTrigger 
                value="login" 
                className="rounded-none data-[state=active]:bg-[#101828] data-[state=active]:text-white"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="rounded-none data-[state=active]:bg-[#101828] data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#101828] font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          className="rounded-none border-muted-foreground/30 focus:border-[#101828] h-12"
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
                      <FormLabel className="text-[#101828] font-medium">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="rounded-none border-muted-foreground/30 focus:border-[#101828] h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#101828] hover:bg-[#101828]/90 text-white rounded-none font-medium uppercase tracking-wide" 
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : activeTab === "login"
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </form>
            </Form>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
