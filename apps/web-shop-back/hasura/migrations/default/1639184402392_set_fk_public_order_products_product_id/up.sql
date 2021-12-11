alter table "public"."order_products" drop constraint "order_products_product_id_fkey",
  add constraint "order_products_product_id_fkey"
  foreign key ("product_id")
  references "public"."products"
  ("id") on update restrict on delete restrict;
