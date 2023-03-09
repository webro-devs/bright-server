import { Router } from "express";
import * as adminController from "../modules/admin/admin.controller";

const router = Router();

router
  .get("/admin", adminController.getAll)
  .get("/admin/:id", adminController.getById)
  .post("/admin", adminController.create)
  .put("/admin/:id", adminController.update)
  .patch("/admin/active/:id", adminController.changeActive)
  .patch("/admin/profile/:id", adminController.changeProfile)
  .delete("/admin/:id", adminController.deleteData);

module.exports = router;
