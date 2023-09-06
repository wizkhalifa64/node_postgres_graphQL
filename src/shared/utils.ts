import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
const aggregrationCol = (col: string[]) =>
  Object.fromEntries(
    col.map((item) => [
      item,
      {
        type: new GraphQLInputObjectType({
          name: item,
          fields: {
            _eq: { type: GraphQLString },
            _gt: { type: GraphQLString },
            _lt: { type: GraphQLString },
            _gte: { type: GraphQLString },
            _lte: { type: GraphQLString },
          },
        }),
      },
    ])
  );
export const aggregrationObj = (column: string[], name: string) => ({
  WHERE: {
    type: new GraphQLInputObjectType({
      name: name,
      fields: aggregrationCol(column),
    }),
  },
  LIMIT: { type: GraphQLInt },
});
export const replaceCher = (str: string) => {
  return (
    str
      // .replaceAll('"},"', '" AND ')

      // .replaceAll('{"', " ")
      // .replaceAll("}", " ")
      // .replaceAll('":', "")

      // .replaceAll("LIMIT", "LIMIT ")
      .replaceAll("_eq", " = ")
      .replaceAll("_lte", " <= ")
      .replaceAll("_gte", " >= ")
      .replaceAll("_lt", " < ")
      .replaceAll("_gt", " > ")
      .replaceAll("_ne", " <> ")
  );
  // .replaceAll('," >=', " AND >=")
  // .replaceAll(',"', " ")
  // .replaceAll('"', "'");
};
