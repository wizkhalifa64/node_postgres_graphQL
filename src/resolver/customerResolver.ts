import { client } from "../db/db";
import { createCustomerInputType } from "../gql/CustomerSchema";
import bcrypt from "bcrypt";

export const createCustomerResolver = async (
  _: any,
  args: createCustomerInputType
) => {
  try {
    const hashedPassWord = await bcrypt.genSalt;
    const query = `
          INSERT INTO customers (first_name, last_name,email,password)
          VALUES ($1,$2,$4,$5) RETURNING *
          `;
    const data: any = await client.query(query, [
      args.first_name,
      args.last_name,
      args.email,
      args.password,
    ]);
    return { user: data.rows[0] };
  } catch (error) {
    return error;
  }
};
