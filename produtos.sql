CREATE SCHEMA store;

CREATE TABLE store.produtos (
    id SERIAL PRIMARY KEY NOT NULL,
    produto VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100) NOT NULL
);

SELECT * FROM store.produtos;

INSERT INTO store.produtos (produto, preco, categoria)
values('Bolsa Balenciaga', 2000.00, 'Acessórios');

SELECT * FROM store.produtos;

INSERT INTO store.produtos (produto, preco, categoria) 
values ('Nike SB', 599.00, 'Calçados');

SELECT * FROM store.produtos;

DELETE FROM store.produtos WHERE id=5;

INSERT INTO store.produtos (produto, preco, categoria) 
values ('Boné Chevelle DC', 169.00, 'Acesórios');
