# AquaSpace — Aquascape Studio Landing Page

A premium, modern landing page for AquaSpace aquascape studio in Bandung, Indonesia.

## 🎯 Features

- **Modern Design**: Clean, natural aesthetic with focus on aquascape photography
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered scroll reveals and interactions
- **Performance Optimized**: Next.js Image, lazy loading, WebP/AVIF support
- **Accessibility**: Semantic HTML, keyboard navigation, reduced motion support
- **SEO Ready**: Open Graph, Twitter Cards, semantic structure

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Manrope (headings), Inter (body) via next/font

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Home page composition
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── navbar/Navbar.tsx   # Navigation with mobile menu
│   ├── hero/Hero.tsx       # Hero section with parallax
│   ├── about/About.tsx     # About section with stats
│   ├── collection/Collection.tsx  # Collection cards
│   ├── services/Services.tsx      # Services list with previews
│   ├── works/SelectedWorks.tsx    # Gallery with lightbox
│   ├── process/Process.tsx        # Process steps with progress line
│   ├── cta/CTA.tsx               # CTA section
│   ├── footer/Footer.tsx         # Footer
│   └── ui/
│       ├── Button.tsx            # Reusable button variants
│       └── ImageReveal.tsx       # Image reveal animation
├── data/
│   ├── collection.ts      # Collection data
│   ├── services.ts        # Services data
│   └── works.ts           # Works/portfolio data
└── lib/
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=628992846900
```

## 🖼️ Images

Replace placeholder SVGs in `/public/images/` with actual photos:

```
/public/images/
├── hero.webp
├── about.webp
├── cta.webp
├── collection/
│   ├── nature.webp
│   ├── iwagumi.webp
│   ├── jungle.webp
│   └── blackwater.webp
├── works/
│   ├── work-01.webp
│   ├── work-02.webp
│   ├── work-03.webp
│   └── work-04.webp
└── services/
    ├── custom-aquascape.webp
    ├── aquarium-setup.webp
    ├── maintenance.webp
    └── aquatic-plants.webp
```

**Recommended specs:**
- Hero/CTA: 1920x1080
- About: 1200x1500 (portrait)
- Collection: 800x1000 (portrait)
- Works: 1200x900 (landscape)
- Services: 600x450 (landscape)
- Format: WebP or AVIF
- Quality: 80-85%

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#17352B` | Headings, primary buttons, accents |
| Secondary | `#111411` | Dark backgrounds |
| Background | `#F4F3EE` | Main background |
| Accent | `#6F8F78` | Links, highlights, secondary elements |
| Text Primary | `#171A18` | Body text |
| Text Secondary | `#686D68` | Muted text, captions |

### Typography

- **Headings**: Manrope (400-800)
- **Body**: Inter (400-600)
- **Scale**: Fluid clamping with `clamp()`

### Spacing

Based on 4px grid with semantic tokens:
- `space-xs`: 4px
- `space-sm`: 8px
- `space-md`: 16px
- `space-lg`: 24px
- `space-xl`: 32px
- `space-2xl`: 48px
- `space-3xl`: 64px
- `space-4xl`: 96px
- `space-5xl`: 128px

## ♿ Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy (h1→h2→h3)
- Alt text for all images
- Keyboard navigable
- Visible focus states
- ARIA labels where needed
- `prefers-reduced-motion` support
- Sufficient color contrast (WCAG AA)

## ⚡ Performance Targets

- **LCP** < 2.5s
- **CLS** < 0.1
- **INP** < 200ms

Achieved through:
- Next.js Image optimization
- Lazy loading below-fold images
- Minimal JavaScript bundle
- CSS-only animations where possible
- Font optimization with next/font
- No layout shift

## 📱 Responsive Breakpoints

| Device | Width |
|--------|-------|
| Mobile | 375px - 767px |
| Tablet | 768px - 1023px |
| Desktop | 1024px - 1279px |
| Large Desktop | 1280px - 1439px |
| XL Desktop | 1440px+ |

## 🔧 Customization

### Adding New Sections

1. Create component in `src/components/`
2. Add data file in `src/data/` if needed
3. Import and add to `src/app/page.tsx`

### Modifying Colors

Edit `tailwind.config.ts` color palette.

### Changing Fonts

Update `src/app/layout.tsx` with different `next/font` imports.

## 📄 License

Private project for AquaSpace Studio.