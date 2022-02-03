alter table "public"."products" alter column "subscription" drop not null;
alter table "public"."products" add column "subscription" bool;
