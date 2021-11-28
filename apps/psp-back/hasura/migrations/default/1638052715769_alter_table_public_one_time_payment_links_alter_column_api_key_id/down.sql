alter table "public"."one_time_payment_links" rename column "api_key" to "api_key_id";
ALTER TABLE "public"."one_time_payment_links" ALTER COLUMN "api_key_id" TYPE uuid;
