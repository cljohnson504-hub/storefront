# Storefront Visual Upgrade Design Spec

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan.

**Goal:** Add scroll animations, a before/after photo toggle, a masonry gallery, and refined color theming to the storefront to give it a professional, non-AI-template feel.

**Architecture:** All new features are additive — new components dropped into `page.tsx`, new optional fields in the client JSON config. Framer Motion handles all animations. Existing components are modified minimally.

**Tech Stack:** Next.js 16 (App Router), Framer Motion, Tailwind CSS, TypeScript

---

## Setup

**Install Framer Motion first (not yet in the project):**
```bash
npm install framer-motion
```

**`getClientConfig` does not need changes.** It uses `require('../clients/${slug}.json') as ClientConfig` — new optional fields in the JSON are automatically included. Only `lib/client.ts` and `clients/demo.json` need updating for config changes.

---

## Design Decisions

### What we are NOT doing
- No gradient heroes (looks AI-generated)
- No coloring every element with the primary color
- No heavy libraries beyond Framer Motion
- No accessibility/keyboard handling on lightbox (out of scope for MVP)
- No `next/image` — use plain `<img>` tags throughout (consistent with existing Hero.tsx pattern)

---

## Feature 1: Scroll Animations

### FadeUp component

New file: `app/components/FadeUp.tsx`

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
}

export default function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

`once: true` — fires once per element, never repeats. Each section fires independently as it enters the viewport.

### Server Component wrapping is intentional and safe

`FadeUp` is a Client Component. Wrapping Server Components (`Hero`, `Hours`, `Footer`) in it from `page.tsx` is valid Next.js App Router pattern — a Server Component can import and render a Client Component wrapper. Do NOT add `'use client'` to `Hero`, `Hours`, or `Footer` on account of this wrapping.

### Animation levels — two intentional levels

**Level 1 — section-level (from `page.tsx`):** `<Hero>` uses `<FadeUp>` with no delay (default `0`). All other sections use `<FadeUp delay={0.1}>`. Each section fires independently as it enters the viewport.

**Level 2 — item-level stagger (inside `Services.tsx` and `Gallery.tsx`):** Individual chips/photos are each wrapped in `<FadeUp delay={Math.min(index * 0.1, 0.5)}>`. Both levels are intentional and complement each other.

### page.tsx updated structure

`page.tsx` stays a Server Component — do NOT add `'use client'` to it.

```tsx
<FadeUp><Hero ... /></FadeUp>
<FadeUp delay={0.1}><Services ... /></FadeUp>
{config.beforeImageUrl && (
  <FadeUp delay={0.1}>
    <BeforeAfter
      label={config.beforeAfterLabel ?? 'See Our Work'}
      beforeImageUrl={config.beforeImageUrl}
      afterImageUrl={config.afterImageUrl}
      primaryColor={config.primaryColor}
    />
  </FadeUp>
)}
{config.galleryImages && config.galleryImages.length > 0 && (
  <FadeUp delay={0.1}>
    <Gallery
      label={config.galleryLabel ?? 'Our Work'}
      images={config.galleryImages}
      primaryColor={config.primaryColor}
    />
  </FadeUp>
)}
<FadeUp delay={0.1}><Hours hours={config.hours} primaryColor={config.primaryColor} /></FadeUp>
<FadeUp delay={0.1}><ContactForm ... /></FadeUp>
<FadeUp delay={0.1}><Footer ... /></FadeUp>
```

### Stagger inside Services.tsx

Add `'use client'` to `Services.tsx`. Change `<ul>` → `<div>` and `<li>` → `<div>` to avoid invalid HTML (`<div>` from FadeUp cannot be a direct child of `<ul>`):

```tsx
<div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
  {services.map((service, index) => (
    <FadeUp key={service} delay={Math.min(index * 0.1, 0.5)}>
      <div
        style={{ borderColor: primaryColor, color: primaryColor }}
        className="border rounded-full px-4 py-2 text-sm font-medium bg-white"
      >
        {service}
      </div>
    </FadeUp>
  ))}
</div>
```

---

## Feature 2: Before/After Tap-to-Toggle

### Two labels — do not confuse them
- **Section heading** (`label` prop) — the `<h2>` at the top of the section. Always visible. Text stays as passed in (default: "See Our Work").
- **Image overlay pill** ("BEFORE" / "AFTER") — absolute-positioned over the photo.

### Image dimensions
Use `aspect-[4/3]` to maintain a consistent ratio regardless of the image's intrinsic size:
```tsx
<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer">
  <motion.img className="absolute inset-0 w-full h-full object-cover" ... />
</div>
```

### Image overlay pill
```tsx
<span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
  {current === 'before' ? 'BEFORE' : 'AFTER'}
</span>
```

### "Tap to reveal" hint
```tsx
{!hasBeenTapped && afterImageUrl && (
  <p className="text-sm text-gray-400 text-center mt-2">Tap to reveal after</p>
)}
```
`hasBeenTapped` is a `useState(false)` that flips to `true` on first tap.

### Animation — crossfade
```tsx
<AnimatePresence mode="wait">
  <motion.img
    key={current}
    src={current === 'before' ? beforeImageUrl : afterImageUrl!}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  />
</AnimatePresence>
```

### Conditional rendering — guard lives in `page.tsx`
`BeforeAfter` only renders if `config.beforeImageUrl` is truthy (non-empty string).

### Edge case: afterImageUrl missing

If `afterImageUrl` is empty/missing, render this instead of the `AnimatePresence` block:

```tsx
<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
  <img
    src={beforeImageUrl}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
    BEFORE
  </span>
</div>
```

No tap handler, no `AnimatePresence`, no hint text. Section heading still shows `label` prop.

### Config fields added to `ClientConfig`:
```typescript
beforeAfterLabel?: string
beforeImageUrl?: string
afterImageUrl?: string
```

And to `clients/demo.json`:
```json
"beforeAfterLabel": "See Our Work",
"beforeImageUrl": "",
"afterImageUrl": ""
```

Note: empty strings in demo.json mean `BeforeAfter` won't render with the demo config. For manual testing, temporarily put real image URLs in demo.json.

### New file
`app/components/BeforeAfter.tsx` — `'use client'`

```typescript
interface BeforeAfterProps {
  label: string
  beforeImageUrl: string
  afterImageUrl?: string
  primaryColor: string
}
```

---

## Feature 3: Masonry Gallery

### Layout
- CSS columns: `columns-2 md:columns-3`
- Each photo wrapper: `break-inside-avoid mb-2`
- `rounded-lg overflow-hidden` on each photo
- Images: `w-full h-auto` — natural aspect ratio, no fixed height. CSS columns masonry works by letting images render at intrinsic height.

### Section heading
`label` prop (default `'Our Work'` applied in `page.tsx` via `??`). Rendered as `<h2>` with left-border accent.

### Lightbox
```tsx
// Overlay
<div
  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
  onClick={() => setSelectedPhoto(null)}
>
  {/* Close button */}
  <button
    className="absolute top-4 right-4 text-white text-2xl font-bold"
    onClick={() => setSelectedPhoto(null)}
  >
    ✕
  </button>
  {/* Image — stopPropagation prevents overlay click from closing */}
  <img
    src={selectedPhoto}
    alt=""
    className="max-w-full max-h-full object-contain p-4"
    onClick={e => e.stopPropagation()}
  />
</div>
```

Wrap the overlay in `AnimatePresence`:
```tsx
<AnimatePresence>
  {selectedPhoto && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 ..."
      onClick={...}
    >
```

### Animation
Each photo wrapper: `<FadeUp delay={Math.min(index * 0.1, 0.5)}>`.

### Config fields added:
```typescript
galleryLabel?: string
galleryImages?: string[]
```

```json
"galleryLabel": "Our Work",
"galleryImages": []
```

### New file
`app/components/Gallery.tsx` — `'use client'`

```typescript
interface GalleryProps {
  label: string
  images: string[]
  primaryColor: string
}
```

---

## Feature 4: Color Theming (Restrained)

**Philosophy:** `primaryColor` directs the eye to one thing per section. The site is primarily black, white, and gray.

### Hero (modify `Hero.tsx`)
- Background: `bg-[#111827]` (hardcoded dark)
- All text: `text-white`
- Tagline accent:
  ```tsx
  <span style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px', display: 'inline-block' }}>
    {tagline}
  </span>
  ```
- "Call Now" button: already `primaryColor` ✅
- Do NOT add `'use client'` to Hero.tsx

### Section headings — Services, Hours, ContactForm, BeforeAfter, Gallery
```tsx
<h2
  style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '12px' }}
  className="text-2xl font-bold text-gray-900 mb-6"
>
```
Remove `text-center`. **Services heading stays hardcoded as "Our Services"** (no label prop added). ContactForm: apply only to the main render path h2 ("Contact Us"), not the success state.

### Service chips
Change `border-2` → `border` (existing inline styles stay):
```tsx
className="border rounded-full px-4 py-2 text-sm font-medium bg-white"
```

---

## Props changes to existing components

| Component | Change |
|---|---|
| `Hero.tsx` | Background → `#111827`, text → white, tagline border accent |
| `Services.tsx` | Add `'use client'`, stagger FadeUp on chips, `border-2` → `border`, h2 left-border |
| `Hours.tsx` | Add `primaryColor: string` to `HoursProps`, h2 left-border |
| `ContactForm.tsx` | h2 left-border on main render path (already has `primaryColor` ✅) |
| `page.tsx` | Add FadeUp wrappers, pass `primaryColor` to Hours, add BeforeAfter/Gallery with guards |

---

## Config Changes Summary

New optional fields in `lib/client.ts` (`ClientConfig`):
```typescript
beforeAfterLabel?: string
beforeImageUrl?: string
afterImageUrl?: string
galleryLabel?: string
galleryImages?: string[]
```

`clients/demo.json` additions:
```json
"beforeAfterLabel": "See Our Work",
"beforeImageUrl": "",
"afterImageUrl": "",
"galleryLabel": "Our Work",
"galleryImages": []
```

---

## Page Order (updated)

```
Hero
Services
BeforeAfter   ← new (hidden if beforeImageUrl empty/falsy)
Gallery       ← new (hidden if galleryImages empty/missing)
Hours
ContactForm
Footer
```

---

## Testing

- `FadeUp`: renders children; applies delay to transition
- `BeforeAfter`: not rendered when `beforeImageUrl` empty (guard in page.tsx); when `afterImageUrl` missing — renders static image in `aspect-[4/3]` container, no tap handler, overlay shows "BEFORE"; on tap — toggles overlay pill and hides hint; section heading always shows `label` prop
- `Gallery`: not rendered when `galleryImages` empty (guard in page.tsx); renders correct number of images; opens lightbox on photo tap; tapping image inside lightbox does NOT close it; tapping overlay closes lightbox; close button visible and functional
- `Services`: chips have `border` class (not `border-2`); h2 has left-border inline style
- `Hours`: `HoursProps` accepts `primaryColor`; h2 has left-border inline style
- All existing 19 tests must remain passing
