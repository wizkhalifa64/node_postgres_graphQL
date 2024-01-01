import { YogaInitialContext } from "graphql-yoga";
import { JwtPayload, verify } from "jsonwebtoken";

export const authMiddleWare = (req: YogaInitialContext) => {
  const header = req.request.headers.get("Authorization");
  if (!header) {
    return null;
  }
  const token = header.split(" ")[1];
  const tokenPayload = verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};
