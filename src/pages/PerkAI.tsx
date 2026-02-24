import { useState } from "react";
import { Bot, Send, Sparkles, CreditCard } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cards } from "@/data/cards";

interface Message {
  role: "user" | "ai";
  content: string;
  cards?: string[];
}

const suggestions = [
  "What's the best card for international travel?",
  "Which card gives the best lounge access?",
  "Best card for online shopping under ₹5,000 fee?",
  "Compare HDFC and ICICI premium cards",
];

function getAIResponse(query: string): Message {
  const q = query.toLowerCase();
  if (q.includes("travel") || q.includes("international")) {
    const recs = cards.filter((c) => c.bestFor.some((b) => b.toLowerCase().includes("travel")));
    return { role: "ai", content: `For travel, I recommend cards with low forex markup and good lounge access. Here are the best options:`, cards: recs.map((c) => c.id) };
  }
  if (q.includes("lounge")) {
    const recs = cards.filter((c) => c.lounge.includes("Unlimited") || c.lounge.includes("8"));
    return { role: "ai", content: `For maximum lounge access, these cards offer the best benefits:`, cards: recs.map((c) => c.id) };
  }
  if (q.includes("shop") || q.includes("online")) {
    const recs = cards.filter((c) => c.bestFor.some((b) => b.toLowerCase().includes("shop") || b.toLowerCase().includes("online")));
    return { role: "ai", content: `For online shopping, these cards offer great cashback and reward rates:`, cards: recs.length > 0 ? recs.map((c) => c.id) : [cards[0].id, cards[1].id] };
  }
  return { role: "ai", content: `Based on your query, here are some cards worth considering. Each offers a unique mix of rewards, lounge access, and lifestyle perks:`, cards: cards.slice(0, 3).map((c) => c.id) };
}

export default function PerkAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;
    const userMsg: Message = { role: "user", content: query };
    const aiMsg = getAIResponse(query);
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <Sparkles className="w-3 h-3 mr-1" /> AI-Powered
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Perk <span className="gold-gradient">AI</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ask me anything about credit cards, rewards, and perks. I'll recommend the best cards for your needs.
            </p>
          </div>
        </ScrollReveal>

        {messages.length === 0 && (
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {suggestions.map((s) => (
                <button key={s} onClick={() => handleSend(s)} className="glass-card rounded-xl p-4 text-left text-sm text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors">
                  <Sparkles className="w-4 h-4 text-gold mb-2" />
                  {s}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        <div className="space-y-4 mb-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl p-4 ${msg.role === "user" ? "bg-gold/10 text-foreground" : "glass-card"}`}>
                {msg.role === "ai" && <Bot className="w-4 h-4 text-gold mb-2" />}
                <p className="text-sm">{msg.content}</p>
                {msg.cards && (
                  <div className="mt-3 space-y-2">
                    {msg.cards.map((cid) => {
                      const card = cards.find((c) => c.id === cid);
                      if (!card) return null;
                      return (
                        <a key={cid} href={`/cards/${cid}`} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                          {card.image ? <img src={card.image} alt={card.name} className="h-8 w-auto" /> : <CreditCard className="w-8 h-8 text-muted-foreground/30" />}
                          <div>
                            <p className="text-sm font-medium">{card.name}</p>
                            <p className="text-xs text-muted-foreground">{card.fee} · {card.rewards} · {card.lounge}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-6">
          <div className="glass-card rounded-xl p-2 flex gap-2">
            <Input
              placeholder="Ask about cards, perks, rewards..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-transparent border-0 focus-visible:ring-0"
            />
            <button onClick={() => handleSend()} className="gold-btn rounded-lg px-4 py-2">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
