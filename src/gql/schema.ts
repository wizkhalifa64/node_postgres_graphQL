import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  Customer,
  customerInputSchema,
  customer_query,
} from "./customerSchema";
import { CustomerResolver } from "../resolver/customerResolver";
import { client } from "../db/db";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: Customer,
    },
    customer_query: {
      type: new GraphQLList(Customer),
      args: customer_query,
      resolve: async (_, args) => {
        const data = JSON.parse(JSON.stringify(args));
        const b = Object.entries(data);
        const qu = b
          .flatMap((e) => {
            if (typeof e[1] === "object") {
              const data = JSON.stringify(e[1])
                .replaceAll("{", "")
                .replaceAll("}", "")
                .replaceAll(":", " ")
                .replaceAll('"', "");
              return `${e[0].replace("_", " ")} ${data}`;
            } else {
              return `${e[0]} ${e[1]}`;
            }
          })
          .join(" ");
        const neq = `select * from customers` + " " + qu;
        const result = await client.query(neq);
        return result.rows;
      },
    },
  },
});
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    create_customer: {
      type: Customer,
      args: customerInputSchema,
      resolve: CustomerResolver,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
export default schema;
