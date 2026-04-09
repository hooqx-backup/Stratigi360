# Stratigi360 — CLAUDE.md

## Project Overview

**Stratigi360** is a business setup and consultation company based in Dubai, UAE. This is their React SPA marketing site.

- **Tech stack:** React 19, React Router v7, Vite 8, plain CSS (no CSS framework)
- **Icons:** Font Awesome 6.5 via CDN (`index.html`)
- **Fonts:** Poppins (300–800) via Google Fonts (`index.html`)
- **All copy lives in** `src/locales/en.json` — do not hardcode text in JSX (several components currently violate this — see Issues)
- **No state management library** — local `useState` only
- **No TypeScript** — plain `.jsx` throughout

---

## Dev Commands

```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

---

## Routes

| Path        | Page component |
|-------------|----------------|
| `/`         | Home           |
| `/about`    | About          |
| `/services` | Services       |
| `/contact`  | Contact        |

**Missing/unimplemented routes** (linked in footer + CTAs, no pages exist yet):
- `/calculator` and `/cost-calculator` — Cost Calculator (many CTAs point here)
- `/privacy-policy`, `/terms`, `/payment-policy`, `/news`

---

## Project Structure

```
src/
├── pages/
│   ├── Home/
│   │   └── sections/
│   │       ├── HeroSection/
│   │       ├── BusinessDestiny/
│   │       ├── ServicesWheelSection/
│   │       ├── AboutSection/
│   │       ├── WorkProcess/
│   │       ├── ServicesSection/
│   │       ├── ValuesSection/
│   │       ├── CostCalculatorBanner/
│   │       ├── PartnersSection/
│   │       ├── TestimonialsSection/
│   │       ├── FAQSection/
│   │       ├── ContactSection/
│   │       └── GlobalReachSection/
│   ├── About/
│   │   └── sections/
│   │       ├── AboutHeroSection/
│   │       ├── AboutIntroSection/
│   │       ├── MissionVisionSection/
│   │       ├── AboutWhyUsSection/
│   │       ├── TeamSection/       ← COMMENTED OUT in About.jsx
│   │       └── AboutBannerSection/
│   ├── Services/
│   │   └── sections/
│   │       ├── ServicesHeroSection/
│   │       └── ServicesGridSection/
│   └── Contact/
│       └── sections/
│           ├── ContactHeroSection/
│           └── ContactFormSection/
├── components/ui/
│   ├── Button/         — reusable button (variants: primary, secondary, dark, white, link)
│   ├── ProgressBar/    — scroll progress bar fixed at top
│   ├── ScrollToTop/    — floating back-to-top button
│   ├── SectionTitle/   — reusable section heading (label + h2 + subheading)
│   └── WhatsAppButton/ — floating WhatsApp CTA
├── layout/
│   ├── Topbar/         — contact bar above navbar (social links + phone/email)
│   ├── Navbar/         — sticky nav (logo + links + CTA + hamburger)
│   └── Footer/         — dark footer (brand, quick links, important links)
├── locales/
│   └── en.json         — single source of truth for all site copy
├── assets/
│   └── images/         — local WebP/PNG assets
├── styles/
│   └── globals.css     — CSS variables, resets, utility classes
├── App.jsx             — BrowserRouter + route definitions + global layout
└── main.jsx            — StrictMode entry point
```

---

## Component Hierarchy

```
App.jsx
├── ProgressBar
├── Topbar
├── <main>
│   ├── Home → HeroSection, BusinessDestiny, ServicesWheelSection, AboutSection,
│   │          WorkProcess, ServicesSection, ValuesSection, CostCalculatorBanner,
│   │          PartnersSection, TestimonialsSection, FAQSection, ContactSection,
│   │          GlobalReachSection
│   ├── About → AboutHeroSection, AboutIntroSection, MissionVisionSection,
│   │           AboutWhyUsSection, AboutBannerSection
│   ├── Services → ServicesHeroSection, ServicesGridSection
│   └── Contact → ContactHeroSection, ContactFormSection
├── Footer
├── ScrollToTop
└── WhatsAppButton
```

---

## CSS Design System (`src/styles/globals.css`)

### Color Tokens
| Variable               | Value     | Use                          |
|------------------------|-----------|------------------------------|
| `--color-primary`      | `#252b3b` | Dark navy — headings, text   |
| `--color-accent`       | `#dd3333` | Red — CTAs, highlights       |
| `--color-accent-dark`  | `#cf2e2e` | Hover state for accent       |
| `--color-white`        | `#ffffff` |                              |
| `--color-bg-light`     | `#f8f9fa` | Light section background     |
| `--color-bg-section`   | `#f2f4f7` | Alternate section background |
| `--color-text`         | `#252b3b` | Body text                    |
| `--color-text-light`   | `#666666` | Secondary text               |
| `--color-text-muted`   | `#999999` | Muted / captions             |
| `--color-border`       | `#e0e0e0` |                              |

### Typography
- Font: `'Poppins', sans-serif`
- Scale: `xs` 12px → `sm` 13px → `base` 15px → `md` 18px → `lg` 22px → `xl` 28px → `2xl` 36px → `3xl` 42px

### Spacing Scale
`xs` 8px / `sm` 16px / `md` 24px / `lg` 40px / `xl` 60px / `2xl` 80px

### Breakpoints
| Breakpoint | Target          |
|------------|-----------------|
| `1024px`   | Tablet / iPad   |
| `768px`    | Mobile          |
| `480px`    | Small mobile    |

### Utility Classes
- `.container` — max-width 1200px, centered, responsive padding
- `.section` — 60px top/bottom padding
- `.section--light` — `#f8f9fa` background
- `.section--dark` — `#252b3b` background, white text
- `.img-placeholder` — gradient placeholder for broken/missing images

---

## Key Conventions

1. **Copy:** Always read from `src/locales/en.json`. See Issues for components that violate this.
2. **Styling:** Each component has a co-located `.css` file. Use CSS variables from `globals.css`. No Tailwind, no CSS modules, no styled-components.
3. **Images:** Local assets in `src/assets/images/`. Prefer WebP. Use `onError` handler to gracefully hide broken images and show `.img-placeholder`.
4. **Sections:** Each Home section is its own folder (`SectionName/SectionName.jsx` + `SectionName.css`). Follow this pattern for new sections.
5. **Navigation inside hero sections:** `HeroSection`, `AboutHeroSection`, `ServicesHeroSection`, and `ContactHeroSection` each embed their own transparent-overlay navbar. This is intentional but duplicated — do not add yet another copy; consider extracting to a shared component when refactoring.

---

## Component Notes

### Button (`src/components/ui/Button/Button.jsx`)
Renders `<a>` when `href` is provided, `<button>` otherwise.
Props: `variant` (primary/secondary/dark/white/link), `size` (sm/md/lg), `href`, `onClick`, `className`.

### SectionTitle (`src/components/ui/SectionTitle/SectionTitle.jsx`)
Props: `label` (small caps badge), `heading` (h2), `subheading` (p), `align` (center/left), `light` (boolean for white text).

### ServicesSection (Home) vs ServicesGridSection (Services page)
Both render the same `services.items` data from `en.json`. Home version shows all 9 with a "Know More" link. Services page version is filterable by tab (All / Consultation / Business Setup / Digital & Marketing) with no link on cards.

### FAQSection
Single-open accordion. `openIdx` defaults to `1` (second item open on load). Only one item open at a time.

### PartnersSection
Partner logos are imported locally from `src/assets/images/carosuleimage/`. The track array is duplicated `[...logos, ...logos]` but the infinite-scroll animation is **not yet implemented** (static grid only).

### ContactFormSection (`src/pages/Contact/sections/ContactFormSection/`)
Controlled form with `useState`. Has an embedded Google Maps iframe hardcoded to coordinates `25.2854, 55.3707` (Al Nahda, Dubai). **Submit handler is a placeholder — no actual form submission.**

---

## Known Issues & Pending Work

### Critical
- **No form submission logic** — `ContactSection` (home) has no handler at all; `ContactFormSection` has a state + onChange but submit is commented as placeholder. Needs backend integration or third-party form service.
- **Cost Calculator pages missing** — `/calculator` and `/cost-calculator` are referenced in at least 5 CTA buttons but no routes or pages exist.

### Content / Copy
- **`BusinessDestiny.jsx` hardcodes its own content** — does not read from `en.json`. The subheading text also differs from what `en.json` has. Needs to be refactored to use `en.json["business-destiny"]`.
- **Components with fully hardcoded text (not using en.json):**
  - `HeroSection` — main headline
  - `AboutIntroSection` — entire body text
  - `MissionVisionSection` — Mission, Vision, Values paragraphs
  - `AboutWhyUsSection` — card descriptions
  - `CostCalculatorBanner` — banner heading
  - `ContactSection` (home) — section heading

### Images
- `BusinessDestiny.jsx` references `https://i.imgur.com/your-skyline-placeholder.png` — needs a real local asset
- Testimonial avatars use `randomuser.me` external URLs (unreliable)
- `TeamSection` uses `randomuser.me` images
- Several `src/assets/images/service-*.jpg` files are **empty (42 bytes)** — need real images
- `src/assets/images/about.jpg` is also empty (42 bytes)
- `src/assets/images/logo.png` appears empty — verify

### Architecture
- **Navigation duplication:** `HeroSection`, `AboutHeroSection`, `ServicesHeroSection`, `ContactHeroSection` each contain a full copy of the navbar. Should be extracted to a shared `HeroNav` component.
- **`TeamSection` commented out** — no documented reason. Lives at `src/pages/About/sections/TeamSection/` with 2 placeholder team members (Sarah Khan, Fatimah Ahmed). Needs real data before re-enabling.
- **`GlobalContactSection/`** exists in `src/pages/Home/sections/` but is **not imported or used** in `Home.jsx`.

### Minor
- No PropTypes or TypeScript — props are undocumented
- No lazy loading (except the Google Maps iframe)
- No React error boundaries
- Magic numbers in CSS (`top: 100px`, column widths like `420px`) not tied to design tokens

---

## Session Log

### 2026-04-09 — Initial Setup Session
**What we worked on:**
- Initial project push to git (125 files, ~8,700 lines of code)
- Created this `CLAUDE.md`
- Edited `BusinessDestiny.jsx` subheading copy twice (commits `3bbb02f` and `463a72a`) — copy is not finalised

**Completed:**
- Full project structure scaffolded — all 4 pages, all sections, all layout and UI components
- All site copy centralised in `src/locales/en.json`
- Global styles and design system in `src/styles/globals.css`
- Local image assets committed for most sections

**Pending / Next Steps:**
- Implement Cost Calculator page (`/calculator`)
- Connect form submission (ContactFormSection + ContactSection)
- Refactor `BusinessDestiny.jsx` to read from `en.json`
- Replace all placeholder/external images with real assets
- Move all remaining hardcoded copy to `en.json`
- Re-enable `TeamSection` with real team data
- Consider extracting duplicated hero navbar into a shared component

---

## Contact & Brand Info

- **Phone:** +971 4 509 5911
- **Email:** info@stratigi360.com
- **Address:** 107 Al Ahli House C, Al Nahda, Dubai, UAE
- **WhatsApp:** +971045095911
- **Social:** `@stratigi360` on Facebook, Instagram, Twitter, LinkedIn, YouTube
- **Copyright:** Stratigi 360 @ copyright 2024-2025
