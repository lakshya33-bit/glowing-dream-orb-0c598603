import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Bell, ChevronDown, User, Sun, Moon, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import logo from "@/assets/cardperks-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "Know Your Cards", href: "/cards" },
  { label: "Banking", href: "/banking" },
  { label: "Perk AI", href: "/perk-ai" },
  { label: "Guides Hub", href: "/guides" },
];

const moreLinks = [
  { label: "Compare Cards", href: "/compare" },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard handler for More dropdown
  const handleMoreKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMoreOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMoreOpen((prev) => !prev);
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 group" aria-label="CardPerks Home">
            <img src={logo} alt="CardPerks" className="h-9 w-auto rounded-lg" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors relative group ${
                  isActive(link.href) ? "text-gold" : "text-muted-foreground hover:text-gold"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold transition-all duration-300 ${
                  isActive(link.href) ? "w-3/4" : "w-0 group-hover:w-3/4"
                }`} />
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onKeyDown={handleMoreKeyDown}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-label="More navigation links"
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isMoreActive ? "text-gold" : "text-muted-foreground hover:text-gold"
                }`}
              >
                More <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-1 w-44 glass-card rounded-lg overflow-hidden py-1"
                    role="menu"
                    onMouseLeave={() => setMoreOpen(false)}
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        role="menuitem"
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          isActive(link.href) ? "text-gold bg-gold/10" : "text-muted-foreground hover:text-gold hover:bg-secondary/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/favorites" aria-label="Favorites" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <Heart className="w-4 h-4" />
            </Link>
            <Link to="/my-cards" aria-label="My Cards Wallet" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <Wallet className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" aria-label="Notifications" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <Bell className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" aria-label="User profile" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <User className="w-4 h-4" />
            </Link>
            <Link to="/login" className="ml-2 px-5 py-2 text-sm font-medium gold-outline-btn rounded-lg">
              Sign In
            </Link>
          </div>

          {/* Mobile: show theme toggle + sign in only, nav handled by bottom bar */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/login" className="px-4 py-1.5 text-xs font-medium gold-outline-btn rounded-lg">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

    </>
  );
}
