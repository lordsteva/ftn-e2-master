CREATE TABLE "public"."api_keys" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "api_key" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "api_secret" text NOT NULL, "user_id" uuid NOT NULL, PRIMARY KEY ("id") , UNIQUE ("api_key"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
