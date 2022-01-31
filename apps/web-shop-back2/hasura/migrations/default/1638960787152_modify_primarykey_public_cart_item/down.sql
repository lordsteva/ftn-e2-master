alter table "public"."cart_item" drop constraint "cart_item_pkey";
alter table "public"."cart_item"
    add constraint "cart_item_pkey"
    primary key ("product_id", "id");
