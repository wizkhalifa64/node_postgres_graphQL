import { GraphQLError } from "graphql";
import { client } from "../db/db";
import { createCustomerInputType } from "../gql/CustomerSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createCustomerResolver = async (
  _: any,
  args: createCustomerInputType
) => {
  try {
    const findQuery = `SELECT email from customers WHERE email = '${args.email}'`;
    const isPresent = await client.query(findQuery);
    if (isPresent.rowCount) {
      return new GraphQLError("Email already present, try login");
    } else {
      const salt = await bcrypt.genSalt(5);
      const passwordHash = await bcrypt.hash(args.password, salt);
      const query = `
      INSERT INTO customers (first_name,last_name,email,password)
      VALUES ($1,$2,$3,$4) RETURNING *
      `;
      const data = await client.query(query, [
        args.first_name,
        args.last_name,
        args.email,
        passwordHash,
      ]);
      const token = jwt.sign(
        { id: data.rows[0].id },
        `${process.env.JWT_SECRET}`
      );
      return { token, user: data.rows[0] };
    }
  } catch (error) {
    return error;
  }
};
