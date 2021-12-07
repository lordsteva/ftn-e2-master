alter table "public"."cart" alter column "cart_items" drop not null;
alter table "public"."cart" add column "cart_items" oidvector;
