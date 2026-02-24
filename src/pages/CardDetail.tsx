import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, CreditCard, Plane, Gift, Shield, Target, TrendingUp, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { getCardById } from "@/data/cards";
import { Badge } from "@/components/ui/badge";

export default function CardDetail() {
  const { id } = useParams();
  const card = getCardById(id || "");
  const { toggle, isFav } = useFavorites("card");

  if (!card) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <CreditCard className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Card Not Found</h1>
          <Link to="/cards" className="text-gold hover:underline">← Back to cards</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <Link to="/cards" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Cards
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollReveal className="lg:col-span-1">
            <div className="glass-card rounded-xl overflow-hidden sticky top-24">
              <div className="h-56 flex items-center justify-center p-8" style={{ background: `linear-gradient(135deg, ${card.color}33, ${card.color}11)` }}>
                {card.image ? <img src={card.image} alt={card.name} className="h-40 w-auto object-contain drop-shadow-xl" /> : <CreditCard className="w-32 h-32 text-muted-foreground/20" />}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">{card.name}</h1>
                  <FavoriteButton isFav={isFav(card.id)} onToggle={() => toggle(card.id)} />
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold fill-current" />
                  <span className="font-medium">{card.rating}</span>
                  <span className="text-muted-foreground text-sm">/ 5.0</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <InfoItem label="Issuer" value={card.issuer} />
                  <InfoItem label="Network" value={card.network} />
                  <InfoItem label="Type" value={card.type} />
                  <InfoItem label="Annual Fee" value={card.fee} />
                  <InfoItem label="Min Income" value={card.minIncome} />
                  <InfoItem label="Forex Markup" value={card.forexMarkup} />
                </div>
                <Link to="/compare" className="block w-full text-center gold-outline-btn rounded-lg py-2.5 text-sm mt-4">Compare This Card</Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal><DetailSection icon={Gift} title="Welcome Bonus" items={[card.welcomeBonus]} /></ScrollReveal>
            <ScrollReveal delay={0.05}><DetailSection icon={TrendingUp} title="Reward Rate" items={[card.rewardRate, `Fuel Surcharge: ${card.fuelSurcharge}`]} /></ScrollReveal>
            <ScrollReveal delay={0.1}><DetailSection icon={Star} title="Key Perks" items={card.perks} /></ScrollReveal>
            <ScrollReveal delay={0.15}><DetailSection icon={Plane} title="Lounge Access" items={[`${card.lounge} visits`]} /></ScrollReveal>
            <ScrollReveal delay={0.2}><DetailSection icon={Target} title="Milestones" items={card.milestones} /></ScrollReveal>
            <ScrollReveal delay={0.25}><DetailSection icon={Shield} title="Insurance & Protection" items={card.insurance} /></ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4"><Award className="w-5 h-5 text-gold" /><h3 className="font-semibold text-lg">Best For</h3></div>
                <div className="flex flex-wrap gap-2">{card.bestFor.map((b) => <Badge key={b} variant="secondary" className="text-sm">{b}</Badge>)}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Voucher Partners</h3>
                <div className="flex flex-wrap gap-2">{card.vouchers.map((v) => <Badge key={v} className="bg-gold/10 text-gold border-gold/20">{v}</Badge>)}</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><p className="text-muted-foreground text-xs">{label}</p><p className="font-medium text-sm">{value}</p></div>;
}

function DetailSection({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4"><Icon className="w-5 h-5 text-gold" /><h3 className="font-semibold text-lg">{title}</h3></div>
      <ul className="space-y-2">{items.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />{item}</li>)}</ul>
    </div>
  );
}
