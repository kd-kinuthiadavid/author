CREATE TABLE if not exists `providers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp
);
--> statement-breakpoint
CREATE TABLE if not exists `userProviderRelations` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` int NOT NULL,
	`providerId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp
);
