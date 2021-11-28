
DROP TABLE "public"."orders";

alter table "public"."product" drop constraint "price positive";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."product" add column "price" numeric
 not null default '1';

alter table "public"."product" drop constraint "product_category_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."product" add column "category_id" uuid
 not null;

DROP TABLE "public"."product";

DROP TABLE "public"."product_categories";

DROP TABLE "public"."users";
