import { Response, Request } from "express";
import { CreateAdminDto, UpdateAdminDto } from "./dto";

import { adminService } from ".";

export async function getAll(req: Request, res: Response) {
  const categories = await adminService.getAll();
  res.send(categories);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const response = await adminService.getById(id);
  res.send(response);
}

export async function create(req: Request, res: Response) {
  const createData: CreateAdminDto = req.body;
  const response = await adminService.create(createData);
  res.send(response);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  const response = await adminService.remove(id);
  res.send(response);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const updateData: UpdateAdminDto = req.body;
  const response = await adminService.update(updateData, id);
  res.send(response);
}
