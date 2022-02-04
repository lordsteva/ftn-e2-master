alter table "public"."wages" alter column "merchant_id" drop not null;
alter table "public"."wages" add column "merchant_id" uuid;
