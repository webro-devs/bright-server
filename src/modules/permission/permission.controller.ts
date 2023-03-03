import { Response, Request } from "express";
import { CreatPermissionDto, UpUpdatePermissionDto } from "./dto";

import { permissionService } from ".";

export async function getAll(req: Request, res: Response) {
  const categories = await permissionService.getAll();
  res.send(categories);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const response = await permissionService.getById(id);
  res.send(response);
}

export async function create(req: Request, res: Response) {
  const createData: CreatPermissionDto = req.body;
  const response = await permissionService.create(createData);
  res.send(response);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  const response = await permissionService.remove(id);
  res.send(response);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const updateData: UpUpdatePermissionDto = req.body;
  const response = await permissionService.update(updateData, id);
  res.send(response);
}
