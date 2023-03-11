import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";

export async function getAll(req: Request, res: Response) {
  const news = await newsService.getAll();
  res.send(news);
}

export async function create(req, res: Response) {
  const newsData: CreateNewsDto = req.body;
  console.log(newsData);

  const news = await newsService.create(newsData);

  res.send(news);
}
