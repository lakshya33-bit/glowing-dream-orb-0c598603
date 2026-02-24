

## Improvement Plan for CardPerks

After reviewing every page of the app, here are the key areas that can be significantly improved, organized by priority:

---

### 1. Real Authentication (Currently Fake)

The Login/Signup pages are purely cosmetic — no actual authentication happens. The dashboard shows hardcoded "Rahul Kumar" data.

**Implementation:**
- Connect Supabase for real auth (email/password + Google OAuth)
- Protect routes like `/dashboard`, `/my-cards`, `/favorites` behind auth guards
- Replace hardcoded user data with real user profiles
- Add a proper session system so favorites, expenses, and card selections persist per user

---

### 2. Persistent Data Storage

All user data (favorites, my cards, expenses) currently lives in `localStorage` hooks and resets across devices. No data survives across browsers.

**Implementation:**
- Set up Supabase tables: `user_cards`, `user_favorites`, `user_expenses`
- Migrate `use-favorites`, `use-my-cards`, `use-expenses` hooks to use Supabase queries
- Enable Row Level Security so each user only sees their own data

---

### 3. Perk AI — Connect to a Real LLM

The Perk AI page has a beautiful chat UI but uses hardcoded mock responses. It cannot actually answer questions.

**Implementation:**
- Create a Supabase Edge Function that calls an LLM (e.g., via Lovable AI or OpenAI)
- Feed card data as context so the AI gives accurate, card-specific advice
- Stream responses for a real-time chat feel

---

### 4. SEO & Performance

- No `<meta>` descriptions on any page — only `<title>` is set
- The 3D sphere (Three.js) loads on the homepage even on mobile, which is heavy
- No lazy loading for route-level code splitting

**Implementation:**
- Add `react-helmet-async` for per-page meta tags (title, description, OG images)
- Lazy-load the `Scene3D` component and skip it on mobile
- Use `React.lazy()` + `Suspense` for route-level code splitting in `App.tsx`

---

### 5. Mobile UX Polish

- The navbar desktop links are hidden on mobile but the hamburger menu lacks visual hierarchy
- Category filter tabs on `/cards` and `/vouchers` overflow horizontally with no scroll indicator
- The Compare Cards page's 4-column grid is cramped on mobile

**Implementation:**
- Add swipe-to-close on the mobile drawer
- Add visible scroll arrows or fade indicators on filter tab rows
- Stack compare cards vertically on small screens with a swipeable carousel

---

### 6. Accessibility (a11y)

- Interactive elements like the favorite button, theme toggle, and Quick View lack `aria-label` attributes
- The "More" dropdown in the navbar doesn't handle keyboard navigation (Escape to close, arrow keys)
- Color contrast of `text-muted-foreground` on dark backgrounds may be too low

**Implementation:**
- Audit all buttons/links for proper `aria-label` and `role` attributes
- Add keyboard handlers to dropdown menus (Escape, Tab trap)
- Verify WCAG AA contrast ratios on all text colors

---

### 7. Loading & Empty States

- Pages show nothing while data "loads" (even though it's local, it's jarring for future API integration)
- Empty states on Dashboard tabs just show a card icon with no helpful CTA

**Implementation:**
- Add skeleton loaders to card grids, voucher lists, and dashboard sections
- Improve empty states with illustrations and clear CTAs ("Add your first card", "Browse vouchers")

---

### 8. Newsletter & Contact Forms

- The footer newsletter input has no handler — clicking the arrow does nothing
- No contact/feedback mechanism exists

**Implementation:**
- Wire up the newsletter form to a Supabase table or email service (e.g., Resend)
- Add a toast confirmation on successful subscription
- Optionally add a simple contact/feedback form on the About page

---

### Technical Details

```text
Priority Matrix:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  High Impact + Low Effort:
    - SEO meta tags
    - Newsletter form handler
    - Loading skeletons
    - Accessibility labels

  High Impact + Medium Effort:
    - Real authentication (Supabase)
    - Persistent data storage
    - Route-level code splitting

  High Impact + High Effort:
    - Real AI integration for Perk AI
    - Full mobile UX overhaul
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

All improvements use existing dependencies where possible (Supabase for auth/data, Framer Motion for skeletons, sonner for toasts). No new major libraries needed except `react-helmet-async` for SEO.

