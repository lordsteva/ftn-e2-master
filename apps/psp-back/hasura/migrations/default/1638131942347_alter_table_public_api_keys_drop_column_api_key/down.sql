alter table "public"."api_keys" add constraint "api_keys_api_key_key" unique (api_key);
alter table "public"."api_keys"
  add constraint "one_time_payment_links_api_key_fkey"
  foreign key (api_key)
  references "public"."api_keys"
  (api_key) on update restrict on delete restrict;
alter table "public"."api_keys" alter column "api_key" drop not null;
alter table "public"."api_keys" add column "api_key" text;
