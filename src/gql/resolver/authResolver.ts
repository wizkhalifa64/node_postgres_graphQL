import { GraphQLError } from "graphql/error/GraphQLError";
import { client } from "../../db/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserRegister } from "../../types/userArgs";

export const AuthResolver = async (_: undefined, args: UserRegister) => {
  try {
    const is_present = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [args.email]
    );
    if (is_present?.rowCount === 0) {
      return new GraphQLError("User not registered");
    }
    const is_valid_password = await compare(
      args.password,
      is_present.rows[0]?.password
    );
    if (!is_valid_password) {
      return new GraphQLError("Invalid Password");
    }
    const payload = {
      email: is_present.rows[0]?.email,
      role: is_present.rows[0]?.role,
    };
    const token = sign(payload, process.env.JWT_SECRET as string);
    return { token, user: is_present.rows[0] };
  } catch (error) {
    error;
  }
};
