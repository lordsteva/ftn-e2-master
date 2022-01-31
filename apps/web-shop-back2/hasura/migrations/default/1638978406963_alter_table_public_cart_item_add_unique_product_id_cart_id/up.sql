alter table "public"."cart_item" add constraint "cart_item_product_id_cart_id_key" unique ("product_id", "cart_id");
