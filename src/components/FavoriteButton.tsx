import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFav: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({ isFav, onToggle, className = "", size = "sm" }: FavoriteButtonProps) {
  const [showBurst, setShowBurst] = useState(false);
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onToggle();
      if (!isFav) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 600);
      }
    },
    [isFav, onToggle]
  );

  return (
    <button
      onClick={handleClick}
      className={`p-1.5 rounded-lg transition-colors z-10 relative ${className}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <AnimatePresence>
        {showBurst && (
          <motion.span
            className="absolute inset-0 rounded-full bg-gold/20"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <Heart
        className={`${iconSize} transition-all duration-300 ${
          isFav ? "fill-gold text-gold scale-110" : "text-muted-foreground hover:text-gold"
        }`}
      />
    </button>
  );
}
