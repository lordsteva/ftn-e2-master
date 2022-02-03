alter table "public"."products" alter column "type" drop not null;
alter table "public"."products" add column "type" text;
