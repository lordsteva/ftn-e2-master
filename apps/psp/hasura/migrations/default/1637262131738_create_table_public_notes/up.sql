CREATE TABLE "public"."notes" ("text" text NOT NULL, "title" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
