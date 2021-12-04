alter table "public"."api_keys" alter column "title" drop not null;
alter table "public"."api_keys" add column "title" text;
