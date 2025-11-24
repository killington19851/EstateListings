# Chalet Stay - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Airbnb's hospitality-focused UI combined with the refined elegance of high-end vacation rental platforms. This creates trust, showcases properties beautifully, and provides intuitive booking-oriented navigation.

**Design Principles**:
- Image-first presentation that showcases chalets prominently
- Generous whitespace creates breathing room and luxury feel
- Warm, inviting aesthetic balanced with professional credibility
- Clear hierarchy guiding users from discovery to property details

---

## Typography

**Font System** (via Google Fonts CDN):
- **Primary**: Manrope (headings, navigation, CTAs) - modern, geometric, warm
- **Secondary**: Inter (body text, descriptions) - highly readable, professional

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl, font-bold
- Property Titles: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body Text: text-base, font-normal
- Small Text/Metadata: text-sm, text-muted

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- Micro spacing (within components): 2, 4
- Component internal padding: 6, 8
- Component external margins: 12, 16
- Section padding: 20, 24 (py-20 desktop, py-12 mobile)

**Container Widths**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4
- Content sections: max-w-6xl
- Property cards grid: max-w-7xl

**Grid Systems**:
- Property listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Featured properties: grid-cols-1 lg:grid-cols-2 gap-8
- Property detail amenities: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4

---

## Component Library

### Navigation
- Sticky header with logo left, navigation center, "List Property" CTA right
- Transparent on hero with blur backdrop, solid white on scroll
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- Full-width, 85vh height with dramatic chalet landscape image
- Centered search bar overlay with blurred background (backdrop-blur-md)
- Search inputs: Location, Check-in, Check-out, Guests - all in one horizontal bar
- Primary CTA button with blurred background treatment

### Property Cards
- Aspect ratio 4:3 image with rounded corners (rounded-xl)
- Image carousel with navigation dots
- Card content: Price (prominent, top-right on image), Title, Location, Specs row (bedrooms/bathrooms/sqft with icons), Brief amenities list
- Subtle shadow on hover (transition shadow duration-300)

### Filters & Search
- Horizontal filter bar with dropdowns: Price Range, Bedrooms, Bathrooms, Location, Amenities (fireplace, hot tub, ski access, mountain view)
- Toggle buttons for quick filters (Pet Friendly, Hot Tub, Ski-In/Out)
- Active filter pills showing current selections

### Property Detail Page
- Large image gallery: Main hero image (16:9) with thumbnail grid below
- Two-column layout: Left (images, description, amenities), Right (sticky booking card)
- Booking card: Pricing, date picker, guest selector, total calculation, "Reserve" CTA
- Amenities grid with icons
- Location map integration
- Host information card
- Reviews section with rating breakdown

### Footer
- Multi-column (4 columns desktop, stacked mobile)
- Columns: About, Explore, Support, Contact
- Newsletter signup with email input and subscribe button
- Social media icons
- Trust indicators (secure booking, verified properties)

---

## Images Strategy

**Landing Page**:
- **Hero Image**: Large, immersive mountain chalet scene - snow-covered peaks, cozy exterior with warm lighting, winter/alpine setting (85vh)
- **Featured Properties Section**: 6-9 property card images showing diverse chalets
- **Experience/Lifestyle Section**: 2-3 large images showing chalet interiors (living room with fireplace, hot tub with mountain view)

**Property Listing Page**:
- Property card images (4:3 aspect ratio) - each card showing main chalet view

**Property Detail Page**:
- 8-12 high-quality images in gallery
- Main hero image (mountain view)
- Additional images: exterior, living spaces, bedrooms, kitchen, outdoor areas, views
- Thumbnail navigation below main image

**Image Treatment**:
- Subtle overlay gradient on hero images for text readability
- Rounded corners on all property images (rounded-xl)
- Lazy loading for performance
- Placeholder: skeleton loader with mountain icon

---

## Interactive Elements

**Buttons**:
- Primary CTA: Larger padding (px-8 py-4), rounded-lg, font-semibold
- Secondary: Outlined with border, matching padding
- Icon buttons: Favorite/save (heart icon), Share

**Forms**:
- Search inputs with icons (location pin, calendar, users)
- Date pickers styled consistently
- Dropdown filters with smooth animations

**Cards**:
- Clickable entire card area
- Favorite button (top-right corner) independent click zone

**Animations**: Minimal and purposeful
- Smooth transitions on hover states (duration-300)
- Fade-in on scroll for property cards (stagger effect)
- Smooth scroll to sections

---

## Accessibility

- All images include descriptive alt text
- Form inputs have visible labels and proper ARIA attributes
- Keyboard navigation fully supported
- Color contrast meets WCAG AA standards
- Focus indicators on all interactive elements

---

## Icons

**Library**: Heroicons (CDN)
- Navigation, amenities, property specs, UI controls
- Consistent 24px size for amenity icons, 20px for inline icons