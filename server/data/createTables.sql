
BEGIN;

DROP TABLE IF EXISTS "message", "question", "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "lastname"   TEXT NOT NULL,
    "firstname"  TEXT NOT NULL,
    "email"      TEXT NOT NULL UNIQUE,
    "password"   TEXT NOT NULL,
    "status"     TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE "question" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "question"   TEXT NOT NULL,
    "answer1"    TEXT NOT NULL,
    "answer2"    TEXT NOT NULL,
    "answer3"    TEXT NOT NULL,
    "answer4"    TEXT NOT NULL,
    "good_answer"TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ,
    "difficulty"  TEXT NOT NULL
);


CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY UNIQUE,
    "content"    TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;





