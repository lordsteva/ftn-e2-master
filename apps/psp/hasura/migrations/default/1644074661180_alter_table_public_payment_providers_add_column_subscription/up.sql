alter table "public"."payment_providers" add column "subscription" boolean
 not null default 'false';
