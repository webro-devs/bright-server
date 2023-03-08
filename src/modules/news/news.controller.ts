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
  const langs = ["uz", "ru", "en", "уз"];

  const newsLanguage = [];
  const body = req.body;
  await Promise.all(
    langs?.map(async (key) => {
      if (body[key]) {
        newsLanguage.push({ ...body[key], languageKey: key });
        delete body[key];
      }
    }),
  );

  //   const NewsLanguage = await newsLanguageService.bulkCreate(newsLanguage);

  console.log(newsLanguage);

  const createData: CreateNewsDto = req.body;

  //   const createNews = await newsService.create(createData);
  res.send(newsLanguage);
}

const data = {};
