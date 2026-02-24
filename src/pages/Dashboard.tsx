import { useState, useMemo } from "react";
import { BarChart3, CreditCard, Wallet, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import { useExpenses, CATEGORIES } from "@/hooks/use-expenses";
import { useMyCards } from "@/hooks/use-my-cards";
import { cards } from "@/data/cards";
import { Badge } from "@/components/ui/badge";
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const COLORS = ["hsl(43,55%,56%)", "hsl(220,70%,55%)", "hsl(160,60%,45%)", "hsl(340,65%,55%)", "hsl(270,55%,55%)", "hsl(30,80%,55%)"];

export default function Dashboard() {
  const { expenses, addExpense } = useExpenses();
  const { has } = useMyCards();

  const myCards = cards.filter((c) => has(c.id));
  const totalSpent = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const label = CATEGORIES.find((c) => c.value === e.category)?.label || e.category;
      map[label] = (map[label] || 0) + e.amount;
    });
    return map;
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const month = e.date.substring(0, 7);
      map[month] = (map[month] || 0) + e.amount;
    });
    return Object.entries(map).sort().map(([month, amount]) => ({ month, amount }));
  }, [expenses]);

  const pieData = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));

  // Use the first card in wallet as default for the expense dialog
  const defaultCard = myCards[0] || cards[0];

  return (
    <PageLayout>
      <section className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your <span className="gold-gradient">Dashboard</span></h1>
              <p className="text-muted-foreground">Track spending, manage cards, and optimize rewards.</p>
            </div>
            <AddExpenseDialog
              cardId={defaultCard.id}
              cardName={defaultCard.name}
              cardColor={defaultCard.color}
              onAdd={addExpense}
            />
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, color: "text-gold" },
            { icon: CreditCard, label: "My Cards", value: myCards.length.toString(), color: "text-blue-400" },
            { icon: BarChart3, label: "Transactions", value: expenses.length.toString(), color: "text-green-400" },
            { icon: TrendingUp, label: "Categories", value: Object.keys(categoryBreakdown).length.toString(), color: "text-purple-400" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.05}>
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScrollReveal>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Monthly Spending</h3>
              {monthlyData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Bar dataKey="amount" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Add expenses to see charts</div>}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">By Category</h3>
              {pieData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
              ) : <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No data yet</div>}
              <div className="flex flex-wrap gap-2 mt-4">
                {pieData.map((d, i) => (
                  <Badge key={d.name} variant="secondary" className="text-xs">
                    <span className="w-2 h-2 rounded-full mr-1.5 inline-block" style={{ background: COLORS[i % COLORS.length] }} />
                    {d.name}: ₹{d.value.toLocaleString()}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Expenses</h3>
            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.slice(0, 10).map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div>
                      <p className="text-sm font-medium">{e.merchant}</p>
                      <p className="text-xs text-muted-foreground">{e.category} · {e.date}</p>
                    </div>
                    <p className="text-sm font-semibold text-gold">₹{e.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-center text-muted-foreground text-sm py-8">No expenses recorded yet. Click "Add Expense" to start tracking.</p>}
          </div>
        </ScrollReveal>
      </section>
    </PageLayout>
  );
}
