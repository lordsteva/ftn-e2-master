CREATE TABLE "public"."account" ("merchantId" uuid NOT NULL DEFAULT gen_random_uuid(), "merchantPass" uuid NOT NULL DEFAULT gen_random_uuid(), "available" numeric NOT NULL DEFAULT 5000, "reserved" numeric NOT NULL DEFAULT 0, "number" serial NOT NULL, PRIMARY KEY ("number") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
