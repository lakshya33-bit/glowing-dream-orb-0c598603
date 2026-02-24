import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import CompareCardSelector from "@/components/compare/CompareCardSelector";
import CompareTable from "@/components/compare/CompareTable";
import CompareEmptyState from "@/components/compare/CompareEmptyState";
import CompareStickyHeader from "@/components/compare/CompareStickyHeader";
import { cards, type CreditCard } from "@/data/cards";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight } from "lucide-react";

export default function CompareCards() {
  const [selected, setSelected] = useState<CreditCard[]>([]);
  const [stickyVisible, setStickyVisible] = useState(false);
  const selectedIds = selected.map((c) => c.id);

  const addCard = (card: CreditCard) => {
    if (selected.length < 3 && !selectedIds.includes(card.id)) {
      setSelected([...selected, card]);
      setStickyVisible(true);
    }
  };

  const removeCard = (id: string) => {
    setSelected(selected.filter((c) => c.id !== id));
  };

  const handleSelectPair = (pair: CreditCard[]) => {
    setSelected(pair);
    setStickyVisible(true);
  };

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <ArrowLeftRight className="w-3 h-3 mr-1" /> Side by Side
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare <span className="gold-gradient">Cards</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select up to 3 cards to compare features, rewards, and benefits side by side.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((i) => (
            selected[i] ? (
              <div key={selected[i].id} className="glass-card rounded-2xl p-4 relative">
                <button onClick={() => removeCard(selected[i].id)} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive text-xs">✕</button>
                <div className="h-32 flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${selected[i].color}22, ${selected[i].color}08)` }}>
                  {selected[i].image && <img src={selected[i].image} alt={selected[i].name} className="h-24 object-contain" />}
                </div>
                <p className="text-sm font-medium text-center">{selected[i].name}</p>
              </div>
            ) : (
              <CompareCardSelector key={`slot-${i}`} cards={cards} onSelect={addCard} selectedIds={selectedIds} slotIndex={i} />
            )
          ))}
        </div>

        {selected.length >= 2 ? (
          <>
            <CompareStickyHeader selected={selected} onRemove={removeCard} visible={stickyVisible} />
            <CompareTable selected={selected} />
          </>
        ) : (
          <CompareEmptyState maxCards={3} onSelectPair={handleSelectPair} />
        )}
      </section>
    </PageLayout>
  );
}
