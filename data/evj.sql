BEGIN;


CREATE TABLE "evj" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "name" TEXT,
    "data" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;