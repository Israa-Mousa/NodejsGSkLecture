-- CREATE TABLE users (
--     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(200) NOT NULL,
--     email VARCHAR(200) NOT NULL UNIQUE,
--     role ENUM('COACH','LEARNER','ADMIN') NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     INDEX(name)
-- );



-- -- Products table
-- CREATE TABLE products (
--     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT NOT NULL,
--     image_url VARCHAR(255)
-- );

-- -- Orders table
-- CREATE TABLE orders (
--     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     user_id BIGINT UNSIGNED NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- Order Product (junction table for many-to-many)
-- CREATE TABLE order_product (
--     order_id BIGINT UNSIGNED NOT NULL,
--     product_id BIGINT UNSIGNED NOT NULL,
--     qty INT NOT NULL,
--     PRIMARY KEY (order_id, product_id), -- composite primary key
--     FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
-- );

-- @Block insert user
INSERT INTO users (name, email, role)
VALUES 
  ('Sara Nasser', 'sara.nasser@example.com', 'COACH'),
  ('Omar Yasin', 'omar.yasin@example.com', 'ADMIN'),
  ('Lina Jaber', 'lina.jaber@example.com', 'LEARNER');

-- @block select 
SELECT id ,name FROM users


-- @block inserrt product_id
INSERT INTO products (name, description, image_url)
VALUES ('Laptop Dell XPS 13', 'High-performance ultrabook with Intel i7 processor and 16GB RAM.', 'https://example.com/images/dell-xps-13.png');
