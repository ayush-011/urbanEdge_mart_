# UrbanEdge Mart

A premium e-commerce single-page application for fashion, electronics, and lifestyle products. Shop 194+ curated products with a modern, polished storefront experience.

## Live Demo

> Coming soon

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| State Management | Redux Toolkit + React Context API |
| Routing | React Router DOM 7 |
| Animations | Framer Motion |
| Carousel | Swiper |
| Icons | React Icons + Lucide React |

## Features

### Core Shopping
- **Product Catalog** — Browse 194+ products with advanced filtering (category, brand, price range) and 6 sorting options
- **Product Detail** — Image gallery with zoom, quantity selector, specifications, customer reviews, and related products
- **Shopping Cart** — Full cart with quantity controls, save for later, coupon system, and order summary
- **Checkout** — Multi-step checkout with shipping details and payment form
- **Wishlist** — Save favorites and move items to cart
- **Search** — Debounced search with live suggestions and thumbnails

### User Experience
- **Dark Mode** — System preference detection with manual toggle, anti-flash protection
- **Page Transitions** — Smooth Framer Motion animations between routes
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Glassmorphism Navbar** — Blur and transparency effect on scroll
- **Loading Skeletons** — Skeleton screens during data fetching
- **Toast Notifications** — Auto-dismissing success, error, and info toasts

### Authentication
- Login, registration, and password reset forms
- Local authentication with localStorage persistence
- Protected routes with admin-only access control
- User profile with order history and notifications

### Admin Dashboard
- Revenue stats, product count, and order metrics
- Top products list and low stock alerts
- Recent orders table

### Additional Pages
- About, Contact, FAQ (searchable with category filters)
- Order tracking with live delivery progress
- Shipping & returns policy, privacy policy, terms & conditions
- Curated collections showcase
- 404 not found page

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PrachiStack/UrbanEdge_Mart.git

# Navigate to project directory
cd UrbanEdge_Mart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── assets/              # Images and static assets
├── components/
│   ├── layout/          # Navbar, Footer, Layout, Breadcrumbs
│   ├── home/            # HeroBanner, BrandLogos, CategoryGrid, ProductSection, CustomerReviews
│   ├── product/         # ProductCard
│   └── ui/              # Button, Input, Badge, Rating, Skeleton, Toast
├── context/             # Auth, Cart, Wishlist, Theme, Toast, RecentlyViewed contexts
├── data/                # Products, categories, brands data + fetching logic
├── hooks/               # useDebounce, useLocalStorage, useScrollPosition
├── pages/               # All page components (25+ pages)
├── store/               # Redux store and cart slice
└── utils/               # Helper functions (formatPrice, slugify, cn, etc.)
```

## Available Coupons

| Code | Discount | Minimum Order |
|------|----------|---------------|
| `WELCOME10` | 10% off | None |
| `SAVE20` | 20% off | $50 |
| `FLAT15` | $15 off | $30 |
| `NEXUS25` | 25% off | $100 |

## Shipping

- **Free standard shipping** on orders over $100
- $9.99 flat rate shipping on orders under $100

## License

This project is open source and available under the [MIT License](LICENSE).
