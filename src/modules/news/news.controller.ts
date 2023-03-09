import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import {
  CreateNewsLanguageDto,
  UpdateNewsLanguageDto,
} from "../news-language/dto";

import { newsService } from ".";
import { newsLanguageService } from "../news-language/index";

export async function getAll(req: Request, res: Response) {
  const news = await newsService.getAll();
  res.send(news);
}

export async function create(req: Request, res: Response) {
  const newsData = req.body;

  const news = await newsService.create(newsData);

  res.send(news);
}
