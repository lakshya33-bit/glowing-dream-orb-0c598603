import { useState, useCallback } from "react";

export interface Expense {
  id: string;
  cardId: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  note: string;
}

const STORAGE_KEY = "cardperks_expenses";

export const CATEGORIES = [
  { value: "shopping", label: "🛍️ Shopping" },
  { value: "food", label: "🍔 Food & Dining" },
  { value: "travel", label: "✈️ Travel" },
  { value: "fuel", label: "⛽ Fuel" },
  { value: "electronics", label: "📱 Electronics" },
  { value: "entertainment", label: "🎬 Entertainment" },
  { value: "bills", label: "📄 Bills & Utilities" },
  { value: "groceries", label: "🛒 Groceries" },
  { value: "health", label: "💊 Health" },
  { value: "others", label: "📦 Others" },
];

function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

  const addExpense = useCallback((expense: Omit<Expense, "id">) => {
    const newExpense: Expense = { ...expense, id: crypto.randomUUID() };
    setExpenses((prev) => {
      const next = [newExpense, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getByCard = useCallback((cardId: string) => expenses.filter((e) => e.cardId === cardId), [expenses]);
  const totalByCard = useCallback((cardId: string) => expenses.filter((e) => e.cardId === cardId).reduce((s, e) => s + e.amount, 0), [expenses]);

  return { expenses, addExpense, deleteExpense, getByCard, totalByCard };
}
