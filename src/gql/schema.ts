import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  UserResponse,
  Users,
  authInputSchema,
  userRegisterInputSchema,
} from "./schema/userSchema";
import { UserResolver } from "./resolver/userResolver";
import { AuthResolver } from "./resolver/authResolver";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: Users,
    },
  },
});
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    create_customer: {
      type: Users,
      args: userRegisterInputSchema,
      resolve: UserResolver,
    },
    auth: {
      type: UserResponse,
      args: authInputSchema,
      resolve: AuthResolver,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
export default schema;
