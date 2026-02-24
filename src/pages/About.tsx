import { Heart, Target, Users, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";

const values = [
  { icon: Target, title: "Transparency", desc: "We present unbiased, data-driven card comparisons with no hidden sponsorships." },
  { icon: Zap, title: "Maximize Value", desc: "Every feature is designed to help you extract maximum value from your cards." },
  { icon: Users, title: "Community First", desc: "Built by credit card enthusiasts for enthusiasts. Your feedback shapes our platform." },
  { icon: Heart, title: "Passion for Perks", desc: "We're obsessed with finding every last reward point, lounge visit, and voucher deal." },
];

export default function About() {
  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-gold/30 text-gold">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gold-gradient">CardPerks</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              India's most comprehensive credit card rewards platform. We help you discover, compare, and maximize your credit card perks.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most Indians leave thousands of rupees on the table by not fully utilizing their credit card rewards. CardPerks was born to change that. We aggregate voucher rates, compare card benefits, and use AI to recommend the perfect card for every spending pattern.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.05}>
              <div className="glass-card rounded-xl p-6 h-full">
                <v.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
