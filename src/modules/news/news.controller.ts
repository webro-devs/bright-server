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
  return news;
}

export async function create(req: Request, res: Response) {
  const newsData = req.body;
  const ru = newsLanguageService.create(newsData.ru);
  const uz = newsLanguageService.create(newsData.uz);
  const en = newsLanguageService.create(newsData.en);
  const уз = newsLanguageService.create(newsData.уз);

  newsData.uz = uz;
  newsData.en = en;
  newsData.ru = ru;
  newsData.уз = уз;
}
