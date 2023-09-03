import { Client } from "pg";
import { customerquery } from "./query";
export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "hrmanage",
  password: "admin",
  port: 5432,
});
export const connectDb = async () => {
  try {
    await client.connect();
    console.log("database connected");
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await client.query(customerquery);
  } catch (error) {
    throw error;
  }
};
