# Zayu Go App Design Guidelines

## Design Approach: Reference-Based (Sports/Event Apps)
Drawing inspiration from modern sports and event applications with a focus on clean, mobile-first design and vibrant brand identity.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Gold: #EFAA04 (brand accent, highlights)
- Green: #016d3b (primary brand, text, headers)
- Off-white: #f1f2eb (main background)

**Secondary Colors:**
- Lime: #5fc501 (CTAs, action buttons)
- Red: #de1a1a (alerts, notifications)
- White: #ffffff (cards, elevated surfaces)
- Gray-500: Standard Tailwind gray for secondary text

### B. Typography
- **Primary Font:** Poppins (Google Fonts)
- **Weights:** 400 (regular), 600 (semibold), 700 (bold)
- **Hierarchy:** 
  - Hero text: text-4xl font-bold
  - Card titles: text-3xl font-bold
  - Section headers: font-semibold
  - Body text: regular weight

### C. Layout System
**Spacing Units:** Tailwind units of 1, 2, 4, 6, 8, 10
- Consistent padding: p-6 for main containers, p-4 for cards
- Margins: mt-1, mt-2, mt-6, mt-8, mt-10 for vertical spacing
- Grid gaps: gap-4 for action button grids

### D. Component Library

**Navigation:**
- Clean header with logo (w-28) and profile placeholder
- No traditional navigation bar - action-based interface

**Cards:**
- Primary match card: Green background with gold accents
- Action cards: White background with shadows
- Border radius: rounded-4xl (2rem) for distinctive rounded corners

**Buttons:**
- Primary CTA: Lime background with green text, rounded-full
- Action buttons: White background, aspect-square, centered content
- All buttons include hover scale transforms

**Layout:**
- Mobile-first design simulating phone screen (max-w-md)
- Flexbox-based layout with proper spacing
- Grid system for action menu (grid-cols-2)

### E. Interactive Elements
**Transitions:**
- Hover scale effects: hover:scale-105 for cards, hover:scale-110 for buttons
- Subtle translate effects: hover:-translate-y-2 for action buttons
- Duration: 200-300ms with ease-in-out timing

**Visual Hierarchy:**
- Color contrast for emphasis (gold text on green backgrounds)
- Shadow system: shadow-sm, shadow-md, shadow-lg, shadow-2xl
- Font weight variations for information hierarchy

## Content Strategy
- Greeting-based welcome message
- Prominent match information display
- Quick access action menu with emoji icons
- Minimal text with maximum visual impact
- Focus on upcoming events and user actions

## Brand Identity
- Sports-focused with World Cup theming
- Friendly, energetic tone through color choices
- Mexican cultural context with vibrant color palette
- Professional yet approachable visual treatment

## Images
No large hero images required. The design relies on:
- Logo placement in header (28 units wide)
- Profile picture placeholder (14x14 units, rounded)
- Emoji icons for action buttons (🗺️, 🎟️, 💬, ❓)
- Color and typography create visual impact without imagery dependency