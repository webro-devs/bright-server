import { NextFunction, Response } from "express";
import { authService } from "../auth.module";
import { REFRESH_TOKEN_ADMIN } from "../constanta";

const RefreshTokenMiddleware = async (
  req,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[REFRESH_TOKEN_ADMIN];
    const user = await authService.validateToken(token, "refresh");
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(400).send(err.massage);
  }
};

export default RefreshTokenMiddleware;
