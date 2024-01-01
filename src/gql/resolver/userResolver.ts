import { client } from "../../db/db";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { UserCreate, UserFilter } from "../../types/userArgs";
export const UserResolver = async (_: any, args: UserCreate) => {
  try {
    const is_valid_role = await client.query(
      `SELECT role_id FROM roles WHERE role_id = $1`,
      [args.role]
    );
    if (is_valid_role?.rowCount === 0) {
      return new GraphQLError("Invalid role");
    }
    const is_present = await client.query(
      `SELECT email FROM users WHERE email = $1`,
      [args.email]
    );
    if (is_present?.rowCount > 0) {
      return new GraphQLError("User already registered");
    }
    const salt = await bcrypt.genSalt(5);
    const passwordHashed = await bcrypt.hash(args.password, salt);
    const query = `INSERT INTO users( name,email,password,gender,role) VALUES($1,$2,$3,$4,$5) RETURNING *`;
    const values = [
      args.name,
      args.email,
      passwordHashed,
      args.gender,
      args.role,
    ];
    const data = await client.query(query, values);
    return data.rows[0];
  } catch (error) {
    error;
  }
};

export const GetAllUser = async (_: undefined, args: UserFilter) => {
  try {
    const query = `
    SELECT
    *
FROM
    users
WHERE
    name ILIKE (
        CASE
            WHEN $1::text IS NOT NULL THEN '%' || $1 || '%'
            ELSE '%%'
        END
    )
    AND email ILIKE (
        CASE
            WHEN $2::text IS NOT NULL THEN '%' || $2 || '%'
            ELSE '%%'
        END
    )
    AND gender = (
        CASE
            WHEN $3::SMALLINT IS NOT NULL THEN $3
            ELSE gender
        END
    )
  `;
    const userList = await client.query(query, [
      args.name,
      args.email,
      args.gender,
    ]);
    return userList.rows;
  } catch (error) {
    error;
  }
};
