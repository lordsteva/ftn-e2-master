CREATE TABLE "public"."user" ("username" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , UNIQUE ("username"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
