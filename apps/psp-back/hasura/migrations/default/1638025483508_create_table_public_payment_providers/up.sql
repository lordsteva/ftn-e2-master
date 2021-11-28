CREATE TABLE "public"."payment_providers" ("name" Text NOT NULL, "logo" Text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "active" boolean NOT NULL DEFAULT true, "base_url" Text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"), UNIQUE ("base_url"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
