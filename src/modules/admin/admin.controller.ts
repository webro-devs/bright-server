import { Response, Request } from "express";

import { CreateAdminDto, UpdateAdminDto, UpdateAdminProfileDto } from "./dto";
import { adminService } from ".";
import { fileService } from "../../infra/helpers";
import { Upload } from "../../infra/shared/interface";

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
  const avatar = await fileService.uploadImage((req as Upload).files.avatar);
  if (avatar.error) {
    res.sendStatus(500).send("Image upload error");
    return;
  }

  const response = await adminService.create({
    ...createData,
    avatar: avatar.url,
  });
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

export async function changeActive(req: Request, res: Response) {
  const { id } = req.params;
  const { isActive } = req.body;
  const response = await adminService.changeActive(id, isActive);
  res.send(response);
}

export async function changeProfile(req: Request, res: Response) {
  const { id } = req.params;
  const updateData: UpdateAdminProfileDto = req.body;
  const response = await adminService.changeProfile(id, updateData);
  res.send(response);
}
