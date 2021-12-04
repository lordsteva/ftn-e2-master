alter table "public"."api_keys" alter column "api_secret" drop not null;
alter table "public"."api_keys" add column "api_secret" text;
