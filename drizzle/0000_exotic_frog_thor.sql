CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"phone_number" text DEFAULT '+220 ',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"role" text DEFAULT 'Read',
	"receipt_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staffs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text,
	"department" text,
	"gender" text,
	"telephone" text,
	"branch_id" integer,
	"address_id" integer,
	"receipt_id" integer,
	"date_hired" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"staff_id" integer,
	"receipt_id" integer,
	"address_id" integer,
	"telephone" text NOT NULL,
	"date_opened" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"industry" text NOT NULL,
	"headquarters" text NOT NULL,
	"date_founded" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipts" (
	"id" serial PRIMARY KEY NOT NULL,
	"used_for" text,
	"created_by_user_id" integer NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_branch_id" integer,
	"to_branch_id" integer,
	"staff_id" integer,
	"receipt_id" integer,
	"transfer_remarks" text DEFAULT '',
	"transfer_date" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staffs_branch" (
	"staff_id" integer NOT NULL,
	"branch_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion" (
	"role" text NOT NULL,
	"new_role" text NOT NULL,
	"remarks" text NOT NULL,
	"receipt_id" integer,
	"promotion_date" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staffs_branch" ADD CONSTRAINT "staffs_branch_staff_id_staffs_id_fk" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staffs_branch" ADD CONSTRAINT "staffs_branch_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
