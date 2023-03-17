import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";
import { HttpException } from "../../infra/validation";
import { Upload } from "../../infra/shared/interface";
import { fileService, telegram } from "../../infra/helpers";
import slugify from "slugify";
import CImage from "../../infra/helpers/image";
import { State } from "../../infra/shared/enums";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { DateRangeDto } from "../../infra/shared/dto";

export async function getAll(req, res: Response) {
  try {
    const query: DateRangeDto = req.query;
    let where = {};
    if (query.startDate && query.endDate) {
      where = {
        created_at: Between(new Date(query.startDate), new Date(query.endDate)),
      };
    } else if (query.startDate) {
      where = {
        created_at: MoreThanOrEqual(new Date(query.startDate)),
      };
    } else if (query.endDate) {
      where = {
        created_at: LessThanOrEqual(new Date(query.startDate)),
      };
    } else {
      where = {};
    }
    const news = await newsService.getAll(where);
    res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
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

export const getByCreatorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = await newsService.getByCreatorId(id);

    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export const getMyNews = async (req: Request, res: Response) => {
  try {
    const news = await newsService.getByCreatorId(req["user"].id);
    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export const getByStateGeneral = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(State.general_access);
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByStatePublished = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(State.published);
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByStateArchive = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(State.archive);
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByCategoryId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await newsService.getByCategoryId(id);
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getBySavedCreator = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getBySavedCreator(
      req["user"].id,
      State.favorites,
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export async function create(req: Upload, res: Response) {
  try {
    const newsData: CreateNewsDto = req.body;
    const imgData = ["uz", "ru", "en", "уз"];

    for (let i = 0; imgData.length > i; i++) {
      if (!newsData[imgData[i]]) {
        newsData[imgData[i]] = {};
      }
      if (req?.files?.[imgData[i] + "_img"]) {
        const avatar = await fileService.uploadImage(
          req.files[imgData[i] + "_img"],
        );
        if (avatar.error) {
          res.send(new HttpException(true, 500, "Image upload error"));
          return;
        }
        newsData[imgData[i]]["file"] = avatar.url;
      }

      newsData[imgData[i]].shortLink = slugify(
        newsData[imgData[i]].shortLink || "",
        {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: false,
          strict: false,
          locale: "vi",
          trim: true,
        },
      );
    }

    const news = await newsService.create(newsData, req["user"]?.id);
    let ok = "!";

    if (news.ru && news.ru.file) {
      await CImage({
        imgPath: news.ru.file,
        txt:
          news.ru.title.length > 102
            ? news.ru.title.slice(0, 99) + "..."
            : news.ru.title,
        ctgs: news.categories?.map((ctg) => ctg.ru),
      });

      await telegram({
        title: news.ru.title,
        desc: news.ru.shortDescription,
        link: "http://bright.getter.uz/news/" + news.id,
      });
      ok = " and sended telegram!";
    }

    res.send("News succesfully created" + ok);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Upload, res: Response) {
  try {
    const newsData: UpdateNewsDto = req.body;
    const { id } = req.params;

    const updateNews = await newsService.update(newsData, id, req?.files);

    res.send(updateNews);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateArchive(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updateState = await newsService.updateState(id, "archive");

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateGeneral(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updateState = await newsService.updateState(id, "general access");

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateFavorite(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updateState = await newsService.updateFavorite(
      id,
      State.favorites,
      req["user"].id,
    );
    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateDate(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updateDate = await newsService.updateDate(id, req?.body?.date);

    res.send(updateDate);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deleteData = await newsService.remove(id);

    res.send(deleteData);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
