import { Response, Request } from "express";
import { CreateChatDto } from "./dto";

import { chatService } from ".";

export async function getById(req: Request, res: Response) {
  const response = await chatService.getById(req.params.id);
  res.send(response);
}

export async function create(req: Request, res: Response) {
  const values: CreateChatDto = req.body;

  const response = await chatService.create(values);
  res.send(response);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  const response = await chatService.remove(id);
  res.send(response);
}
