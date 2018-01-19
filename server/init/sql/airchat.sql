create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     password VARCHAR(40) NOT NULL,
     PRIMARY KEY ( id )
)
-- INSERT INTO `users` set name='admin001', email='admin001@example.com', password='123456';