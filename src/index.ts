import "dotenv/config";
import { App, HttpRequest, HttpResponse } from "uWebSockets.js";
import { createYoga } from "graphql-yoga";
import { makeBehavior } from "graphql-ws/lib/use/uWebSockets";
import { connectDb } from "./db/db";
import schema from "./gql/schema";
import { authMiddleWare } from "./middleware/authMiddleware";
import { ExecutionArgs, execute, subscribe } from "graphql";
type ServerContext = {
  req: HttpRequest;
  res: HttpResponse;
};

const yoga = createYoga<ServerContext>({
  schema: schema,
  // context: authMiddleWare,
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});
type EnvelopedExecutionArgs = ExecutionArgs & {
  rootValue: {
    execute: typeof execute;
    subscribe: typeof subscribe;
  };
};

const wsHandler = makeBehavior({
  execute: (args) => (args as EnvelopedExecutionArgs).rootValue.execute(args),
  subscribe: (args) =>
    (args as EnvelopedExecutionArgs).rootValue.subscribe(args),
  onSubscribe: async (ctx, msg) => {
    const { schema, execute, subscribe, contextFactory, parse, validate } =
      yoga.getEnveloped(ctx);

    const args: EnvelopedExecutionArgs = {
      schema,
      operationName: msg.payload.operationName,
      document: parse(msg.payload.query),
      variableValues: msg.payload.variables,
      contextValue: await contextFactory(),
      rootValue: {
        execute,
        subscribe,
      },
    };

    const errors = validate(args.schema, args.document);
    if (errors.length) return errors;
    return args;
  },
});

connectDb()
  .then(() =>
    App()
      .any("/*", yoga)
      .ws(yoga.graphqlEndpoint, wsHandler)
      .listen(4000, () => {
        console.info("Server is running on http://localhost:4000/graphql");
      })
  )
  .catch((er) => console.log(er));
