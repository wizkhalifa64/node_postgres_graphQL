import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLUUID } from "graphql-scalars";
import { aggregrationObj } from "../shared/utils";
import { customer } from "../shared/data";
export const CustomerSchema = new GraphQLObjectType({
  name: "customer",
  fields: () => ({
    id: { type: GraphQLUUID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString! },
  }),
});
export const CreateCustomerInputType = {
  first_name: { type: GraphQLString! },
  last_name: { type: GraphQLString },
  email: { type: GraphQLString! },
  password: { type: GraphQLString! },
};
export type createCustomerInputType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export const AggregrationCustomer = aggregrationObj(customer, "customerAgg");
