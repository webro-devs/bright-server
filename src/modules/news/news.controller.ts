import { Request, Response } from "express";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

import { newsService } from ".";
import { newsLanguageService } from "../news-language";
import { HttpException } from "../../infra/validation";
import { Upload } from "../../infra/shared/interface";
import { fileService } from "../../infra/helpers";
import slugify from "slugify";
import { State } from "../../infra/shared/enums";
import { ZipMaker } from "../../infra/helpers";
// import {
//   ElasticSearch,
//   ElasticIndexNews,
//   ElasticRemove,
//   ElasticUpdate,
//   ElasticCount,
// } from "./elastic-search";

export async function search(req, res: Response) {
  try {
    // const data = await ElasticSearch(
    //   req["elasticsearch"]?.text,
    //   req["pagination"]?.offset,
    //   req["pagination"]?.limit,
    //   req["where"]?.state || "general access",
    // );
    // return res.send(data);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export async function getAll(req, res: Response) {
  try {
    const news = await newsService.getAll(
      req?.where,
      req.relations,
      req?.["pagination"],
    );
    res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const relations = req?.["relations"];
    relations.editors = { editor: true };
    const news = await newsService.getOne(id, relations);

    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export const getLastNews = async (req: Request, res: Response) => {
  try {
    const relations = req?.["relations"];
    const where = req?.["where"];
    const pagination = req?.["pagination"];
    where.isLastNews = true;
    const news = await newsService.getLastNews(relations, where, pagination);
    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export const getMyNews = async (req: Request, res: Response) => {
  try {
    const where = req?.["where"];
    where.creator = { id: req["user"].id };
    const news = await newsService.getByCreatorId(
      where,
      req["relations"],
      req?.["pagination"],
    );
    return res.send(news);
  } catch (err) {
    res.send(new HttpException(true, 500, err.message));
  }
};

export const getByStateGeneral = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(
      State.general_access,
      req["relations"],
      req?.["pagination"],
    );
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByStatePublished = async (req: Request, res: Response) => {
  try {
    let where = req["where"] || {};
    where.state = State.published;
    const data = await newsService.getByStatePublished(
      where,
      req["relations"],
      req?.["pagination"],
    );
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByStateArchive = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(
      State.archive,
      req["relations"],
      req?.["pagination"],
    );
    return res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
};

export const getByStateChecking = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getByState(
      State.checking,
      req["relations"],
      req?.["pagination"],
    );
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
      req["relations"],
      req?.["pagination"],
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
      newsData[imgData[i]].shortLink = slugify(
        newsData[imgData[i]].shortLink || "",
        {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          strict: true,
          locale: "vi",
          trim: true,
        },
      );
    }

    const news = await newsService.create(newsData, req["user"]?.id);
    res.send(new HttpException(false, 201, "News succesfully created"));
    // await ElasticIndexNews(news);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Upload, res: Response) {
  try {
    const newsData: UpdateNewsDto = req.body;
    const { id } = req.params;

    const updateNews = await newsService.update(newsData, id);

    // const news = await newsService.getByIdForUpdateIndexing(id);
    // await ElasticUpdate(news);

    res.send(updateNews);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateArchive(req: Request, res: Response) {
  try {
    const { ids } = req.body;

    const updateState = await newsService.updateState(ids, "archive");

    // await Promise.all(
    //   ids.map(async (id) => {
    //     const news = await newsService.getByIdForUpdateIndexing(id);
    //     await ElasticUpdate(news);
    //   }),
    // );

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateGeneral(req: Request, res: Response) {
  try {
    const { ids } = req.body;

    const updateState = await newsService.updateState(ids, "general access");

    // await Promise.all(
    //   ids.map(async (id) => {
    //     const news = await newsService.getByIdForUpdateIndexing(id);
    //     await ElasticUpdate(news);
    //   }),
    // );

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStateChecking(req: Request, res: Response) {
  try {
    const { ids } = req.body;
    const updateState = await newsService.updateState(ids, State.checking);

    // await Promise.all(
    //   ids.map(async (id) => {
    //     const news = await newsService.getByIdForUpdateIndexing(id);
    //     await ElasticUpdate(news);
    //   }),
    // );
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

    // const news = await newsService.getByIdForUpdateIndexing(id);
    // await ElasticUpdate(news);

    res.send(updateState);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateDate(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updateDate = await newsService.updateDate(id, req?.body?.date);

    // const news = await newsService.getByIdForUpdateIndexing(id);
    // await ElasticUpdate(news);

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
        // await ElasticRemove(id);
      }),
    );

    res.send({ Data: "ok", error: false });
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function updateStatePublished(req: Request, res: Response) {
  try {
    const { newsIds, tg, inst } = req.body;
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
// export async function getByShortLink(req: Request, res: Response) {
//   try {
//     const { shortLink, key } = req.params;
//     const response = await newsLanguageService.getByShortLink(shortLink, key);
//     res.send(response);
//   } catch (err) {
//     res.status(500).send(new HttpException(true, 500, err.message));
//   }
// }
