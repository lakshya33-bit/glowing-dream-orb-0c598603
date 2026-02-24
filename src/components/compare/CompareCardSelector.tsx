import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type CreditCard } from "@/data/cards";

interface CardSelectorProps { cards: CreditCard[]; onSelect: (card: CreditCard) => void; selectedIds: string[]; slotIndex: number; }

export default function CompareCardSelector({ cards, onSelect, selectedIds, slotIndex }: CardSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const available = cards.filter((c) => !selectedIds.includes(c.id) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="relative">
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setOpen(!open)}
        className="w-full h-48 rounded-2xl border-2 border-dashed border-border/50 hover:border-gold/40 transition-all flex flex-col items-center justify-center gap-3 group">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Plus className="w-5 h-5 text-gold" />
        </div>
        <span className="text-sm text-muted-foreground">Add Card {slotIndex + 1}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 z-20 glass-card rounded-xl p-3 max-h-64 overflow-auto border border-border/30">
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Search cards..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-xs" />
            </div>
            {available.map((card) => (
              <button key={card.id} onClick={() => { onSelect(card); setOpen(false); setSearch(""); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-5 rounded overflow-hidden flex-shrink-0">
                  {card.image ? <img src={card.image} alt="" className="w-full h-full object-cover" /> :
                    <div className="w-full h-full" style={{ background: card.color }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium truncate block text-xs">{card.name}</span>
                  <span className="text-[10px] text-muted-foreground">{card.issuer}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-gold"><Star className="w-2.5 h-2.5" />{card.rating}</div>
              </button>
            ))}
            {available.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No cards available</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
