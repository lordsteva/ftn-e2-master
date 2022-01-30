CREATE TABLE "public"."card" ("pan" text NOT NULL, "valid_until" text NOT NULL, "ccv" Text NOT NULL, "holder" text NOT NULL, "account_number" integer NOT NULL, PRIMARY KEY ("pan") , FOREIGN KEY ("account_number") REFERENCES "public"."account"("number") ON UPDATE restrict ON DELETE restrict);