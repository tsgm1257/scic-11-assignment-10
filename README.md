# Simple Store

A modern, minimal storefront built with **Next.js 15 (App Router)**, **NextAuth**, **MongoDB Atlas**, and **Tailwind v4**. Public product browsing with details, plus a protected dashboard to add products after signing in (Google or credentials). Includes search, sort, pagination, categories, dark mode, toasts, and responsive UI.

---

## Live Site

**URL:** https://YOUR-VERCEL-APP.vercel.app  
_(Replace with your deployed link once you push to Vercel.)_

---

## Short Description

Simple Store lets anyone browse products and view details. Authenticated users can add new products from a protected dashboard. The app demonstrates:

- Public pages: Landing, Products (search/sort/paginate/filter), Product Details, About
- Auth pages: Login, Register (credentials) + Google sign-in
- Protected page: Add Product (server-side auth guard)
- MongoDB Atlas data layer (no Prisma/mongoose)
- Tailwind v4 styling with dark mode & animations
- Toasts for actions (e.g., add product; “Add to cart” = coming soon)

---

## Setup & Installation

### 1) Clone & install
```bash
git clone https://github.com/your-username/scic-11-assignment-10.git
cd scic-11-assignment-10
npm install
```
### 2) Environment variables

Create .env.local in the project root:
```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32+char-random-secret

# Google OAuth (optional but recommended)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Atlas
MONGODB_URI="your-mongodb-atlas-connection-string"
MONGODB_DB_NAME="simple_store_db"
```
### Google OAuth setup (console.cloud.google.com):

- Create OAuth Client ID (Web application)

- Authorized redirect URI (local): http://localhost:3000/api/auth/callback/google

- Authorized redirect URI (prod): https://YOUR-VERCEL-APP.vercel.app/api/auth/callback/google

### 3) Run locally

```bash
npm run dev
# open http://localhost:3000
```
## Route Summary
Pages (App Router)
| Route                    | Type | Auth          | Description                                                                                                                       |
| ------------------------ | ---- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/`                      | Page | Public        | Landing page with hero (image-first on mobile), benefits band, categories linking to filtered products, and 4 product highlights. |
| `/products`              | Page | Public        | Catalog with search, **category** filter, sort, pagination, skeleton loading, and empty state.                                    |
| `/products/[id]`         | Page | Public        | Modern product details (breadcrumb, big image, price, bullets, **Share**, **Add to cart** toast, related products).               |
| `/about`                 | Page | Public        | Modern brand page with gradient hero, features, story timeline, policies, and contact CTA.                                        |
| `/login`                 | Page | Public        | Credentials login (toasts) + Google sign-in; redirects to `/products`.                                                            |
| `/register`              | Page | Public        | Create an account with email/password, then sign in.                                                                              |
| `/dashboard/add-product` | Page | **Protected** | Add product form (name, description, price, image, **category**). Unauth users are redirected to `/login`.                        |
---
API Endpoints (Route Handlers)
| Endpoint             | Method(s) | Auth          | Purpose                                                                             |
| -------------------- | --------- | ------------- | ----------------------------------------------------------------------------------- |
| `/api/products`      | `GET`     | Public        | Returns product list for pages (supports client-side filtering via query on page).  |
| `/api/products`      | `POST`    | **Protected** | Creates a new product in MongoDB. Validates name, description, price, and category. |
| `/api/auth/register` | `POST`    | Public        | Registers a credentials user (email + password hash).                               |
| `/api/seed`          | `POST`    | Public (dev)  | Inserts sample products into MongoDB (disable/remove in production).                |
| `/api/auth/*`        | NextAuth  | Mixed         | NextAuth routes for sessions and OAuth callbacks.                                   |

## Dev Notes
- Auth: NextAuth with Google + Credentials. getServerSession(authOptions) is used to guard protected routes.
- DB: MongoDB Atlas with official mongodb driver. Connection util in src/lib/db.js.
- UI: Tailwind (global import), dark mode via .dark class and ThemeToggle. Responsive, sticky navbar with hamburger.
- UX: react-hot-toast enabled globally (see Providers.js). “Add to cart” uses a toast: “Feature coming soon.”
- Catalog: Category tiles on landing link to /products?category=.... Products page supports q, category, sort, perPage, page.
- Accessibility: Buttons/links have labels/titles; focusable elements include visible states via Tailwind classes.