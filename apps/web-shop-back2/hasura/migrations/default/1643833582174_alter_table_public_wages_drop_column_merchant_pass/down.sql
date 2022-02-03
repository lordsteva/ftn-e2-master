alter table "public"."wages" alter column "merchant_pass" drop not null;
alter table "public"."wages" add column "merchant_pass" uuid;
