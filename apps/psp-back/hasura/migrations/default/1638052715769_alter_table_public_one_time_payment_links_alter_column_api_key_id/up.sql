ALTER TABLE "public"."one_time_payment_links" ALTER COLUMN "api_key_id" TYPE text;
alter table "public"."one_time_payment_links" rename column "api_key_id" to "api_key";
