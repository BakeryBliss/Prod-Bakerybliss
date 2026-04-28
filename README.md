# 🧁 BakeryBliss - HCI-Driven Ecommerce Platform for Artisan Bakery Orders

A comprehensive Next.js 15 ecommerce application demonstrating Human-Computer Interaction (HCI) principles in a real-world bakery ordering system. BakeryBliss enables users to discover artisan bakery products, customize orders, process secure payments, and manage their accounts—all with a focus on usability, accessibility, and trust.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [HCI Principles Implementation](#hci-principles-implementation)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Project Structure](#project-structure)
7. [Core Modules](#core-modules)
8. [Accessibility Features](#accessibility-features)
9. [Security & Validation](#security--validation)
10. [Design System](#design-system)
11. [API Documentation](#api-documentation)
12. [Performance Considerations](#performance-considerations)
13. [Deployment](#deployment)
14. [Future Roadmap](#future-roadmap)

---

## 🎯 Project Overview

**BakeryBliss** is an end-to-end ecommerce solution for artisan bakeries, addressing the fragmented experience of traditional phone/chat-based ordering. The platform digitizes the complete customer journey: product discovery → customization → secure payment → post-purchase engagement.

### Problem Statement
- Traditional bakery ordering lacks digital convenience and transparency
- Customers need reliable product browsing, safe payment processing, and real-time delivery tracking
- Local businesses need a scalable platform to reach more customers and manage orders efficiently

### Success Metrics
- **Discoverability**: Search-to-product-click rate and filter engagement
- **Conversion**: Add-to-cart rate and checkout completion rate
- **Retention**: Repeat order rate and profile completion rate
- **Trust**: Payment success rate and customer satisfaction scores

---

## 🧠 HCI Principles Implementation

BakeryBliss implements Nielsen's 10 Usability Heuristics and modern UX best practices:

### 1. **Visibility of System Status** ✅
*"The system should always keep users informed about what's happening, in real time."*

**Implementation:**
- **Loading states**: Suspense boundaries on product pages, profile data areas
- **Interactive feedback**: Immediate visual response on button clicks (opacity changes, state updates)
- **Progress indicators**: Cart total updates in real-time as items are added/removed
- **Payment status**: Clear indication of payment processing stages via Razorpay integration

**Location:** `src/app/customer-profile/components/CustomerProfileInteractive.tsx`, `src/app/products/page.tsx`

---

### 2. **Match Between System and Real World** ✅
*"Speak the users' language, use familiar words, concepts, and real-world conventions."*

**Implementation:**
- **Bakery terminology**: "Flavor," "Size," "Customization notes," "Delivery date"—all in customer vocabulary
- **Local currency**: Indian Rupees (₹) displayed consistently
- **Phone validation**: Indian phone number pattern (10-digit mobile starting with 6-9)
- **Address format**: Standard Indian address structure
- **Order tracking**: Familiar statuses (baking, quality check, packaging, out for delivery, delivered)

**Location:** `src/app/api/orders/route.ts`, `src/app/api/contact/route.ts`, `src/types/database.ts`

---

### 3. **User Control and Freedom** ✅
*"Users often choose system functions by mistake and will need a clearly marked emergency exit."*

**Implementation:**
- **Mobile menu**: Can be opened and closed freely
- **Search escape**: Press Escape to clear search and dismiss suggestions
- **Reversible actions**: Cart modifications are not permanent until checkout
- **Navigation freedom**: No forced checkout flow—users can browse, add items, and navigate away without penalties
- **Clear button**: Search input has explicit clear functionality

**Location:** `src/components/common/Header.tsx`, `src/components/common/SearchBar.tsx`

**Code Example:**
```typescript
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    setIsExpanded(false);
    setShowSuggestions(false);
    setSearchQuery('');
  }
};
```

---

### 4. **Consistency and Standards** ✅
*"Users shouldn't have to wonder whether different words, situations, or actions mean the same thing."*

**Implementation:**
- **Centralized design tokens**: Colors, spacing, typography defined once in Tailwind config
- **Consistent interactions**: Buttons, inputs, and forms follow the same visual and behavioral patterns
- **Unified animations**: 200ms transitions for all smooth state changes
- **Shared component library**: Reusable components (Header, Footer, Breadcrumb, CartIndicator)
- **Standard navigation patterns**: Top header with logo, nav menu, search, and account menu

**Design Tokens:**
- **Primary color**: Warm golden brown (`#8B7355`)
- **Accent**: Dusty rose (`#D4A5A5`)
- **Background**: Warm off-white (`#FAF5F0`)
- **Typography**: Playfair Display (headings), Source Sans (body)

**Location:** `tailwind.config.js`, `src/styles/`

---

### 5. **Error Prevention and Recovery** ✅
*"Even better than good error messages is a careful design which prevents a problem from occurring in the first time."*

**Implementation:**
- **Client-side validation**: Form fields check for required values before submission
- **Server-side validation**: Comprehensive checks on all API endpoints
- **Phone format validation**: Regex pattern ensures valid Indian phone numbers
- **Payment security**: Razorpay signature verification prevents fraudulent transactions
- **Email validation**: Format checks on contact and order emails
- **Empty state handling**: Clear messages when cart is empty or no results found

**API Validation Example:**
```typescript
// Phone number format validation
const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
if (!indianPhoneRegex.test(cleanPhone)) {
  return NextResponse.json(
    { error: 'Please enter a valid 10-digit Indian mobile number' },
    { status: 400 }
  );
}

// Payment signature verification
const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  .update(body)
  .digest('hex');
const isAuthentic = expectedSignature === razorpay_signature;
```

**Location:** `src/app/api/orders/route.ts`, `src/app/api/razorpay/verify/route.ts`

---

### 6. **Recognition Rather than Recall** ✅
*"Minimize the user's memory load by making objects, actions, and options visible."*

**Implementation:**
- **Search suggestions**: Auto-complete shows product names and categories as user types
- **Visual product cards**: Images, prices, and ratings visible at a glance
- **Categorized browsing**: Products organized by type (cakes, pastries, etc.)
- **Account tabs**: Personal info, order history, addresses, payment methods, and preferences all visible in one profile interface
- **Breadcrumb navigation**: Current location always visible (Home > Products > Product Details)
- **Cart indicator**: Badge shows item count in header

**Search Component Features:**
- Real-time suggestions with keyboard navigation
- Highlighted selected item
- Category display alongside product name
- Limited to 8 suggestions for cognitive load

**Location:** `src/components/common/SearchBar.tsx`, `src/components/common/Breadcrumb.tsx`, `src/app/customer-profile/components/CustomerProfileInteractive.tsx`

---

### 7. **Flexibility and Efficiency** ✅
*"Accelerators unseen by the novice user often speed up the interaction for the expert user."*

**Implementation:**
- **Keyboard shortcuts**: Arrow keys (↑↓) and Enter in search for power users
- **Mobile optimization**: Touch-friendly tap targets and swipe interactions
- **Reusable forms**: Same address/payment forms reduce repetition
- **Account dashboard**: Manage all user data from one centralized profile page
- **Saved preferences**: Remember addresses, payment methods, and notification settings
- **Quick actions**: Cart operations (add, update quantity, remove) without page reload

**Keyboard Navigation:**
```typescript
if (e.key === 'ArrowDown') {
  e.preventDefault();
  setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
} else if (e.key === 'Enter') {
  // Navigate to selected product
}
```

**Location:** `src/components/common/SearchBar.tsx`

---

### 8. **Aesthetic and Minimalist Design** ✅
*"Dialogues should not contain information that is irrelevant or rarely needed."*

**Implementation:**
- **Warm color palette**: Brown, cream, and rose tones create welcoming bakery atmosphere
- **Whitespace**: Generous padding and breathing room reduce cognitive overload
- **Card-based layouts**: Product grid and profile sections use consistent card design
- **Icon system**: Semantic icons (shopping bag, heart, user, etc.) reduce text dependence
- **Limited animations**: 200ms smooth transitions provide polish without distraction
- **Typography hierarchy**: Clear distinction between headings, body, and captions
- **Minimal visual noise**: Avoids excessive decorations or CTAs competing for attention

**Color Psychology:**
- **Brown/Cream**: Warmth, trust, and craftsmanship (bakery brand)
- **Rose/Sage**: Sophistication and balance

**Location:** `tailwind.config.js`, all component files

---

### 9. **Help and Documentation** ✅
*"It's necessary to provide help and documentation to accomplish tasks."*

**Implementation:**
- **Legal pages**: Privacy policy, terms & conditions, refund policy, cookie policy
- **About page**: Company story, mission, team, and testimonials build trust
- **Contact options**: Floating chat button, contact dialog, contact form API
- **FAQ-ready**: Structure supports future FAQ integration
- **Email notifications**: Order confirmations and status updates guide users
- **Inline help**: Form labels and placeholders provide context

**Documentation Pages:**
- `/legal/privacy-policy`
- `/legal/terms-conditions`
- `/legal/refund-policy`
- `/legal/cookie-policy`
- `/about-us`

**Location:** `src/app/legal/`, `src/app/about-us/`, `src/components/ui/ContactUsDialog.tsx`

---

### 10. **Accessibility and Inclusive Design** ✅
*"Make your interface accessible to users with disabilities."*

**Implementation:**
- **Semantic HTML**: Proper landmark tags (`<nav>`, `<main>`, `<footer>`)
- **ARIA attributes**: Labels, roles, and descriptions for screen readers
- **Keyboard navigation**: All interactive elements accessible via Tab and Enter
- **Focus states**: Visible focus rings (3px, ring color) on all interactive elements
- **Color contrast**: WCAG AA compliant contrast ratios throughout
- **Alt text**: Descriptive alt attributes on all product images
- **Responsive text**: Font sizes scale appropriately for readability
- **Form accessibility**: Labels associated with inputs, error messages linked to fields

**Code Example:**
```typescript
<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="p-2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 rounded-md"
  aria-label="Toggle navigation menu"
  aria-expanded={isMobileMenuOpen}
>
  <Icon name="Bars3Icon" size={24} />
</button>
```

**Location:** All component files, especially `src/components/common/Header.tsx`, `src/components/common/SearchBar.tsx`

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 15 | Server-side rendering, app router, API routes |
| **UI Library** | React 19 | Component-based UI development |
| **Language** | TypeScript | Type-safe development and better DX |
| **Styling** | Tailwind CSS | Utility-first CSS with custom design tokens |
| **Database** | Supabase (PostgreSQL) | Real-time data, authentication, storage |
| **Payment Processing** | Razorpay | Secure payment gateway with signature verification |
| **Email Service** | Nodemailer + Gmail SMTP | Order confirmations and notifications |
| **Authentication** | Supabase Auth | User registration, login, session management |
| **Icons** | Custom SVG System | Lightweight, accessible icon library |
| **Charts** | Recharts | Order analytics and visualizations |
| **Build Tools** | ESLint, Prettier | Code quality and formatting |

---

## ✨ Features

### 🏠 **Home Page**
- Hero section with call-to-action
- Featured products showcase
- Instagram feed integration
- Customer testimonials carousel
- Newsletter signup
- Trust signals and social proof

### 🛍️ **Product Discovery**
- Full product catalog with grid/list views
- Advanced filtering (category, price, rating)
- Real-time search with keyboard navigation
- Product cards with images, ratings, and pricing
- Sort options (popularity, price, newest)
- Pagination for large product sets

### 📦 **Product Details**
- High-quality image gallery
- Detailed product specifications
- Size and flavor customization options
- Customer reviews and ratings
- Related products recommendations
- Add to cart with quantity selector

### 🛒 **Shopping Cart**
- Real-time cart total calculation
- Quantity adjustment and item removal
- Discount/coupon code application
- Delivery method selection
- Order summary with itemized breakdown
- Clear cart with confirmation

### 💳 **Secure Checkout**
- Razorpay payment gateway integration
- Multiple payment methods (UPI, cards, wallets)
- Signature verification for security
- Order creation on successful payment
- Real-time order confirmation
- Error handling and retry capability

### 👤 **Customer Profile Dashboard**
- **Personal Information Tab**: Update name, email, phone
- **Order History Tab**: View past orders with status tracking
- **Address Book Tab**: Manage multiple delivery addresses
- **Payment Methods Tab**: Save and manage payment options
- **Notification Preferences Tab**: Control communication channels
- **Security Tab**: Password management and session control
- Profile data persistence to Supabase

### 📧 **Order Management**
- Order confirmation emails with itemized details
- Real-time order status updates
- Delivery timeline and tracking
- Post-order contact information
- Reorder functionality from order history
- Cancellation and modification options

### ℹ️ **About Page**
- Company story and mission
- Core values and bakery philosophy
- Team member profiles
- Customer testimonials
- Trust badges and certifications
- Contact call-to-action

### 📞 **Support & Contact**
- Floating contact button (always visible)
- Contact form modal with validation
- Contact API endpoint with email notifications
- FAQ placeholder structure
- Email verification for support tickets
- Support ticket tracking

### ⚖️ **Legal Pages**
- Privacy Policy
- Terms & Conditions
- Refund/Return Policy
- Cookie Policy
- GDPR compliance information
- Contact information for inquiries

### 🔐 **Security Features**
- HTTPS enforcement in production
- Razorpay payment signature verification
- API request validation and sanitization
- Rate limiting on public endpoints
- CORS configuration for API safety
- Secure environment variable management

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ or npm 9+
- Git
- Modern web browser

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd BakeryBliss
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service Configuration
EMAIL_USER=your_gmail_address
EMAIL_APP_PASSWORD=your_gmail_app_password

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:4028
```

### Step 4: Start Development Server
```bash
npm run dev
```
Open [http://localhost:4028](http://localhost:4028) in your browser.

### Step 5: Build for Production
```bash
npm run build
npm run serve
```

---

## 📁 Project Structure

```
BakeryBliss/
├── public/                           # Static assets (images, icons, favicon)
│   └── assets/images/               # Product and page images
│
├── src/
│   ├── app/                         # Next.js app router
│   │   ├── layout.tsx               # Root layout with Header/Footer
│   │   ├── not-found.tsx            # 404 error page
│   │   │
│   │   ├── home/                    # Home page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── FeaturedProducts.tsx
│   │   │       ├── TestimonialsSlider.tsx
│   │   │       ├── InstagramFeed.tsx
│   │   │       └── NewsletterSignup.tsx
│   │   │
│   │   ├── products/                 # Product listing page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ProductGrid.tsx
│   │   │       ├── FilterSidebar.tsx
│   │   │       └── ProductCard.tsx
│   │   │
│   │   ├── product-details/          # Individual product page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ImageGallery.tsx
│   │   │       ├── ProductInfo.tsx
│   │   │       ├── RelatedProducts.tsx
│   │   │       └── Reviews.tsx
│   │   │
│   │   ├── shopping-cart/            # Shopping cart page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ShoppingCartInteractive.tsx
│   │   │       ├── CartItem.tsx
│   │   │       ├── OrderSummary.tsx
│   │   │       └── CouponInput.tsx
│   │   │
│   │   ├── order-confirmation/       # Order confirmation page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── OrderConfirmationInteractive.tsx
│   │   │       ├── OrderSuccessHeader.tsx
│   │   │       ├── OrderDetailsSection.tsx
│   │   │       ├── OrderTrackingSection.tsx
│   │   │       └── NextStepsSection.tsx
│   │   │
│   │   ├── customer-profile/         # User account dashboard
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── CustomerProfileInteractive.tsx
│   │   │       ├── ProfileHeader.tsx
│   │   │       ├── ProfileTabs.tsx
│   │   │       ├── PersonalInfoTab.tsx
│   │   │       ├── OrderHistoryTab.tsx
│   │   │       ├── AddressBookTab.tsx
│   │   │       ├── PaymentMethodsTab.tsx
│   │   │       ├── NotificationPreferencesTab.tsx
│   │   │       └── SecurityTab.tsx
│   │   │
│   │   ├── about-us/                 # About company page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── StorySection.tsx
│   │   │       ├── MissionValuesSection.tsx
│   │   │       ├── TeamSection.tsx
│   │   │       ├── GallerySection.tsx
│   │   │       ├── CTASection.tsx
│   │   │       └── TestimonialsSection.tsx
│   │   │
│   │   ├── legal/                    # Legal and policy pages
│   │   │   ├── page.tsx
│   │   │   ├── privacy-policy/
│   │   │   ├── terms-conditions/
│   │   │   ├── refund-policy/
│   │   │   └── cookie-policy/
│   │   │
│   │   ├── api/                      # API route handlers
│   │   │   ├── contact/
│   │   │   │   └── route.ts          # Contact form endpoint
│   │   │   ├── orders/
│   │   │   │   └── route.ts          # Order creation endpoint
│   │   │   ├── products/
│   │   │   │   ├── route.ts          # Product listing endpoint
│   │   │   │   └── [id]/route.ts     # Individual product endpoint
│   │   │   ├── products/search/
│   │   │   │   └── route.ts          # Product search endpoint
│   │   │   └── razorpay/
│   │   │       ├── order/route.ts    # Create Razorpay order
│   │   │       └── verify/route.ts   # Verify payment signature
│   │   │
│   │   └── auth/
│   │       └── callback/             # Auth callback handler
│   │
│   ├── components/
│   │   ├── common/                  # Shared layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CartIndicator.tsx
│   │   │   ├── UserAccountMenu.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   └── ui/                      # Reusable UI components
│   │       ├── AppIcon.tsx          # Icon wrapper
│   │       ├── AppImage.tsx         # Image wrapper
│   │       ├── ContactUsDialog.tsx  # Contact modal
│   │       ├── FloatingContactButton.tsx
│   │       ├── LoginRegisterDialog.tsx
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   │
│   ├── data/
│   │   └── products.ts              # Product catalog data
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               # Authentication hook
│   │   ├── useProducts.ts           # Product fetching hook
│   │   └── useCart.ts               # Cart state management
│   │
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client
│   │   └── utils.ts                 # Utility functions
│   │
│   ├── services/
│   │   ├── products.ts              # Product service
│   │   ├── orders.ts                # Order service
│   │   ├── auth.ts                  # Auth service
│   │   └── payment.ts               # Payment service
│   │
│   ├── types/
│   │   ├── database.ts              # Database type definitions
│   │   ├── product.ts               # Product types
│   │   └── order.ts                 # Order types
│   │
│   └── styles/
│       ├── index.css                # Global styles
│       ├── tailwind.css             # Tailwind directives
│       └── animations.css           # Custom animations
│
├── public/                          # Static files
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.js               # Tailwind CSS theme and tokens
├── tsconfig.json                    # TypeScript configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

---

## 🧩 Core Modules

### 1. **Product Discovery Module**
- Manages product catalog, filtering, and search
- Real-time search suggestions with keyboard navigation
- Category-based organization
- Price range filtering
- Rating and review system

**Files:** `src/app/products/`, `src/services/products.ts`

### 2. **Shopping Cart Module**
- Cart state management (add, update, remove)
- Discount code application
- Real-time total calculation
- Delivery method selection
- Order summary generation

**Files:** `src/app/shopping-cart/`, `src/hooks/useCart.ts`

### 3. **Payment Processing Module**
- Razorpay integration for secure payments
- Payment order creation
- Signature verification for fraud prevention
- Error handling and retry logic
- Payment confirmation

**Files:** `src/app/api/razorpay/`, `src/services/payment.ts`

### 4. **Order Management Module**
- Order creation and storage
- Order history tracking
- Status updates (baking, quality check, packaging, out for delivery, delivered)
- Email notifications
- Reorder functionality

**Files:** `src/app/api/orders/`, `src/app/order-confirmation/`

### 5. **Customer Profile Module**
- User account management
- Personal information updates
- Address book management
- Payment method storage
- Notification preferences
- Security settings

**Files:** `src/app/customer-profile/`, `src/services/auth.ts`

### 6. **Contact & Support Module**
- Contact form with validation
- Email notifications to support team
- Support ticket creation
- Floating contact button
- Help documentation

**Files:** `src/app/api/contact/`, `src/components/ui/ContactUsDialog.tsx`

### 7. **Authentication Module**
- User registration and login
- Session management
- Password reset
- Social authentication (future)
- Supabase auth integration

**Files:** `src/hooks/useAuth.ts`, `src/services/auth.ts`

---

## ♿ Accessibility Features

### Screen Reader Support
- Semantic HTML landmarks (`nav`, `main`, `footer`)
- ARIA labels for interactive elements
- ARIA descriptions for complex components
- Alt text on all images
- Form labels properly associated with inputs

### Keyboard Navigation
- All interactive elements accessible via Tab
- Enter/Space to activate buttons
- Arrow keys for selection (search suggestions)
- Escape to close modals and menus
- Focus visible with ring-3 outline

### Visual Accessibility
- Minimum contrast ratio: WCAG AA (4.5:1 for text)
- Focus indicators on all interactive elements
- Color not the only way to convey information
- Font sizes scale responsively (min 16px base)
- Sufficient padding/spacing around touch targets

### Motor Accessibility
- Large click targets (min 44x44px)
- No time-dependent interactions
- Reversible actions (cart can be modified before checkout)
- Error messages point to problematic fields
- Form validation with helpful error text

### Cognitive Accessibility
- Clear, simple language throughout
- Consistent terminology and patterns
- Logical information hierarchy
- Minimal distractions and animations
- Help text and examples in forms

---

## 🔐 Security & Validation

### Server-Side Validation
```typescript
// API endpoint validation example
if (!customerName || customerName.trim().length === 0) {
  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}

// Phone format validation
const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
if (!indianPhoneRegex.test(cleanPhone)) {
  return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
}
```

### Payment Security
- **Razorpay Integration**: PCI-DSS compliant payment gateway
- **Signature Verification**: HMAC-SHA256 verification of payment signature before order creation
- **No Card Storage**: Cards processed directly by Razorpay
- **Secure Environment Variables**: Sensitive keys never exposed to client

```typescript
// Payment verification
const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  .update(razorpay_order_id + '|' + razorpay_payment_id)
  .digest('hex');
const isAuthentic = expectedSignature === razorpay_signature;
```

### Data Protection
- HTTPS enforcement in production
- CORS configuration on API endpoints
- Request rate limiting (future enhancement)
- Secure session management with Supabase
- Environment variable isolation

### Email Notifications
- Transactional emails via Gmail SMTP
- Order confirmations include verification
- Contact form notifications
- Email content sanitization

---

## 🎨 Design System

### Color Palette

| Color | HEX | Usage | RGB |
|-------|-----|-------|-----|
| **Primary** | #8B7355 | Main brand, CTA buttons | 139, 115, 85 |
| **Primary Foreground** | #1a1a1a | Text on primary | 26, 26, 26 |
| **Secondary** | #F5E6D3 | Cards, backgrounds | 245, 230, 211 |
| **Accent** | #D4A5A5 | Highlights, secondary CTA | 212, 165, 165 |
| **Success** | #84B85F | Positive actions | 132, 184, 95 |
| **Warning** | #F4A460 | Alerts, cautions | 244, 164, 96 |
| **Error** | #E17676 | Errors, destructive actions | 225, 118, 118 |
| **Background** | #FAF5F0 | Page background | 250, 245, 240 |
| **Foreground** | #1a1a1a | Primary text | 26, 26, 26 |

### Typography

| Element | Font Family | Size | Weight | Line Height |
|---------|-------------|------|--------|-------------|
| **Heading 1** | Playfair Display | 2.5rem (40px) | 700 Bold | 1.2 |
| **Heading 2** | Playfair Display | 2rem (32px) | 700 Bold | 1.2 |
| **Heading 3** | Playfair Display | 1.5rem (24px) | 600 SemiBold | 1.3 |
| **Body** | Source Sans 3 | 1rem (16px) | 400 Regular | 1.5 |
| **Small** | Source Sans 3 | 0.875rem (14px) | 400 Regular | 1.5 |
| **Caption** | Nunito Sans | 0.75rem (12px) | 400 Regular | 1.4 |

### Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Border Radius
```
sm: 0.25rem (4px)
md: 0.5rem (8px)
lg: 1rem (16px)
xl: 1.5rem (24px)
```

### Shadows
```
warm-sm: 0 2px 4px rgba(139, 115, 85, 0.05)
warm-md: 0 4px 12px rgba(139, 115, 85, 0.1)
warm-lg: 0 8px 24px rgba(139, 115, 85, 0.15)
```

### Animations
- **Transition Smooth**: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- **Duration Fast**: 150ms
- **Duration Normal**: 200ms
- **Duration Slow**: 300ms

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:4028/api
Production: https://bakerybliss.com/api
```

### Endpoints Overview

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/products` | List all products | No |
| GET | `/products/[id]` | Get single product | No |
| GET | `/products/search` | Search products | No |
| POST | `/orders` | Create order | No |
| POST | `/contact` | Submit contact form | No |
| POST | `/razorpay/order` | Create payment order | No |
| POST | `/razorpay/verify` | Verify payment | No |

### Example: Create Order

**Request:**
```bash
curl -X POST http://localhost:4028/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "phoneNumber": "9876543210",
    "email": "john@example.com",
    "address": "123 Main St, City",
    "deliveryDate": "2026-01-15",
    "cartItems": [
      {
        "id": "1",
        "name": "Chocolate Cake",
        "price": 45.99,
        "quantity": 1,
        "size": "8 inch",
        "flavor": "Dark Chocolate"
      }
    ],
    "summary": {
      "subtotal": 45.99,
      "tax": 3.00,
      "deliveryFee": 5.00,
      "discount": 0,
      "total": 53.99
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderNumber": "BB-ABC123DEF"
}
```

### Example: Verify Payment

**Request:**
```bash
curl -X POST http://localhost:4028/api/razorpay/verify \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_123456",
    "razorpay_payment_id": "pay_123456",
    "razorpay_signature": "signature_hash",
    "orderDetails": { /* order data */ }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "orderNumber": "BB-ABC123DEF"
}
```

---

## ⚡ Performance Considerations

### Frontend Optimization
- **Code Splitting**: Route-based code splitting via Next.js
- **Image Optimization**: Next.js `Image` component with lazy loading
- **CSS Optimization**: Tailwind CSS purges unused styles in production
- **Tree Shaking**: Unused code removed during build
- **Compression**: Gzip compression on production server

### Backend Optimization
- **Database Indexing**: Indexes on frequently queried fields
- **Caching**: Server-side caching of product catalog
- **Query Optimization**: Minimal database calls per request
- **API Response Compression**: Gzip compression on JSON responses
- **Connection Pooling**: Supabase connection pool management

### Bundle Size Analysis
```bash
npm run build  # Shows bundle size breakdown
```

### Performance Metrics
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTL** (Time to Interactive): < 3.5s

### Monitoring
- Core Web Vitals tracking via web-vitals library
- Error tracking via Sentry (future)
- Analytics via Google Analytics or Mixpanel (future)

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server on port 4028
npm run dev -- -p 3000  # Change port

# Building
npm run build            # Build for production
npm run start            # Start production server
npm run serve            # Alias for start

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking

# Database
npm run db:sync          # Sync database schema
npm run db:migrate       # Run migrations
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure Environment Variables**
   - Add all `.env.local` variables in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Connect Repository**
   - Link GitHub repo to Netlify

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**
   - Add in Site Settings → Build & Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4028
CMD ["npm", "run", "serve"]
```

```bash
docker build -t bakerybliss .
docker run -p 4028:4028 bakerybliss
```

---

## 🗺️ Future Roadmap

### Phase 1 (Now - 2 weeks)
- [ ] Activate order confirmation page
- [ ] Replace alert/confirm with accessible modals
- [ ] Unified client/server validation schemas
- [ ] Payment page error recovery flows

### Phase 2 (2-6 weeks)
- [ ] Real-time order tracking with WebSocket
- [ ] Admin dashboard for order management
- [ ] Inventory management system
- [ ] Analytics dashboard
- [ ] Email notification templates
- [ ] Customer loyalty program

### Phase 3 (6-12 weeks)
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Personalized email marketing
- [ ] Review system with moderation
- [ ] Subscription/recurring orders
- [ ] Multi-language support

### Phase 4 (12+ months)
- [ ] Multi-location support
- [ ] Franchisee dashboard
- [ ] Advanced analytics and reporting
- [ ] Supply chain integration
- [ ] Inventory forecasting
- [ ] B2B wholesale portal

---

## 🤝 Contributing

### Guidelines
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request with description

### Code Style
- Follow ESLint/Prettier configuration
- Use TypeScript strict mode
- Write meaningful commit messages
- Add comments for complex logic
- Maintain test coverage above 80%

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 📞 Support & Contact

- **Email**: support@bakerybliss.com
- **Phone**: +91 (XXX) XXX-XXXX
- **Address**: [Bakery Location]
- **Hours**: Monday - Friday, 9 AM - 6 PM IST

---

## 🙏 Acknowledgments

- Design inspiration from modern ecommerce platforms
- HCI principles from Nielsen Norman Group
- Icons from Heroicons
- Color palette inspired by warm, artisan bakery aesthetics

---

**Last Updated:** January 2026  
**Version:** 1.0.0
