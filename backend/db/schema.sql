DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL CHECK (
        name <> ''
        AND name = trim(name)
    ),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX products_name_unique ON products (lower(name));

INSERT INTO
    products (name, quantity)
VALUES
    ('Laptop', 10),
    ('Mysz', 15),
    ('Klawiatura', 25);
