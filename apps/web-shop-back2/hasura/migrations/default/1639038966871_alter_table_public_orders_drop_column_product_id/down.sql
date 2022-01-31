alter table "public"."orders"
  add constraint "orders_product_id_fkey"
  foreign key (product_id)
  references "public"."products"
  (id) on update restrict on delete restrict;
alter table "public"."orders" alter column "product_id" drop not null;
alter table "public"."orders" add column "product_id" uuid;
