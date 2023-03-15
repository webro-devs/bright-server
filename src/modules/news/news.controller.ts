import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";
import { HttpException } from "../../infra/validation";
import { Upload } from "../../infra/shared/interface";
import { fileService } from "../../infra/helpers";
import { State } from "../../infra/shared/enums";

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

export async function create(req: Upload, res: Response) {
  const newsData: CreateNewsDto = req.body;
  const imgData = ["uz", "ru", "en", "уз"];

  for (let i = 0; imgData.length > i; i++) {
    if (newsData[imgData[i]]) {
      newsData[imgData[i]] = JSON.parse(newsData[imgData[i]]);
    } else {
      newsData[imgData[i]] = {};
    }
    if (!req?.files?.uz_img) {
      newsData[imgData[i]]["files"] = null;
      continue;
    }
    if (!req?.files?.ru_img) {
      newsData[imgData[i]]["files"] = null;
      continue;
    }
    if (!req?.files?.en_img) {
      newsData[imgData[i]]["files"] = null;
      continue;
    }
    if (!req?.files?.уз_img) {
      newsData[imgData[i]]["files"] = null;
      continue;
    }
    if (req?.files[imgData[i] + "_img"]) {
      const avatar = await fileService.uploadImage(
        req.files[imgData[i] + "_img"],
      );

      if (avatar.error) {
        res.send(new HttpException(true, 500, "Image upload error"));
        return;
      }
      newsData[imgData[i]]["file"] = avatar.url;
    }
  }

  const news = await newsService.create(newsData, req["user"]?.id);
  console.log(req["user"].id);

  res.send("goood");
}

export async function update(req: Upload, res: Response) {
  const newsData: UpdateNewsDto = req.body;
  const { id } = req.params;

  const updateNews = await newsService.update(newsData, id, req?.files);

  res.send(updateNews);
}

export async function updateStateArchive(req: Request, res: Response) {
  const { id } = req.params;

  const updateState = await newsService.updateState(id, "archive");

  res.send(updateState);
}

export async function updateStateGeneral(req: Request, res: Response) {
  const { id } = req.params;

  const updateState = await newsService.updateState(id, "general access");

  res.send(updateState);
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;

  const deleteData = await newsService.remove(id);

  res.send(deleteData);
}
