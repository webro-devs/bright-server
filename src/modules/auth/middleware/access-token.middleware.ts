import { NextFunction, Response } from "express";
import { authService } from "../auth.module";
import { ACCESS_TOKEN_ADMIN } from "../constanta";

const AccessTokenMiddleware = async (
  req,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.method == "GET") {
      next();
      return;
    }
    const token = req.cookies[ACCESS_TOKEN_ADMIN];
    const user = await authService.validateToken(token, "access");
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(400).send(err.massage);
  }
};

export default AccessTokenMiddleware;
