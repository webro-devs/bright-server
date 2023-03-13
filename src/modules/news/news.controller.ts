import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(__: Request, res: Response) {
  const news = await newsService.getAll();
  res.send(news);
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = await newsService.getById(id);

    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export async function create(req: Request, res: Response) {
  const newsData: CreateNewsDto = req.body;
  console.log(newsData);

  const news = await newsService.create(newsData, req["body"]["creator"]["id"]);

  res.send(news);
}

export async function update(req: Request, res: Response) {
  const newsData: UpdateNewsDto = req.body;
  const { id } = req.params;

  const updateNews = await newsService.update(newsData, id);

  res.send(updateNews);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;

  const deleteData = await newsService.remove(id);

  return deleteData;
}
