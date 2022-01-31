alter table "public"."products" alter column "quantity" set default 0;
alter table "public"."products" alter column "quantity" drop not null;
alter table "public"."products" add column "quantity" int4;
