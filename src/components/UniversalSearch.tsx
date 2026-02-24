import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CreditCard, Tag, BookOpen, Landmark, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cards } from "@/data/cards";
import { vouchers } from "@/data/vouchers";
import { guides } from "@/data/guides";
import { banks } from "@/data/banking";

interface SearchResult {
  type: "card" | "voucher" | "guide" | "bank";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  color?: string;
}

const typeConfig = {
  card: { icon: CreditCard, label: "Cards", color: "text-blue-400" },
  voucher: { icon: Tag, label: "Vouchers", color: "text-amber-400" },
  guide: { icon: BookOpen, label: "Guides", color: "text-emerald-400" },
  bank: { icon: Landmark, label: "Banking", color: "text-purple-400" },
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  cards.forEach((c) =>
    results.push({ type: "card", id: c.id, title: c.name, subtitle: `${c.issuer} · ${c.type} · ${c.fee}`, href: `/cards/${c.id}`, color: c.color })
  );

  vouchers.forEach((v) =>
    results.push({ type: "voucher", id: v.id, title: v.name, subtitle: `${v.category} · ${v.discount}`, href: `/vouchers/${v.id}`, color: v.color })
  );

  guides.forEach((g) =>
    results.push({ type: "guide", id: g.slug, title: g.title, subtitle: `${g.category} · ${g.readTime}`, href: `/guides/${g.slug}`, color: g.color })
  );

  banks.forEach((b) =>
    results.push({ type: "bank", id: b.id, title: b.name, subtitle: `${b.tiers.length} banking tiers`, href: `/banking`, color: b.color })
  );

  return results;
}

interface UniversalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function UniversalSearch({ open, onClose }: UniversalSearchProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const allResults = useMemo(() => buildIndex(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allResults
      .filter((r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, allResults]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    filtered.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [filtered]);

  const handleSelect = useCallback(
    (href: string) => {
      navigate(href);
      onClose();
      setQuery("");
    },
    [navigate, onClose]
  );

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else onClose(); // parent toggles
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset query when closed
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed top-[10%] sm:top-[15%] left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[101] glass-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cards, vouchers, guides..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-secondary/50 border border-border/50">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() && filtered.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No results for "<span className="text-foreground">{query}</span>"
                </div>
              )}

              {!query.trim() && (
                <div className="text-center py-6 text-muted-foreground text-xs">
                  Start typing to search across cards, vouchers, guides & banks
                </div>
              )}

              {Object.entries(grouped).map(([type, items]) => {
                const config = typeConfig[type as keyof typeof typeConfig];
                const Icon = config.icon;
                return (
                  <div key={type} className="mb-2">
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {config.label}
                      </span>
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-secondary/50 active:scale-[0.98] transition-all group"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
