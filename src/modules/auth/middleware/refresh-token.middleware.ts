import { NextFunction, Response } from "express";
import { HttpException } from "../../../infra/validation";
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
    res.status(426).send(new HttpException(true, 426, err.message));
  }
};

export default RefreshTokenMiddleware;
