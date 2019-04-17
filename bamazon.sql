create database bamazon;

create table products (
	auto_id INTEGER(10) AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (auto_id)
    )

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
       VALUES 
		('Monopoly','Games','19.95','750'),
        ('Switch','Consoles','299.99','321'),
		('Xbox One S','Consoles','226.15','226'),
		('Playstation 4','Consoles','299.99','158'),
		('Xbox One X','Consoles','369.99','189'),
        ('Risk','Games','24.95','575'),
        ('Clue','Games','15.95','1207'),
        ('Apple','Computer','2795.00','57'),
        ('Dell','Computer','1575.00','65'),
        ('Lenovo','Computer','995.00','80');
