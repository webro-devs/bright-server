import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const NewsQueryParserMiddleware = (req, res, next) => {
  let where: any = {};
  let relations: any = {};
  let pagination: { limit: number; offset: number } = { limit: 100, offset: 0 };
  let elasticsearch = { text: "" };
  const {
    startDate,
    endDate,
    creatorId,
    categoryId,
    mainCategoryId,
    state,
    lang,
    limit,
    page,
    text,
  } = req.query;

  if (startDate && endDate) {
    where = {
      created_at: Between(new Date(startDate), new Date(endDate)),
    };
  } else if (startDate) {
    where = {
      created_at: MoreThanOrEqual(new Date(startDate)),
    };
  } else if (endDate) {
    where = {
      created_at: LessThanOrEqual(new Date(endDate)),
    };
  }
  if (creatorId) {
    where.creator = {
      id: creatorId,
    };
  }
  if (categoryId) {
    where.categories = {
      id: categoryId,
    };
  }
  if (mainCategoryId) {
    where.mainCategory = {
      id: mainCategoryId,
    };
  }
  if (state) {
    where.state = state;
  }
  if (lang) {
    relations = {
      categories: true,
      creator: {
        position: true,
      },
      mainCategory: true,
    };
    relations[lang] = true;
  } else {
    relations = {
      uz: true,
      ru: true,
      en: true,
      уз: true,
      categories: true,
      creator: {
        position: true,
      },
      mainCategory: true,
    };
  }
  if (limit && page) {
    const offset = (+page - 1) * +limit;
    pagination.limit = +limit;
    pagination.offset = offset;
  } else if (limit && !page) {
    pagination.limit = +limit;
  }
  if (text) {
    elasticsearch.text = text;
  }

  req.where = where;
  req.relations = relations;
  req.pagination = pagination;
  req.elasticsearch = elasticsearch;
  next();
};

export default NewsQueryParserMiddleware;
