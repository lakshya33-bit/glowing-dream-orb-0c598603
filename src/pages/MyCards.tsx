import { Link } from "react-router-dom";
import { Wallet, CreditCard, Star, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { useMyCards } from "@/hooks/use-my-cards";
import { cards } from "@/data/cards";
import { Badge } from "@/components/ui/badge";

export default function MyCards() {
  const { has, toggle, count } = useMyCards();
  const myCards = cards.filter((c) => has(c.id));
  const otherCards = cards.filter((c) => !has(c.id));

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <Wallet className="w-3 h-3 mr-1" /> My Wallet
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gold-gradient">Cards</span>
            </h1>
            <p className="text-muted-foreground">
              {count > 0 ? `You have ${count} card${count > 1 ? "s" : ""} in your wallet.` : "Add cards to your wallet to track and manage them."}
            </p>
          </div>
        </ScrollReveal>

        {myCards.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Your Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCards.map((card, i) => (
                <ScrollReveal key={card.id} delay={i * 0.05}>
                  <div className="glass-card rounded-xl overflow-hidden border-gold/20">
                    <Link to={`/cards/${card.id}`} className="block group">
                      <div className="h-44 flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${card.color}33, ${card.color}11)` }}>
                        {card.image ? <img src={card.image} alt={card.name} className="h-32 w-auto object-contain group-hover:scale-105 transition-transform" /> : <CreditCard className="w-24 h-24 text-muted-foreground/30" />}
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{card.name}</h3>
                          <p className="text-xs text-muted-foreground">{card.issuer} · {card.network}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-sm">{card.rating}</span>
                        </div>
                      </div>
                      <button onClick={() => toggle(card.id)} className="mt-3 w-full text-sm text-destructive hover:bg-destructive/10 rounded-lg py-2 transition-colors">
                        Remove from wallet
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-6">{myCards.length > 0 ? "Add More Cards" : "Available Cards"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCards.map((card) => (
              <div key={card.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${card.color}22` }}>
                  {card.image ? <img src={card.image} alt={card.name} className="h-8 w-auto object-contain" /> : <CreditCard className="w-6 h-6 text-muted-foreground/30" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{card.name}</p>
                  <p className="text-xs text-muted-foreground">{card.fee}</p>
                </div>
                <button onClick={() => toggle(card.id)} className="shrink-0 p-2 text-gold hover:bg-gold/10 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
