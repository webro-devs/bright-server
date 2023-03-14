import { Router } from "express";
import * as newsController from "../modules/news/news.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateNewsDto, UpdateNewsDto } from "../modules/news/dto";

const router = Router();

router
  .get("/news", newsController.getAll)
  .get("/news/:id", newsController.getById)
  .post("/news", DtoValidationMiddleware(CreateNewsDto), newsController.create)
  .put(
    "/news/:id",
    DtoValidationMiddleware(UpdateNewsDto, true),
    newsController.update,
  )
  .delete("/news/:id", newsController.deleteData);

module.exports = router;
