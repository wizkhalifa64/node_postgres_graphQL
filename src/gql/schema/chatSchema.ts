import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const ChatSchema = {
  from: { type: GraphQLString },
  message: { type: GraphQLString },
};
export const ChatInputSchema = {
  from: { type: new GraphQLNonNull(GraphQLString) },
  message: { type: new GraphQLNonNull(GraphQLString) },
};
export const Chat = new GraphQLObjectType({
  name: "chat",
  fields: () => ChatSchema,
});
