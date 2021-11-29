alter table "public"."one_time_payment_links" alter column "api_key" drop not null;
alter table "public"."one_time_payment_links" add column "api_key" text;
