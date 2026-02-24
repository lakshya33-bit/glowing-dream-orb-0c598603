import { Star, TrendingUp, CreditCard, Gift, Shield, Plane, type LucideIcon } from "lucide-react";

export interface Guide {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  icon: LucideIcon;
  description: string;
  featured: boolean;
  color: string;
  author: string;
  date: string;
  content: string[];
  tags: string[];
}

export const guideCategories = ["All", "Beginners", "Strategy", "Travel", "Rewards", "Security"];

export const guides: Guide[] = [
  { slug: "credit-card-rewards-101", title: "Credit Card Rewards 101: A Beginner's Guide", category: "Beginners", readTime: "8 min", icon: Star, description: "Everything you need to know about earning and redeeming credit card rewards in India.", featured: true, color: "#C4A35A", author: "Arjun Mehta", date: "Feb 15, 2026", tags: ["Beginners", "Rewards", "Getting Started"],
    content: [
      "Credit card rewards are one of the most underutilized financial perks available to Indian consumers. Every swipe can earn you reward points, cashback, or miles.",
      "## How Reward Points Work\n\nMost credit cards in India earn reward points on every transaction. The key is understanding the *value per point* — not all points are created equal.",
      "## Types of Rewards\n\n**Cashback Cards** return a percentage directly. **Reward Points Cards** accumulate points redeemable for vouchers. **Miles Cards** earn airline miles for travel.",
      "## Maximizing Your Returns\n\n1. Use the right card for each category\n2. Always redeem through official portals\n3. Never let points expire\n4. Stack offers for double savings",
    ] },
  { slug: "smartbuy-10x-hack", title: "The Ultimate SmartBuy Hack: 10x Points Strategy", category: "Strategy", readTime: "12 min", icon: TrendingUp, description: "How to maximize your HDFC reward points using SmartBuy portal.", featured: true, color: "#4CAF50", author: "Priya Sharma", date: "Feb 10, 2026", tags: ["HDFC", "SmartBuy", "Strategy"],
    content: [
      "HDFC SmartBuy is the secret weapon of savvy credit card users. Route purchases through this portal for up to 10x reward points.",
      "## What is SmartBuy?\n\nSmartBuy is HDFC Bank's online shopping portal that partners with major brands for accelerated reward points.",
      "## The 10x Strategy\n\n**Step 1:** Log in with HDFC NetBanking\n**Step 2:** Select your voucher\n**Step 3:** Pay with eligible card\n**Step 4:** Earn 10x reward points",
      "## Pro Tips\n\n- Check daily for flash deals\n- Buy vouchers in bulk during festive seasons\n- Use the HDFC app for instant delivery\n- Stack with sale discounts for maximum value",
    ] },
  { slug: "lounge-access-2026", title: "Lounge Access: Complete 2026 Guide", category: "Travel", readTime: "10 min", icon: Plane, description: "Everything about airport lounge access — Priority Pass, Dreamfolks, and best cards.", featured: false, color: "#2196F3", author: "Rohan Gupta", date: "Feb 5, 2026", tags: ["Travel", "Lounge", "Airport"],
    content: [
      "Airport lounge access is one of the most valued perks of premium credit cards. The landscape has evolved with Dreamfolks replacing Priority Pass for many Indian bank programs.",
      "## Priority Pass vs Dreamfolks\n\n**Priority Pass** covers 1,400+ lounges worldwide. **Dreamfolks** focuses on Indian domestic lounges (60+ locations).",
      "## Best Cards for Lounge Access\n\nHDFC Infinia, HDFC Diners Black, ICICI Emeralde, and Axis Atlas offer the best lounge benefits.",
      "## Tips for Smart Lounge Usage\n\n- Book through official programs for complimentary access\n- Check guest policies — some cards charge per guest\n- Download the Priority Pass or Dreamfolks app",
    ] },
  { slug: "first-premium-card", title: "How to Choose Your First Premium Credit Card", category: "Beginners", readTime: "7 min", icon: CreditCard, description: "Confused between HDFC Regalia, SBI Elite, and Axis Privilege? Here's a data-driven comparison.", featured: false, color: "#FF9800", author: "Arjun Mehta", date: "Jan 28, 2026", tags: ["Beginners", "Comparison", "Premium"],
    content: [
      "Choosing your first premium credit card is a big decision. Annual fee, reward structure, and lifestyle benefits vary significantly.",
      "## Key Factors\n\n1. Annual fee vs. rewards earned\n2. Spending categories\n3. Lifestyle perks\n4. Milestone benefits",
      "## The Big Three Compared\n\nHDFC Regalia (₹2,500/yr), SBI Elite (₹4,999/yr), and Axis Privilege (₹3,500/yr) each have unique strengths.",
      "## Our Recommendation\n\nIf you spend ₹50,000+/month, start with HDFC Regalia — SmartBuy alone can earn ₹15,000+ in rewards annually.",
    ] },
  { slug: "voucher-stacking", title: "Voucher Stacking: Double Your Savings", category: "Strategy", readTime: "9 min", icon: Gift, description: "The art of combining credit card vouchers with platform offers for maximum discounts.", featured: false, color: "#E91E63", author: "Priya Sharma", date: "Jan 20, 2026", tags: ["Strategy", "Vouchers", "Savings"],
    content: [
      "Voucher stacking is the most powerful savings technique. By combining reward point vouchers with platform offers, you can get 15-25% off.",
      "## How Stacking Works\n\n**Layer 1:** Buy voucher using reward points (7% value)\n**Layer 2:** Use during a sale (additional 20-40%)\n**Layer 3:** Apply bank offers (additional 5-10%)",
      "## Best Stacking Combos\n\n- Flipkart + HDFC SmartBuy + BBD Sale = Up to 35% savings\n- Amazon + ICICI Rewards + Great Indian Sale = Up to 30%\n- Zomato + Diners Black + Zomato Gold = Up to 25%",
    ] },
  { slug: "card-security", title: "Protecting Your Card: Security Best Practices", category: "Security", readTime: "6 min", icon: Shield, description: "Essential tips to protect your credit card from fraud and unauthorized transactions.", featured: false, color: "#9C27B0", author: "Rohan Gupta", date: "Jan 12, 2026", tags: ["Security", "Fraud", "Protection"],
    content: [
      "Credit card fraud in India has increased significantly. Be proactive about protecting your cards.",
      "## Essential Security Practices\n\n1. Enable transaction alerts\n2. Set transaction limits\n3. Use virtual card numbers\n4. Never share OTP",
      "## If Your Card is Compromised\n\n1. Immediately block the card\n2. Call the bank\n3. File a cyber crime complaint\n4. Follow up in writing\n\nUnder RBI guidelines, you have zero liability if reported within 3 days.",
    ] },
  { slug: "international-travel-cards", title: "International Travel: Best Cards to Carry", category: "Travel", readTime: "11 min", icon: Plane, description: "Zero forex markup cards, international lounge access, and travel insurance.", featured: false, color: "#00BCD4", author: "Arjun Mehta", date: "Jan 5, 2026", tags: ["Travel", "International", "Forex"],
    content: [
      "Traveling internationally with the wrong card can cost 3-5% extra per transaction. Here's how to travel smart.",
      "## Zero Forex Markup Cards\n\n- Axis Atlas — 0% forex markup\n- HDFC Infinia — 2% markup but high reward rate offsets it\n- Niyo Global — 0% markup debit card",
      "## Must-Have Travel Card Features\n\n1. Zero or low forex markup\n2. International lounge access\n3. Travel insurance\n4. Emergency card replacement\n5. Global concierge",
    ] },
  { slug: "reward-points-valuation", title: "Reward Points Valuation: Know What You Earn", category: "Rewards", readTime: "8 min", icon: TrendingUp, description: "Not all reward points are equal. Learn how to calculate the true value of your points.", featured: false, color: "#8BC34A", author: "Priya Sharma", date: "Dec 28, 2025", tags: ["Rewards", "Valuation", "Points"],
    content: [
      "Understanding true value of reward points is critical to maximizing returns.",
      "## Point Valuation Formula\n\nValue per point = Voucher value ÷ Points required\n\nAlways redeem through SmartBuy or equivalent portals for maximum value!",
      "## Valuation Table\n\nHDFC Infinia: ₹0.33/point via SmartBuy\nICICI Emeralde: ₹0.35/point via Cleartrip\nAxis Atlas: ₹0.50/point via Edge Miles\nSBI Elite: ₹0.25/point via SBI Rewardz",
    ] },
  { slug: "annual-fee-waiver", title: "Annual Fee Waiver Strategies", category: "Strategy", readTime: "5 min", icon: CreditCard, description: "How to get your annual fee waived on premium cards. Proven strategies.", featured: false, color: "#FF5722", author: "Rohan Gupta", date: "Dec 20, 2025", tags: ["Strategy", "Fees", "Savings"],
    content: [
      "Premium cards come with hefty annual fees — ₹3,000 to ₹12,500. With the right approach, you can often get these waived.",
      "## Proven Strategies\n\n1. Spend-based waiver — hit spending threshold\n2. Retention call — call to cancel 30 days before renewal\n3. Upgrade path — first year fee waiver on upgrades\n4. Salary account linkage — lifetime free cards",
      "## Card-wise Waiver Thresholds\n\n- HDFC Infinia: ₹10L annual spend\n- HDFC Regalia: ₹3L annual spend\n- SBI Elite: ₹5L annual spend\n- Axis Atlas: Retention offers available",
    ] },
];

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
