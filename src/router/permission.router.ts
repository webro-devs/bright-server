import { Router } from "express";
import * as permissionController from "../modules/permission/permission.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import {
  CreatPermissionDto,
  UpUpdatePermissionDto,
} from "../modules/permission/dto";

const router = Router();

router
  .get("/permission", permissionController.getAll)
  .get("/permission/:id", permissionController.getById)
  .post(
    "/permission",
    DtoValidationMiddleware(CreatPermissionDto),
    permissionController.create,
  )
  .put(
    "/permission/:id",
    DtoValidationMiddleware(UpUpdatePermissionDto, true),
    permissionController.update,
  )
  .delete("/permission/:id", permissionController.deleteData);

module.exports = router;
