alter table "public"."api_provider_link" alter column "merchant_password" drop not null;
alter table "public"."api_provider_link" add column "merchant_password" text;
