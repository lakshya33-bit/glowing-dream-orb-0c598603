import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const SITE = "CardPerks";
const BASE_URL = "https://glowing-dream-orb.lovable.app";
const DEFAULT_DESC = "India's premier credit card perks platform. Compare voucher rates, track rewards, and maximize your credit card savings.";

export default function SEO({ title, description, path = "/" }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — Track Voucher Rates. Maximize Savings.`;
  const desc = description || DEFAULT_DESC;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
