
alter table "public"."payment_intents" rename to "one_time_payment_links";

alter table "public"."one_time_payment_links" alter column "signature" drop not null;
alter table "public"."one_time_payment_links" add column "signature" text;

alter table "public"."one_time_payment_links" drop constraint "one_time_payment_links_api_key_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."one_time_payment_links" add column "api_key" uuid
 not null;

alter table "public"."one_time_payment_links" alter column "api_key" drop not null;
alter table "public"."one_time_payment_links" add column "api_key" text;

alter table "public"."one_time_payment_links" alter column "fail_url" drop not null;

alter table "public"."one_time_payment_links" alter column "success_url" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."one_time_payment_links" add column "fail_url" text
 null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."one_time_payment_links" add column "success_url" Text
 null;

alter table "public"."api_keys" rename column "api_key" to "id";

alter table "public"."api_keys" add constraint "api_keys_api_key_key" unique (api_key);
alter table "public"."api_keys"
  add constraint "one_time_payment_links_api_key_fkey"
  foreign key (api_key)
  references "public"."api_keys"
  (api_key) on update restrict on delete restrict;
alter table "public"."api_keys" alter column "api_key" drop not null;
alter table "public"."api_keys" add column "api_key" text;

alter table "public"."one_time_payment_links" rename column "amount" to "value";

alter table "public"."one_time_payment_links" drop constraint "one_time_payment_links_api_key_fkey";

alter table "public"."one_time_payment_links" rename column "api_key" to "api_key_id";
ALTER TABLE "public"."one_time_payment_links" ALTER COLUMN "api_key_id" TYPE uuid;

alter table "public"."one_time_payment_links"
  add constraint "one_time_payment_links_api_key_id_fkey"
  foreign key ("api_key_id")
  references "public"."api_keys"
  ("id") on update restrict on delete restrict;

DROP TABLE "public"."transactions";

DROP TABLE "public"."one_time_payment_links";

comment on TABLE "public"."payment_providers" is E'NULL';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payment_providers" add column "schema" jsonb
 not null;

alter table "public"."api_provider_link" alter column "merchant_password" drop not null;
alter table "public"."api_provider_link" add column "merchant_password" text;

alter table "public"."api_provider_link" alter column "merchant_id" drop not null;
alter table "public"."api_provider_link" add column "merchant_id" text;

comment on TABLE "public"."api_provider_link" is E'NULL';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."api_provider_link" add column "metadata" text
 null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."api_provider_link" add column "merchant_password" text
 not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."api_provider_link" add column "merchant_id" text
 not null;

DROP TABLE "public"."api_provider_link";

DROP TABLE "public"."payment_providers";
