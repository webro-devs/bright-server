import { Router } from "express";
import * as newsController from "../modules/news/news.controller";

const router = Router();

router
  .get("/news", newsController.getAll)
  //   .get("/admin/:id", newsController.getById)
  .post("/news", newsController.create);
//   .put("/admin/:id", adminController.update)
//   .delete("/admin/:id", adminController.deleteData);

module.exports = router;
