import { Router } from "express";
import * as positionController from "../modules/position/position.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreatePositionDto, UpdatePositionDto } from "../modules/position/dto";

const router = Router();

router
  .get("/position", positionController.getAll)
  .post(
    "/position",
    DtoValidationMiddleware(CreatePositionDto),
    positionController.create,
  )
  .put(
    "/position/:id",
    DtoValidationMiddleware(UpdatePositionDto, true),
    positionController.update,
  )
  .delete("/position/:id", positionController.remove);

module.exports = router;
