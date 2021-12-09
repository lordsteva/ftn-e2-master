CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."api_keys" add column "api_secret" uuid
 not null default gen_random_uuid();
