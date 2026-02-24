import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cardperks_my_cards";

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

export function useMyCards() {
  const [myCardIds, setMyCardIds] = useState<Set<string>>(() => load());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...myCardIds]));
  }, [myCardIds]);

  const toggle = useCallback((id: string) => {
    setMyCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => myCardIds.has(id), [myCardIds]);
  const count = myCardIds.size;
  return { toggle, has, count };
}
