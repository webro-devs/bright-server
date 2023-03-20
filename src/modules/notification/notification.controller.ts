import { Response, Request } from "express";
import { CreateNotificationDto } from "./dto";

import { notificationService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const categories = await notificationService.getAll();
    res.send(categories);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await notificationService.getById(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getMyNotifications(req: Request, res: Response) {
  try {
    const response = await notificationService.getMyNotifications(
      req["user"].id,
    );
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreateNotificationDto = req.body;
    const response = await notificationService.create(
      createData,
      req["user"].id,
    );
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateIsViewed(req: Request, res: Response) {
  try {
    const { notificationIds } = req.body;
    const response = await notificationService.updateIsViewed(notificationIds);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
export async function updateState(req: Request, res: Response) {
  try {
    const { notificationIds, state } = req.body;
    const response = await notificationService.updateState(
      notificationIds,
      state,
    );
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await notificationService.remove(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
