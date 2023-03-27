import { Response, Request } from "express";
import { CreatPermissionDto, UpUpdatePermissionDto } from "./dto";

import { permissionService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const categories = await permissionService.getAll();
    res.send(categories);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await permissionService.getById(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreatPermissionDto = req.body;
    const response = await permissionService.create(createData);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await permissionService.remove(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpUpdatePermissionDto = req.body;
    const response = await permissionService.update(updateData, id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
