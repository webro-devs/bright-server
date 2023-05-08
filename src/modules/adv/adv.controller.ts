import { Request, Response } from "express";
import { CreateAdvertisementDto, UpdateAdvertisementDto } from "./dto";

import { advertisementService } from ".";
import { HttpException } from "../../infra/validation";
import { AdvertisementEnum } from "../../infra/shared/enums";

export async function getAll(req: Request, res: Response) {
  try {
    const positions = await advertisementService.getAll();
    res.send(positions);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreateAdvertisementDto = req.body;
    const creator = req["user"].id;
    const position = await advertisementService.create({
      ...createData,
      creator,
    });
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getByType(req, res: Response) {
  try {
    const { type } = req.params;

    const data = await advertisementService.getByType(
      type as AdvertisementEnum,
      req.ip,
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdateAdvertisementDto = req.body;
    const position = await advertisementService.update(updateData, id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateIsActive(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const response = await advertisementService.updateIsActive(id, isActive);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const position = await advertisementService.remove(id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
