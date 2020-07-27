CREATE DATABASE abc;

\l

\c abc;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    email VARCHAR(256),
    password VARCHAR(2048)
);


CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(256),
    price VARCHAR(256),
    address VARCHAR(256),
    latitude VARCHAR(256),
    longitude VARCHAR(256),
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

\dt

\q

select * from users;
