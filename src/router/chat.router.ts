import { Router } from "express";
import * as chatController from "../modules/chat/chat.controller";
import * as messageController from "../modules/chat-message/chat-message.controller";

const router = Router();

router
  .get("/chat/:id", chatController.getById)
  .post("/chat", chatController.create)
  .delete("/chat/:id", chatController.deleteData)
  .post("/message", messageController.create);

module.exports = router;
