
CREATE TABLE "public"."users" ("email" text NOT NULL, "password" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."product_categories" ("name" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."product" ("name" text NOT NULL, "image" text NOT NULL, "description" text, "quantity" integer NOT NULL DEFAULT 0, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , CONSTRAINT "positive quantity" CHECK (quantity >= 0));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."product" add column "category_id" uuid
 not null;

alter table "public"."product"
  add constraint "product_category_id_fkey"
  foreign key ("category_id")
  references "public"."product_categories"
  ("id") on update restrict on delete restrict;

alter table "public"."product" add column "price" numeric
 not null default '1';

alter table "public"."product" add constraint "price positive" check (price > 0);

CREATE TABLE "public"."orders" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "price" numeric NOT NULL, "product_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
