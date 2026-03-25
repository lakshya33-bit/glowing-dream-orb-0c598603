import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import logo from "@/assets/cardperks-logo.png";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageLayout>
      <SEO title="Sign Up" description="Create a CardPerks account to track your cards, save favorites, and get personalized recommendations." path="/signup" />
      <section className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[70vh]">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <img src={logo} alt="CardPerks" className="h-12 w-auto mx-auto mb-4 rounded-lg" />
              <h1 className="text-2xl font-bold mb-1">Create Account</h1>
              <p className="text-sm text-muted-foreground">Join CardPerks and start maximizing your rewards</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="text" placeholder="Full name" className="pl-10 bg-secondary/50 border-border/50" />
              </div>
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
              <button type="submit" className="w-full gold-btn rounded-lg py-2.5 text-sm">Create Account</button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account? <Link to="/login" className="text-gold hover:underline">Sign In</Link>
            </p>
          </div>
        </ScrollReveal>
      </section>
    </PageLayout>
  );
}
