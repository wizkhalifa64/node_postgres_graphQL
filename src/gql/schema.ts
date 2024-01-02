import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  UserResponse,
  Users,
  authInputSchema,
  userQuerySchema,
  userRegisterInputSchema,
} from "./schema/userSchema";
import { GetAllUser, UserResolver } from "./resolver/userResolver";
import { AuthResolver } from "./resolver/authResolver";
import { Chat, ChatSchema } from "./schema/chatSchema";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(Users),
      args: userQuerySchema,
      resolve: GetAllUser,
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
const RootSubScription = new GraphQLObjectType({
  name: "RootSubscription",
  fields: {
    messageSent: { type: Chat },
  },
});
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubScription,
});
export default schema;
