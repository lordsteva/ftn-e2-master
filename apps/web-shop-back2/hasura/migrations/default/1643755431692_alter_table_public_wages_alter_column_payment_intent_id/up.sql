alter table "public"."wages" alter column "payment_intent_id" drop not null;
alter table "public"."wages" add constraint "wages_payment_intent_id_key" unique ("payment_intent_id");
