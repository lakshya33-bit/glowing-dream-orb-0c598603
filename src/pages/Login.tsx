import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import logo from "@/assets/cardperks-logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageLayout>
      <SEO title="Sign In" description="Sign in to CardPerks to access your dashboard, track cards, and manage rewards." path="/login" />
      <section className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[70vh]">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <img src={logo} alt="CardPerks" className="h-12 w-auto mx-auto mb-4 rounded-lg" />
              <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">Sign in to access your card perks dashboard</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" placeholder="Email address" className="pl-10 bg-secondary/50 border-border/50" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} placeholder="Password" className="pl-10 pr-10 bg-secondary/50 border-border/50" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-xs text-gold hover:underline">Forgot password?</button>
              </div>
              <button type="submit" className="w-full gold-btn rounded-lg py-2.5 text-sm">Sign In</button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account? <Link to="/signup" className="text-gold hover:underline">Sign Up</Link>
            </p>
          </div>
        </ScrollReveal>
      </section>
    </PageLayout>
  );
}
