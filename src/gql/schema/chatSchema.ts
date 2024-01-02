import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const ChatSchema = {
  id: { type: GraphQLID },
  from: { type: GraphQLString },
  message: { type: GraphQLString },
};

export const Chat = new GraphQLObjectType({
  name: "chat",
  fields: () => ChatSchema,
});
