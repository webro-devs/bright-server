import { CookieOptions } from "express";

export const ACCESS_TOKEN_ADMIN = "access_token_admin";
export const REFRESH_TOKEN_ADMIN = "refresh_token_admin";
export const accessTokenOptions: CookieOptions = {
  secure: true,
  sameSite: "none",
  maxAge: 31536000000,
  httpOnly: true,
};
export const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
};