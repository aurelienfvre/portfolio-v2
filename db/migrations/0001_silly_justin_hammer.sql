CREATE TABLE `custom_blocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`col_span` integer DEFAULT 6,
	`order` integer DEFAULT 0,
	`visible` integer DEFAULT true,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `formations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`institution` text NOT NULL,
	`period` text NOT NULL,
	`description` text,
	`order` integer DEFAULT 0,
	`visible` integer DEFAULT true,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `main_competences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`subtitle` text,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `main_competences_slug_unique` ON `main_competences` (`slug`);--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`profile_image` text,
	`email` text,
	`cv_url` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `proof_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`main_competence_id` integer,
	`title` text NOT NULL,
	`subtitle` text,
	`slug` text NOT NULL,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`main_competence_id`) REFERENCES `main_competences`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `proof_categories_slug_unique` ON `proof_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `proof_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`proof_category_id` integer,
	`title` text NOT NULL,
	`description` text,
	`media_url` text,
	`media_type` text DEFAULT 'image',
	`origin_tag` text NOT NULL,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`proof_category_id`) REFERENCES `proof_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `social_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`icon` text NOT NULL,
	`title` text NOT NULL,
	`order` integer DEFAULT 0,
	`visible` integer DEFAULT true,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `stage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`duration` text NOT NULL,
	`start_date` text NOT NULL,
	`position` text NOT NULL,
	`locations` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
