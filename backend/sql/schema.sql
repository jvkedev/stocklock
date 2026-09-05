CREATE EXTENSION IF NOT EXISTS pgcrypto;

------------------ USERS TABLE -------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL
        CHECK(char_length(name) >= 2),

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash VARCHAR(128) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

------------------ REFRESH TOKENS TABLE -------------------
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    jti TEXT NOT NULL UNIQUE,

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    revoked_at TIMESTAMPTZ
);

------------------ PRODUCTS TABLE -------------------
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(200) NOT NULL,

    description TEXT,

    price NUMERIC(10, 2) NOT NULL
        CHECK (price >= 0),

    stock INTEGER NOT NULL
        CHECK (stock >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

------------------ ORDERS TABLE -------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    product_id UUID NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    quantity INTEGER NOT NULL
        CHECK (quantity > 0),

    total_price NUMERIC(10, 2) NOT NULL
        CHECK (total_price >= 0),

    status VARCHAR(20) NOT NULL DEFAULT 'confirmed'
        CHECK (status IN ('confirmed', 'cancelled')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
