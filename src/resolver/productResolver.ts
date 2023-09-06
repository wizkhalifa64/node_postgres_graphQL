import { GraphQLError } from "graphql";
import { client } from "../db/db";
import { createProductArgsInput } from "../gql/ProductSchema";

export const createProductResolver = async (
  _: any,
  args: createProductArgsInput
) => {
  try {
    // console.log(args);
    const query = `
    INSERT INTO product (product_name,
        description,
        original_price,
        current_price)
    VALUES ($1,$2,$3,$4) RETURNING *
    `;
    const data = await client.query(query, [
      args.product_name,
      args.description,
      args.original_price,
      args.current_price,
    ]);
    return data.rows[0];
  } catch (error) {
    return new GraphQLError("Request faild");
  }
};
