import { NextFunction, Request, Response } from "express";
import { verifyDecodeJWT } from "./utils";

// Authenticate user
export function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Not authorized");
  }

  const userData = token && verifyDecodeJWT(token);
  try {
    res.locals.user = userData;
    return next();
  } catch {
    res.locals.user = false;
    return res.status(403).send("No valid token");
  }
}
