alter table "public"."one_time_payment_links" alter column "signature" drop not null;
alter table "public"."one_time_payment_links" add column "signature" text;
