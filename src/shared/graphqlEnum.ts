import { GraphQLEnumType } from "graphql";

export const GenderType = new GraphQLEnumType({
  name: "gender",
  values: {
    Male: {
      value: 0,
    },
    Female: {
      value: 1,
    },
    Other: {
      value: 3,
    },
  },
});
