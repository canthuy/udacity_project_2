CREATE TABLE orders 
(
    userId INTEGER, 
    productId INTEGER, 
    quantity INTEGER, 
    status VARCHAR(20), 
    id SERIAL PRIMARY KEY
)