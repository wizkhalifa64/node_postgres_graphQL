import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import {
  GraphQLEmailAddress,
  GraphQLDateTime,
  GraphQLJSON,
} from "graphql-scalars";
import { GenderType } from "../../shared/graphqlEnum";

export const userSchema = {
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  email: { type: GraphQLEmailAddress },
  password: { type: GraphQLString },
  gender: { type: GenderType },
  role: { type: GraphQLInt },
  verified: { type: GraphQLBoolean },
  qualification: { type: GraphQLJSON },
  employeeId: { type: GraphQLString },
  address: { type: GraphQLJSON },
  created_at: { type: GraphQLDateTime },
  updated_at: { type: GraphQLDateTime },
};
export const userRegisterInputSchema = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLEmailAddress) },
  password: { type: new GraphQLNonNull(GraphQLString) },
  gender: { type: new GraphQLNonNull(GenderType) },
  role: { type: new GraphQLNonNull(GraphQLInt) },
};
export const authInputSchema = {
  email: { type: new GraphQLNonNull(GraphQLEmailAddress) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};
export const userQuerySchema = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  gender: { type: GenderType },
  role: { type: GraphQLInt },
  verified: { type: GraphQLBoolean },
};
export const Users = new GraphQLObjectType({
  name: "user",
  fields: () => userSchema,
});

export const UserResponse = new GraphQLObjectType({
  name: "userresponse",
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: Users },
  }),
});
