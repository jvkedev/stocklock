# StockLock

A full-stack inventory and order management platform with secure authentication, role-based access control, and real-time stock tracking.

## Why StockLock?

Small businesses, side-hustle sellers, and boutique shops usually start managing inventory the same way: a spreadsheet. That works until it doesn't.

### The Problems StockLock Solves

| Pain Point                                             | The Cost Without StockLock                                                                                                             | How StockLock Fixes It                                                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spreadsheet stock-outs & oversells**                 | Two customers buy the "last" item at the same time. You promise stock you don't have, lose trust, and deal with refunds.               | Atomic, race-condition-safe stock deduction at the database layer. If stock isn't there, the order is rejected instantly.                                             |
| **Who changed what, and when?**                        | Everyone shares a login, anyone can edit prices or inventory. Mistakes are untraceable.                                                | Role-based access control: admins manage products, regular users can only browse and place orders. Every write is a logged API call.                                  |
| **Legacy inventory tools are overpriced and insecure** | $50–$200/mo SaaS tools that email you plaintext password resets or store credit cards with questionable security.                      | End-to-end secure by default: Argon2 password hashing, JWT access tokens + refresh token rotation, HTTP-only cookies, and rate-limited auth endpoints.                |
| **Manual order tracking is error-prone**               | Someone emails/WhatsApps/Slack-DMs you an order, you scribble it on the sheet, then forget to deduct stock or charge the wrong amount. | Orders go through a single API that validates stock, locks the row, calculates the correct total from the current product price, and records the order all in one go. |
| **"Let me just update this one field…" breaches**      | The same internal dashboard that ships products is also the one that handles accounts. A compromised session can do anything.          | Separation of concerns enforced on both sides: `ProtectedRoute` on the frontend and `authenticate` + `requireRole` middleware on every sensitive backend endpoint.    |

### Why I Built It

I built StockLock because I wanted a realistic, production-grade reference for something I kept having to reimplement for freelance clients: a safe, batteries-included backend + frontend pairing for small inventory-backed operations.

Most open-source demos either skip authentication entirely or stub it out. They hand-wave away the hard parts:

- What happens when two orders land simultaneously for the last unit of stock?
- How do you keep a user logged in without shoving a JWT into `localStorage`?
- Who gets to add products, and how do you enforce that on both sides of the wire?

StockLock is my answer to those questions. It's small enough to read end-to-end in an afternoon, but opinionated enough that you could swap in a real product catalog, add Stripe, and start taking orders tomorrow.

## Tech Stack

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5.x
- **Database**: PostgreSQL (via `pg`)
- **Validation**: Zod 4.x
- **Authentication**:
  - JWT (access + refresh tokens)
  - Argon2 password hashing
  - HTTP-only secure cookies
- **Security**: express-rate-limit, CORS, cookie-parser
- **Logging**: Pino + pino-http
- **Dev Tools**: tsx, nodemon, ts-node

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Data Fetching**: TanStack React Query 5
- **State Management**: Zustand 5
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Sonner (toasts), Lucide React (icons)
- **HTTP Client**: Axios
- **Compiler**: Babel with React Compiler enabled

## Project Structure

```
stocklock-api/
├── backend/
│   ├── sql/
│   │   └── schema.sql          # PostgreSQL database schema
│   ├── src/
│   │   ├── config/             # Environment config (Zod-validated)
│   │   ├── features/
│   │   │   ├── auth/           # Authentication module
│   │   │   ├── orders/         # Order management
│   │   │   ├── products/       # Product catalog
│   │   │   └── users/          # User management
│   │   ├── infrastructure/
│   │   │   ├── database/       # DB connection pool
│   │   │   └── logger/         # Pino logger setup
│   │   ├── shared/
│   │   │   ├── errors/         # Custom AppError class
│   │   │   ├── middlewares/    # Auth, RBAC, rate limiting, error handler
│   │   │   └── utils/          # asyncHandler wrapper
│   │   ├── types/              # Express type augmentations
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout/         # Layout, Navbar, ProtectedRoute, RequireRole
    │   │   ├── providers/      # React Query provider
    │   │   └── App.tsx         # Route definitions
    │   ├── features/
    │   │   ├── auth/           # API, hooks, store, forms, schema
    │   │   ├── orders/         # API, hooks, types
    │   │   └── products/       # API, hooks, schema, types
    │   ├── pages/              # Route-level components
    │   └── shared/             # Shared API client & error utilities
    └── package.json
```

## Features

### Authentication

- User registration with email/password
- Secure login with JWT access tokens (15m) + refresh tokens (7d)
- Refresh token rotation with revocation support
- HTTP-only cookie-based session management
- Rate limiting on auth endpoints
- Session restoration on page reload
- Password change & profile update

### Role-Based Access Control

- Admin role required for product creation
- `RequireRole` wrapper for route-level role checks
- `ProtectedRoute` wrapper for authenticated-only routes

### Product Management

- Browse product catalog (public)
- View product details (public)
- Create new products (admin only)
- Stock tracking with validation
- Price management

### Order Management

- Place orders for products (authenticated users)
- Automatic stock deduction
- Atomic order placement (race-condition safe)
- Order total calculation

## Database Schema

Tables defined in [schema.sql](backend/sql/schema.sql):

| Table            | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `users`          | User accounts with name, email, password hash                  |
| `refresh_tokens` | JWT refresh tokens with JTI, hash, expiry, revocation          |
| `products`       | Product catalog with name, description, price, stock           |
| `orders`         | Order records linking users to products with quantity & status |

All tables use UUID primary keys. Foreign keys have `ON DELETE CASCADE`.

## Getting Started

### Prerequisites

- Node.js (with ESM support)
- PostgreSQL (with `pgcrypto` extension)
- npm or pnpm

### 1. Clone and Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

**Backend** (`backend/.env`):

```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_NAME=stocklock
DB_PASSWORD=your_password

ACCESS_TOKEN_SECRET=your_min_32_char_secret_here
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_min_32_char_secret_here
REFRESH_TOKEN_EXPIRES_IN=7d
```

**Frontend** (`frontend/.env`):

```
VITE_API_URL=http://localhost:3000
```

### 3. Initialize the Database

```bash
# Run the schema against your PostgreSQL database
psql -U your_user -d stocklock -f backend/sql/schema.sql
```

### 4. Start Development Servers

```bash
# Backend (runs on port 3000)
cd backend
npm run dev

# Frontend (runs on port 5173)
cd ../frontend
npm run dev
```

Open http://localhost:5173 in your browser.

### 5. Other Scripts

**Backend**:

- `npm run dev` — Start dev server with nodemon + tsx

**Frontend**:

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check + production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## API Endpoints

All endpoints are prefixed with the backend origin (`http://localhost:3000`).

### Authentication (`/auth`)

| Method | Path                    | Auth            | Description                                  |
| ------ | ----------------------- | --------------- | -------------------------------------------- |
| POST   | `/auth/register`        | Public          | Create a new user account                    |
| POST   | `/auth/login`           | Public          | Authenticate & receive tokens via cookies    |
| POST   | `/auth/refresh`         | Public (cookie) | Rotate refresh token, issue new access token |
| GET    | `/auth/me`              | Bearer          | Get current user profile                     |
| POST   | `/auth/logout`          | Public (cookie) | Revoke refresh token, clear cookies          |
| PATCH  | `/auth/me`              | Bearer          | Update user profile (name, email)            |
| PATCH  | `/auth/change-password` | Bearer          | Change account password                      |

### Products (`/products`)

| Method | Path            | Auth   | Description                |
| ------ | --------------- | ------ | -------------------------- |
| GET    | `/products`     | Public | List all products          |
| GET    | `/products/:id` | Public | Get a single product by ID |
| POST   | `/products`     | Admin  | Create a new product       |

### Orders (`/orders`)

| Method | Path      | Auth   | Description                       |
| ------ | --------- | ------ | --------------------------------- |
| POST   | `/orders` | Bearer | Place a new order (deducts stock) |

## Key Backend Middleware

- `validate(schema)` — Zod request body validation
- `authenticate` — Verifies JWT access token, attaches user to `req.user`
- `requireRole(role)` — Checks authenticated user has required role
- `authLimiter` — Rate limits login/register endpoints
- `errorHandler` — Centralized error handling with AppError support

## Frontend Pages

| Route              | Access        | Description             |
| ------------------ | ------------- | ----------------------- |
| `/`                | Public        | Home page               |
| `/register`        | Public        | Registration form       |
| `/login`           | Public        | Login form              |
| `/products`        | Public        | Product listing         |
| `/profile`         | Authenticated | User profile management |
| `/change-password` | Authenticated | Password change form    |
| `/products/new`    | Admin only    | Create new product      |

## Security Notes

- Passwords are hashed with Argon2 (never stored in plaintext)
- Refresh tokens are hashed in the database with unique JTIs
- Token rotation on every refresh invalidates old refresh tokens
- Access tokens are short-lived (15 minutes by default)
- Auth endpoints have rate limiting to prevent brute-force attacks
- CORS is restricted to `http://localhost:5173` in app setup
- All input is validated with Zod schemas before processing
- Role checks happen on both frontend (routes) and backend (API handlers)
