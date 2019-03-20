CREATE DATABASE IF NOT EXISTS `fizzmod`;

USE `fizzmod`;

CREATE TABLE IF NOT EXISTS `user_status`( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `description` VARCHAR(255), 
    PRIMARY KEY(id) 
);

CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(90) NOT NULL,
    `lastname` VARCHAR(90) NOT NULL,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(90) NOT NULL, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `user_status_id` INTEGER(11) UNSIGNED, 
    PRIMARY KEY(id), 
    UNIQUE INDEX `users_email_unique` (`email`), 
    UNIQUE INDEX `users_username_unique` (`username`),
	INDEX `posts_user_status_id_foreign` (`user_status_id`),
	CONSTRAINT `posts_user_status_id_foreign` FOREIGN KEY (`user_status_id`) REFERENCES `user_status` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS `message_status`( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `description` VARCHAR(255), 
    PRIMARY KEY(id) 
);

CREATE TABLE IF NOT EXISTS `messages`( 
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `body` TEXT NOT NULL, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `user_id` INTEGER(11) UNSIGNED, 
    `message_status_id` INTEGER(11) UNSIGNED, 
    PRIMARY KEY(id),
	INDEX `posts_user_id_foreign` (`user_id`),
	INDEX `posts_message_status_id_foreign` (`message_status_id`),
	CONSTRAINT `posts_message_status_id_foreign` FOREIGN KEY (`message_status_id`) REFERENCES `message_status` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
);