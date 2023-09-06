import {
  GraphQLError,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import {
  AggregrationCustomer,
  CreateCustomerInputType,
  CustomerDetailsSchema,
  CustomerSchema,
} from "./CustomerSchema";
import { replaceCher } from "../shared/utils";
import { createCustomerResolver } from "../resolver/customerResolver";
import {
  AggregrationProduct,
  CreateProduct,
  CreateProductArgs,
} from "./ProductSchema";
import { createProductResolver } from "../resolver/productResolver";
import { client } from "../db/db";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerSchema,
      args: AggregrationCustomer,
      resolve: (_, args) => {
        const a = JSON.stringify(args);
        const b = replaceCher(a);
        console.log(b);
      },
    },
    product: {
      type: new GraphQLList(CreateProduct),
      args: AggregrationProduct,
      resolve: async (_, args) => {
        try {
          const a = JSON.stringify(args);
          const b = replaceCher(a);
          const c = JSON.parse(b);
          const d = Object.entries(c).flatMap((item: any) => {
            if (typeof item[1] === "object") {
              return `${item[0]} ${Object.entries(item[1]).flatMap(
                (elm) =>
                  `${elm[0]} ${JSON.stringify(elm[1]).replaceAll(
                    ',"',
                    ` AND ${elm[0]} `
                  )}`
              )}`;
            } else {
              return `${item[0]} ${item[1]}`;
            }
          });

          // const data = await client.query(`SELECT * from product   LIMIT 10 `);
          console.log(d);
          // return data.rows;
        } catch (error) {
          // return new GraphQLError("Something wrong");
        }
      },
    },
  },
});
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    create_customer: {
      type: CustomerDetailsSchema,
      args: CreateCustomerInputType,
      resolve: createCustomerResolver,
    },
    createProduct: {
      type: CreateProduct,
      args: CreateProductArgs,
      resolve: createProductResolver,
    },
  },
});
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
export default schema;
