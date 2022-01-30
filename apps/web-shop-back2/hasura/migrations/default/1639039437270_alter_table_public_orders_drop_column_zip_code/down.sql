alter table "public"."orders" alter column "zip_code" drop not null;
alter table "public"."orders" add column "zip_code" text;
