# 🛍️ Luxe Store — Premium E-Commerce Platform

A modern React e-commerce app with cart management, wishlist, order tracking, user authentication, and **real-time email notifications** — all powered by localStorage (no backend needed).

## ✨ Key Features

- **Cart & Wishlist** — Add, remove, update quantities. Data persists in localStorage
- **User Authentication** — Sign up / Login with localStorage. No backend required
- **Order Management** — Place orders, view full order history at `/orders`
- **📧 Email Notifications** — Get notified on your email when:
  - A user signs up or logs in (name, email, timestamp)
  - An order is placed (items, total, shipping address)
- **Product Filtering** — Search, category tabs, price range slider, sorting
- **Dark Mode** — Toggle between light and dark themes
- **Smooth Animations** — Framer Motion page transitions and hover effects
- **Form Validation** — Checkout form validated with React Hook Form + Yup
- **Responsive Design** — Works on mobile, tablet, and desktop

## 📧 How Email Notifications Work

This project uses [Web3Forms](https://web3forms.com) to send email alerts directly from the browser — **no backend server needed**.

```
User signs up / logs in / places order
        ↓
Frontend calls Web3Forms API (fetch POST)
        ↓
Web3Forms sends email to the owner
        ↓
Owner receives notification with user details
```

**What you receive:**

| Event | Email Contains |
|-------|---------------|
| Login / Signup | User name, email, timestamp |
| Order Placed | Order ID, item list, total price, shipping address |

**Setup:** Just get a free access key from [web3forms.com](https://web3forms.com), add it to `.env`, and it works.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Navbar, Footer, ErrorBoundary, SkeletonCard
│   └── product/         # ProductCard
├── context/             # Global state management (Context API)
│   └── AppContext.jsx   # Cart, Wishlist, Orders, Auth, Theme
├── hooks/               # Custom React hooks
│   ├── useProducts.js   # Fetch products from API
│   └── useDebounce.js   # Debounced search input
├── pages/               # Route pages
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx       # Order history
│   ├── Wishlist.jsx
│   └── Login.jsx        # Auth page
├── services/
│   ├── api.js           # Axios instance for FakeStore API
│   └── email.js         # Web3Forms email notifications
└── styles/              # CSS files per component
```

## 🛠️ Tech Stack

| Area | Technology |
|------|-----------|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| State | Context API + localStorage |
| Forms | React Hook Form + Yup |
| Animations | Framer Motion |
| HTTP | Axios |
| Email | Web3Forms API |
| Styling | Vanilla CSS + CSS Variables |

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/namangaur28/LUXE-STORE.git
cd LUXE-STORE
npm install
```

### 2. Set up email notifications

1. Go to [web3forms.com](https://web3forms.com) and enter your email
2. Copy the access key from your inbox
3. Create a `.env` file in the root:

```env
VITE_API_URL=https://fakestoreapi.com
VITE_WEB3FORMS_KEY=your_access_key_here
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📚 What I Learned

- Managing global state with Context API (auth, cart, orders, theme)
- Building custom hooks for data fetching and debouncing
- Sending browser-side email notifications without a backend
- Form validation with Yup schemas
- CSS architecture with design tokens and dark mode
- Error boundaries for production-ready React apps

## 📄 License

MIT
