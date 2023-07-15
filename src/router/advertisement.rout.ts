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
  .get("/advertisement/category", advertisementController.getMidByCategory)
  .get("/advertisement/:type", advertisementController.getByType)
  .get("/advertisement/single/:id", advertisementController.getById)
  .get("/advertisement/incr-count/:id", advertisementController.IncrCounts)
  .get("/advertisement/click/:id", advertisementController.updateIsClickCount)
  .post(
    "/advertisement",
    DtoValidationMiddleware(CreateAdvertisementDto),
    advertisementController.create,
  )
  .patch("/advertisement/isActive", advertisementController.updateIsActive)
  .put(
    "/advertisement/:id",
    DtoValidationMiddleware(UpdateAdvertisementDto, true),
    advertisementController.update,
  )
  .delete("/advertisement/remove", advertisementController.remove)
  .get("/news/img-url", advertisementController.updateImgUrl);

module.exports = router;
