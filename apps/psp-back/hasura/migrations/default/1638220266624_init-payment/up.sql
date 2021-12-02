
CREATE TABLE "public"."payment_providers" ("name" Text NOT NULL, "logo" Text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "active" boolean NOT NULL DEFAULT true, "base_url" Text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"), UNIQUE ("base_url"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."api_provider_link" ("api_key_id" uuid NOT NULL, "payment_provider_id" UUID NOT NULL, PRIMARY KEY ("api_key_id","payment_provider_id") , FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("payment_provider_id") REFERENCES "public"."payment_providers"("id") ON UPDATE restrict ON DELETE restrict);

alter table "public"."api_provider_link" add column "merchant_id" text
 not null;

alter table "public"."api_provider_link" add column "merchant_password" text
 not null;

alter table "public"."api_provider_link" add column "metadata" text
 null;

comment on TABLE "public"."api_provider_link" is E'metadata: any json data';

alter table "public"."api_provider_link" drop column "merchant_id" cascade;

alter table "public"."api_provider_link" drop column "merchant_password" cascade;

alter table "public"."payment_providers" add column "schema" jsonb
 not null;

comment on TABLE "public"."payment_providers" is E'schema- json describing fields that will be shown in form when someone want to use this pp';

CREATE TABLE "public"."one_time_payment_links" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "api_key_id" uuid NOT NULL, "signature" text NOT NULL, "value" numeric NOT NULL, "currency" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."transactions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "amount" numeric NOT NULL, "payment_provider_id" uuid NOT NULL, "currency" text NOT NULL, "metadata" Text, "status" text NOT NULL, "api_key_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("payment_provider_id") REFERENCES "public"."payment_providers"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."one_time_payment_links" drop constraint "one_time_payment_links_api_key_id_fkey";

ALTER TABLE "public"."one_time_payment_links" ALTER COLUMN "api_key_id" TYPE text;
alter table "public"."one_time_payment_links" rename column "api_key_id" to "api_key";

alter table "public"."one_time_payment_links"
  add constraint "one_time_payment_links_api_key_fkey"
  foreign key ("api_key")
  references "public"."api_keys"
  ("api_key") on update restrict on delete restrict;

alter table "public"."one_time_payment_links" rename column "value" to "amount";

alter table "public"."api_keys" drop column "api_key" cascade;

alter table "public"."api_keys" rename column "id" to "api_key";

alter table "public"."one_time_payment_links" add column "success_url" Text
 null;

alter table "public"."one_time_payment_links" add column "fail_url" text
 null;

alter table "public"."one_time_payment_links" alter column "success_url" set not null;

alter table "public"."one_time_payment_links" alter column "fail_url" set not null;

alter table "public"."one_time_payment_links" drop column "api_key" cascade;

alter table "public"."one_time_payment_links" add column "api_key" uuid
 not null;

alter table "public"."one_time_payment_links"
  add constraint "one_time_payment_links_api_key_fkey"
  foreign key ("api_key")
  references "public"."api_keys"
  ("api_key") on update restrict on delete restrict;

alter table "public"."one_time_payment_links" drop column "signature" cascade;

alter table "public"."one_time_payment_links" rename to "payment_intents";
