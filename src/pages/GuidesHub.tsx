import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Clock, SearchX } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { guides, guideCategories } from "@/data/guides";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

export default function GuidesHub() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { toggle, isFav } = useFavorites("guide");

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || g.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const featured = filtered.filter((g) => g.featured);
  const regular = filtered.filter((g) => !g.featured);

  return (
    <PageLayout>
      <SEO title="Guides Hub" description="Expert guides to maximize your credit card rewards. Learn about lounge access, reward stacking, fee waivers, and more." path="/guides" />
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold"><BookOpen className="w-3 h-3 mr-1" /> Learn & Earn</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guides <span className="gold-gradient">Hub</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Expert guides to help you maximize your credit card rewards and perks.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search guides..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
        </div>

        <div className="scroll-fade-container flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {guideCategories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${category === cat ? "bg-gold text-background font-medium" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{cat}</button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featured.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <ScrollReveal key={guide.slug} delay={i * 0.05}>
                  <Link to={`/guides/${guide.slug}`} className="block group">
                    <div className="glass-card rounded-xl p-5 sm:p-8 h-full tilt-card hover:border-gold/30 transition-all relative overflow-hidden">
                      <Badge className="bg-gold/10 text-gold border-gold/20 mb-4">Featured</Badge>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${guide.color}22` }}>
                          <Icon className="w-5 h-5" style={{ color: guide.color }} />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime}</div>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-gold transition-colors mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                      <div className="absolute top-4 right-4">
                        <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggle(guide.slug)} />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24 flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-secondary/40 flex items-center justify-center mb-5">
              <BookOpen className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <p className="text-lg font-semibold mb-1">No guides found</p>
            <p className="text-sm text-muted-foreground mb-5">No results for "{search || category}". Try a different term.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-outline-btn text-sm">Clear filters</button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <ScrollReveal key={guide.slug} delay={i * 0.05}>
                <Link to={`/guides/${guide.slug}`} className="block group">
                  <div className="glass-card rounded-xl p-6 h-full tilt-card hover:border-gold/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${guide.color}22` }}>
                        <Icon className="w-5 h-5" style={{ color: guide.color }} />
                      </div>
                      <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggle(guide.slug)} />
                    </div>
                    <h3 className="font-semibold group-hover:text-gold transition-colors mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                      <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
      <BackToTop />
    </PageLayout>
  );
}
