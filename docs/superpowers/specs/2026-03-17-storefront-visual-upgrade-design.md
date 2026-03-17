# Storefront Visual Upgrade Design Spec

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan.

**Goal:** Add scroll animations, a before/after photo toggle, a masonry gallery, and refined color theming to the storefront to give it a professional, non-AI-template feel.

**Architecture:** All new features are additive — new components dropped into `page.tsx`, new optional fields in the client JSON config. No existing components are restructured. Framer Motion handles all animations.

**Tech Stack:** Next.js 16 (App Router), Framer Motion, Tailwind CSS, TypeScript

---

## Design Decisions

### What we are NOT doing
- No gradient heroes (looks AI-generated)
- No coloring every element with the primary color
- No heavy libraries beyond Framer Motion (no react-photo-album, no slider libraries)

---

## Feature 1: Scroll Animations

**Approach:** A single reusable `FadeUp` wrapper component using Framer Motion's `useInView`. When any wrapped element enters the viewport it slides up 24px and fades in over 0.4s.

**Stagger:** For list-based sections (Services chips, Gallery photos), each item delays by `index * 0.1s` so they animate in sequentially.

**Applied to:** Hero content, Services chips, Hours rows, ContactForm, Footer, BeforeAfter section, Gallery photos.

**Implementation:**
- New file: `app/components/FadeUp.tsx` — `'use client'` wrapper using `motion.div` + `useInView`
- Props: `children`, `delay?: number`
- Wrap each section's content (not the `<section>` tag itself) in `<FadeUp>`
- For lists, wrap each item with `<FadeUp delay={index * 0.1}>`

---

## Feature 2: Before/After Tap-to-Toggle

**Behavior:**
- Shows one photo at a time (starts on "before")
- Tapping the image crossfades to the other photo using Framer Motion `AnimatePresence`
- "BEFORE" / "AFTER" label overlaid bottom-left, white text on semi-transparent dark pill
- "Tap to reveal" hint shown beneath on initial render, disappears after first tap
- Section title: configurable via `beforeAfterLabel` (e.g. "See Our Work")

**Config fields added to `ClientConfig` and `demo.json`:**
```json
"beforeAfterLabel": "See Our Work",
"beforeImageUrl": "",
"afterImageUrl": ""
```

**Visibility:** If `beforeImageUrl` is empty/missing, the entire section does not render.

**Placement:** Between Services and Hours in `page.tsx`.

**Implementation:**
- New file: `app/components/BeforeAfter.tsx` — `'use client'`, uses `useState` for current image + `AnimatePresence` for crossfade
- Props: `label`, `beforeImageUrl`, `afterImageUrl`

---

## Feature 3: Masonry Gallery

**Layout:**
- CSS columns: 2 columns on mobile, 3 on desktop
- `break-inside: avoid` on each photo to prevent column breaks mid-image
- Photos have `rounded-lg` corners and a small gap

**Lightbox:**
- Tapping any photo opens it fullscreen (fixed overlay, dark background, image centered, `object-contain`)
- Tapping outside the image or an X button closes it
- `AnimatePresence` for open/close fade

**Animation:** Photos stagger in using `FadeUp` with index-based delay.

**Config field added:**
```json
"galleryImages": []
```

**Visibility:** If `galleryImages` is empty or missing, the section does not render.

**Placement:** After BeforeAfter, before Hours in `page.tsx`.

**Implementation:**
- New file: `app/components/Gallery.tsx` — `'use client'`, manages `selectedPhoto` state for lightbox
- Props: `images: string[]`

---

## Feature 4: Color Theming (Restrained)

**Philosophy:** Use `primaryColor` to direct the eye to one thing per section — not to paint everything. The site is primarily black, white, and gray. Color is punctuation, not wallpaper.

**Specific applications:**

| Element | Treatment |
|---|---|
| Hero background | Dark `#111827` (not primary color) |
| Hero text | White |
| Hero tagline accent | 2px bottom border in `primaryColor` on the tagline text |
| "Call Now" button | `primaryColor` background, white text |
| Section label (e.g. "Our Services") | 3px left border in `primaryColor`, dark text |
| Service chips | White background, `primaryColor` border (1px), `primaryColor` text |
| "Send Message" button | `primaryColor` background (already done) |
| Gallery lightbox overlay | `rgba(0,0,0,0.85)` — no primary color |
| Everything else | Black, white, `gray-*` Tailwind classes |

**Implementation:** Inline `style` props where Tailwind can't use dynamic values (same pattern already used in `Hero.tsx` and `ContactForm.tsx`).

---

## Config Changes Summary

New optional fields added to `lib/client.ts` (`ClientConfig`) and `clients/demo.json`:

```typescript
beforeAfterLabel?: string
beforeImageUrl?: string
afterImageUrl?: string
galleryImages?: string[]
```

All fields are optional. Missing = section hidden.

---

## Page Order (updated)

```
Hero
Services
BeforeAfter   ← new
Gallery       ← new
Hours
ContactForm
Footer
```

---

## Testing

- `FadeUp`: renders children, applies correct delay prop
- `BeforeAfter`: renders null when `beforeImageUrl` empty; toggles label on tap; shows hint on first render
- `Gallery`: renders null when `galleryImages` empty; opens lightbox on photo tap; closes on overlay tap
- Color theming: verified visually (inline styles are hard to unit test meaningfully)
- All existing 19 tests must remain passing
