import "dotenv/config";
// import { App, HttpRequest, HttpResponse } from "uWebSockets.js";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { connectDb } from "./db/db";
import schema from "./gql/schema";
import { authMiddleWare } from "./middleware/authMiddleware";
// type ServerContext = {
//   req: HttpRequest;
//   res: HttpResponse;
// };

const yoga = createYoga({ schema: schema, context: authMiddleWare });
const server = createServer(yoga);
connectDb()
  .then(
    () =>
      server.listen(4000, () =>
        console.info("Server is running on http://localhost:4000/graphql")
      )
    // App()
    //   .any("/*", yoga)
    //   .listen(4000, () => {
    //     console.info("Server is running on http://localhost:4000/graphql");
    //   })
  )
  .catch((er) => console.log(er));
