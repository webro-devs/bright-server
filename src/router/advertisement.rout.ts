import { Router } from "express";
import * as advertisementController from "../modules/adv/adv.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import {
  CreateAdvertisementDto,
  UpdateAdvertisementDto,
} from "../modules/adv/dto";

const router = Router();

router
  .get("/advertisement", advertisementController.getAll)
  .get("/advertisement/:type", advertisementController.getByType)
  .post(
    "/advertisement",
    DtoValidationMiddleware(CreateAdvertisementDto),
    advertisementController.create,
  )
  .patch("/advertisement/:id", advertisementController.updateIsActive)
  .patch("/advertisement/click/:id", advertisementController.updateIsClickCount)
  .put(
    "/advertisement/:id",
    DtoValidationMiddleware(UpdateAdvertisementDto, true),
    advertisementController.update,
  )
  .delete("/advertisement/:id", advertisementController.remove);

module.exports = router;
