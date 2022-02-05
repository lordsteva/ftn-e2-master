alter table "public"."products" alter column "full" drop not null;
alter table "public"."products" add column "full" bool;
