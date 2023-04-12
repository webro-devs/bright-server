import { Router } from "express";
import * as newsController from "../modules/news/news.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateNewsDto, UpdateNewsDto } from "../modules/news/dto";
import { PermissionMiddleware } from "../modules/auth/middleware";
import { NewsQueryParserMiddleware } from "../infra/validation";

const router = Router();

router
  .get("/news/:key/:shortLink")
  .get("/news", NewsQueryParserMiddleware, newsController.getAll)
  .get("/news/my-news", NewsQueryParserMiddleware, newsController.getMyNews)
  .get(
    "/news/archives",
    PermissionMiddleware("Доступ к архивам"),
    NewsQueryParserMiddleware,
    newsController.getByStateArchive,
  )
  .get(
    "/news/general_access",
    PermissionMiddleware("Общий доступ"),
    NewsQueryParserMiddleware,
    newsController.getByStateGeneral,
  )
  .get(
    "/news/published",
    NewsQueryParserMiddleware,
    newsController.getByStatePublished,
  )
  .get(
    "/news/checking",
    NewsQueryParserMiddleware,
    newsController.getByStateChecking,
  )
  .get("/news/search", NewsQueryParserMiddleware, newsController.search)
  .get("/news/last-news", NewsQueryParserMiddleware, newsController.getLastNews)
  .get(
    "/news/favorites",
    NewsQueryParserMiddleware,
    newsController.getBySavedCreator,
  )
  .get("/single-news/:id", NewsQueryParserMiddleware, newsController.getById)
  .post(
    "/news",
    PermissionMiddleware("Добавить новости"),
    DtoValidationMiddleware(CreateNewsDto),
    newsController.create,
  )
  .put(
    "/news/:id",
    DtoValidationMiddleware(UpdateNewsDto, true),
    // PermissionMiddleware("Редактировать новости"),
    newsController.update,
  )
  .delete(
    "/news",
    // PermissionMiddleware("Удалить"),
    newsController.deleteData,
  )
  .patch("/news/published", newsController.updateStatePublished)
  .patch("/news/archive/:id", newsController.updateStateArchive)
  .patch("/news/general_access/:id", newsController.updateStateGeneral)
  .patch("/news/favorite/:id", newsController.updateStateFavorite)
  .patch("/news/checking/:id", newsController.updateStateChecking)
  .patch("/news/publish_date/:id", newsController.updateDate);

module.exports = router;
