import { Response, Request } from "express";
import { CreateChatDto } from "./dto";

import { chatService } from ".";
import { HttpException } from "../../infra/validation";

export async function getById(req: Request, res: Response) {
  try {
    const response = await chatService.getById(req.params.id);
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const values: CreateChatDto = req.body;

    const response = await chatService.create(values);
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await chatService.remove(id);
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}
