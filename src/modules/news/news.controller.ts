import { Request, Response } from "express";
import { CreateNewsDto } from "./dto";

import { newsService } from ".";

export async function getAll(__: Request, res: Response) {
  const news = await newsService.getAll();
  res.send(news);
}

export async function create(req: Request, res: Response) {
  const newsData: CreateNewsDto = req.body;
  console.log(newsData);

  const news = await newsService.create(newsData, req["user"].id);

  res.send(news);
}
