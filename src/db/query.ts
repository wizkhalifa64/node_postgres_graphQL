export const customerquery = `
        CREATE TABLE IF NOT EXISTS customers (
          id uuid DEFAULT uuid_generate_v4 (),
          first_name VARCHAR(50),
          last_name VARCHAR(50),
          email VARCHAR(50) UNIQUE,
          password VARCHAR(50),
          created_on timestamp NOT NULL DEFAULT NOW(),
          PRIMARY KEY (id));
          `;
