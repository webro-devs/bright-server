import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";
import { HttpException } from "../../infra/validation";
import { Upload } from "../../infra/shared/interface";
import { fileService, telegram } from "../../infra/helpers";
import slugify from "slugify";
import { State } from "../../infra/shared/enums";
import { ZipMaker } from "../../infra/helpers";

export async function getAll(req, res: Response) {
  try {
    const news = await newsService.getAll({ where: req.where });
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

export const getMyNews = async (req: Request, res: Response) => {
  try {
    const where = req?.["where"];
    where.creator = { id: req["user"].id };
    const news = await newsService.getByCreatorId(where);
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
    let where = req["where"] || {};
    where.state = State.published;
    const data = await newsService.getByStatePublished(where);
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

export const getByStateChecking = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(State.checking);
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
          req?.files?.[imgData[i] + "_img"],
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
    res.send(new HttpException(false, 200, "News succesfully created"));
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
    const { ids } = req.body;

    const updateState = await newsService.updateState(ids, "archive");

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateGeneral(req: Request, res: Response) {
  try {
    const { ids } = req.body;

    const updateState = await newsService.updateState(ids, "general access");

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateChecking(req: Request, res: Response) {
  try {
    const { ids } = req.body;
    const updateState = await newsService.updateState(ids, State.checking);
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
    const { ids } = req.body;

    await Promise.all(
      ids.map(async (id) => {
        await newsService.remove(id);
      }),
    );

    res.send({ Data: "ok", error: false });
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStatePublished(req: Request, res: Response) {
  try {
    const { newsIds, tg, inst = false } = req.body;
    await newsService.updateStatePublished(newsIds, State.published, tg, inst);
    if (inst) {
      const { data } = await ZipMaker();
      const fileName = "instagram.zip";
      const fileType = "application/zip";

      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${fileName}`,
        "Content-Type": fileType,
      });

      return res.end(data);
    }
    return res.send("News published succesfully");
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
