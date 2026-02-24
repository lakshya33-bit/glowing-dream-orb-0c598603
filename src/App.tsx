import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavigationProgress from "@/components/NavigationProgress";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KnowYourCards from "./pages/KnowYourCards";
import CardDetail from "./pages/CardDetail";
import CompareCards from "./pages/CompareCards";
import Vouchers from "./pages/Vouchers";
import VoucherDetail from "./pages/VoucherDetail";
import Banking from "./pages/Banking";
import Dashboard from "./pages/Dashboard";
import PerkAI from "./pages/PerkAI";
import GuidesHub from "./pages/GuidesHub";
import GuideDetail from "./pages/GuideDetail";
import Favorites from "./pages/Favorites";
import MyCards from "./pages/MyCards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavigationProgress />
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
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
