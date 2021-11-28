alter table "public"."one_time_payment_links"
  add constraint "one_time_payment_links_api_key_id_fkey"
  foreign key ("api_key_id")
  references "public"."api_keys"
  ("id") on update restrict on delete restrict;
