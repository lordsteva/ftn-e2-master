CREATE TABLE "public"."payment" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "merchant_id" text NOT NULL, "merchant_pass" text NOT NULL, "amount" numeric NOT NULL, "mercahnt_order_id" text NOT NULL, "merchant_timestamp" text NOT NULL, "success_url" text NOT NULL, "failed_url" text NOT NULL, "error_url" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
