CREATE TABLE `attribute` (
  `id` bigint unsigned not null primary key,
  `name` varchar(100) not null,
  `display_name` varchar(100),
  `type` varchar(100),
  `description` varchar(1000),
  `free_form` bool not null,
  `multi_value` bool not null
) ENGINE=InnoDB;

CREATE TABLE `attribute_value` (
  `id` bigint unsigned not null primary key,
  `attribute_id` bigint unsigned not null,
  `value` varchar(100) not null,
  FOREIGN KEY `attribute_fk` (`attribute_id`) REFERENCES `attribute` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `class` (
  `id` bigint unsigned not null primary key,
  `name` varchar(100) not null,
  `allow_other_attributes` bool not null
) ENGINE=InnoDB;

CREATE TABLE `class_attribute` (
  `id` bigint unsigned not null primary key,
  `class_id` bigint unsigned not null,
  `attribute_id` bigint unsigned not null,
  `required` bool not null,
  KEY (`class_id`, `attribute_id`),
  FOREIGN KEY `class_fk` (`class_id`) REFERENCES `class` (`id`),
  FOREIGN KEY `attribute_fk` (`attribute_id`) REFERENCES `attribute` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `device` (
  `id` bigint unsigned not null primary key,
  `name` varchar(100) not null,
  `class_id` bigint unsigned not null,
  `description` varchar(1000),
  FOREIGN KEY `class_fk` (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `device_attribute` (
  `id` bigint unsigned not null primary key,
  `device_id` bigint unsigned not null,
  `attribute_id` bigint unsigned not null,
  `value` varchar(1000),
  KEY (`device_id`, `attribute_id`),
  FOREIGN KEY `device_fk` (`device_id`) REFERENCES `device` (`id`),
  FOREIGN KEY `attribute_fk` (`attribute_id`) REFERENCES `attribute` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `note` (
  `id` bigint unsigned not null primary key,
  `device_id` bigint unsigned not null,
  `noter` varchar(100) not null,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  `value` varchar(5000),
  FOREIGN KEY `device_fk` (`device_id`) REFERENCES `device` (`id`)
) ENGINE=InnoDB;
