import { client } from "../db/db";
import { customerInputArgs } from "../gql/customerSchema";
import { GraphQLError } from "graphql";
export const CustomerResolver = async (_: any, args: customerInputArgs) => {
  try {
    const insertQuery = `
    INSERT INTO customers (first_name,last_name,email,password)
    VALUES ($1,$2,$3,$4) RETURNING *
    `;
    const data = await client.query(insertQuery, [
      args.first_name,
      args.last_name,
      args.email,
      args.password,
    ]);
    return data.rows[0];
  } catch (error) {
    return new GraphQLError("Something went wrong");
  }
};
