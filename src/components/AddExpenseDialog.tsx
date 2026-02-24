import { useState } from "react";
import { Plus, Calendar, Receipt, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, type Expense } from "@/hooks/use-expenses";

interface AddExpenseDialogProps {
  cardId: string;
  cardName: string;
  cardColor: string;
  onAdd: (expense: Omit<Expense, "id">) => void;
  trigger?: React.ReactNode;
}

export default function AddExpenseDialog({ cardId, cardName, cardColor, onAdd, trigger }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("shopping");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!merchant.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;
    onAdd({ cardId, date, merchant: merchant.trim(), amount: parsedAmount, category, note: note.trim() });
    setMerchant(""); setAmount(""); setNote("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="gold-btn px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card border-border/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Add Expense — {cardName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Date</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Amount (₹)</label>
              <Input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Merchant</label>
            <Input placeholder="e.g. Amazon, Swiggy" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <button onClick={handleSubmit} className="w-full gold-btn py-2.5 rounded-xl text-sm font-medium">Save Expense</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
