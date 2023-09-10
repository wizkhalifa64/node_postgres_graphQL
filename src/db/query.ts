// export const customerquery = `
//         CREATE TABLE IF NOT EXISTS customers (
//           id uuid DEFAULT uuid_generate_v4 (),
//           first_name VARCHAR(255),
//           last_name VARCHAR(255),
//           email VARCHAR(255) UNIQUE,
//           password VARCHAR(255),
//           created_on timestamp NOT NULL DEFAULT NOW(),
//           PRIMARY KEY (id));
//           `;

// export const productTeable = `
//         CREATE TABLE IF NOT EXISTS product (
//           id uuid DEFAULT uuid_generate_v4 (),
//           product_name VARCHAR(255),
//           description json,
//           original_price INTEGER,
//           current_price INTEGER,
//           PRIMARY KEY (id));
//         `;
