import { Client } from "pg";
export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "hr-graphql-js",
  password: "admin",
  port: 5432,
});
export const connectDb = async () => {
  try {
    await client.connect();
    // await client.query(
    //   `INSERT INTO users( name,email,password,gender,role)
    // VALUES($1,$2,$3,$4,$5)
    // `,
    //   ["admin", "admin@gmail.com", "password", 0, 1]
    // );
    console.log("database connected");
  } catch (error) {
    throw error;
  }
};
