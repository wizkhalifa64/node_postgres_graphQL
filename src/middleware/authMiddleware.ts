import { JwtPayload, verify } from "jsonwebtoken";
import { HttpRequest, HttpResponse } from "uWebSockets.js";

export const authMiddleWare = (req: HttpRequest) => {
  const header = req.getHeader("Authorization");
  if (!header) {
    return null;
  }
  const token = header.split(" ")[1];
  const tokenPayload = verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};
