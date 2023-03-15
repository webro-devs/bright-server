import { Response, Request } from "express";
import { CreateMessageDto } from "./dto";

import { messageService } from ".";

export async function getAll(req: Request, res: Response) {
  const response = await messageService.getAll();
  res.send(response);
}

export async function create(req: Request, res: Response) {
  const values: CreateMessageDto = req.body;

  const response = await messageService.create(values);
  res.send(response);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  const response = await messageService.remove(id);
  res.send(response);
}
