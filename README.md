# ShopSmart AI — Frontend

The frontend for **ShopSmart AI**, a modern AI-powered e-commerce platform built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It delivers a fast, responsive, and intuitive shopping experience with secure authentication, Stripe payments, and AI-assisted product discovery.

Built with a scalable component-based architecture and optimized for performance, accessibility, and developer experience.

---

## Live Links

- **Live Website:** shops-mart-frontend.vercel.app
- **Backend API:** https://shopsmart-backend-1-j5zu.onrender.com

> **Note:** The backend is hosted on Render's free tier. If it has been idle, the first API request may take 30–60 seconds while the server wakes up.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui, Lucide React |
| **Routing** | React Router DOM |
| **State Management** | TanStack Query, Context API |
| **Forms** | React Hook Form + Zod |
| **Authentication** | JWT Authentication |
| **Payments** | Stripe Checkout |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |

---

# Features

## Authentication

- User registration & login
- Secure JWT authentication
- Persistent sessions
- Forgot & reset password
- Protected routes
- Role-based navigation

---

## Shopping Experience

- Browse products
- Advanced search
- Category filtering
- Product sorting
- Pagination
- Product details
- Related products

---

## Cart & Wishlist

- Add/remove cart items
- Update item quantities
- Persistent shopping cart
- Wishlist management
- Move wishlist items to cart
- Coupon application

---

## Checkout

- Stripe Checkout integration
- Secure payment flow
- Order confirmation
- Order history
- Payment status tracking

---

## User Dashboard

- Profile management
- Avatar upload
- Password update
- View order history
- Track order status

---

## Admin Dashboard

- Dashboard analytics
- Product management
- Category management
- Coupon management
- Order management
- User management
- Inventory monitoring
- Revenue statistics

---

## UI/UX

- Fully responsive design
- Mobile-first layout
- Modern interface
- Loading skeletons
- Empty states
- Error handling
- Toast notifications
- Accessible components

---

## Folder Structure

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── ui/
│   ├── layout/
│   └── product/
├── pages/
├── layouts/
├── hooks/
├── services/
├── api/
├── context/
├── routes/
├── types/
├── utils/
├── constants/
├── lib/
├── App.tsx
└── main.tsx
```

---

# Local Setup

Clone the repository

```bash
git clone https://github.com/ShahriarHZ/ShopsMart_Frontend.git

cd ShopsMart_Frontend

npm install
```
Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---
# Main Pages

- Home
- Products
- Product Details
- Categories
- Cart
- Wishlist
- Checkout
- Login
- Register
- Forgot Password
- Profile
- Orders
- Admin Dashboard
- Error (404)

---

# Performance Optimizations

- Code Splitting
- Lazy Loading
- Route-based loading
- Image optimization
- API caching with TanStack Query
- Responsive images
- Optimized bundle size

---

# Deployment

The frontend is deployed on **Vercel**.

Build command:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Future Improvements

- AI chatbot shopping assistant
- Product recommendations using AI
- Recently viewed products
- Product comparison
- Multi-language support
- Dark mode
- PWA support
- Push notifications
- Voice search
- Social login

---

# License

This project was built as a **learning and portfolio project** to demonstrate full-stack development skills using modern web technologies.
