alter table "public"."wages" drop constraint "wages_payment_intent_id_key";
alter table "public"."wages" alter column "payment_intent_id" set not null;
