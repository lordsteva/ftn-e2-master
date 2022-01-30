alter table "public"."order_products" alter column "quantity" drop not null;
alter table "public"."order_products" add column "quantity" int4;
