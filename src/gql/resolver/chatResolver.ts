import { createPubSub } from "graphql-yoga";
import { chat } from "../../types";
const pubsub = createPubSub();
export const ChatSubScribe = () => {
  return pubsub.subscribe("CHAT_ROOM");
};
export const ChatMutation = (_: undefined, args: chat) => {
  pubsub.publish("CHAT_ROOM", { messageSent: args });
  return args;
};
