# Roomify

Roomify is a full-stack furniture e-commerce platform built with React, Express, MongoDB, Stripe, Cloudinary, Google OAuth, and an AI chat assistant. It includes customer shopping flows, admin inventory and order operations, delivery staff workflows, authenticated checkout, email verification, password recovery, wishlist management, and 3D product viewing.

The project is organized as a production-style monorepo with separate frontend and backend applications.

## Table of Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Product Scope](#product-scope)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Authentication Model](#authentication-model)
- [Payments](#payments)
- [Deployment](#deployment)
- [Quality Checks](#quality-checks)
- [Contributing](#contributing)

## Highlights

- Customer storefront with home, shop, product details, cart, checkout, order history, profile, wishlist, and story pages.
- Role-based dashboards for admins and delivery users.
- Secure auth using HTTP-only cookies, JWT access tokens, rotating refresh tokens, and role guards.
- Google OAuth sign-in with verified email enforcement.
- Email verification, resend verification, change verification email, forgot password, and reset password flows.
- Product catalog with pagination-ready MongoDB models, image uploads, categories, specifications, and optional 3D models.
- Cart and checkout flows with stock validation and order creation.
- Stripe Checkout support with webhook-driven payment status updates.
- Delivery workflow for available orders, claiming orders, marking delivery completion, and viewing delivery history.
- Admin workflow for product management, order management, delivery personnel, assignment, and dashboard analytics.
- AI chat endpoint backed by LangChain/LangGraph integrations.
- Deploy-ready URL configuration for separate frontend and backend domains.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Axios
- Google Model Viewer

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- Mongoose Paginate
- JWT
- Passport Google OAuth 2.0
- Stripe
- Cloudinary
- Multer
- Nodemailer
- LangChain and LangGraph
- Zod

## Product Scope

Roomify supports three main user experiences.

### Customer

- Browse products by category and filters.
- View product details, images, specs, ratings, and 3D models.
- Register, sign in, sign out, verify email, and recover password.
- Add products to cart and update quantities.
- Save products to wishlist.
- Place cash orders or pay by card through Stripe Checkout.
- Track previous orders and order details.
- Manage profile and shipping information.

### Admin

- View dashboard analytics.
- Create, update, and delete products.
- Upload product images and 3D model files.
- View and update orders.
- Assign orders to delivery personnel.
- Create, update, deactivate, and delete delivery users.
- Inspect delivery personnel history.

### Delivery

- View available delivery orders.
- Claim orders.
- View assigned delivery details.
- Mark orders as delivered.
- Review delivery history and profile.

## Architecture

```text
Roomify
|-- Client/                 React + Vite frontend
|   |-- src/
|   |   |-- assets/         Images, icons, static frontend assets
|   |   |-- components/     Shared UI and common components
|   |   |-- features/       Feature-oriented modules
|   |   |-- hooks/          Reusable React hooks
|   |   |-- layout/         Main, admin, and delivery layouts
|   |   |-- pages/          Route-level pages
|   |   |-- store/          Zustand auth/session state
|   |   |-- styles/         Global styles
|   |   `-- utils/          Axios, route helpers, shared utilities
|
|-- Server/                 Express API
|   |-- src/
|   |   |-- agents/         AI agent setup
|   |   |-- config/         Database, Cloudinary, URL helpers
|   |   |-- controller/     Request handlers by domain
|   |   |-- middleware/     Auth, upload, Google OAuth middleware
|   |   |-- model/          Mongoose schemas
|   |   |-- routes/         Express route definitions
|   |   `-- utils/          Tokens, email, cookies, Cloudinary helpers
|
|-- UI/                     Static design references and prototypes
`-- Documents/              Supporting project documents
```

## Repository Structure

Important application files:

- `Client/src/App.jsx` - frontend route tree and role-protected routing.
- `Client/src/utils/axios.js` - shared Axios instance, API URL builder, and refresh-token interceptor.
- `Client/src/store/authStore.js` - auth/session state.
- `Server/src/app.js` - Express app, middleware, routes, CORS, startup.
- `Server/src/config/db.js` - MongoDB connection.
- `Server/src/config/urls.js` - deployment-safe frontend/backend URL helpers.
- `Server/src/utils/cookieOptions.js` - shared secure cookie settings.
- `Server/src/routes/*.js` - API route modules.
- `Server/src/middleware/authMiddleware.js` - JWT and role authorization.
- `Server/src/controller/paymentController.js` - Stripe Checkout and webhook processing.

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- npm
- MongoDB database
- Stripe account for card payments
- Cloudinary account for uploads
- Google OAuth credentials for Google login
- SMTP credentials for transactional email

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Roomify
```

### 2. Install dependencies

Install frontend dependencies:

```bash
cd Client
npm install
```

Install backend dependencies:

```bash
cd ../Server
npm install
```

### 3. Configure environment files

Create local env files from the examples:

```bash
cd ../Client
cp .env.example .env

cd ../Server
cp .env.example .env
```

For local development, typical values are:

```bash
# Client/.env
VITE_API_URL=http://localhost:4000/
```

```bash
# Server/.env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```

Fill in database, auth, Stripe, Cloudinary, Google OAuth, and email secrets in `Server/.env`.

### 4. Run the backend

```bash
cd Server
npm run dev
```

The API runs on `http://localhost:4000` by default.

### 5. Run the frontend

```bash
cd Client
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment Variables

### Client

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | Public backend API URL used by Axios and OAuth redirects. | `https://api.roomify.com/` |

### Server

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Runtime environment. Use `production` in deployment. |
| `PORT` | API server port. |
| `FRONTEND_URL` | Public frontend URL used for CORS, redirects, emails, and Stripe return URLs. |
| `BACKEND_URL` | Public backend URL used for OAuth callback generation. |
| `GOOGLE_CALLBACK_URL` | Explicit Google OAuth callback URL. Overrides generated callback URL. |
| `MONGO_URI` | MongoDB connection URI. |
| `MONGO_DB_NAME` | Optional database name override. |
| `JWT_SECRET` | JWT access-token signing secret. |
| `JWT_EXPIRES_IN` | Access-token lifetime, for example `10m`. |
| `JWT_REFRESH_SECRET` | JWT refresh-token signing secret. |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token lifetime, for example `7d`. |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret. |
| `STRIPE_SECRET_KEY` | Stripe server secret key. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `EMAIL_USER` | SMTP/email account username. |
| `EMAIL_PASS` | SMTP/email account password or app password. |

## Available Scripts

### Client

```bash
npm run dev       # Start Vite dev server
npm run build     # Build production frontend
npm run preview   # Preview built frontend
npm run lint      # Run ESLint
```

### Server

```bash
npm run start     # Start Express server
npm run dev       # Start server with nodemon
npm run seed      # Run database seed script
```

## API Overview

The API is mounted from `Server/src/app.js`.

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic backend health response. |

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Create local account and send verification email. |
| `POST` | `/auth/login` | Sign in with email and password. |
| `GET` | `/auth/refresh` | Refresh access and refresh tokens. |
| `POST` | `/auth/logout` | Clear session cookies and revoke stored refresh token. |
| `GET` | `/auth/google` | Start Google OAuth login. |
| `GET` | `/auth/google/callback` | Google OAuth callback. |
| `GET` | `/auth/verify-email/:token` | Verify customer email. |
| `POST` | `/auth/resendVerificationEmail` | Resend verification email. |
| `PATCH` | `/auth/verification-email` | Change unverified account email. |
| `POST` | `/auth/reset-password` | Send password reset email. |
| `PATCH` | `/auth/changePassword/:token` | Complete password reset. |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | List products. |
| `GET` | `/products/:id` | Get product details. |

### Cart

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/cart/add` | Add product to cart. |
| `GET` | `/cart` | Get authenticated user's cart. |
| `PATCH` | `/cart/update` | Update item quantity. |
| `DELETE` | `/cart/delete/:productId` | Remove one product from cart. |
| `DELETE` | `/cart/delete/clear` | Clear cart. |

### Orders and Payments

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/order/add` | Create cash order. |
| `GET` | `/order` | List authenticated user's orders. |
| `GET` | `/order/:id` | Get order details. |
| `PATCH` | `/order/cancel/:id` | Cancel an order. |
| `POST` | `/order/create-checkout-session` | Create Stripe Checkout session. |
| `POST` | `/order/webhook` | Stripe webhook endpoint. |

### User

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/user` | Get current user data. |
| `PATCH` | `/user/edit` | Update profile data. |
| `DELETE` | `/user/delete` | Soft delete user account. |
| `POST` | `/user/wishlist/:ProductID` | Toggle wishlist product. |
| `GET` | `/user/wishlist` | Get wishlist products. |

### Admin

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/admin/product/add` | Create product with uploaded images/model. |
| `PATCH` | `/admin/product/update/:id` | Update product. |
| `DELETE` | `/admin/product/delete/:id` | Delete product. |
| `GET` | `/admin/orders` | List all orders. |
| `PATCH` | `/admin/orders/:id` | Update order status. |
| `PATCH` | `/admin/orders/assign/:id` | Assign order to delivery user. |
| `GET` | `/admin/delivery` | List delivery users. |
| `POST` | `/admin/delivery/add` | Create delivery user. |
| `GET` | `/admin/delivery/:id` | Get delivery user details. |
| `GET` | `/admin/delivery/:id/history` | Get delivery user history. |
| `PATCH` | `/admin/delivery/update/:id` | Update delivery user. |
| `PATCH` | `/admin/delivery/status/:id` | Toggle delivery user status. |
| `DELETE` | `/admin/delivery/delete/:id` | Delete delivery user. |
| `GET` | `/admin/dashboard` | Get dashboard analytics. |

### Delivery

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/delivery/available` | List available orders. |
| `PATCH` | `/delivery/claim/:id` | Claim an order. |
| `PATCH` | `/delivery/deliverd/:id` | Mark order delivered. |
| `GET` | `/delivery` | List assigned deliveries. |
| `GET` | `/delivery/:id` | Get assigned delivery details. |

### Chat

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/chatBot` | Start a chat session. |
| `POST` | `/chatBot/:threadID` | Continue an existing chat session. |

## Authentication Model

Roomify uses an HTTP-only cookie session model backed by JWTs.

- `accessToken` stores short-lived access credentials.
- `refreshToken` stores a longer-lived refresh credential.
- The client sends requests with `withCredentials: true`.
- Axios retries failed `401` requests by calling `/auth/refresh`.
- Refresh tokens are stored on the user document and rotated.
- Role-based guards protect admin and delivery routes.
- Customer-only actions that require trust also use email verification checks.

In production, cookies are configured with `secure: true` and `sameSite: "none"` so the frontend and backend can run on separate domains over HTTPS.

## Payments

Roomify supports Stripe Checkout for card payments.

Payment flow:

1. The customer submits checkout data.
2. The backend validates cart contents and stock.
3. The backend creates a pending order and Stripe Checkout session.
4. The customer completes payment on Stripe.
5. Stripe calls `/order/webhook`.
6. The webhook marks the order payment as completed and clears the cart.

Local webhook testing:

```bash
stripe listen --forward-to localhost:4000/order/webhook
```

Use the generated webhook secret as `STRIPE_WEBHOOK_SECRET`.

## Deployment

Roomify is ready for split deployment: one hosted frontend and one hosted backend.

### Frontend deployment

Build command:

```bash
npm install
npm run build
```

Output directory:

```text
Client/dist
```

Required frontend env:

```bash
VITE_API_URL=https://your-api-domain.example/
```

### Backend deployment

Start command:

```bash
npm install
npm run start
```

Required backend env:

```bash
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.example
BACKEND_URL=https://your-api-domain.example
GOOGLE_CALLBACK_URL=https://your-api-domain.example/auth/google/callback
```

### Deployment checklist

- Set `NODE_ENV=production` on the backend.
- Set `FRONTEND_URL` to the deployed frontend origin with no trailing slash.
- Set `VITE_API_URL` to the deployed backend URL.
- Set `BACKEND_URL` or `GOOGLE_CALLBACK_URL` for Google OAuth.
- Add the Google OAuth callback URL in Google Cloud Console.
- Add the deployed frontend origin to authorized JavaScript origins in Google Cloud Console.
- Configure Stripe webhook URL as `/order/webhook`.
- Use HTTPS in production so secure cookies work.
- Confirm CORS allows only the production frontend.
- Confirm MongoDB network access allows the backend host.

## Quality Checks

Run frontend lint:

```bash
cd Client
npm run lint
```

Run frontend production build:

```bash
cd Client
npm run build
```

Run backend syntax checks for important entry files:

```bash
cd Server
node --check src/app.js
node --check src/config/urls.js
node --check src/utils/cookieOptions.js
```

## Contributing

Recommended workflow:

1. Create a feature branch from the main branch.
2. Keep changes scoped to one feature or fix.
3. Run lint and build checks before opening a pull request.
4. Update this README when setup, env vars, endpoints, or deployment behavior changes.
5. Avoid committing real `.env` files or secrets.

## License

No license has been specified yet. Add one before distributing or publishing this project publicly.
