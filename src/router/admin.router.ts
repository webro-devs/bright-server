import { Router } from "express";
import * as adminController from "../modules/admin/admin.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import {
  CreateAdminDto,
  UpdateAdminDto,
  UpdateAdminProfileDto,
} from "../modules/admin/dto";
import { PermissionMiddleware } from "../modules/auth/middleware";

const router = Router();

router
  .get("/admin", adminController.getAll)
  .get("/admin/me", adminController.getMe)
  .get("/admin/:id", adminController.getById)
  .post(
    "/admin",
    DtoValidationMiddleware(CreateAdminDto),
    // PermissionMiddleware("Создать пользователя"),
    adminController.create,
  )
  .put(
    "/admin/:id",
    DtoValidationMiddleware(UpdateAdminDto, true),
    PermissionMiddleware("Создать пользователя"),
    adminController.update,
  )
  .patch(
    "/admin/active/:id",
    PermissionMiddleware("Создать пользователя", "Удалить"),
    adminController.changeActive,
  )
  .patch("/admin/profile/:id", adminController.changeProfile)
  .delete(
    "/admin/:id",
    PermissionMiddleware("Удалить"),
    adminController.deleteData,
  );

module.exports = router;
