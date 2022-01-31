CREATE TABLE "public"."order_products" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "product_id" uuid NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
