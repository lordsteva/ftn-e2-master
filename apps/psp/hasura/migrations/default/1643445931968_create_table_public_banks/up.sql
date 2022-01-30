CREATE TABLE "public"."banks" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "base_url" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
