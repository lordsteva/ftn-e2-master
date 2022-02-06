alter table "public"."payment_providers" alter column "schema" drop not null;
alter table "public"."payment_providers" add column "schema" jsonb;
