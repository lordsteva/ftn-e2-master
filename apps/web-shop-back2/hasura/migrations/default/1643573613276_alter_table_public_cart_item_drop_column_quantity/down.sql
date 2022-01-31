alter table "public"."cart_item" alter column "quantity" drop not null;
alter table "public"."cart_item" add column "quantity" int4;
