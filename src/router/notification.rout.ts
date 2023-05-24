import { Router } from "express";
import * as notificationController from "../modules/notification/notification.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateNotificationDto } from "../modules/notification/dto";

const router = Router();

router
  .get("/notification", notificationController.getAll)
  .get("/notification/my-notifications", notificationController.getMyNotifications)
  .get("/notification/:id", notificationController.getById)
  .post("/notification", DtoValidationMiddleware(CreateNotificationDto), notificationController.create)
  .patch("/notification/isViewed", notificationController.updateIsViewed)
  .patch("/notification/state", notificationController.updateState)
  .delete("/notification/:id", notificationController.deleteData);

module.exports = router;