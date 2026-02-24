import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import NavigationProgress from "@/components/NavigationProgress";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const KnowYourCards = lazy(() => import("./pages/KnowYourCards"));
const CardDetail = lazy(() => import("./pages/CardDetail"));
const CompareCards = lazy(() => import("./pages/CompareCards"));
const Vouchers = lazy(() => import("./pages/Vouchers"));
const VoucherDetail = lazy(() => import("./pages/VoucherDetail"));
const Banking = lazy(() => import("./pages/Banking"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PerkAI = lazy(() => import("./pages/PerkAI"));
const GuidesHub = lazy(() => import("./pages/GuidesHub"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const MyCards = lazy(() => import("./pages/MyCards"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NavigationProgress />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cards" element={<KnowYourCards />} />
                <Route path="/cards/:id" element={<CardDetail />} />
                <Route path="/compare" element={<CompareCards />} />
                <Route path="/vouchers" element={<Vouchers />} />
                <Route path="/vouchers/:id" element={<VoucherDetail />} />
                <Route path="/banking" element={<Banking />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/perk-ai" element={<PerkAI />} />
                <Route path="/guides" element={<GuidesHub />} />
                <Route path="/guides/:slug" element={<GuideDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/my-cards" element={<MyCards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
