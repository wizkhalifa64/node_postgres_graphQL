import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLInputObjectType,
} from "graphql";
import { GraphQLEmailAddress, GraphQLDateTime } from "graphql-scalars";

export const customerSchema = {
  id: { type: GraphQLID },
  first_name: { type: GraphQLString },
  last_name: { type: GraphQLString },
  email: { type: GraphQLEmailAddress },
  password: { type: GraphQLString },
  created_on: { type: GraphQLDateTime },
};
export const customerInputSchema = {
  first_name: { type: new GraphQLNonNull(GraphQLString) },
  last_name: { type: GraphQLString },
  email: { type: new GraphQLNonNull(GraphQLEmailAddress) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};
export type customerInputArgs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export const Order_By = new GraphQLEnumType({
  name: "RGB",
  values: {
    asc: { value: "asc" },
    desc: { value: "desc" },
  },
});
export const Customer = new GraphQLObjectType({
  name: "customer",
  fields: () => customerSchema,
});

export const customer_query = {
  order_by: {
    type: new GraphQLInputObjectType({
      name: "customer_order_by",
      fields: Object.fromEntries(
        Object.keys(customerSchema).map((item) => [item, { type: Order_By }])
      ),
    }),
  },
  limit: { type: GraphQLInt },
  offset: { type: GraphQLInt },
};
