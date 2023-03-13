import { Request, Response } from "express";
import { CreatePositionDto, UpdatePositionDto } from "./dto";

import { positionService } from ".";

export async function getAll(req: Request, res: Response) {
  const positions = await positionService.getAll();
  res.send(positions);
}

export async function create(req: Request, res: Response) {
  const createData: CreatePositionDto = req.body;
  const position = await positionService.create(createData);
  res.send(position);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const updateData: UpdatePositionDto = req.body;
  const position = await positionService.update(updateData, id);
  res.send(position);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const position = await positionService.remove(id);
  res.send(position);
}
