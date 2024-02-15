CREATE DATABASE Mellowdyne; 

use Mellowdyne; 

CREATE TABLE artists
 (
 id_artists int primary key not null auto_increment,
 name varchar (45) not null
 );
 
 CREATE TABLE genres
 (
	id_genres int primary key not null auto_increment,
    name varchar(100) not null
 );
 
 CREATE TABLE categories
 (
	id_categories int primary key not null auto_increment,
    name varchar(45) not null
 );
 
 CREATE TABLE users
 (
	id_users int primary key not null auto_increment,
    full_name varchar(45) not null,
    email varchar(45) not null,
    password varchar(200) not null,
    politic tinyint(5),
    avatar varchar(512),
    admin tinyint(5) 
 );
 
 CREATE TABLE albums
 (
	id_albums int primary key not null auto_increment, 
    title varchar(100) not null,
    id_artist int not null,
    description longtext,
    id_genre int not null,
    release_date date,
    price decimal(4,0),
    id_category int not null,
    image varchar(45),
    id_seller int not null,
    CONSTRAINT artist FOREIGN KEY (id_artist) REFERENCES artists (id_artists),
    CONSTRAINT category FOREIGN KEY (id_category) REFERENCES categories (id_categories),
    CONSTRAINT genre FOREIGN KEY (id_genre) REFERENCES genres (id_genres),
    CONSTRAINT seller FOREIGN KEY (id_seller) REFERENCES users (id_users)
 );
 
 CREATE TABLE songs
 (
	id_songs int primary key not null auto_increment, 
    name varchar(200) not null,
    id_album int not null,
    CONSTRAINT album FOREIGN KEY (id_album) REFERENCES albums (id_albums)
 );
 
 CREATE TABLE invoices
 (
	id_invoices int primary key not null auto_increment,
    id_customer int not null,
    invoice_date date,
    total decimal(4,2),
    CONSTRAINT customer FOREIGN KEY (id_customer) REFERENCES users (id_users)
 );
 
 CREATE TABLE albums_invoices
 (
	id_albums_invoices int primary key not null auto_increment,
    id_album int not null,
    id_invoice int not null,
    CONSTRAINT fk_album FOREIGN KEY (id_album) REFERENCES albums (id_albums),
    CONSTRAINT fk_invoice FOREIGN KEY (id_invoice) REFERENCES invoices (id_invoices)
 );

 CREATE TABLE cars (
    id_cars INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_buyer INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_buyer) REFERENCES users(id_users),
    FOREIGN KEY (id_product) REFERENCES albums(id_albums)
);
