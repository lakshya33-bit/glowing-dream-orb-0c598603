import { Link } from "react-router-dom";
import { Heart, CreditCard, Gift, BookOpen, Building2, Star } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { vouchers, iconMap } from "@/data/vouchers";
import { guides } from "@/data/guides";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";

export default function Favorites() {
  const cardFavs = useFavorites("card");
  const voucherFavs = useFavorites("voucher");
  const guideFavs = useFavorites("guide");

  const favCards = cards.filter((c) => cardFavs.isFav(c.id));
  const favVouchers = vouchers.filter((v) => voucherFavs.isFav(v.id));
  const favGuides = guides.filter((g) => guideFavs.isFav(g.slug));
  const total = favCards.length + favVouchers.length + favGuides.length;

  return (
    <PageLayout>
      <SEO title="Favorites" description="Your saved credit cards, vouchers, and guides — all in one place." path="/favorites" />
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <Heart className="w-3 h-3 mr-1" /> Saved Items
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="gold-gradient">Favorites</span>
            </h1>
            <p className="text-muted-foreground">{total} items saved</p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="cards">Cards ({favCards.length})</TabsTrigger>
            <TabsTrigger value="vouchers">Vouchers ({favVouchers.length})</TabsTrigger>
            <TabsTrigger value="guides">Guides ({favGuides.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="min-h-[500px]">
            {favCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favCards.map((card) => (
                  <div key={card.id} className="relative group">
                    <Link to={`/cards/${card.id}`} className="block">
                      <div className="glass-card rounded-xl overflow-hidden tilt-card hover:border-gold/30">
                        <div className="h-40 flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${card.color}22, ${card.color}08)` }}>
                          {card.image ? <img src={card.image} alt={card.name} className="h-28 w-auto object-contain" /> : <CreditCard className="w-20 h-20 text-muted-foreground/30" />}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold group-hover:text-gold transition-colors">{card.name}</h3>
                          <p className="text-xs text-muted-foreground">{card.issuer} · {card.fee}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="absolute top-3 right-3">
                      <FavoriteButton isFav={cardFavs.isFav(card.id)} onToggle={() => cardFavs.toggle(card.id)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon={CreditCard} text="No favorite cards yet" />}
          </TabsContent>

          <TabsContent value="vouchers" className="min-h-[500px]">
            {favVouchers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favVouchers.map((v) => {
                  const Icon = iconMap[v.category] || Gift;
                  return (
                    <div key={v.id} className="relative group">
                      <Link to={`/vouchers/${v.id}`} className="block">
                        <div className="glass-card rounded-xl p-6 tilt-card hover:border-gold/30">
                          <Icon className="w-8 h-8 mb-3" style={{ color: v.color }} />
                          <h3 className="font-semibold group-hover:text-gold transition-colors">{v.name}</h3>
                          <p className="text-sm text-muted-foreground">{v.discount}</p>
                        </div>
                      </Link>
                      <div className="absolute top-3 right-3">
                        <FavoriteButton isFav={voucherFavs.isFav(v.id)} onToggle={() => voucherFavs.toggle(v.id)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <EmptyState icon={Gift} text="No favorite vouchers yet" />}
          </TabsContent>

          <TabsContent value="guides" className="min-h-[500px]">
            {favGuides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favGuides.map((g) => {
                  const Icon = g.icon;
                  return (
                    <div key={g.slug} className="relative group">
                      <Link to={`/guides/${g.slug}`} className="block">
                        <div className="glass-card rounded-xl p-6 tilt-card hover:border-gold/30">
                          <Icon className="w-8 h-8 mb-3" style={{ color: g.color }} />
                          <h3 className="font-semibold group-hover:text-gold transition-colors">{g.title}</h3>
                          <p className="text-xs text-muted-foreground">{g.readTime} · {g.category}</p>
                        </div>
                      </Link>
                      <div className="absolute top-3 right-3">
                        <FavoriteButton isFav={guideFavs.isFav(g.slug)} onToggle={() => guideFavs.toggle(g.slug)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <EmptyState icon={BookOpen} text="No favorite guides yet" />}
          </TabsContent>
        </Tabs>
      </section>
    </PageLayout>
  );
}

function EmptyState({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="text-center py-20">
      <Icon className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
