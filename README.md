#  thehamza.tech — macOS & iOS Web Portfolio

> A high-performance, interactive macOS & iOS-inspired web operating system built with Next.js 16, React 19, Tailwind CSS v4, GSAP, and Sanity CMS.

---

## ?? Purpose

Traditional portfolios are static, scroll-through templates. **thehamza.tech** was engineered to challenge that convention entirely.

- **Immersive interaction** — visitors operate a fully functional desktop OS in their browser, not a webpage.
- **Advanced frontend engineering** — demonstrates complex state synchronisation, window virtualisation, hardware-accelerated animations, dual device adaptation, and headless CMS architecture.
- **Storytelling through metaphor** — explore projects via **Finder**, inspect skills through **Terminal**, browse articles in **Safari**, review credentials in a **PDF Resume viewer**, and view photography in **Photos**.

---

## ? What Makes It Unique

### 1. ??? Realistic macOS Desktop Simulation
- **Multi-window virtualisation** — open, drag, resize, and close multiple windows simultaneously.
- **GSAP physics** — smooth, hardware-accelerated dragging powered by `Draggable`.
- **8-directional resizing** — custom resize handles on all 4 borders and 4 corners with enforced min/max bounds.
- **Intelligent Z-index stacking** — focus management brings clicked windows to the foreground and auto-refocuses the next highest window on close.

### 2. ?? Dual Personality (macOS ? iOS)
- **Desktop**: full macOS Ventura environment — menubar, desktop shortcuts, animated Dock with magnification.
- **Mobile**: fluidly transforms into a native iOS experience — iPhone status bar, thumb-friendly app launching, responsive modal windows.

### 3. ?? Deep-Link URL Synchronisation
Every window and project has a live URL (e.g. `/work/project-slug`, `/contact`, `/thinking/article-slug`).

- **Bidirectional**: clicking a window updates the address bar without reload; direct URL access opens the corresponding window.
- **Dynamic SEO metadata**: server-side `generateMetadata` generates unique page titles for every route including deep project links.
- **Deep routes supported**: `/work`, `/skills`, `/services`, `/thinking`, `/lab`, `/now`, `/contact`, `/resume`, `/photos`.

### 4. ??? Purpose-Built Native Applications

| App | Description |
|---|---|
| ?? **Finder** | Multi-pane file manager with sidebar navigation, project folders, and a detail inspector |
| ?? **Safari** | Browser window connected to Sanity `article` documents, falling back to static blog posts |
| ?? **Terminal** | Command-line interface rendering developer skills and tech stacks from Sanity or constants |
| ??? **Photos** | Responsive photo gallery with full-screen lightbox via `yet-another-react-lightbox` |
| ?? **Resume** | In-app PDF viewer powered by `react-pdf` with page navigation and download |
| ?? **Contacts** | Apple-style contact card with social links and email trigger from Sanity `aboutMe` or `person` |

### 5. ? Sanity as a Structured Content Operating System

- **14 document schemas** — `siteSettings`, `person`, `project`, `service`, `article`, `experiment`, `organisation`, `technology`, `testimonial`, `experience`, `education`, `certification`, `now`, `redirect`.
- **Embedded Sanity Studio** at `/studio` with custom desk structure and `@sanity/vision` GROQ explorer.
- **Typed GROQ queries** with a local `defineQuery` helper ready for TypeGen.
- **Server-side proxy API** at `/api/sanity` with query whitelisting and ISR cache headers.
- **Dynamic sitemap** that auto-generates routes for all project, article, and service slugs from Sanity.
- **JSON-LD structured data** (`Person`, `WebSite`, `TechArticle`, `SoftwareApplication`) injected into the root layout.
- **Zero-downtime fallback** — all windows fall back to local constants when Sanity returns no data.

---

## ??? Architecture & Interaction Flow

```mermaid
flowchart TD
    URL[Browser URL / Router] <-->|Bidirectional Sync| RouteSync[useWindowRouteSync Hook]
    RouteSync <--> WindowStore[Zustand Window Store]
    WindowStore <--> DesktopShell[DesktopShell Component]

    DesktopShell --> Dock[macOS Dock]
    DesktopShell --> Navbar[Top Menubar]
    DesktopShell --> Home[Desktop Icons]

    subgraph Windows [Virtual Window System — WindowWrapper HOC]
        W1[Finder.tsx]
        W2[Safari.tsx]
        W3[Terminal.tsx]
        W4[Photos.tsx]
        W5[Resume.tsx]
        W6[Contact.tsx]
    end

    DesktopShell --> Windows
    Sanity[(Sanity CMS)] -->|useSanityData + useSanityQuery| DesktopShell
    Sanity --> API[/api/sanity — Server Proxy]
    Sanity --> Sitemap[/sitemap.xml — Dynamic]
```

---

## ?? Project Structure

```text
thehamza-tech-portfolio/
+-- public/                             # Static public assets
¦   +-- files/                          # PDF documents (resume.pdf)
¦   +-- icons/                          # App & system SVG/PNG icons
¦   +-- images/                         # Wallpapers, thumbnails, avatars
¦
+-- sanity/                             # Sanity Studio schema definitions
¦   +-- schemaTypes/
¦   ¦   +-- documents/                  # 14 document schemas
¦   ¦   ¦   +-- siteSettings.ts
¦   ¦   ¦   +-- person.ts
¦   ¦   ¦   +-- project.ts
¦   ¦   ¦   +-- service.ts
¦   ¦   ¦   +-- article.ts
¦   ¦   ¦   +-- experiment.ts
¦   ¦   ¦   +-- organisation.ts
¦   ¦   ¦   +-- technology.ts
¦   ¦   ¦   +-- testimonial.ts
¦   ¦   ¦   +-- experience.ts
¦   ¦   ¦   +-- education.ts
¦   ¦   ¦   +-- certification.ts
¦   ¦   ¦   +-- now.ts
¦   ¦   ¦   +-- redirect.ts
¦   ¦   ¦   +-- legacy.ts
¦   ¦   +-- objects/                    # Reusable field objects
¦   ¦   ¦   +-- seo.ts
¦   ¦   ¦   +-- socialProfile.ts
¦   ¦   ¦   +-- externalLink.ts
¦   ¦   ¦   +-- source.ts
¦   ¦   +-- index.ts
¦   +-- structure.ts                    # Custom Studio desk structure
¦
+-- src/
¦   +-- app/                            # Next.js 16 App Router
¦   ¦   +-- [...windowRoute]/           # Catch-all: deep-link sync & SEO metadata
¦   ¦   +-- api/sanity/route.ts         # Server-side Sanity proxy with query whitelisting
¦   ¦   +-- studio/[[...tool]]/page.tsx # Embedded Sanity Studio (Client Component)
¦   ¦   +-- studio/layout.tsx           # Full-screen studio layout (noindex)
¦   ¦   +-- sitemap.ts                  # Dynamic sitemap from Sanity slugs
¦   ¦   +-- globals.css                 # Global Tailwind CSS v4 + CSS custom properties
¦   ¦   +-- layout.tsx                  # Root layout — fonts, JSON-LD, viewport
¦   ¦   +-- page.tsx                    # Desktop entry point
¦   ¦
¦   +-- components/                     # Core UI components
¦   ¦   +-- DesktopShell.tsx            # Master container — OS shell, wallpaper, windows
¦   ¦   +-- Dock.tsx                    # macOS animated bottom dock
¦   ¦   +-- Navbar.tsx                  # Top menubar with live clock
¦   ¦   +-- Home.tsx                    # Desktop shortcut icons
¦   ¦   +-- Welcome.tsx                 # Startup greeting overlay
¦   ¦   +-- WindowControls.tsx          # Traffic light buttons (close/minimise/maximise)
¦   ¦   +-- IPhoneStatusBar.tsx         # Mobile status bar simulation
¦   ¦   +-- PDFViewer.tsx               # In-browser PDF renderer (react-pdf)
¦   ¦   +-- index.ts
¦   ¦
¦   +-- windows/                        # Desktop application windows
¦   ¦   +-- Finder.tsx                  # File browser & project explorer
¦   ¦   +-- Safari.tsx                  # Browser window — Sanity articles with fallback
¦   ¦   +-- Terminal.tsx                # Terminal emulator — skills & tech stack
¦   ¦   +-- Photos.tsx                  # Photo gallery with lightbox
¦   ¦   +-- Resume.tsx                  # Embedded PDF resume viewer
¦   ¦   +-- Contact.tsx                 # Contact card from Sanity person
¦   ¦   +-- index.ts
¦   ¦
¦   +-- hoc/
¦   ¦   +-- WindowWrapper.tsx           # HOC: GSAP drag, 8-dir resize, focus & open/close
¦   ¦
¦   +-- hooks/                          # Custom React hooks
¦   ¦   +-- useWindowRouteSync.ts       # Bidirectional URL <-> window state sync
¦   ¦   +-- useSanityData.ts            # Parallel CMS fetch with module-level caching
¦   ¦   +-- useSanityQuery.ts           # Generic typed Sanity query hook
¦   ¦
¦   +-- store/                          # State management (Zustand + Immer)
¦   ¦   +-- window.ts                   # Window open/close, z-index hierarchy, active window
¦   ¦   +-- location.ts                 # Active Finder path (typed FinderItem | null)
¦   ¦
¦   +-- lib/                            # Utilities & integrations
¦   ¦   +-- sanity.ts                   # Sanity client + sanityFetch helper
¦   ¦   +-- queries.ts                  # Legacy GROQ queries (backward-compatible)
¦   ¦   +-- sanity-queries.ts           # Typed GROQ queries for all new document types
¦   ¦   +-- imageUrl.ts                 # Sanity CDN image preset helpers
¦   ¦   +-- finderUtils.ts              # Sanity -> FinderItem converters
¦   ¦   +-- seo/index.ts                # JSON-LD builders & canonical URL helpers
¦   ¦
¦   +-- types/                          # TypeScript definitions
¦   ¦   +-- sanity.ts                   # Manual schema interfaces
¦   ¦   +-- sanity.generated.ts         # TypeGen output (run npm run typegen)
¦   ¦
¦   +-- constants/                      # Fallback content, window config, static data
¦       +-- index.ts
¦
+-- sanity.config.ts                    # Sanity Studio configuration (basePath /studio)
+-- sanity.cli.ts                       # Sanity CLI configuration (TypeGen)
+-- sanity-typegen.json                 # TypeGen path config
+-- .env                                # Sanity environment variables
+-- next.config.mjs                     # Next.js config (transpilePackages, remotePatterns)
+-- package.json                        # Dependencies & scripts
+-- tsconfig.json                       # TypeScript paths & compiler options
```

---

## ??? Tech Stack

| Category | Technology | Role |
|:---|:---|:---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, catch-all routes, server metadata |
| **UI** | [React 19](https://react.dev/) | Component architecture, modern hooks |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Responsive styling, glassmorphism, dark aesthetic |
| **Animations** | [GSAP](https://gsap.com/) | `Draggable`, resize physics, window transitions |
| **State** | [Zustand](https://zustand.docs.pmnd.rs/) + [Immer](https://immerjs.github.io/immer/) | Window stacks, z-index, focus, active location |
| **CMS** | [Sanity.io](https://www.sanity.io/) | Headless content OS — projects, articles, services, person |
| **Studio** | Sanity Studio v3 + Vision | Embedded at `/studio` with custom desk structure |
| **PDF** | [react-pdf](https://projects.wojtekmaj.pl/react-pdf/) | In-app resume rendering |
| **Lightbox** | [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) | High-performance photo gallery |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent vector icon system |
| **Date** | [Day.js](https://day.js.org/) | Live menubar clock, article timestamps |

---

## ?? Getting Started

### Prerequisites
- **Node.js** v18.18.0+
- **npm** (or pnpm / yarn)

### Installation

```bash
# 1. Clone
git clone https://github.com/hamza-jabbar/thehamza-tech-portfolio.git
cd thehamza-tech-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
```

```env
# .env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

> The portfolio ships with local fallback data — it runs fully without live Sanity credentials.

```bash
# 4. Start dev server
npm run dev
# -> http://localhost:3000

# 5. Open Sanity Studio
# -> http://localhost:3000/studio

# 6. Generate TypeScript types from Sanity schemas
npm run typegen

# 7. Production build
npm run build && npm run start
```

---

## ?? Author

**Hamza Jabbar**
- Portfolio: [thehamza.tech](https://thehamza.tech)
- GitHub: [@hamza-jabbar](https://github.com/hamza-jabbar)
