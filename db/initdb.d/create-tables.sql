DROP TABLE IF EXISTS notes;

CREATE TABLE `notes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` text,
  `body` mediumtext,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

INSERT INTO notes (title, body) VALUES ("sample title 1", "sample body 1");
INSERT INTO notes (title, body) VALUES ("sample title 2", "sample body 2");
INSERT INTO notes (title, body) VALUES ("sample title 3", "sample body 3");