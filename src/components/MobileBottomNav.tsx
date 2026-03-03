import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Tag, CreditCard, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Vouchers", href: "/vouchers", icon: Tag },
  { label: "Cards", href: "/cards", icon: CreditCard },
  { label: "Guides", href: "/guides", icon: BookOpen },
  { label: "Perk AI", href: "/perk-ai", icon: Sparkles },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 10) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 10) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          {tabs.map((tab) => {
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
                <div className="relative">
                  <tab.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                  {active && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </div>
                <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
