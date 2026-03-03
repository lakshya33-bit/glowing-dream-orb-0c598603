
## Complete UI/UX Audit — All Pages, Mobile & Desktop

After reading every page file carefully, here's a full report of bugs and improvements found:

---

### BUGS (functional issues)

**1. CardDetail — Sticky CTA overlaps mobile bottom nav**
- `sticky bottom-6 z-30` sits at 24px from bottom. The mobile bottom nav is 56px tall. The sticky "Add to My Cards" bar gets hidden behind the bottom nav on mobile.
- Fix: change `bottom-6` to `bottom-[72px] lg:bottom-6`

**2. KnowYourCards — Compare floating bar overlaps bottom nav on mobile**
- The `fixed bottom-6` compare bar is hidden behind the mobile bottom nav.
- Fix: `bottom-20 lg:bottom-6`

**3. MyCards — Stats grid is `grid-cols-3` on all screens**
- On 360px wide phones, 3-column `grid-cols-3` text like "Rewards Earned" is extremely cramped (each cell is ~110px wide with `text-[9px]`).
- Fix: `grid-cols-3 sm:grid-cols-3` is fine but values need to be smaller, or switch to `grid-cols-1 sm:grid-cols-3` with a horizontal scroll on mobile.

**4. VoucherDetail — Hero card has `p-8` on all screens**
- On mobile the `p-8` padding on the main voucher hero card is too generous, pushing content below the fold unnecessarily.
- Fix: `p-5 sm:p-8`

**5. PerkAI — `pb-14` padding may not be enough**
- The chat page uses `pb-14` but the bottom nav is `h-14` + `env(safe-area-inset-bottom)`. On iPhones with home indicator the content is clipped.
- Fix: add `pb-[calc(3.5rem+env(safe-area-inset-bottom))]` on mobile

**6. Dashboard — Mobile profile header missing Sign Out**
- The mobile profile header (added in last round) shows name + badge but there's no way to sign out on mobile without reaching the desktop-only sidebar.
- Fix: add a small Sign Out button or kebab menu to the mobile profile header.

**7. Navbar — "Sign In" button always visible even when user would be logged in**
- The Sign In button is hardcoded in the navbar for both mobile and desktop. When auth is eventually connected, this will be a UI bug. Already a UX inconsistency since Dashboard and My Cards pages exist without auth gates.

---

### UX IMPROVEMENTS

**8. Home (Index) — ExploreMore section `pb-20 lg:pb-0` missing**
- The ExploreMore section is the last section before Footer. On mobile, the bottom nav overlaps this content. The `pb-16 lg:pb-0` is on the outer wrapper but ExploreMore itself doesn't have extra spacing.
- Fix: Already handled by `pb-16` on root div. Verify visually.

**9. Vouchers — "Buy Now" button hidden on mobile in QuickView drawer**
- In the QuickView drawer, `button className="hidden sm:flex"` means mobile users see platform rates but have NO way to buy.
- Fix: Make each platform row a full-width `<a>` link (wrapping the entire row) that acts as the buy trigger on mobile.

**10. Vouchers — Sort controls below filter bar are cramped on narrow mobile**
- "Sort: Best Rate / name / category" buttons on a single line below results count. On 360px screens with long labels this wraps awkwardly.
- Fix: Already partly addressed, but "Best Rate" label is the longest. Consider abbreviating to "Rate" or hiding the sort label on mobile.

**11. KnowYourCards — Mobile compact card list has no "Add to My Cards" button**
- The compact mobile list only shows Quick View + Favorite. The "Add to My Cards" (Wallet) button is desktop-only. On mobile users can't add cards directly from the list.
- Fix: Add a small wallet icon button to the mobile compact item row alongside Quick View and Favorite.

**12. CardDetail — "Similar Cards" section shows random cards, not similar**
- `cards.filter((c) => c.id !== id).slice(0, 3)` takes first 3 cards alphabetically, not ones with similar type/issuer.
- Fix: Filter by same `type` or same `issuer` first, then fallback to others.

**13. Dashboard — Stat cards sparklines still render on mobile (tiny + unreadable)**
- The `w-16 h-8` sparkline AreaChart renders on mobile where it's too small to see. Plan said to remove sparklines on mobile but they weren't removed.
- Fix: hide sparklines on mobile with `hidden sm:block` wrapper around the sparkline div.

**14. GuidesHub — Missing SEO for guides page after search returns 0 results**
- When search returns 0 guides, the page shows blank (no empty state). The featured and regular arrays would both be empty, rendering nothing.
- Fix: Add a no-results empty state (similar to Vouchers' `SearchX` empty state).

**15. CompareCards — Empty slots grid is always `grid-cols-2 lg:grid-cols-4` for 4 slots**
- When 0 cards are selected, the 4 empty slots render as `grid-cols-2 lg:grid-cols-4`. On mobile this creates 2 columns of "Add Card" slots which is fine, but each slot is cramped at ~150px.
- Fix: The slot cards could be taller/more tappable on mobile.

**16. CompareCards — Comparison table doesn't use horizontal scroll on mobile**
- `CompareTable` renders the table without an `overflow-x-auto` wrapper. For 3-4 cards on mobile, the columns get too narrow.
- Fix: Wrap `CompareTable`'s section in `overflow-x-auto`.

**17. Favorites — No unfavorite action on cards/vouchers/guides in the list**
- Users can view favorites but there's no heart/remove button on items in the Favorites page itself. Must navigate to the item to unfavorite.
- Fix: Add `FavoriteButton` component to each item in the Favorites grid.

**18. MyCards — Expense Tracker tab shows no data when no expenses added**
- Charts render with empty data (0 values) without a helpful empty state. The CategoryBreakdown pie chart crashes if `categoryBreakdown` is empty (pie with no slices).
- Fix: Add an empty state + "Add your first expense" CTA for the analytics section.

**19. MobileBottomNav — Active indicator is only color, no visual weight**
- Active tab only changes text color to gold and stroke width. Would benefit from a small pill/dot indicator above the icon.
- Fix: Add a `w-1 h-1 rounded-full bg-gold` dot above the active icon on mobile.

**20. PerkAI — Quick action buttons not visible after chat starts**
- After sending the first message, the quick action chips disappear (`exit` animation). If the user wants to change topic, they must type manually. 
- Fix: Show a compact "Suggestions" row at the bottom (above input) that shows 2-3 quick action chips even during chat.

---

### VISUAL / POLISH IMPROVEMENTS

**21. All pages — Toast notifications appear behind bottom nav on mobile**
- Sonner toasts default to `bottom-4` which gets covered by the 56px bottom nav.
- Fix: Add `toastOptions={{ style: { bottom: '72px' } }}` or configure Sonner offset in `src/components/ui/sonner.tsx`.

**22. Vouchers + KnowYourCards — Page scrolls to top when switching tabs**
- Tab switching (Cards ↔ Expenses) causes a scroll jump because of `AnimatePresence` height changes.
- Fix: Add `min-h-[600px]` on `TabsContent` or preserve scroll position.

**23. CardDetail — Breadcrumb overflows on mobile with long card names**
- Long card names like "ICICI Emeralde Private Metal" cause the breadcrumb to wrap to 2+ lines on 375px.
- Fix: Add `truncate` to the last breadcrumb item with a `max-w-[150px]`.

**24. Dashboard — Rewards chart hardcoded color uses raw HSL**
- The bar chart fill uses hardcoded `hsl(43 55% 56%)`. In light mode this won't match the gold design token.
- Fix: Use CSS variable `hsl(var(--gold))`.

---

## Files to Edit

| File | Changes |
|------|---------|
| `src/pages/CardDetail.tsx` | Fix sticky CTA bottom offset on mobile; fix similar cards logic; fix breadcrumb truncation |
| `src/pages/KnowYourCards.tsx` | Fix floating compare bar z-index/bottom offset; add Wallet button to mobile card item; hide sparklines mobile |
| `src/pages/MyCards.tsx` | Fix stats grid on narrow mobile; add expenses empty state |
| `src/pages/VoucherDetail.tsx` | Fix hero padding on mobile |
| `src/pages/Vouchers.tsx` | Make platform rows tappable on mobile in QuickView drawer |
| `src/pages/GuidesHub.tsx` | Add empty search results state |
| `src/pages/CompareCards.tsx` | Add overflow-x-auto to table |
| `src/pages/Favorites.tsx` | Add FavoriteButton to each item |
| `src/pages/PerkAI.tsx` | Fix bottom padding for safe area; add persistent suggestions row |
| `src/pages/Dashboard.tsx` | Hide sparklines on mobile; add mobile sign out; fix chart color |
| `src/components/MobileBottomNav.tsx` | Add active dot indicator |
| `src/components/ui/sonner.tsx` | Fix toast position offset for mobile bottom nav |
