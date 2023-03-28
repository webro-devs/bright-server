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
    const response = await messageService.remove(id, req?.["user"]?.id);
    if (!response) {
      throw new HttpException(true, 400, "It is not your business!");
    }
    return res.send(response);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}
export async function updateMessage(req: Request, res: Response) {
  try {
    const { messageID, data } = req.body;
    const response = await messageService.update(
      data,
      messageID,
      req["user"].id,
    );
    res.status(201);
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
}
