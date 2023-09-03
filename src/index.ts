import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { connectDb } from "./db/db";
import schema from "./gql/schema";
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema: schema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

connectDb()
  .then(() =>
    server.listen(4000, () => {
      console.info("Server is running on http://localhost:4000/graphql");
    })
  )
  .catch((er) => console.log(er));
