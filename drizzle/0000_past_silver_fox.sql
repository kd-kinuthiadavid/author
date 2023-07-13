CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` varchar(256) NOT NULL,
	`phoneNumber` varchar(256),
	`createdAt` timestamp(6) DEFAULT (now()),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
