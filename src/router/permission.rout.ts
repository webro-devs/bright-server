import { Router } from "express";
import * as permissionController from "../modules/permission/permission.controller";

const router = Router();

router
  .get("/permission", permissionController.getAll)
  .get("/permission/:id", permissionController.getById)
  .post("/permission", permissionController.create)
  .put("/permission/:id", permissionController.update)
  .delete("/permission/:id", permissionController.deleteData);

module.exports = router;
