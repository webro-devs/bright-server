import { Router } from "express";
import * as newsController from "../modules/news/news.controller";

const router = Router();

router
  .get("/news", newsController.getAll)
  .get("/news/:id", newsController.getById)
  // .post("/news", newsController.create)
  .post("/news", newsController.create)
  .put("/news/:id", newsController.update)
  .delete("/news/:id", newsController.deleteData);

module.exports = router;
