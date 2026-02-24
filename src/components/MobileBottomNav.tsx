import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Tag, CreditCard, Sparkles, MoreHorizontal, X, GitCompare, Info, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mainTabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Vouchers", href: "/vouchers", icon: Tag },
  { label: "Cards", href: "/cards", icon: CreditCard },
  { label: "Perk AI", href: "/perk-ai", icon: Sparkles },
];

const moreTabs = [
  { label: "Compare Cards", href: "/compare", icon: GitCompare },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Privacy", href: "/privacy", icon: Shield },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isMoreActive = moreTabs.some((t) => isActive(t.href));

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 10) {
        setVisible(false);
        setMoreOpen(false);
      } else if (currentY < lastScrollY.current - 10) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close more menu on navigation
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* More menu overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom)+8px)] left-4 right-4 z-50 glass-card rounded-2xl border border-border/50 p-3 lg:hidden"
            >
              {moreTabs.map((tab) => (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(tab.href) ? "bg-gold/10 text-gold" : "text-muted-foreground active:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <motion.nav
        initial={false}
        animate={{ y: visible ? 0 : 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="bg-background/90 backdrop-blur-xl border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-around h-14 px-2">
            {mainTabs.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px] active:scale-90 ${
                    active ? "text-gold" : "text-muted-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                  aria-label={tab.label}
                >
                  <tab.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                  <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>{tab.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px] active:scale-90 ${
                isMoreActive || moreOpen ? "text-gold" : "text-muted-foreground"
              }`}
              aria-label="More options"
              aria-expanded={moreOpen}
            >
              {moreOpen ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
