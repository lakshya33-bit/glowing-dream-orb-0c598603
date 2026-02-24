import type { LucideIcon } from "lucide-react";

export interface BankingTier {
  name: string;
  color: string;
  eligibility: string;
  eligibleCards: string[];
  benefits: string[];
  hasRM: boolean;
  keyTakeaways: string[];
}

export interface BankData {
  id: string;
  name: string;
  color: string;
  tiers: BankingTier[];
}

export const banks: BankData[] = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    color: "#003D8F",
    tiers: [
      { name: "Classic", color: "#6B7280", eligibility: "AMB of ₹1 Lakh in Savings OR ₹2 Lakhs in Current", eligibleCards: ["HDFC Classic"], benefits: ["Standard locker rates", "Free NEFT/RTGS online", "Free chequebook", "Priority branch servicing"], hasRM: false, keyTakeaways: ["Best card: HDFC Classic"] },
      { name: "Preferred", color: "#06B6D4", eligibility: "AMB of ₹2 Lakhs in Savings OR ₹5 Lakhs in Current", eligibleCards: ["HDFC Preferred Platinum Chip"], benefits: ["Domestic Lounge: 4/year", "50% discount on locker rent", "Free Demat AMC", "Dedicated Relationship Manager", "Priority processing for loans"], hasRM: true, keyTakeaways: ["Best card: HDFC Preferred Platinum Chip", "Dedicated RM included"] },
      { name: "Imperia", color: "#F59E0B", eligibility: "AMB of ₹10 Lakhs in Savings OR ₹3 Lakhs net salary credit", eligibleCards: ["HDFC Imperia Platinum Chip"], benefits: ["Domestic Lounge: Unlimited", "International Lounge: 6/year", "Free locker", "Senior Relationship Manager", "Complimentary golf rounds"], hasRM: true, keyTakeaways: ["Best card: HDFC Imperia Platinum Chip", "Dedicated RM included"] },
      { name: "Private Banking", color: "#A855F7", eligibility: "NRV of ₹10 Crores or above. By invitation only.", eligibleCards: ["HDFC Private World"], benefits: ["Unlimited lounges", "Complimentary premium locker", "Private banking suite access", "Bespoke travel & lifestyle concierge", "Family banking privileges"], hasRM: true, keyTakeaways: ["Best card: HDFC Private World", "Dedicated RM included"] },
    ],
  },
  {
    id: "icici",
    name: "ICICI Bank",
    color: "#F58220",
    tiers: [
      { name: "Privilege", color: "#06B6D4", eligibility: "AMB of ₹1 Lakh in Savings OR total relationship value ₹5 Lakhs", eligibleCards: ["ICICI Privilege Debit Card"], benefits: ["Priority branch servicing", "Preferential FD rates", "Free NEFT/RTGS", "Locker discount 25%"], hasRM: false, keyTakeaways: ["Entry-level wealth tier"] },
      { name: "Wealth", color: "#F59E0B", eligibility: "AMB of ₹10 Lakhs in Savings OR NRV ₹25 Lakhs", eligibleCards: ["ICICI Sapphiro Debit Card"], benefits: ["Domestic Lounge: 8/year", "International Lounge: 4/year", "Dedicated Relationship Manager", "50% off locker charges", "Free Demat AMC"], hasRM: true, keyTakeaways: ["Best card: ICICI Sapphiro", "Dedicated RM included"] },
      { name: "Private Banking", color: "#A855F7", eligibility: "NRV of ₹5 Crores or above. By invitation only.", eligibleCards: ["ICICI Private Banking Debit Card"], benefits: ["Unlimited lounges", "Complimentary premium locker", "Dedicated Private Banker", "Bespoke investment advisory", "Family banking privileges"], hasRM: true, keyTakeaways: ["Top-tier private banking", "Dedicated Private Banker"] },
    ],
  },
  {
    id: "axis",
    name: "Axis Bank",
    color: "#97144D",
    tiers: [
      { name: "Priority", color: "#06B6D4", eligibility: "AMB of ₹2 Lakhs in Savings OR ₹5 Lakhs in Current", eligibleCards: ["Axis Priority Debit Card"], benefits: ["Domestic Lounge: 4/year", "Priority branch servicing", "Preferential FD rates", "Dedicated helpline"], hasRM: false, keyTakeaways: ["Entry-level priority banking"] },
      { name: "Burgundy", color: "#F59E0B", eligibility: "AMB of ₹5 Lakhs in Savings OR NRV ₹30 Lakhs", eligibleCards: ["Axis Burgundy Debit Card"], benefits: ["Domestic Lounge: Unlimited", "International Lounge: 8/year", "Dedicated Relationship Manager", "Golf access: 4 rounds/year", "Free locker (first year)"], hasRM: true, keyTakeaways: ["Best card: Axis Burgundy", "Dedicated RM included"] },
      { name: "Burgundy Private", color: "#A855F7", eligibility: "NRV of ₹5 Crores or above. By invitation only.", eligibleCards: ["Axis Burgundy Private World"], benefits: ["Unlimited lounges", "Dedicated Private Banker", "Complimentary premium locker", "Bespoke wealth management", "Family banking benefits"], hasRM: true, keyTakeaways: ["Top-tier Burgundy experience", "Dedicated Private Banker"] },
    ],
  },
  {
    id: "sbi",
    name: "State Bank of India",
    color: "#0033A0",
    tiers: [
      { name: "Gold", color: "#F59E0B", eligibility: "AMB of ₹1 Lakh OR ₹50,000 net salary credit", eligibleCards: ["SBI Gold Debit Card"], benefits: ["Priority branch servicing", "Free NEFT/RTGS/IMPS", "Preferential FD rates", "Locker preference"], hasRM: false, keyTakeaways: ["Largest branch network benefit"] },
      { name: "Wealth", color: "#06B6D4", eligibility: "NRV of ₹10 Lakhs OR ₹3 Lakhs monthly salary credit", eligibleCards: ["SBI Wealth Debit Card"], benefits: ["Domestic Lounge: 8/year", "Dedicated Relationship Manager", "Preferential loan pricing", "Free Demat AMC", "50% off locker charges"], hasRM: true, keyTakeaways: ["Best for government employees", "Dedicated RM included"] },
    ],
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    color: "#ED1C24",
    tiers: [
      { name: "Privy League", color: "#06B6D4", eligibility: "AMB of ₹5 Lakhs OR NRV ₹10 Lakhs", eligibleCards: ["Kotak Privy League Debit Card"], benefits: ["Domestic Lounge: 4/year", "Dedicated Relationship Manager", "Preferential rates on loans & FDs", "Priority servicing"], hasRM: true, keyTakeaways: ["Good entry-level wealth banking"] },
      { name: "Privy League Signature", color: "#F59E0B", eligibility: "AMB of ₹10 Lakhs OR NRV ₹30 Lakhs", eligibleCards: ["Kotak Privy League Signature Debit Card"], benefits: ["Domestic Lounge: Unlimited", "International Lounge: 6/year", "Senior Relationship Manager", "Complimentary locker", "Golf access: 4 rounds/year"], hasRM: true, keyTakeaways: ["Best mid-tier wealth banking", "Senior RM included"] },
    ],
  },
];

export function getBankById(id: string) {
  return banks.find((b) => b.id === id);
}
