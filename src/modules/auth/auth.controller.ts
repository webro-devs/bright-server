import { Request, Response } from "express";
import { authService } from "./auth.module";
import {
  accessTokenOptions,
  ACCESS_TOKEN_ADMIN,
  refreshTokenOptions,
  REFRESH_TOKEN_ADMIN,
} from "./constanta";
import { HttpException } from "../../infra/validation";

export const Login = async (req, res: Response) => {
  try {
  const accessToken = authService.getJWT("access", req.user.id);
  const refreshToken = authService.getJWT("refresh", req.user.id);
  res.cookie(ACCESS_TOKEN_ADMIN, accessToken, accessTokenOptions);
  res.cookie(REFRESH_TOKEN_ADMIN, refreshToken, refreshTokenOptions);
  res.send({
    access_token_admin: accessToken,
    refresh_token_admin: refreshToken,
  });
  } catch (err) {
    res.status(400).send(new HttpException(true, 400, err.massage));
  }
};

export const Logout = async (_: Request, res: Response) => {
  res.clearCookie(ACCESS_TOKEN_ADMIN, accessTokenOptions);
  res.clearCookie(REFRESH_TOKEN_ADMIN, refreshTokenOptions);
  res.end()
};

export const Refresh = async (req, res: Response) => {
  try {
  const accessToken = authService.getJWT("access", req.user.id);
  const refreshToken = authService.getJWT("refresh", req.user.id);
  res.cookie(ACCESS_TOKEN_ADMIN, accessToken, accessTokenOptions);
  res.cookie(REFRESH_TOKEN_ADMIN, refreshToken, refreshTokenOptions);
  } catch (err) {
    res.status(400).send(new HttpException(true, 400, err.massage));
  }
};
