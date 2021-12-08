alter table "public"."api_keys" drop column "api_secret" cascade
alter table "public"."api_keys" drop column "api_secret";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
