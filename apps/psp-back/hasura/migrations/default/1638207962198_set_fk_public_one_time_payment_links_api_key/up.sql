alter table "public"."one_time_payment_links"
  add constraint "one_time_payment_links_api_key_fkey"
  foreign key ("api_key")
  references "public"."api_keys"
  ("api_key") on update restrict on delete restrict;
