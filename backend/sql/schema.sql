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
