import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const types = ["All", ...Array.from(new Set(cards.map((c) => c.type)))];
const issuers = ["All", ...Array.from(new Set(cards.map((c) => c.issuer)))];
const networks = ["All", ...Array.from(new Set(cards.map((c) => c.network)))];

export default function KnowYourCards() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [issuerFilter, setIssuerFilter] = useState("All");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const { toggle, isFav } = useFavorites("card");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || c.type === typeFilter;
      const matchIssuer = issuerFilter === "All" || c.issuer === issuerFilter;
      const matchNetwork = networkFilter === "All" || c.network === networkFilter;
      return matchSearch && matchType && matchIssuer && matchNetwork;
    });
  }, [search, typeFilter, issuerFilter, networkFilter]);

  const activeFilters = [typeFilter, issuerFilter, networkFilter].filter((f) => f !== "All").length;

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <CreditCard className="w-3 h-3 mr-1" /> Card Catalog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Know Your <span className="gold-gradient">Cards</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore and compare India's best credit cards. Find the perfect card for your lifestyle.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search cards by name or issuer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showFilters ? "border-gold text-gold bg-gold/10" : "border-border text-muted-foreground hover:text-gold"}`}>
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFilters > 0 && <span className="bg-gold text-background text-xs px-1.5 rounded-full">{activeFilters}</span>}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
              <div className="glass-card rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FilterGroup label="Card Type" options={types} value={typeFilter} onChange={setTypeFilter} />
                <FilterGroup label="Issuer" options={issuers} value={issuerFilter} onChange={setIssuerFilter} />
                <FilterGroup label="Network" options={networks} value={networkFilter} onChange={setNetworkFilter} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} cards found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((card, i) => (
            <ScrollReveal key={card.id} delay={i * 0.05}>
              <Link to={`/cards/${card.id}`} className="block group">
                <div className="glass-card rounded-xl overflow-hidden tilt-card transition-all duration-300 hover:border-gold/30">
                  <div className="h-48 relative flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${card.color}22, ${card.color}08)` }}>
                    {card.image ? (
                      <img src={card.image} alt={card.name} className="h-32 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform" />
                    ) : (
                      <CreditCard className="w-24 h-24 text-muted-foreground/30" />
                    )}
                    <div className="absolute top-3 right-3">
                      <FavoriteButton isFav={isFav(card.id)} onToggle={() => toggle(card.id)} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">{card.name}</h3>
                        <p className="text-xs text-muted-foreground">{card.issuer} · {card.network}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-sm font-medium">{card.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <Badge variant="secondary" className="text-xs">{card.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{card.fee}</Badge>
                      <Badge variant="secondary" className="text-xs">{card.rewards}</Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {card.perks.slice(0, 2).map((p) => (
                        <span key={p} className="text-xs text-muted-foreground">• {p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <CreditCard className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No cards found</h3>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>
    </PageLayout>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${value === opt ? "bg-gold text-background font-medium" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
