import { NextFunction, Response } from "express";
import { HttpException } from "../../../infra/validation";
import { authService } from "../auth.module";
import { ACCESS_TOKEN_ADMIN } from "../constanta";

const AccessTokenMiddleware = async (
  req,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      (req.method == "GET" && req.url == "/news") ||
      req.url == "/auth/login" ||
      req.url == "/auth/logout" ||
      req.url == "/auth/refresh"
    ) {
      next();
      return;
    }
    const token = req.cookies[ACCESS_TOKEN_ADMIN];
    const user = await authService.validateToken(token, "access");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(new HttpException(true, 400, err.message));
  }
};

export default AccessTokenMiddleware;
