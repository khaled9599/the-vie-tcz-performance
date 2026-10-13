CREATE TABLE `source_cache` (
	`scope` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `request_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `owner` (
	`key` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`action` text NOT NULL,
	`reason` text NOT NULL,
	`author` text NOT NULL,
	`timestamp` text NOT NULL,
	`config` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `states` (
	`scope` text PRIMARY KEY NOT NULL,
	`version` integer NOT NULL,
	`draft` text NOT NULL,
	`published` text NOT NULL
);
