

## Rebuild: Premium Animate Sphere — Credit Card Perks Platform

This is a full rebuild of your banking/credit card perks platform from the GitHub repo. Since this is a large app (~18 pages, 20+ components), I'll break the implementation into logical phases. Each step builds on the previous one.

---

### Phase 1: Foundation & Design System
- Set up the dark theme color scheme, custom CSS variables, and fonts matching the original
- Install Three.js (`three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`) for the 3D sphere
- Create `ThemeProvider` component with dark/light mode toggle
- Create shared layout components: `PageLayout`, `PageTransition`, `ScrollReveal`, `NavigationProgress`
- Build the `FloatingParticles` background animation component

### Phase 2: Navigation & Core Layout
- Build the `Navbar` with logo, navigation links, mobile hamburger menu, and theme toggle
- Build the `Footer` component with links and branding
- Create `BackToTop` scroll button
- Set up all routes in `App.tsx` matching the original (18 routes)

### Phase 3: Landing Page (Homepage)
- Build the `HeroSection` with animated text, CTA buttons, and gradient backgrounds
- Create the `Scene3D` component — the animated 3D sphere using Three.js/React Three Fiber
- Build `HowItWorks` section with step-by-step cards
- Build `PopularVouchers` preview section
- Build `ExploreMore` section with feature cards

### Phase 4: Data Layer
- Create `src/data/cards.ts` — credit card data (names, perks, images, categories, rewards)
- Create `src/data/vouchers.ts` — voucher deals data
- Create `src/data/banking.ts` — banking features/services data
- Create `src/data/guides.ts` — educational guide content

### Phase 5: Cards & Comparison Pages
- Build `KnowYourCards` page — card catalog with filters and search
- Build `CardDetail` page — individual card view with perks breakdown
- Build `CompareCards` page with side-by-side card comparison UI (including `compare/` components)
- Build `FavoriteButton` component with favorites toggle functionality
- Build `MyCards` page — user's saved/selected cards wallet view

### Phase 6: Vouchers System
- Build `Vouchers` page — browsable voucher catalog with categories and filters
- Build `VoucherDetail` page — individual voucher view with redemption details

### Phase 7: Banking & Dashboard
- Build `Banking` page — banking services and features overview
- Build `Dashboard` page — user dashboard with spending overview, card stats, and expense tracking
- Build `AddExpenseDialog` component for expense management

### Phase 8: AI, Guides & Auth Pages
- Build `PerkAI` page — AI-powered perk recommendation interface
- Build `GuidesHub` page — educational guides listing
- Build `GuideDetail` page — individual guide content view
- Build `Favorites` page — saved items collection

### Phase 9: Auth & Info Pages
- Build `Login` page with form and styling
- Build `Signup` page with registration form
- Build `About` page
- Build `Privacy` page
- Style the `NotFound` 404 page

### Phase 10: Polish & Animations
- Fine-tune page transitions and scroll reveal animations
- Ensure responsive design across all pages (mobile, tablet, desktop)
- Add hover effects, micro-interactions, and loading states
- Final testing and cross-page navigation verification

