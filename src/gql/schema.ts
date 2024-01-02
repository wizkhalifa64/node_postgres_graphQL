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
import { Chat, ChatInputSchema, ChatSchema } from "./schema/chatSchema";
import { ChatMutation, ChatSubScribe } from "./resolver/chatResolver";

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
    chat: {
      type: Chat,
      args: ChatInputSchema,
      resolve: ChatMutation,
    },
  },
});
const RootSubScription = new GraphQLObjectType({
  name: "RootSubscription",
  fields: {
    messageSent: {
      type: Chat,
      args: ChatInputSchema,
      subscribe: ChatSubScribe,
    },
  },
});
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubScription,
});
export default schema;
