import { Router } from "express";
import * as positionController from "../modules/position/position.controller";

const router = Router();

router
  .get("/position", positionController.getAll)
  .post("/position", positionController.create)
  .put("/position/:id", positionController.update)
  .delete("/position/:id", positionController.remove);

module.exports = router;
