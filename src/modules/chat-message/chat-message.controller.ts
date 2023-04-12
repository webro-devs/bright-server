import { Response, Request } from "express";
import { CreateMessageDto } from "./dto";
import { HttpException } from "../../infra/validation";

import { messageService } from ".";

export async function getAll(req: Request, res: Response) {
  try {
    const response = await messageService.getAll();
    res.send(response);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const response = await messageService.getById(req.params.id);
    res.send(response);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    req.body.chat = req.params.chatId;
    const values: CreateMessageDto = req.body;
    values.user = req["user"].id;
    const response = await messageService.create(values);
    const userId = { id: response.user };
    delete response.user;
    const resData = {
      ...response,
      user: userId,
    };
    res.send(resData).status(201);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await messageService.remove(id, req["user"].id);
    if (response?.raw != "asdasd") {
      res.status(204).send(response);
    } else {
      res.send(new HttpException(true, 403, "It's not your bussines"));
    }
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export async function updateData(req: Request, res: Response) {
  try {
    const response = await messageService.update(
      req.body["body"],
      req.params["id"],
      req["user"].id,
    );
    if (response?.raw != "asdasd") {
      res.status(203).send(await messageService.getById(req.params["id"]));
    } else {
      res.send(new HttpException(true, 403, "It's not your bussines"));
    }
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}
