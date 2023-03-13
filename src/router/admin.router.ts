import { Router } from "express";
import * as adminController from "../modules/admin/admin.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import {
  CreateAdminDto,
  UpdateAdminDto,
  UpdateAdminProfileDto,
} from "../modules/admin/dto";

const router = Router();

router
  .get("/admin", adminController.getAll)
  .get("/admin/me", adminController.getMe)
  .get("/admin/:id", adminController.getById)
  .post(
    "/admin",
    DtoValidationMiddleware(CreateAdminDto),
    adminController.create,
  )
  .put(
    "/admin/:id",
    DtoValidationMiddleware(UpdateAdminDto, true),
    adminController.update,
  )
  .patch("/admin/active/:id", adminController.changeActive)
  .patch("/admin/profile/:id", adminController.changeProfile)
  .delete("/admin/:id", adminController.deleteData);

module.exports = router;
