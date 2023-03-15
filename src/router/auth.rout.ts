import { Router } from "express";
import * as authController from "../modules/auth/auth.controller";
import {
  LoginMiddleware,
  RefreshTokenMiddleware,
} from "../modules/auth/middleware";
import { DtoValidationMiddleware } from "../infra/validation";
import { LoginDto } from "../modules/auth/dto";
const router = Router();

router
  .post(
    "/auth/login",
    DtoValidationMiddleware(LoginDto),
    LoginMiddleware,
    authController.Login,
  )
  .post("/auth/logout", authController.Logout)
  .post("/auth/refresh", RefreshTokenMiddleware, authController.Refresh);

module.exports = router;
