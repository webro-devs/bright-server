import { Router } from "express";
import * as categoryController from "../modules/category/category.controller";

const router = Router();

router
  .get("/category", categoryController.getAll)
  .get("/category/:id", categoryController.getById)
  .post("/category", categoryController.create)
  .put("/category/:id", categoryController.update)
  .delete("/category/:id", categoryController.deleteData);

module.exports = router;
