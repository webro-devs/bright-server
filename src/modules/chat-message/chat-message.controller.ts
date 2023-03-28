import { Response, Request } from "express";
import { CreateMessageDto } from "./dto";
import { HttpException } from "../../infra/validation";

import { messageService } from ".";

export async function getAll(req: Request, res: Response) {
  try {
    const response = await messageService.getAll();
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const values: CreateMessageDto = req.body;

    const response = await messageService.create(values);
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await messageService.remove(id);
    res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}
