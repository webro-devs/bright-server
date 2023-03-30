import { Response, Request } from "express";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

import { categoryService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const categories = await categoryService.getAll();
    res.send(categories);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getCategoryWithFiveNews(req: Request, res: Response) {
  try {
    const relations = {
      news: req["relations"],
    };
    const categories = await categoryService.getAllWithFiveNews(relations);
    res.send(categories);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await categoryService.getById(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreateCategoryDto = req.body;
    const response = await categoryService.create(createData);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await categoryService.remove(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdateCategoryDto = req.body;
    const response = await categoryService.update(updateData, id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
