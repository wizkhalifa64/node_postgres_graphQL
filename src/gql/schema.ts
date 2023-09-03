import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { AggregrationCustomer, CustomerSchema } from "./CustomerSchema";
import { replaceCher } from "../shared/utils";

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
  },
});
//   const RootMutation = new GraphQLObjectType({
//     name: "RootMutationType",
//     fields: {
//       create_customer: {
//         type: CustomerDetailsType,

//         args: CreateCustomerInputType,
//         resolve: createCustomerResolver,
//       },
//     },
//   });
const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation,
});
export default schema;
