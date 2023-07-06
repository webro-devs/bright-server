import { Request, Response } from "express";
import { CreateAdvertisementDto, UpdateAdvertisementDto } from "./dto";

import { advertisementService } from ".";
import { HttpException } from "../../infra/validation";
import { AdvertisementEnum } from "../../infra/shared/enums";

export async function getAll(req: Request, res: Response) {
  try {
    const data = await advertisementService.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await advertisementService.getById(id);
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getMidByCategory(req: Request, res: Response) {
  try {
    const data = await advertisementService.getMidWithCategory(req.ip);
    res.send(data);
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

export async function getByType(req: Request, res: Response) {
  try {
    const { type } = req.params;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    const data = await advertisementService.getByType(
      type as AdvertisementEnum,
      ip,
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function IncrCounts(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await advertisementService.IncrCounts(id, req.ip);
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
    const { isActive, ids } = req.body;
    const response = await advertisementService.updateIsActive(ids, isActive);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateIsClickCount(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await advertisementService.updateIsClickCount(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { ids } = req.body;
    await Promise.all(
      ids.map(async (id) => {
        await advertisementService.remove(id);
      }),
    );
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
