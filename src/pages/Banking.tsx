import { useState } from "react";
import { Building2, CheckCircle, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { banks } from "@/data/banking";
import { Badge } from "@/components/ui/badge";

export default function Banking() {
  const [expandedBank, setExpandedBank] = useState<string | null>("hdfc");

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
              <Building2 className="w-3 h-3 mr-1" /> Banking Tiers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Priority <span className="gold-gradient">Banking</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore wealth banking tiers from India's top banks. Find the right tier for your financial profile.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {banks.map((bank, bi) => (
            <ScrollReveal key={bank.id} delay={bi * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedBank(expandedBank === bank.id ? null : bank.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${bank.color}22` }}>
                      <Building2 className="w-5 h-5" style={{ color: bank.color }} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-semibold">{bank.name}</h2>
                      <p className="text-sm text-muted-foreground">{bank.tiers.length} tiers available</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedBank === bank.id ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {expandedBank === bank.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bank.tiers.map((tier) => (
                          <div key={tier.name} className="rounded-xl border border-border/50 p-5 space-y-4 bg-secondary/10">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ background: tier.color }} />
                              <h3 className="font-semibold">{tier.name}</h3>
                              {tier.hasRM && <Badge variant="secondary" className="text-xs"><User className="w-3 h-3 mr-1" />RM</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">{tier.eligibility}</p>
                            <ul className="space-y-1.5">
                              {tier.benefits.map((b) => (
                                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-1">
                              {tier.keyTakeaways.map((k) => (
                                <Badge key={k} className="bg-gold/10 text-gold border-gold/20 text-xs">{k}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
