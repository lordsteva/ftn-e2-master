alter table "public"."order_products"
  add constraint "order_products_order_id_fkey"
  foreign key ("order_id")
  references "public"."orders"
  ("id") on update restrict on delete restrict;
