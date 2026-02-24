import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gift, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { getVoucherById, iconMap } from "@/data/vouchers";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function VoucherDetail() {
  const { id } = useParams();
  const voucher = getVoucherById(id || "");
  const { toggle, isFav } = useFavorites("voucher");

  if (!voucher) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Gift className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Voucher Not Found</h1>
          <Link to="/vouchers" className="text-gold hover:underline">← Back to vouchers</Link>
        </div>
      </PageLayout>
    );
  }

  const Icon = iconMap[voucher.category] || Gift;

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <Link to="/vouchers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Vouchers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollReveal className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-24 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: `${voucher.color}22` }}>
                  <Icon className="w-8 h-8" style={{ color: voucher.color }} />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{voucher.name}</h1>
                  <p className="text-sm text-muted-foreground">{voucher.category}</p>
                </div>
                <FavoriteButton isFav={isFav(voucher.id)} onToggle={() => toggle(voucher.id)} />
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="font-medium text-gold">{voucher.discount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Best Rate</span><span className="font-medium text-gold">{voucher.bestRate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Validity</span><span className="font-medium">{voucher.validity}</span></div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Denominations</p>
                <div className="flex flex-wrap gap-2">{voucher.denominations.map((d) => <Badge key={d} variant="secondary">₹{d}</Badge>)}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Best Cards</p>
                <div className="flex flex-wrap gap-2">{voucher.cards.map((c) => <Badge key={c} className="bg-gold/10 text-gold border-gold/20 text-xs">{c}</Badge>)}</div>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3">About</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{voucher.longDescription}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Platform Rates</h3>
                <div className="space-y-3">
                  {voucher.platformRates.map((pr) => (
                    <div key={pr.platform} className={`flex items-center justify-between p-3 rounded-lg ${pr.highlight ? "bg-gold/5 border border-gold/20" : "bg-secondary/30"}`}>
                      <div className="flex items-center gap-3">
                        {pr.live ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-muted-foreground/40" />}
                        <div>
                          <p className="text-sm font-medium">{pr.platform}</p>
                          {pr.bestCard && <p className="text-xs text-muted-foreground">Best with {pr.bestCard}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gold">{pr.savings}</p>
                        <Badge variant="secondary" className="text-xs">{pr.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Rate History</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={voucher.rateHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="rate" stroke="hsl(var(--gold))" strokeWidth={2} dot={{ fill: "hsl(var(--gold))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
