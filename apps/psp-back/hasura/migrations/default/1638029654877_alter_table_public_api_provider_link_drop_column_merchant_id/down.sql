alter table "public"."api_provider_link" alter column "merchant_id" drop not null;
alter table "public"."api_provider_link" add column "merchant_id" text;
