import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Gift, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { vouchers, voucherCategories, iconMap } from "@/data/vouchers";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Vouchers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { toggle, isFav } = useFavorites("voucher");

  const filtered = useMemo(() => {
    return vouchers.filter((v) => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || v.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold"><Gift className="w-3 h-3 mr-1" /> Voucher Deals</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Voucher <span className="gold-gradient">Marketplace</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover the best voucher deals and maximize your credit card reward points.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search vouchers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {voucherCategories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 text-sm rounded-lg transition-colors ${category === cat ? "bg-gold text-background font-medium" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((voucher, i) => {
            const Icon = iconMap[voucher.category] || Gift;
            return (
              <ScrollReveal key={voucher.id} delay={i * 0.05}>
                <Link to={`/vouchers/${voucher.id}`} className="block group">
                  <div className="glass-card rounded-xl p-6 tilt-card transition-all hover:border-gold/30 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${voucher.color}22` }}>
                        <Icon className="w-6 h-6" style={{ color: voucher.color }} />
                      </div>
                      <FavoriteButton isFav={isFav(voucher.id)} onToggle={() => toggle(voucher.id)} />
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-gold transition-colors mb-1">{voucher.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{voucher.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gold/10 text-gold border-gold/20">{voucher.discount}</Badge>
                      <Badge variant="secondary" className="text-xs">{voucher.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3 text-gold" /> Best rate: <span className="text-gold font-medium">{voucher.bestRate}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
