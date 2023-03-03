import { Response, Request } from "express";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

import { categoryService } from ".";

export async function getAll(req: Request, res: Response) {
  const categories = await categoryService.getAll();
  res.send(categories);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const response = await categoryService.getById(id);
  res.send(response);
}

export async function create(req: Request, res: Response) {
  const createData: CreateCategoryDto = req.body;
  const response = await categoryService.create(createData);
  res.send(response);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  const response = await categoryService.remove(id);
  res.send(response);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const updateData: UpdateCategoryDto = req.body;
  const response = await categoryService.update(updateData, id);
  res.send(response);
}
