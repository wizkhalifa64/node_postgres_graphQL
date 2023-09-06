import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import { GraphQLUUID, GraphQLJSON } from "graphql-scalars";
import { aggregrationObj } from "../shared/utils";
import { product } from "../shared/data";

export const CreateProduct = new GraphQLObjectType({
  name: "productSchema",
  fields: () => ({
    id: { type: GraphQLUUID },
    product_name: { type: GraphQLString },
    description: { type: GraphQLJSON },
    original_price: { type: GraphQLInt },
    current_price: { type: GraphQLInt },
  }),
});
export const CreateProductArgs = {
  product_name: { type: GraphQLString },
  description: { type: GraphQLJSON },
  original_price: { type: GraphQLInt },
  current_price: { type: GraphQLInt },
};
export type createProductArgsInput = {
  product_name: string;
  description: string;
  original_price: number;
  current_price: number;
};
export const AggregrationProduct = aggregrationObj(product, "productAgg");
