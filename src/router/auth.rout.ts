import { Router } from "express";
import * as authController from "../modules/auth/auth.controller";
import {
  LoginMiddleware,
  RefreshTokenMiddleware,
} from "../modules/auth/middleware";

const router = Router();

router
  .post("/auth/login", LoginMiddleware, authController.Login)
  .post("/auth/logout", authController.Logout)
  .post("/auth/refresh", RefreshTokenMiddleware, authController.Refresh);

module.exports = router;
