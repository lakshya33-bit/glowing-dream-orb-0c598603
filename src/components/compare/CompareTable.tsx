import { Star, CreditCard, Globe, Shield, Trophy, Gift, Fuel, Heart, Check } from "lucide-react";
import { type CreditCard as CardType } from "@/data/cards";
import { getWinner, getWinnerLabel } from "./CompareWinnerUtils";
import { Badge } from "@/components/ui/badge";

const fieldSections = [
  { label: "Basics", fields: [
    { key: "fee" as const, label: "Annual Fee", icon: CreditCard },
    { key: "network" as const, label: "Network", icon: Globe },
    { key: "type" as const, label: "Card Type", icon: Shield },
    { key: "issuer" as const, label: "Issuer", icon: CreditCard },
  ]},
  { label: "Income & Rewards", fields: [
    { key: "minIncome" as const, label: "Min Income", icon: Trophy },
    { key: "rewardRate" as const, label: "Reward Rate", icon: Gift },
    { key: "rewards" as const, label: "Reward Value", icon: Star },
    { key: "welcomeBonus" as const, label: "Welcome Bonus", icon: Gift },
  ]},
  { label: "Travel & Forex", fields: [
    { key: "lounge" as const, label: "Lounge Access", icon: Shield },
    { key: "fuelSurcharge" as const, label: "Fuel Surcharge", icon: Fuel },
    { key: "forexMarkup" as const, label: "Forex Markup", icon: Globe },
  ]},
];

const listSections = [
  { key: "perks" as const, label: "Key Perks", icon: Star },
  { key: "milestones" as const, label: "Milestone Benefits", icon: Trophy },
  { key: "insurance" as const, label: "Insurance", icon: Shield },
  { key: "bestFor" as const, label: "Best For", icon: Heart },
  { key: "vouchers" as const, label: "Top Vouchers", icon: Gift },
];

interface CompareTableProps { selected: CardType[]; }

export default function CompareTable({ selected }: CompareTableProps) {
  const cols = selected.length <= 2 ? "grid-cols-2 max-w-2xl mx-auto" : selected.length <= 3 ? "grid-cols-3 max-w-4xl mx-auto" : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className="space-y-8 mt-10">
      {fieldSections.map((section) => (
        <div key={section.label}>
          <h3 className="font-serif text-lg font-semibold mb-4 text-gold">{section.label}</h3>
          <div className="space-y-2">
            {section.fields.map((field) => {
              const winnerId = getWinner(field.key, selected);
              return (
                <div key={field.key} className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <field.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{field.label}</span>
                  </div>
                  <div className={`grid ${cols} gap-4`}>
                    {selected.map((card) => (
                      <div key={card.id} className={`text-sm ${winnerId === card.id ? "text-gold font-semibold" : ""}`}>
                        {String(card[field.key as keyof CardType])}
                        {winnerId === card.id && <Badge variant="outline" className="ml-2 text-[9px] border-gold/30 text-gold">{getWinnerLabel(field.key)}</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {listSections.map((section) => (
        <div key={section.key}>
          <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
            <section.icon className="w-4 h-4 text-gold" /> {section.label}
          </h3>
          <div className={`grid ${cols} gap-4`}>
            {selected.map((card) => (
              <div key={card.id} className="glass-card rounded-xl p-4">
                <p className="text-xs font-medium mb-2 text-muted-foreground">{card.name}</p>
                <ul className="space-y-1.5">
                  {(card[section.key] as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
