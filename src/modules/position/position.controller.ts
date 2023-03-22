import { Request, Response } from "express";
import { CreatePositionDto, UpdatePositionDto } from "./dto";

import { positionService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const positions = await positionService.getAll();
    res.send(positions);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreatePositionDto = req.body;
    const position = await positionService.create(createData);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdatePositionDto = req.body;
    const position = await positionService.update(updateData, id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const position = await positionService.remove(id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
