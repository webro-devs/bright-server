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
      (req.method == "GET" && req.url.includes("/news")) ||
      req.url == "/auth/login" ||
      req.url == "/auth/logout" ||
      req.url == "/auth/refresh" ||
      req.url == "/category"
    ) {
      next();
      return;
    }

    const token = req.cookies[ACCESS_TOKEN_ADMIN];

    const user = await authService.validateToken(token, "access");
    if (!user.isActive) {
      return res
        .status(404)
        .send(new HttpException(true, 404, "Admin not found!"));
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(new HttpException(true, 400, err.message));
  }
};

export default AccessTokenMiddleware;
